// PATH: src/shared/ui/FilePickerField.jsx
import { useId, useRef } from "react";
import { Upload } from "lucide-react";

export default function FilePickerField({ label, value, onPick, className = "" }) {
  const id = useId();
  const ref = useRef(null);

  return (
    <div className={["relative", className].join(" ")}>
      {label ? (
        <span className="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#111827]/80">
          {label}
        </span>
      ) : null}

      <button
        type="button"
        onClick={() => ref.current?.click()}
        className={[
          "w-full h-[52px] rounded-[6px] border border-[#E5E7EB] px-4 text-left",
          "flex items-center justify-between",
          "focus:outline-none focus:ring-2 focus:ring-[#D66355]/20 focus:border-[#D66355]/40",
        ].join(" ")}
      >
        <span className={value ? "text-[14px] text-[#111827]" : "text-[14px] text-[#9CA3AF]"}>
          {value || "Choose file"}
        </span>

        <span className="h-9 w-9 rounded-lg border border-[#E5E7EB] inline-flex items-center justify-center">
          <Upload className="h-5 w-5 text-[#111827]" />
        </span>
      </button>

      <input
        id={id}
        ref={ref}
        type="file"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onPick?.(f);
        }}
      />
    </div>
  );
}