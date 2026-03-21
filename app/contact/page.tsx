"use client";

import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const mailto = `mailto:leo.gayrard@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-white p-6">
      
      <Link href="/" className="mb-6 text-blue-400 underline">
        ← Back to site
      </Link>

      <div className="bg-black/50 p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl mb-4">Contact</h1>

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-black/70"
        />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full mb-4 p-2 rounded bg-black/70 h-32"
        />

        <button
          onClick={handleSend}
          className="w-full bg-teal-700 py-2 rounded"
        >
          Send
        </button>
      </div>
    </main>
  );
}