import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, X, Send, Bot, User, MapPin, Phone,
  Calculator, HelpCircle, ArrowLeft, ExternalLink, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useFAQs } from "@/hooks/useFAQs";
import { useBranches, getNearestBranch } from "@/hooks/useBranches";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import type { FAQ } from "@/lib/types";

// ── Tipos ──────────────────────────────────────────────────────────────────────

type MessageRole = "bot" | "user";

interface QuickReply {
  label: string;
  action: string;
  icon?: React.ReactNode;
}

interface Message {
  id: string;
  role: MessageRole;
  text: string | React.ReactNode;
  quickReplies?: QuickReply[];
  timestamp: Date;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "593995710648";
const PHONE_NUMBER = "+593 2 286 7144";

const formatRate = (r: number, code: string) =>
  ["COP", "ARS"].includes(code) ? r.toFixed(2) : r.toFixed(4);

const uid = () => Math.random().toString(36).slice(2);

// ── Componente principal ───────────────────────────────────────────────────────

export const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: faqs = [] } = useFAQs();
  const { data: branches = [] } = useBranches();
  const { data: rates } = useExchangeRates();

  // Auto-scroll al último mensaje
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  // Foco en input al abrir
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  // Mensaje de bienvenida al abrir por primera vez
  useEffect(() => {
    if (open && messages.length === 0) {
      addBotMessage(
        "¡Hola! 👋 Soy el asistente virtual de **Punto Cambio**. ¿En qué puedo ayudarte hoy?",
        MAIN_MENU_REPLIES,
      );
    }
  }, [open]);

  // ── Gestión de mensajes ──────────────────────────────────────────────────────

  const addBotMessage = useCallback(
    (text: string, quickReplies?: QuickReply[], delay = 600) => {
      setIsBotTyping(true);
      setTimeout(() => {
        setIsBotTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: uid(), role: "bot", text, quickReplies, timestamp: new Date() },
        ]);
      }, delay);
    },
    [],
  );

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: uid(), role: "user", text, timestamp: new Date() },
    ]);
  };

  // ── Quick replies definiciones ───────────────────────────────────────────────

  const MAIN_MENU_REPLIES: QuickReply[] = [
    { label: "💱 Tasas de cambio",      action: "RATES"    },
    { label: "📍 Puntos de atención",   action: "BRANCHES" },
    { label: "❓ Preguntas frecuentes", action: "FAQS"     },
    { label: "📞 Hablar con un asesor", action: "CONTACT"  },
  ];

  const BACK_TO_MENU: QuickReply = { label: "← Menú principal", action: "MENU", icon: <ArrowLeft className="w-3 h-3" /> };

  // ── Manejador de acciones ────────────────────────────────────────────────────

  const handleAction = useCallback(
    (action: string, payload?: string) => {
      switch (action) {

        // ── Menú principal
        case "MENU":
          addBotMessage(
            "¿En qué más puedo ayudarte?",
            MAIN_MENU_REPLIES,
          );
          break;

        // ── Tasas de cambio
        case "RATES":
          addUserMessage("💱 Tasas de cambio");
          if (!rates?.length) {
            addBotMessage(
              "Estoy cargando las tasas en este momento…",
              [BACK_TO_MENU],
            );
          } else {
            const top5 = rates.slice(0, 5);
            const rateLines = top5
              .map((r) => `${r.flag} **${r.code}**: ${formatRate(r.sellRate, r.code)} por USD`)
              .join("\n");
            addBotMessage(
              `📊 Tasas referenciales del mercado hoy:\n\n${rateLines}\n\n⚠️ *Estas tasas son aproximadas. Visítenos para la cotización exacta.*`,
              [
                { label: "🧮 Ir a calculadora",       action: "GO_CALCULATOR" },
                { label: "📍 Punto más cercano",       action: "BRANCHES" },
                BACK_TO_MENU,
              ],
            );
          }
          break;

        // ── Sucursales / punto más cercano
        case "BRANCHES":
          addUserMessage("📍 Puntos de atención");
          addBotMessage(
            "¿Quieres que encuentre el punto de atención más cercano a tu ubicación?",
            [
              { label: "📡 Usar mi ubicación", action: "LOCATE_ME" },
              { label: "🗺️ Ver todos los puntos", action: "ALL_BRANCHES" },
              BACK_TO_MENU,
            ],
          );
          break;

        case "LOCATE_ME":
          addUserMessage("📡 Usar mi ubicación");
          setIsBotTyping(true);
          navigator.geolocation?.getCurrentPosition(
            (pos) => {
              const { latitude: lat, longitude: lng } = pos.coords;
              setUserLocation({ lat, lng });
              const nearest = branches.length
                ? getNearestBranch(branches, lat, lng)
                : null;
              setIsBotTyping(false);
              if (nearest) {
                setMessages((prev) => [
                  ...prev,
                  {
                    id: uid(),
                    role: "bot",
                    text: `📍 El punto más cercano a ti está a **${nearest.distanceKm.toFixed(1)} km**:\n\n**${nearest.name}**\n${nearest.address}, ${nearest.city}\n📞 ${nearest.phone}\n🕐 ${nearest.hours}${nearest.hours_saturday ? ` · ${nearest.hours_saturday}` : ""}`,
                    quickReplies: [
                      {
                        label: "🗺️ Cómo llegar",
                        action: `MAP:${nearest.lat}:${nearest.lng}`,
                      },
                      nearest.whatsapp
                        ? { label: "💬 WhatsApp", action: `WA:${nearest.whatsapp}` }
                        : { label: "📞 Llamar", action: `CALL:${nearest.phone}` },
                      BACK_TO_MENU,
                    ],
                    timestamp: new Date(),
                  },
                ]);
              } else {
                addBotMessage(
                  "No pude encontrar puntos cerca. Visita nuestra página de ubicaciones.",
                  [{ label: "🗺️ Ver ubicaciones", action: "GO_LOCATIONS" }, BACK_TO_MENU],
                );
              }
            },
            () => {
              setIsBotTyping(false);
              addBotMessage(
                "No pude acceder a tu ubicación. Aquí están todos nuestros puntos:",
                undefined,
                200,
              );
              setTimeout(() => handleAction("ALL_BRANCHES"), 900);
            },
          );
          break;

        case "ALL_BRANCHES":
          addUserMessage("🗺️ Ver todos los puntos");
          {
            const list = branches
              .filter((b) => b.is_active)
              .map((b) => `📍 **${b.name}**\n${b.city} · ${b.phone}`)
              .join("\n\n");
            addBotMessage(
              list || "Cargando sucursales…",
              [{ label: "🗺️ Ver en mapa", action: "GO_LOCATIONS" }, BACK_TO_MENU],
            );
          }
          break;

        // ── FAQs
        case "FAQS":
          addUserMessage("❓ Preguntas frecuentes");
          {
            const items = faqs.slice(0, 6);
            addBotMessage(
              "Selecciona la pregunta que quieres resolver:",
              [
                ...items.map((faq: FAQ) => ({
                  label: faq.question,
                  action: `FAQ:${faq.id}`,
                })),
                BACK_TO_MENU,
              ],
            );
          }
          break;

        case action.startsWith("FAQ:") ? action : "__NEVER__": {
          const faqId = action.replace("FAQ:", "");
          const faq = faqs.find((f: FAQ) => f.id === faqId);
          if (faq) {
            addUserMessage(faq.question);
            addBotMessage(faq.answer, [
              { label: "Ver más preguntas", action: "FAQS" },
              BACK_TO_MENU,
            ]);
          }
          break;
        }

        // ── Contacto / asesor
        case "CONTACT":
          addUserMessage("📞 Hablar con un asesor");
          addBotMessage(
            "Te conectamos con un asesor de Punto Cambio. ¿Cómo prefieres contactarnos?",
            [
              { label: "💬 WhatsApp",     action: `WA:${WHATSAPP_NUMBER}` },
              { label: "📞 Llamar",       action: `CALL:${PHONE_NUMBER}` },
              { label: "✉️ Formulario",   action: "GO_CONTACT" },
              BACK_TO_MENU,
            ],
          );
          break;

        // ── Navegación externa
        case "GO_CALCULATOR":
          window.location.href = "/calculadora";
          break;
        case "GO_LOCATIONS":
          window.location.href = "/ubicaciones";
          break;
        case "GO_CONTACT":
          window.location.href = "/contacto";
          break;

        default: {
          // Links externos
          if (action.startsWith("WA:")) {
            const num = action.replace("WA:", "").replace(/\D/g, "");
            window.open(`https://wa.me/${num}?text=Hola%2C%20necesito%20informaci%C3%B3n%20sobre%20cambio%20de%20divisas`, "_blank");
          } else if (action.startsWith("CALL:")) {
            window.location.href = `tel:${action.replace("CALL:", "")}`;
          } else if (action.startsWith("MAP:")) {
            const [, lat, lng] = action.split(":");
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, "_blank");
          } else if (action.startsWith("FAQ:")) {
            const faqId = action.replace("FAQ:", "");
            const faq = faqs.find((f: FAQ) => f.id === faqId);
            if (faq) {
              addUserMessage(faq.question);
              addBotMessage(faq.answer, [
                { label: "Ver más preguntas", action: "FAQS" },
                BACK_TO_MENU,
              ]);
            }
          }
          break;
        }
      }
    },
    [rates, branches, faqs, addBotMessage],
  );

  // ── Enviar texto libre (keyword matching simple) ─────────────────────────────

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    addUserMessage(text);

    const lower = text.toLowerCase();
    if (/cambio|tasa|divisa|moneda|euro|d.lar|libra/.test(lower)) {
      handleAction("RATES");
    } else if (/donde|ubica|punt|direcci|suc|cerca/.test(lower)) {
      handleAction("BRANCHES");
    } else if (/hor|abr|cierr|tiempo/.test(lower)) {
      const faq = faqs.find((f: FAQ) => f.category === "horarios");
      if (faq) handleAction(`FAQ:${faq.id}`);
      else handleAction("FAQS");
    } else if (/oro|joya|moneda|vender/.test(lower)) {
      const faq = faqs.find((f: FAQ) => f.question.toLowerCase().includes("oro"));
      if (faq) handleAction(`FAQ:${faq.id}`);
      else handleAction("FAQS");
    } else if (/western|envio|envío|remesa|transfer/.test(lower)) {
      const faq = faqs.find((f: FAQ) => f.question.toLowerCase().includes("western"));
      if (faq) handleAction(`FAQ:${faq.id}`);
      else handleAction("FAQS");
    } else if (/pedido|reserva|anticip/.test(lower)) {
      const faq = faqs.find((f: FAQ) => f.category === "pedidos");
      if (faq) handleAction(`FAQ:${faq.id}`);
      else handleAction("FAQS");
    } else if (/hola|buenos|buenas|saludo/.test(lower)) {
      addBotMessage("¡Hola! 😊 ¿En qué te puedo ayudar?", MAIN_MENU_REPLIES, 400);
    } else {
      addBotMessage(
        "Entendido. Te muestro las opciones disponibles:",
        MAIN_MENU_REPLIES,
        400,
      );
    }
  };

  // ── Render de texto con markdown básico ─────────────────────────────────────

  const renderText = (text: string) =>
    text.split("\n").map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className={i > 0 ? "mt-1" : ""}>
          {parts.map((p, j) =>
            j % 2 === 1 ? <strong key={j}>{p}</strong> : p,
          )}
        </p>
      );
    });

  // ── UI ───────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* Botón flotante */}
      <motion.button
        onClick={() => setOpen(true)}
        className={`fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-40 lg:bottom-6 lg:right-6 w-14 h-14 rounded-full bg-gradient-to-br from-dark to-dark-lighter shadow-2xl flex items-center justify-center border-2 border-primary/60 ${open ? "hidden" : "flex"}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir chat de asistencia"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
      >
        <MessageCircle className="w-6 h-6 text-primary" />
        {/* Badge animado */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
      </motion.button>

      {/* Panel de chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-20 right-3 sm:bottom-6 sm:right-6 lg:bottom-6 lg:right-6 z-50 w-[calc(100vw-24px)] sm:w-96 max-h-[600px] flex flex-col bg-white rounded-2xl shadow-2xl border border-border/40 overflow-hidden"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.25, type: "spring", damping: 20 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-dark to-dark-lighter text-white flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm leading-tight">Asistente Punto Cambio</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white/60 text-xs">En línea</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 custom-scrollbar bg-secondary/20">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === "bot"
                      ? "bg-gradient-gold shadow-md"
                      : "bg-dark"
                  }`}>
                    {msg.role === "bot"
                      ? <Bot className="w-4 h-4 text-dark" />
                      : <User className="w-4 h-4 text-white" />
                    }
                  </div>

                  <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-2`}>
                    {/* Burbuja */}
                    <div className={`rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      msg.role === "bot"
                        ? "bg-white shadow-sm border border-border/30 text-foreground rounded-tl-sm"
                        : "bg-dark text-white rounded-tr-sm"
                    }`}>
                      {typeof msg.text === "string" ? renderText(msg.text) : msg.text}
                    </div>

                    {/* Quick replies (solo para bot) */}
                    {msg.role === "bot" && msg.quickReplies && (
                      <div className="flex flex-wrap gap-1.5">
                        {msg.quickReplies.map((qr, i) => (
                          <button
                            key={i}
                            onClick={() => handleAction(qr.action)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-primary/30 text-primary text-xs font-medium hover:bg-primary hover:text-dark hover:border-primary transition-all duration-200 shadow-sm"
                          >
                            {qr.icon}
                            {qr.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isBotTyping && (
                <div className="flex gap-2 items-end">
                  <div className="w-7 h-7 rounded-full bg-gradient-gold flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-dark" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-border/30">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-border/30 bg-white flex-shrink-0">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta…"
                  className="flex-1 text-sm bg-secondary/40 border border-border/40 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-xl bg-gradient-gold flex items-center justify-center disabled:opacity-40 transition-opacity hover:shadow-md flex-shrink-0"
                  aria-label="Enviar"
                >
                  <Send className="w-4 h-4 text-dark" />
                </button>
              </form>
              <p className="text-[10px] text-muted-foreground text-center mt-2">
                También puedes contactarnos por{" "}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  WhatsApp
                </a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
