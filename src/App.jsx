import { useState, useRef, useEffect } from "react";

const PALETTE = {
  bg: "#F7F6F3",
  surface: "#FFFFFF",
  text: "#1C1C1A",
  muted: "#8A8A84",
  accent: "#6B7B6E",
  accentLight: "#E8EDE9",
  border: "#E4E3DF",
  userBubble: "#1C1C1A",
  userText: "#F7F6F3",
  aiBubble: "#EEECEA",
  aiText: "#1C1C1A",
};

const screens = {
  WELCOME: "welcome",
  CONTEXT: "context",
  CHAT: "chat",
};

const lossTypes = [
  { id: "death", label: "Una persona querida" },
  { id: "relationship", label: "Una relación" },
  { id: "job", label: "Un trabajo o proyecto" },
  { id: "health", label: "La salud" },
  { id: "other", label: "Algo más" },
];

export default function DueloApp() {
  const [screen, setScreen] = useState(screens.WELCOME);
  const [lossType, setLossType] = useState(null);
  const [lossName, setLossName] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const startChat = async () => {
    setScreen(screens.CHAT);
    setLoading(true);

    const nameForMsg = userName.trim() ? userName.trim() : "";
    const welcomeMsg = nameForMsg
      ? `Hola, ${nameForMsg}. Gracias por confiar este espacio con lo que estás cargando.`
      : `Gracias por confiar este espacio con lo que estás cargando.`;

    setTimeout(() => {
      setMessages([{ role: "assistant", content: welcomeMsg }]);
      setLoading(false);
    }, 900);
  };

  const comingSoonReplies = [
    "Esta función se activa muy pronto. Gracias por estar aquí primero.",
    "Todavía estoy llegando. Pronto podré responderte de verdad — quédate cerca.",
    "Esto es solo el comienzo de Duelo. Muy pronto podré acompañarte en cada palabra.",
  ];

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    const reply = comingSoonReplies[Math.floor(Math.random() * comingSoonReplies.length)];

    setTimeout(() => {
      setMessages([...newMessages, { role: "assistant", content: reply }]);
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 1100);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: PALETTE.bg,
      fontFamily: "'Georgia', 'Times New Roman', serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "0",
    }}>

      {screen === screens.WELCOME && (
        <div style={{
          maxWidth: 400,
          width: "100%",
          padding: "64px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 48,
        }}>
          <div>
            <p style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              color: PALETTE.muted,
              textTransform: "uppercase",
              marginBottom: 20,
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
            }}>Duelo</p>
            <h1 style={{
              fontSize: 36,
              fontWeight: 400,
              color: PALETTE.text,
              lineHeight: 1.2,
              margin: 0,
            }}>
              Aquí no tienes<br />que estar bien.
            </h1>
          </div>

          <p style={{
            fontSize: 16,
            color: PALETTE.muted,
            lineHeight: 1.7,
            margin: 0,
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontWeight: 300,
          }}>
            Un espacio para lo que estás cargando.
          </p>

          <button
            onClick={() => setScreen(screens.CONTEXT)}
            style={{
              background: PALETTE.text,
              color: PALETTE.bg,
              border: "none",
              padding: "14px 28px",
              fontSize: 14,
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              letterSpacing: "0.05em",
              cursor: "pointer",
              borderRadius: 2,
              alignSelf: "flex-start",
            }}
          >
            Entrar
          </button>
        </div>
      )}

      {screen === screens.CONTEXT && (
        <div style={{
          maxWidth: 400,
          width: "100%",
          padding: "64px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}>
          <div>
            <p style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              color: PALETTE.muted,
              textTransform: "uppercase",
              marginBottom: 16,
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
            }}>Antes de empezar</p>
            <h2 style={{
              fontSize: 24,
              fontWeight: 400,
              color: PALETTE.text,
              margin: 0,
              lineHeight: 1.3,
            }}>¿Qué has perdido?</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {lossTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setLossType(type.id)}
                style={{
                  background: lossType === type.id ? PALETTE.accentLight : PALETTE.surface,
                  border: `1px solid ${lossType === type.id ? PALETTE.accent : PALETTE.border}`,
                  color: lossType === type.id ? PALETTE.accent : PALETTE.text,
                  padding: "13px 18px",
                  fontSize: 15,
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  cursor: "pointer",
                  borderRadius: 2,
                  textAlign: "left",
                }}
              >
                {type.label}
              </button>
            ))}
          </div>

          {lossType && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{
                fontSize: 13,
                color: PALETTE.muted,
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                letterSpacing: "0.03em",
              }}>
                ¿Cómo te llamas tú? (opcional)
              </label>
              <input
                value={userName}
                onChange={e => setUserName(e.target.value)}
                placeholder="..."
                style={{
                  border: `1px solid ${PALETTE.border}`,
                  borderRadius: 2,
                  padding: "12px 14px",
                  fontSize: 15,
                  fontFamily: "Georgia, serif",
                  color: PALETTE.text,
                  background: PALETTE.surface,
                  outline: "none",
                }}
              />
            </div>
          )}

          {lossType && (
            <button
              onClick={startChat}
              style={{
                background: PALETTE.text,
                color: PALETTE.bg,
                border: "none",
                padding: "14px 28px",
                fontSize: 14,
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                letterSpacing: "0.05em",
                cursor: "pointer",
                borderRadius: 2,
                alignSelf: "flex-start",
              }}
            >
              Continuar
            </button>
          )}
        </div>
      )}

      {screen === screens.CHAT && (
        <div style={{
          width: "100%",
          maxWidth: 540,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          background: PALETTE.bg,
        }}>
          <div style={{
            padding: "20px 28px",
            borderBottom: `1px solid ${PALETTE.border}`,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <span style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              color: PALETTE.muted,
              textTransform: "uppercase",
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
            }}>Duelo</span>
            <span style={{
              width: 6, height: 6,
              borderRadius: "50%",
              background: PALETTE.accent,
              display: "inline-block",
              opacity: 0.6,
            }} />
            <span style={{
              fontSize: 12,
              color: PALETTE.muted,
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
            }}>
              {lossName ? lossName : lossTypes.find(l => l.id === lossType)?.label}
            </span>
            <a
              href="https://forms.gle/UtssQ4yCXq7pfnqw6"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginLeft: "auto",
                fontSize: 12,
                color: PALETTE.accent,
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
                textDecoration: "none",
                border: `1px solid ${PALETTE.accent}`,
                borderRadius: 20,
                padding: "5px 12px",
              }}
            >
              Lista de espera
            </a>
          </div>

          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}>
                <div style={{
                  maxWidth: "80%",
                  padding: "14px 18px",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: msg.role === "user" ? PALETTE.userBubble : PALETTE.aiBubble,
                  color: msg.role === "user" ? PALETTE.userText : PALETTE.aiText,
                  fontSize: 15,
                  lineHeight: 1.65,
                  fontFamily: msg.role === "user" ? "'Helvetica Neue', Arial, sans-serif" : "Georgia, serif",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  padding: "14px 20px",
                  borderRadius: "16px 16px 16px 4px",
                  background: PALETTE.aiBubble,
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 6, height: 6,
                      borderRadius: "50%",
                      background: PALETTE.muted,
                      display: "inline-block",
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div style={{
            padding: "16px 20px",
            borderTop: `1px solid ${PALETTE.border}`,
            display: "flex",
            gap: 10,
            alignItems: "flex-end",
            background: PALETTE.bg,
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escribe aquí..."
              rows={1}
              style={{
                flex: 1,
                border: `1px solid ${PALETTE.border}`,
                borderRadius: 12,
                padding: "12px 16px",
                fontSize: 15,
                fontFamily: "Georgia, serif",
                color: PALETTE.text,
                background: PALETTE.surface,
                outline: "none",
                resize: "none",
                lineHeight: 1.5,
                maxHeight: 120,
                overflowY: "auto",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                background: input.trim() && !loading ? PALETTE.text : PALETTE.border,
                color: input.trim() && !loading ? PALETTE.bg : PALETTE.muted,
                border: "none",
                borderRadius: 12,
                width: 44,
                height: 44,
                cursor: input.trim() && !loading ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 18,
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </div>
  );
          }
