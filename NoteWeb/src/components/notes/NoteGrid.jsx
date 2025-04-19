"use client";

export default function NoteGrid({ selectedDate, notes, onSelectNote }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2 mt-4">
      {[
        ...Array(
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth() + 1,
            0
          ).getDate()
        ).keys(),
      ].map((day) => {
        const currentDate = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          day + 1
        );

        const dayNotes = notes.filter((note) => {
          const noteDate = new Date(note.day);
          return (
            noteDate.getDate() === currentDate.getDate() &&
            noteDate.getMonth() === currentDate.getMonth() &&
            noteDate.getFullYear() === currentDate.getFullYear()
          );
        });

        return (
          <div
            key={day}
            className="p-2 bg-gray-100/80 dark:bg-gray-700/50 h-[100px] border border-gray-200 dark:border-gray-600 rounded shadow-lg flex flex-col"
          >
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {day + 1}
            </div>
            <div
              className="flex-1 overflow-y-auto space-y-1 pr-1
              [&::-webkit-scrollbar-thumb]:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar]:w-[5px]
              [&::-webkit-scrollbar-track]:bg-gray-200 dark:[&::-webkit-scrollbar-track]:bg-gray-800"
            >
              {dayNotes.map((note, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectNote(note)}
                  className={`cursor-pointer text-white px-2 py-1 rounded text-xs max-w-full whitespace-nowrap overflow-hidden text-ellipsis
                  ${
                    note.tag === "Low"
                      ? "bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                      : note.tag === "Medium"
                      ? "bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700"
                      : "bg-rose-500 hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700"
                  } transition-colors duration-200
                `}
                >
                  <div>{note.title}</div>
                  <div>
                    {note.time_start.slice(0, 5)} - {note.time_end.slice(0, 5)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
