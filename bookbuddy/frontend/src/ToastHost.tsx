// ToastHost.tsx
import React from "react";
import { createPortal } from "react-dom";

export type ToastType = "success" | "error" | "info";

export type Toast = {
  id: number;
  message: string;
  type: ToastType;
  closing?: boolean;
};

interface ToastHostProps {
  toasts: Toast[];
  closeToast: (id: number) => void;
}

const ToastHost: React.FC<ToastHostProps> = ({ toasts, closeToast }) => {
  if (typeof document === "undefined") return null; // SSR safety

  return createPortal(
    toasts.length > 0 && (
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={[
              "pointer-events-auto w-80 sm:w-96 rounded-xl shadow-2xl px-5 py-4 text-base text-white flex items-start gap-3",
              "transition-all duration-500 transform",
              toast.closing
                ? "opacity-0 translate-y-2"
                : "opacity-100 translate-y-0",
              toast.type === "success"
                ? "bg-emerald-500"
                : toast.type === "error"
                  ? "bg-rose-500"
                  : "bg-slate-800",
            ].join(" ")}
          >
            <span className="mt-0.5 text-lg">
              {toast.type === "success"
                ? "✨"
                : toast.type === "error"
                  ? "⚠️"
                  : "ℹ️"}
            </span>

            <p className="flex-1 leading-snug">{toast.message}</p>

            <button
              type="button"
              onClick={() => closeToast(toast.id)}
              className="ml-2 text-xs opacity-70 hover:opacity-100 whitespace-nowrap cursor-pointer"
            >
              Close
            </button>
          </div>
        ))}
      </div>
    ),
    document.body,
  );
};

export default ToastHost;
