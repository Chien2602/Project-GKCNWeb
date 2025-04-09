import { Pencil, Trash2, X } from "lucide-react";

function ModalViewNote({ note, onClose, onEdit, onDelete }) {
  if (!note) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 cursor-pointer"
          onClick={onClose}
        >
          <X className="w-4 h-4 text-black" />
        </button>

        <h2 className="text-lg font-bold mb-2">{note.title}</h2>
        <p>
          <strong>Time:</strong> {note.time_start.slice(0, 5)} - {note.time_end.slice(0, 5)}
        </p>
        <p>
          <strong>Important:</strong> {note.tag}
        </p>
        <p className="mt-2 whitespace-pre-wrap">{note.content}</p>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => onEdit(note)}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 active:scale-95 transition-all text-white px-4 py-2 rounded-lg shadow-sm"
          >
            <Pencil className="w-4 h-4 text-white" />
            <span className="text-sm font-medium">Edit</span>
          </button>

          <button
            onClick={() => onDelete(note.id)}
            className="bg-red-500 flex gap-2 items-center justify-center hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            <Trash2 className="w-4 h-4 text-white" />
            <span className="text-sm font-medium">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalViewNote;
