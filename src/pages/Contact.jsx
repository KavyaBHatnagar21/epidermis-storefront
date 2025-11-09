import React, { useState } from "react";
import {MessageCircle} from "lucide-react";
import H3 from "../components/H3.jsx";
import Button from "../components/Button.jsx";

export default function Contact() {
  const [message, setMessage] = useState("");
  const phoneNumber = "919876543210"; // replace with your number (no '+' or spaces)

  const handleContact = () => {
    const base = `https://wa.me/${import.meta.env.VITE_SUPPORT_PHONE_NUMBER}`;
    const text = message.trim()
      ? encodeURIComponent(message)
      : encodeURIComponent("Hello Epidermis team, I’d love to inquire about your collection.");
    window.open(`${base}?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-lg w-full bg-white border border-gray-200 p-10 text-center">
        <H3>
          Get in Touch
        </H3>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message..."
          rows={5}
          className="w-full resize-none border p-4 text-gray-800 placeholder-gray-400 focus:outline-none  transition mb-6 text-base "
        />

        <Button
          onClick={handleContact}
          className="flex items-center justify-center gap-3"
        >
          <MessageCircle size={26} />
          <span>Send via WhatsApp</span>
        </Button>
      </div>

      <p className="text-gray-500 text-sm mt-10 tracking-wide">
        We usually reply within a few hours.
      </p>
    </div>
  );
}
