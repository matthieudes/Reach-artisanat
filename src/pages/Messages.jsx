import { useState } from "react";
import "../pagesStyle/Messages.css";

const initialConversations = [
  {
    id: 1,
    name: "Menuiserie Dupont",
    lastMessage: "Merci pour votre retour, à bientôt !",
    messages: [
      { from: "me", text: "Bonjour, avez-vous reçu mon CV ?", date: "10:01" },
      { from: "them", text: "Oui, nous l'avons bien reçu, merci.", date: "10:05" },
      { from: "me", text: "Merci pour votre retour, à bientôt !", date: "10:06" },
    ],
  },
  {
    id: 2,
    name: "Artisans du Patrimoine",
    lastMessage: "Nous vous recontactons rapidement.",
    messages: [
      { from: "me", text: "Bonjour, je suis intéressé par votre offre.", date: "09:30" },
      { from: "them", text: "Merci, nous vous recontactons rapidement.", date: "09:32" },
    ],
  },
];

export default function Messages() {
  const [conversations, setConversations] = useState(initialConversations);
  const [selected, setSelected] = useState(conversations[0]);
  const [input, setInput] = useState("");
  const [newConvName, setNewConvName] = useState("");
  const [showNewConv, setShowNewConv] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const updatedConvs = conversations.map((conv) =>
      conv.id === selected.id
        ? {
            ...conv,
            messages: [
              ...conv.messages,
              { from: "me", text: input, date: new Date().toLocaleTimeString().slice(0, 5) },
            ],
            lastMessage: input,
          }
        : conv
    );
    setConversations(updatedConvs);
    setSelected({ ...selected, messages: [...selected.messages, { from: "me", text: input, date: new Date().toLocaleTimeString().slice(0, 5) }] });
    setInput("");
  };

  const handleNewConv = (e) => {
    e.preventDefault();
    if (!newConvName.trim()) return;
    const newConv = {
      id: Date.now(),
      name: newConvName,
      lastMessage: "",
      messages: [],
    };
    setConversations([newConv, ...conversations]);
    setSelected(newConv);
    setNewConvName("");
    setShowNewConv(false);
  };

  return (
    <div className="messages-container" style={{ paddingTop: 32 }}>
      <h1>Messagerie</h1>
      <div className="messages-main">
        <aside className="messages-sidebar">
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 18px 10px 18px"}}>
            <h2>Conversations</h2>
            <button
              className="new-conv-btn"
              title="Nouvelle discussion"
              onClick={() => setShowNewConv(true)}
            >
              +
            </button>
          </div>
          <ul>
            {conversations.map((conv) => (
              <li
                key={conv.id}
                className={selected && selected.id === conv.id ? "active" : ""}
                onClick={() => setSelected(conv)}
              >
                <span className="conv-name">{conv.name}</span>
                <span className="conv-last">{conv.lastMessage}</span>
              </li>
            ))}
          </ul>
          {showNewConv && (
            <form
              onSubmit={handleNewConv}
              style={{
                padding: "12px 18px",
                borderTop: "1px solid #e0e0e0",
                background: "#fff"
              }}
            >
              <input
                type="text"
                placeholder="Nom de la discussion"
                value={newConvName}
                onChange={e => setNewConvName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  marginBottom: "8px"
                }}
                autoFocus
              />
              <div style={{display: "flex", gap: 8}}>
                <button
                  type="submit"
                  style={{
                    background: "#3498db",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 14px",
                    cursor: "pointer"
                  }}
                >
                  Créer
                </button>
                <button
                  type="button"
                  style={{
                    background: "#eee",
                    color: "#222",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 14px",
                    cursor: "pointer"
                  }}
                  onClick={() => setShowNewConv(false)}
                >
                  Annuler
                </button>
              </div>
            </form>
          )}
        </aside>
        <section className="messages-chat">
          <div className="messages-history">
            {selected && selected.messages.length === 0 && (
              <div style={{ color: "#888", textAlign: "center", marginTop: 40 }}>
                Aucun message pour cette discussion.
              </div>
            )}
            {selected && selected.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message-bubble ${msg.from === "me" ? "me" : "them"}`}
              >
                <span>{msg.text}</span>
                <span className="msg-date">{msg.date}</span>
              </div>
            ))}
          </div>
          {selected && (
            <form className="messages-input-bar" onSubmit={handleSend} autoComplete="off">
              <input
                type="text"
                placeholder="Écrire un message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                style={{ color: "#111" }}
              />
              <button type="submit">Envoyer</button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}