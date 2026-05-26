import { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  BackHandler,
  Platform,
  StatusBar,
} from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";

// La URL de producción de la web app
const WEB_APP_URL = "https://casasdecambios.com";

// Para desarrollo local usar:
// const WEB_APP_URL = "http://10.0.2.2:5173"; // Android emulator
// const WEB_APP_URL = "http://localhost:5173";  // iOS simulator

SplashScreen.preventAutoHideAsync();

// JavaScript inyectado en el WebView para mejorar la UX móvil
const INJECTED_JS = `
  (function() {
    // Deshabilitar zoom con doble tap
    var meta = document.querySelector('meta[name="viewport"]');
    if (meta) {
      meta.setAttribute('content',
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover'
      );
    } else {
      var newMeta = document.createElement('meta');
      newMeta.name = 'viewport';
      newMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover';
      document.head.appendChild(newMeta);
    }

    // Agregar clase al body para identificar WebView
    document.body.classList.add('is-webview');

    // Deshabilitar el context menu (long press)
    document.addEventListener('contextmenu', function(e) { e.preventDefault(); }, false);

    // Smooth scroll nativo
    document.documentElement.style.scrollBehavior = 'smooth';

    true; // Requerido por react-native-webview
  })();
`;

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Android: botón físico "Atrás" navega dentro del WebView
  const handleAndroidBack = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
      return true; // consumir el evento
    }
    return false; // salir de la app
  };

  if (Platform.OS === "android") {
    BackHandler.addEventListener("hardwareBackPress", handleAndroidBack);
  }

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
  };

  const onLoadEnd = async () => {
    setIsLoading(false);
    await SplashScreen.hideAsync();
  };

  return (
    <View style={styles.container}>
      <ExpoStatusBar style="dark" backgroundColor="#ffffff" translucent={false} />

      <WebView
        ref={webViewRef}
        source={{ uri: WEB_APP_URL }}
        style={styles.webview}
        injectedJavaScript={INJECTED_JS}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState={false}
        scalesPageToFit={false}
        allowsBackForwardNavigationGestures   // iOS swipe back
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        onNavigationStateChange={onNavigationStateChange}
        onLoadEnd={onLoadEnd}
        onError={() => setIsLoading(false)}
        // Cachear recursos para mejor rendimiento offline
        cacheEnabled
        cacheMode="LOAD_CACHE_ELSE_NETWORK"
        // Compartir cookies entre sesiones
        sharedCookiesEnabled
        // Soporte completo de WebView features
        mixedContentMode="always"
        originWhitelist={["https://*", "http://*", "tel:*", "mailto:*", "whatsapp:*"]}
        // Abrir links externos (WhatsApp, teléfono) en la app nativa
        onShouldStartLoadWithRequest={(request) => {
          const url = request.url;
          if (
            url.startsWith("tel:") ||
            url.startsWith("mailto:") ||
            url.startsWith("whatsapp:") ||
            url.startsWith("https://wa.me")
          ) {
            // Expo Linking se encargará de abrirlos
            return false;
          }
          return true;
        }}
      />

      {/* Spinner de carga inicial */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFD700" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // Respetar la status bar en Android
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0D1117",
    alignItems: "center",
    justifyContent: "center",
  },
});
