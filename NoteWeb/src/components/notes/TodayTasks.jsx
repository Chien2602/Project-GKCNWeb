"use client"

export default function TodayTasks({ notes }) {
  return (
    <div className="bg-white/90 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 backdrop-blur-lg p-4 w-full rounded-xl shadow-xl">
      <h1 className="font-bold text-lg text-gray-800 dark:text-gray-100">Tasks Due Today</h1>
      <div className="flex items-center space-x-2 mt-4">
        <div className="flex flex-col w-full">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="flex items-center space-x-2 mt-2">
                <div
                  className={`w-[2px] h-[20px] ${
                    note.tag === "Low"
                      ? "bg-green-500 dark:bg-green-300"
                      : note.tag === "Medium"
                      ? "bg-yellow-500 dark:bg-yellow-300"
                      : note.tag === "High"
                      ? "bg-red-500 dark:bg-red-400"
                      : "bg-gray-500 dark:bg-gray-400"
                  }`}
                />
                <h1 className="text-sm text-gray-700 dark:text-gray-300">{note.title}</h1>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">No notes for today.</p>
          )}
        </div>
      </div>
    </div>
  )
}
