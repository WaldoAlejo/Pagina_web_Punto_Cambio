import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, X, Send, Bot, User, ArrowLeft, HelpCircle,
} from "lucide-react";
import { useFAQs } from "@/hooks/useFAQs";
import { useBranches, getNearestBranch } from "@/hooks/useBranches";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import { useSiteConfig } from "@/hooks/useSiteConfig";
import type { FAQ } from "@/lib/types";

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

const DEFAULT_WHATSAPP = "593995710648";
const DEFAULT_PHONE    = "+593 2 286 7144";
const DEFAULT_WELCOME  = "¡Hola! 👋 Soy el asistente de **Punto Cambio**. ¿En qué puedo ayudarte?";
const WA_TEXT = encodeURIComponent("Hola, necesito información sobre cambio de divisas");

const formatRate = (r: number, code: string) =>
  ["COP", "ARS"].includes(code) ? r.toFixed(2) : r.toFixed(4);

const uid = () => Math.random().toString(36).slice(2);

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const ChatBot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: faqs = [] } = useFAQs();
  const { data: branches = [] } = useBranches();
  const { data: rates } = useExchangeRates();
  const { data: siteConfig } = useSiteConfig();

  const WHATSAPP_NUMBER = siteConfig?.["whatsapp"]        ?? DEFAULT_WHATSAPP;
  const PHONE_NUMBER    = siteConfig?.["phone_1"]         ?? DEFAULT_PHONE;
  const WELCOME_MSG     = siteConfig?.["chatbot_welcome"] ?? DEFAULT_WELCOME;
  const WHATSAPP_URL    = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_TEXT}`;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  useEffect(() => {
    if (chatOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [chatOpen]);

  useEffect(() => {
    if (chatOpen && messages.length === 0) {
      addBotMessage(WELCOME_MSG, MAIN_MENU_REPLIES);
    }
  }, [chatOpen]);

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

  const BACK_TO_MENU: QuickReply = {
    label: "← Menú principal",
    action: "MENU",
    icon: <ArrowLeft className="w-3 h-3" />,
  };

  const WA_REPLY: QuickReply = {
    label: "💬 Escribir por WhatsApp",
    action: `WA:${WHATSAPP_NUMBER}`,
  };

  const MAIN_MENU_REPLIES: QuickReply[] = [
    { label: "💱 Tasas de cambio",      action: "RATES"    },
    { label: "📍 Puntos de atención",   action: "BRANCHES" },
    { label: "❓ Preguntas frecuentes", action: "FAQS"     },
    { label: "💬 Hablar por WhatsApp",  action: `WA:${WHATSAPP_NUMBER}` },
  ];

  const handleAction = useCallback(
    (action: string) => {
      switch (action) {

        case "MENU":
          addBotMessage("¿En qué más puedo ayudarte?", MAIN_MENU_REPLIES);
          break;

        case "RATES":
          addUserMessage("💱 Tasas de cambio");
          if (!rates?.length) {
            addBotMessage("Estoy cargando las tasas…", [BACK_TO_MENU]);
          } else {
            const top5 = rates.slice(0, 5);
            const rateLines = top5
              .map((r) => `${r.flag} **${r.code}**: ${formatRate(r.sellRate, r.code)} por USD`)
              .join("\n");
            addBotMessage(
              `📊 Tasas referenciales hoy:\n\n${rateLines}\n\n⚠️ *Son aproximadas. Visítenos para la cotización exacta.*`,
              [
                { label: "🧮 Ir a calculadora",  action: "GO_CALCULATOR" },
                { label: "📍 Punto más cercano", action: "BRANCHES"      },
                WA_REPLY,
                BACK_TO_MENU,
              ],
            );
          }
          break;

        case "BRANCHES":
          addUserMessage("📍 Puntos de atención");
          addBotMessage(
            "¿Quieres que encuentre el punto más cercano a tu ubicación?",
            [
              { label: "📡 Usar mi ubicación",  action: "LOCATE_ME"    },
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
                    text: `📍 El punto más cercano está a **${nearest.distanceKm.toFixed(1)} km**:\n\n**${nearest.name}**\n${nearest.address}, ${nearest.city}\n📞 ${nearest.phone}\n🕐 ${nearest.hours}${nearest.hours_saturday ? ` · ${nearest.hours_saturday}` : ""}`,
                    quickReplies: [
                      { label: "🗺️ Cómo llegar", action: `MAP:${nearest.lat}:${nearest.lng}` },
                      nearest.whatsapp
                        ? { label: "💬 WhatsApp sucursal", action: `WA:${nearest.whatsapp}` }
                        : { label: "📞 Llamar", action: `CALL:${nearest.phone}` },
                      BACK_TO_MENU,
                    ],
                    timestamp: new Date(),
                  },
                ]);
              } else {
                addBotMessage(
                  "No encontré puntos cercanos. ¿Te escribimos por WhatsApp?",
                  [WA_REPLY, { label: "🗺️ Ver ubicaciones", action: "GO_LOCATIONS" }, BACK_TO_MENU],
                );
              }
            },
            () => {
              setIsBotTyping(false);
              addBotMessage("No pude acceder a tu ubicación.", undefined, 200);
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
              [{ label: "🗺️ Ver en mapa", action: "GO_LOCATIONS" }, WA_REPLY, BACK_TO_MENU],
            );
          }
          break;

        case "FAQS":
          addUserMessage("❓ Preguntas frecuentes");
          {
            const items = faqs.slice(0, 6);
            addBotMessage(
              "Selecciona la pregunta que quieres resolver:",
              [
                ...items.map((faq: FAQ) => ({ label: faq.question, action: `FAQ:${faq.id}` })),
                BACK_TO_MENU,
              ],
            );
          }
          break;

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
          if (action.startsWith("WA:")) {
            const num = action.replace("WA:", "").replace(/\D/g, "");
            window.open(`https://wa.me/${num}?text=${encodeURIComponent("Hola, necesito información sobre cambio de divisas")}`, "_blank");
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
                WA_REPLY,
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
      if (faq) handleAction(`FAQ:${faq.id}`); else handleAction("FAQS");
    } else if (/oro|joya|vender/.test(lower)) {
      const faq = faqs.find((f: FAQ) => f.question.toLowerCase().includes("oro"));
      if (faq) handleAction(`FAQ:${faq.id}`); else handleAction("FAQS");
    } else if (/western|envio|envío|remesa|transfer/.test(lower)) {
      const faq = faqs.find((f: FAQ) => f.question.toLowerCase().includes("western"));
      if (faq) handleAction(`FAQ:${faq.id}`); else handleAction("FAQS");
    } else if (/pedido|reserva|anticip/.test(lower)) {
      const faq = faqs.find((f: FAQ) => f.category === "pedidos");
      if (faq) handleAction(`FAQ:${faq.id}`); else handleAction("FAQS");
    } else if (/hola|buenos|buenas/.test(lower)) {
      addBotMessage("¡Hola! 😊 ¿En qué te puedo ayudar?", MAIN_MENU_REPLIES, 400);
    } else if (/whatsapp|wsp|ws/.test(lower)) {
      window.open(WHATSAPP_URL, "_blank");
    } else {
      addBotMessage("Te muestro las opciones disponibles:", MAIN_MENU_REPLIES, 400);
    }
  };

  const renderText = (text: string) =>
    text.split("\n").map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className={i > 0 ? "mt-1" : ""}>
          {parts.map((p, j) => (j % 2 === 1 ? <strong key={j}>{p}</strong> : p))}
        </p>
      );
    });

  const openChat = () => {
    setSpeedDialOpen(false);
    setChatOpen(true);
  };

  return (
    <>
      {/* ── Speed dial (visible when chat is closed) ───────────────────────── */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.div
            className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.2 }}
          >
            {/* Speed dial options */}
            <AnimatePresence>
              {speedDialOpen && (
                <>
                  {/* WhatsApp */}
                  <motion.a
                    key="wa"
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 group"
                    initial={{ opacity: 0, y: 8, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.85 }}
                    transition={{ delay: 0.05 }}
                  >
                    <span className="bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
                      WhatsApp directo
                    </span>
                    <div className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-xl text-white transition-colors">
                      <WhatsAppIcon className="w-6 h-6" />
                    </div>
                  </motion.a>

                  {/* Chatbot */}
                  <motion.button
                    key="chat"
                    onClick={openChat}
                    className="flex items-center gap-2.5 group"
                    initial={{ opacity: 0, y: 8, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.85 }}
                    transition={{ delay: 0 }}
                  >
                    <span className="bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
                      Asistente virtual
                    </span>
                    <div className="w-12 h-12 bg-gradient-to-br from-dark to-dark-lighter border-2 border-primary/60 rounded-full flex items-center justify-center shadow-xl">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                  </motion.button>
                </>
              )}
            </AnimatePresence>

            {/* Main button */}
            <motion.button
              onClick={() => setSpeedDialOpen((p) => !p)}
              className="w-14 h-14 rounded-full bg-gradient-to-br from-dark to-dark-lighter shadow-2xl flex items-center justify-center border-2 border-primary/60 relative"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              animate={{ rotate: speedDialOpen ? 45 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              aria-label="Ayuda"
            >
              {speedDialOpen ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <>
                  <HelpCircle className="w-6 h-6 text-primary" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat panel ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className="fixed inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-6 sm:right-6 z-50 w-full sm:w-96 h-[88dvh] sm:h-auto sm:max-h-[600px] flex flex-col bg-white sm:rounded-2xl shadow-2xl border border-border/40 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.22, type: "spring", damping: 22 }}
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
              {/* WhatsApp shortcut */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-green-500/20 hover:bg-green-500/40 transition-colors"
                aria-label="WhatsApp directo"
                title="Escribir por WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 text-green-400" />
              </a>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-secondary/20">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === "bot" ? "bg-gradient-gold shadow-md" : "bg-dark"
                  }`}>
                    {msg.role === "bot"
                      ? <Bot className="w-4 h-4 text-dark" />
                      : <User className="w-4 h-4 text-white" />
                    }
                  </div>
                  <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-2`}>
                    <div className={`rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      msg.role === "bot"
                        ? "bg-white shadow-sm border border-border/30 text-foreground rounded-tl-sm"
                        : "bg-dark text-white rounded-tr-sm"
                    }`}>
                      {typeof msg.text === "string" ? renderText(msg.text) : msg.text}
                    </div>
                    {msg.role === "bot" && msg.quickReplies && (
                      <div className="flex flex-wrap gap-1.5">
                        {msg.quickReplies.map((qr, i) => (
                          <button
                            key={i}
                            onClick={() => handleAction(qr.action)}
                            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 shadow-sm border ${
                              qr.action.startsWith("WA:")
                                ? "bg-green-50 border-green-300 text-green-700 hover:bg-green-500 hover:text-white hover:border-green-500"
                                : "bg-white border-primary/30 text-primary hover:bg-primary hover:text-dark hover:border-primary"
                            }`}
                          >
                            {qr.icon}{qr.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

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
            <div className="px-3 py-3 border-t border-border/30 bg-white flex-shrink-0" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
