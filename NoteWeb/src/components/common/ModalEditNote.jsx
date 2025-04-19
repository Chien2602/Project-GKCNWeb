"use client"

import { Save, X } from "lucide-react"

export default function EditNoteModal({ note, onClose, onUpdate, onChange }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md p-7 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 animate-fadeIn">
        <div className="flex items-center gap-3 mb-5 border-b border-gray-200/50 dark:border-gray-700/50 pb-4">
          <div className="bg-purple-100 dark:bg-purple-600/20 p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-600 dark:text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Edit notes</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Title</label>
            <div className="relative">
              <input
                type="text"
                className="w-full bg-gray-100 dark:bg-gray-700/50 border border-gray-300/50 dark:border-gray-600/50 p-3 pl-4 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all duration-200"
                value={note.title}
                onChange={(e) =>
                  onChange({
                    ...note,
                    title: e.target.value,
                  })
                }
                placeholder="Nhập tiêu đề ghi chú"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Content</label>
            <div className="relative">
              <textarea
                className="w-full bg-gray-100 dark:bg-gray-700/50 border border-gray-300/50 dark:border-gray-600/50 p-3 pl-4 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all duration-200 min-h-[120px] resize-none"
                value={note.content}
                onChange={(e) =>
                  onChange({
                    ...note,
                    content: e.target.value,
                  })
                }
                placeholder="Enter detailed content"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <button
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 flex gap-2 justify-center items-center text-gray-800 dark:text-gray-200 px-4 py-2.5 rounded-lg transition-colors duration-200 font-medium"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
          <button
            className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 dark:from-purple-700 dark:to-purple-600 dark:hover:from-purple-600 dark:hover:to-purple-500 flex justify-center items-center gap-2 text-white px-5 py-2.5 rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/20 dark:shadow-purple-900/20 font-medium"
            onClick={() => onUpdate(note)}
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  )
}
