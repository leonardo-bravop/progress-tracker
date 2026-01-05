type ConfirmModalProps = {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal(
    {
        title = "Are you sure?",
        message,
        confirmLabel = "Confirm",
        cancelLabel = "Cancel",
        onConfirm,
        onCancel
    }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        role="dialog"
        aria-modal="true"
        className="bg-white p-5 rounded-lg shadow-lg w-80 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold">{title}</h2>

        <p className="text-sm text-gray-700">
          {message}
        </p>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="
              px-3 py-1 border border-gray-300 rounded
              bg-gray-100 hover:bg-gray-200
            "
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="
              px-3 py-1 bg-red-600 text-white rounded
              hover:bg-red-700
            "
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}