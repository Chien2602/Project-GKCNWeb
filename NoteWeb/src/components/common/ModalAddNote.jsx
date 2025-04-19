"use client"

import React, { useState } from "react"

export default function AddNoteModal({ onClose, onSubmit, userId }) {
  const [title, setNoteTitle] = useState("")
  const [content, setNoteContent] = useState("")
  const [date, setNoteDate] = useState(new Date().toISOString().split("T")[0])
  const [time_start, setNoteTimeStart] = useState("")
  const [time_end, setNoteTimeEnd] = useState("")
  const [tag, setTag] = useState("Low")

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
      title,
      content,
      day: date,
      time_start,
      time_end,
      tag,
      user: userId,
    }

    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96 shadow-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Add Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Title</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 outline-none rounded focus:outline-none focus:border-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
              value={title}
              placeholder="Enter note title"
              onChange={(e) => setNoteTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Content</label>
            <textarea
              className="w-full h-[70px] p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 outline-none rounded focus:outline-none focus:border-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
              rows={4}
              value={content}
              placeholder="Enter note content"
              onChange={(e) => setNoteContent(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Date</label>
            <input
              type="date"
              className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 outline-none rounded focus:outline-none focus:border-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
              value={date}
              onChange={(e) => setNoteDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Time Start</label>
            <input
              type="time"
              className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 outline-none rounded focus:outline-none focus:border-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
              value={time_start}
              onChange={(e) => setNoteTimeStart(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Time End</label>
            <input
              type="time"
              className="w-full p-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 outline-none rounded focus:outline-none focus:border-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-white"
              value={time_end}
              onChange={(e) => setNoteTimeEnd(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">Importance</label>
            <div className="flex space-x-4 justify-between">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="low"
                  name="importance"
                  value="Low"
                  onChange={(e) => setTag(e.target.value)}
                  checked={tag === "Low"}
                  className="text-purple-600 focus:ring-purple-500 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
                <label htmlFor="low" className="ml-2 text-gray-700 dark:text-gray-200">
                  Low
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="medium"
                  name="importance"
                  value="Medium"
                  onChange={(e) => setTag(e.target.value)}
                  checked={tag === "Medium"}
                  className="text-purple-600 focus:ring-purple-500 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
                <label htmlFor="medium" className="ml-2 text-gray-700 dark:text-gray-200">
                  Medium
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="high"
                  name="importance"
                  value="High"
                  onChange={(e) => setTag(e.target.value)}
                  checked={tag === "High"}
                  className="text-purple-600 focus:ring-purple-500 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
                <label htmlFor="high" className="ml-2 text-gray-700 dark:text-gray-200">
                  High
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-between space-x-5 mt-5">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-semibold px-4 w-[120px] py-2 rounded-lg cursor-pointer transition-colors duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white font-semibold w-[120px] px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200"
            >
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
