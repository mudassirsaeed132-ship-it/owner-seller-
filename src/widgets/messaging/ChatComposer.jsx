import { Paperclip, SendHorizontal } from "lucide-react";
import { useState } from "react";

export default function ChatComposer({ onSend, isSending }) {
  const [value, setValue] = useState("");

  const send = () => {
    const v = value.trim();
    if (!v) return;
    onSend?.(v);
    setValue("");
  };

  return (
    <div className="border-t border-slate-200 px-6 py-5">
      <div className="relative">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write your message"
          className="h-14 w-full rounded-2xl bg-[#F6EAE8] px-6 pr-24 text-sm text-slate-700 outline-none placeholder:text-slate-400"
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          disabled={Boolean(isSending)}
        />

        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-4">
          <button type="button" className="text-[#D06050]" aria-label="Attach" disabled={Boolean(isSending)}>
            <Paperclip size={20} />
          </button>
          <button type="button" className="text-[#D06050]" onClick={send} aria-label="Send" disabled={Boolean(isSending)}>
            <SendHorizontal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
