"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Calendar({ selectedDate, onChangeMonth }) {
  return (
    <div className="bg-white/90 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 backdrop-blur-lg p-4 w-full rounded-xl shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => onChangeMonth(-1)}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h2 className="font-semibold text-gray-800 dark:text-gray-200">
          {selectedDate.toLocaleString("default", {
            month: "long",
          })}{" "}
          {selectedDate.getFullYear()}
        </h2>
        <button
          onClick={() => onChangeMonth(1)}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
        >
          <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {[...Array(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate()).keys()].map(
          (day) => (
            <div
              key={day}
              className={`p-2 text-center rounded ${
                day + 1 === selectedDate.getDate()
                  ? "bg-purple-600 dark:bg-purple-700 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              } cursor-pointer transition-colors duration-200`}
            >
              {day + 1}
            </div>
          )
        )}
      </div>
    </div>
  )
}
