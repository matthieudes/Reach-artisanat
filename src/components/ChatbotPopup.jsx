import { useEffect } from "react";

export default function ChatbotPopup() {
  useEffect(() => {
    // Injecte les deux scripts une seule fois
    if (!document.getElementById("bp-inject")) {
      const script1 = document.createElement("script");
      script1.src = "https://cdn.botpress.cloud/webchat/v3.0/inject.js";
      script1.async = true;
      script1.id = "bp-inject";
      document.body.appendChild(script1);
    }
    if (!document.getElementById("bp-custom")) {
      const script2 = document.createElement("script");
      script2.src = "https://files.bpcontent.cloud/2025/06/04/14/20250604142622-1CZ3K9BO.js";
      script2.async = true;
      script2.id = "bp-custom";
      document.body.appendChild(script2);
    }
  }, []);
}