import {
  CheckCircle2,
  Info,
  TriangleAlert,
  XCircle,
} from "lucide-react";

const toastStyles = {
  success: {
    icon: CheckCircle2,
    iconClass: "text-green-500",
  },

  error: {
    icon: XCircle,
    iconClass: "text-red-500",
  },

  warning: {
    icon: TriangleAlert,
    iconClass: "text-orange-500",
  },

  info: {
    icon: Info,
    iconClass: "text-blue-500",
  },
};

function Toast({
  message,
  type = "success",
  onClose,
}) {
  const config = toastStyles[type] || toastStyles.success;

  const Icon = config.icon;

  if (!message) {
    return null;
  }

  return (
    <div className="flex min-w-[280px] max-w-md items-center gap-3 rounded-2xl border border-orange-100 bg-white px-4 py-3 shadow-xl shadow-stone-200/50">
      <Icon
        size={20}
        className={`shrink-0 ${config.iconClass}`}
      />

      <p className="flex-1 text-sm font-medium text-stone-700">
        {message}
      </p>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-semibold text-stone-400 transition hover:text-orange-500"
        >
          Close
        </button>
      )}
    </div>
  );
}

export default Toast;