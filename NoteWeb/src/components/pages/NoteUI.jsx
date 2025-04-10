import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import ModalViewNote from "../common/ModalViewNote";
import api from "../../api/AxiosInstance";
import { Save, X, Plus, ChevronLeft, ChevronRight } from "lucide-react";

function NoteUI() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setNoteTitle] = useState("");
  const [content, setNoteContent] = useState("");
  const [date, setNoteDate] = useState(new Date().toISOString().split("T")[0]);
  const [time_start, setNoteTimeStart] = useState("");
  const [time_end, setNoteTimeEnd] = useState("");
  const [tag, setTag] = useState("Low");
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState(null);

  const formData = {
    title: title,
    content: content,
    day: date,
    time_start: time_start,
    time_end: time_end,
    tag: tag,
    user: user,
  };
  const [noteData, setNoteData] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const [noteToday, setNoteToDay] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const changeMonth = (offset) => {
    setSelectedDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1)
    );
  };
  const handleEdit = (note) => {
    setIsEditing(true);
    setEditNote({ ...note });
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get("/user-info/");
        console.log(response.data);
        setUser(response.data.id);
        setUserName(response.data.username);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
        }
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes/");
        setNoteData(response.data);
        console.log("Dữ liệu ghi chú:", response.data);
        setNoteToDay(response.data.filter((note) => note.day === today));
      } catch (err) {
        console.error("Lỗi khi lấy ghi chú:", err);
        console.log("Chi tiết lỗi từ server:", err.response?.data);

        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
        }
      }
    };
    fetchNotes();
  }, []);

  const handleSubmitAddNote = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/notes/create/", formData);

      alert("Ghi chú đã được thêm!");
      setNoteData((prevNotes) => [...prevNotes, response.data.note]);
      if (response.data.note.day === today) {
        setNoteToDay((prevNotes) => [...prevNotes, response.data.note]);
      }
      // Reset form
      setNoteTitle("");
      setNoteContent("");
      setNoteDate(new Date().toISOString().split("T")[0]);
      setNoteTimeStart("");
      setNoteTimeEnd("");
      setTag("Low");

      closeModal();
    } catch (err) {
      console.error("Lỗi khi thêm ghi chú:", err);
      console.log("Chi tiết lỗi từ server:", err.response?.data);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await api.delete(`/notes/delete/${noteId}/`);
      setNoteData((prevNotes) =>
        prevNotes.filter((note) => note.id !== noteId)
      );
      setNoteToDay((prevNotes) =>
        prevNotes.filter((note) => note.id !== noteId)
      );

      alert("Đã xoá ghi chú!");
    } catch (err) {
      console.error("Lỗi khi xoá ghi chú:", err);
      console.log("Chi tiết lỗi từ server:", err.response?.data);
    }
  };

  const handleUpdateNote = async (noteId) => {
    try {
      const response = await api.patch(`/notes/update/${noteId}/`, editNote);

      alert("Ghi chú đã được cập nhật!");

      setNoteData((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? response.data.note : note
        )
      );
      setNoteToDay((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? response.data.note : note
        )
      );
      setIsEditing(false);
      setEditNote(null);
    } catch (error) {
      console.error("Lỗi khi cập nhật ghi chú:", error);
      console.log("Chi tiết lỗi:", error.response?.data);
    }
  };

  return (
    <div className="p-10 bg-gray-900 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')] bg-blend-overlay bg-opacity-90 min-h-screen text-gray-200">
      {/* HEADER */}
      <Header username={userName} />

      {/* END HEADER */}

      {/* MAIN */}
      <div className="py-10">
        <div>
          <div className="flex flex-col py-6 min-h-screen">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold text-gray-100">
                {selectedDate.toLocaleString("default", { month: "long" })}{" "}
                {selectedDate.getFullYear()}
              </h1>
              <button
                onClick={openModal}
                className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg flex space-x-1 justify-center items-center cursor-pointer transition-colors duration-200"
              >
                <Plus className="w-5 h-5" />
                <h1 className="text-sm font-semibold">Add Note</h1>
              </button>
            </div>

            {isModalOpen && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">
                <div className="bg-gray-800 p-6 rounded-xl w-96 shadow-2xl border border-gray-700">
                  <h2 className="text-2xl font-bold mb-4 text-gray-100">
                    Add Note
                  </h2>
                  <form onSubmit={handleSubmitAddNote}>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2 text-gray-200">
                        Title
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 bg-gray-700 border border-gray-600 outline-none rounded focus:outline-none focus:border-none focus:ring-2 focus:ring-purple-500 text-white"
                        value={title}
                        placeholder="Enter note title"
                        onChange={(e) => setNoteTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2 text-gray-200">
                        Content
                      </label>
                      <textarea
                        className="w-full h-[70px] p-2 bg-gray-700 border border-gray-600 outline-none rounded focus:outline-none focus:border-none focus:ring-2 focus:ring-purple-500 text-white"
                        rows="4"
                        value={content}
                        placeholder="Enter note content"
                        onChange={(e) => setNoteContent(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2 text-gray-200">
                        Date
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 bg-gray-700 border border-gray-600 outline-none rounded focus:outline-none focus:border-none focus:ring-2 focus:ring-purple-500 text-white"
                        value={date}
                        onChange={(e) => setNoteDate(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2 text-gray-200">
                        Time Start
                      </label>
                      <input
                        type="time"
                        className="w-full p-2 bg-gray-700 border border-gray-600 outline-none rounded focus:outline-none focus:border-none focus:ring-2 focus:ring-purple-500 text-white"
                        value={time_start}
                        onChange={(e) => setNoteTimeStart(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2 text-gray-200">
                        Time End
                      </label>
                      <input
                        type="time"
                        className="w-full p-2 bg-gray-700 border border-gray-600 outline-none rounded focus:outline-none focus:border-none focus:ring-2 focus:ring-purple-500 text-white"
                        value={time_end}
                        onChange={(e) => setNoteTimeEnd(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2 text-gray-200">
                        Importance
                      </label>
                      <div className="flex space-x-4 justify-between">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="low"
                            name="importance"
                            value="Low"
                            onChange={(e) => setTag(e.target.value)}
                            checked={tag === "Low"}
                            className="text-purple-600 focus:ring-purple-500 bg-gray-700 border-gray-600"
                          />
                          <label htmlFor="low" className="ml-2 text-gray-200">
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
                            className="text-purple-600 focus:ring-purple-500 bg-gray-700 border-gray-600"
                          />
                          <label
                            htmlFor="medium"
                            className="ml-2 text-gray-200"
                          >
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
                            className="text-purple-600 focus:ring-purple-500 bg-gray-700 border-gray-600"
                          />
                          <label htmlFor="high" className="ml-2 text-gray-200">
                            High
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between space-x-5 mt-5">
                      <button
                        type="button"
                        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-4 w-[120px] py-2 rounded-lg cursor-pointer transition-colors duration-200"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-purple-700 hover:bg-purple-800 text-white font-semibold w-[120px] px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200"
                      >
                        Save Note
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/4 flex flex-col space-y-4">
                <div className="bg-gray-800/80 border border-gray-700 backdrop-blur-lg p-4 w-full rounded-xl shadow-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <button
                      onClick={() => changeMonth(-1)}
                      className="p-1 rounded-full hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-300" />
                    </button>
                    <h2 className="font-semibold text-gray-200">
                      {selectedDate.toLocaleString("default", {
                        month: "long",
                      })}{" "}
                      {selectedDate.getFullYear()}
                    </h2>
                    <button
                      onClick={() => changeMonth(1)}
                      className="p-1 rounded-full hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-300" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {[
                      ...Array(
                        new Date(
                          selectedDate.getFullYear(),
                          selectedDate.getMonth() + 1,
                          0
                        ).getDate()
                      ).keys(),
                    ].map((day) => (
                      <div
                        key={day}
                        className={`p-2 text-center rounded ${
                          day + 1 === selectedDate.getDate()
                            ? "bg-purple-700 text-white"
                            : "hover:bg-gray-700 text-gray-300"
                        } cursor-pointer transition-colors duration-200`}
                      >
                        {day + 1}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-800/80 border border-gray-700 backdrop-blur-lg p-4 w-full rounded-xl shadow-2xl">
                  <h1 className="font-bold text-lg text-gray-100">
                    Tasks Due Today
                  </h1>
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="flex flex-col">
                      {noteToday.length > 0 ? (
                        noteToday.map((note) => (
                          <div
                            key={note.id}
                            className="flex items-center space-x-2 mt-2"
                          >
                            <div
                              className={`w-[2px] h-[20px] ${
                                note.tag === "Low"
                                  ? "bg-green-300"
                                  : note.tag === "Medium"
                                  ? "bg-yellow-300"
                                  : note.tag === "High"
                                  ? "bg-red-400"
                                  : "bg-gray-400"
                              }`}
                            ></div>
                            <h1 className="text-sm text-gray-300">
                              {note.title}
                            </h1>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-400 mt-4">
                          No notes for today.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-3/4 bg-gray-800/80 border border-gray-700 backdrop-blur-lg p-4 rounded-xl shadow-2xl">
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

                    const dayNotes = noteData.filter((note) => {
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
                        className="p-2 bg-gray-700/50 h-[100px] border border-gray-600 rounded shadow-xl flex flex-col"
                      >
                        <div className="text-xs text-gray-400 mb-1">
                          {day + 1}
                        </div>
                        <div
                          className="flex-1 overflow-y-auto space-y-1 pr-1
                          [&::-webkit-scrollbar-thumb]:bg-gray-600
                          [&::-webkit-scrollbar-thumb]:rounded-full
                          [&::-webkit-scrollbar]:w-[5px]
                          [&::-webkit-scrollbar-track]:bg-gray-800"
                        >
                          {dayNotes.map((note, idx) => (
                            <div
                              key={idx}
                              onClick={() => setSelectedNote(note)}
                              className={`cursor-pointer text-white px-2 py-1 rounded text-xs max-w-full whitespace-nowrap overflow-hidden text-ellipsis
                              ${
                                note.tag === "Low"
                                  ? "bg-emerald-600 hover:bg-emerald-700"
                                  : note.tag === "Medium"
                                  ? "bg-amber-600 hover:bg-amber-700"
                                  : "bg-rose-600 hover:bg-rose-700"
                              } transition-colors duration-200
                            `}
                            >
                              <div>{note.title}</div>
                              <div>
                                {note.time_start.slice(0, 5)} -{" "}
                                {note.time_end.slice(0, 5)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Modal xem chi tiết */}
                {selectedNote &&
                  (isEditing ? (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50">
                      <div className="bg-gray-800 w-full max-w-md p-7 rounded-2xl shadow-2xl border border-gray-700/50 animate-fadeIn">
                        <div className="flex items-center gap-3 mb-5 border-b border-gray-700/50 pb-4">
                          <div className="bg-purple-600/20 p-2 rounded-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-purple-400"
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
                          <h2 className="text-xl font-semibold text-gray-100">
                            Edit notes
                          </h2>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
                              Title
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                className="w-full bg-gray-700/50 border border-gray-600/50 p-3 pl-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all duration-200"
                                value={editNote.title}
                                onChange={(e) =>
                                  setEditNote({
                                    ...editNote,
                                    title: e.target.value,
                                  })
                                }
                                placeholder="Nhập tiêu đề ghi chú"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
                              Content
                            </label>
                            <div className="relative">
                              <textarea
                                className="w-full bg-gray-700/50 border border-gray-600/50 p-3 pl-4 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all duration-200 min-h-[120px] resize-none"
                                value={editNote.content}
                                onChange={(e) =>
                                  setEditNote({
                                    ...editNote,
                                    content: e.target.value,
                                  })
                                }
                                placeholder="Enter detailed content"
                              ></textarea>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-700/50">
                          <button
                            className="bg-gray-700 hover:bg-gray-600 flex gap-2 justify-center items-center text-gray-200 px-4 py-2.5 rounded-lg transition-colors duration-200 font-medium"
                            onClick={() => setIsEditing(false)}
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                          <button
                            className="bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 flex justify-center items-center gap-2 text-white px-5 py-2.5 rounded-lg transition-all duration-200 shadow-lg shadow-purple-900/20 font-medium"
                            onClick={() => handleUpdateNote(editNote.id)}
                          >
                            <Save className="w-4 h-4" />
                            <span>Save</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <ModalViewNote
                      note={selectedNote}
                      onClose={() => setSelectedNote(null)}
                      onEdit={handleEdit}
                      onDelete={handleDeleteNote}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END MAIN */}
    </div>
  );
}

export default NoteUI;
