"use client"
import { Edit, Trash2, X } from "lucide-react"

function ModalViewNote({ note, onClose, onEdit, onDelete }) {
  if (!note) return null

  const getPriorityColor = (tag) => {
    switch (tag) {
      case "Low":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "High":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md p-6 rounded-xl shadow-2xl border border-gray-300 dark:border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className={`${getPriorityColor(note.tag)} w-3 h-3 rounded-full`} />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{note.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Date */}
        <div className="mb-4">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date</div>
          <div className="text-gray-800 dark:text-gray-200">
            {new Date(note.day).toLocaleDateString()}
          </div>
        </div>

        {/* Time */}
        <div className="mb-4">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Time</div>
          <div className="text-gray-800 dark:text-gray-200">
            {note.time_start.slice(0, 5)} - {note.time_end.slice(0, 5)}
          </div>
        </div>

        {/* Priority */}
        <div className="mb-4">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Priority</div>
          <div className="text-gray-800 dark:text-gray-200">{note.tag}</div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Content</div>
          <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{note.content}</div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-1 text-white px-3 py-1.5 rounded transition-colors duration-200"
            onClick={() => onEdit(note)}
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 flex items-center gap-1 text-white px-3 py-1.5 rounded transition-colors duration-200"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this note?")) {
                onDelete(note.id)
                onClose()
              }
            }}
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalViewNote
