import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../partials/Header";
import ModalViewNote from "../common/ModalViewNote";
import { Pencil, Trash2, Save, X } from "lucide-react";

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
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token không tồn tại trong localStorage");
          return;
        }

        const response = await axios.get(
          "http://127.0.0.1:8000/api/user-info/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setUser(response.data.id);
        setUserName(response.data.username);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://127.0.0.1:8000/api/notes/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNoteData(response.data);
        console.log("Dữ liệu ghi chú:", response.data);
      } catch (err) {
        console.error("Lỗi khi lấy ghi chú:", err);
        console.log("Chi tiết lỗi từ server:", err.response?.data);
      }
    };

    fetchNotes();
  }, []);

  const handleSubmitAddNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/notes/create/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Ghi chú đã được thêm!");
      setNoteData((prevNotes) => [...prevNotes, response.data.note]);
    } catch (err) {
      console.error("Lỗi khi thêm ghi chú:", err);
      console.log("Chi tiết lỗi từ server:", err.response?.data);
    }
  };
  return (
    <div className="p-10 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')]">
      {/* HEADER */}
      <Header username={userName} />

      {/* END HEADER */}

      {/* MAIN */}
      <div className="py-10">
        <div>
          <div className="flex flex-col py-6  min-h-screen">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold">
                {selectedDate.toLocaleString("default", { month: "long" })}{" "}
                {selectedDate.getFullYear()}
              </h1>
              <button
                onClick={openModal}
                className="bg-blue-600 text-white px-4 py-2 rounded flex space-x-1 justify-center items-center cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                    stroke-width="1.5"
                    d="M6 12h12m-6 6V6"
                  />
                </svg>
                <h1 className="text-sm font-semibold">Add Event</h1>
              </button>
            </div>

            {isModalOpen && (
              <div className="fixed inset-0 bg-white/20 border-white/20 backdrop-blur-lg flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-xl w-96 shadow-2xl backdrop-blur-lg">
                  <h2 className="text-2xl font-bold mb-4">Add Note</h2>
                  <form onSubmit={handleSubmitAddNote}>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 outline-none rounded focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-300"
                        value={title}
                        placeholder="Enter note title"
                        onChange={(e) => setNoteTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">
                        Content
                      </label>
                      <textarea
                        className="w-full h-[70px] p-2 border border-gray-300 outline-none rounded focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-300"
                        rows="4"
                        value={content}
                        placeholder="Enter note content"
                        onChange={(e) => setNoteContent(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">
                        Date
                      </label>
                      <input
                        type="date"
                        className="w-full p-2 border border-gray-300 outline-none rounded focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-300"
                        value={date}
                        onChange={(e) => setNoteDate(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">
                        Time Start
                      </label>
                      <input
                        type="time"
                        className="w-full p-2 border border-gray-300 outline-none rounded focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-300"
                        value={time_start}
                        onChange={(e) => setNoteTimeStart(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">
                        Time End
                      </label>
                      <input
                        type="time"
                        className="w-full p-2 border border-gray-300 outline-none rounded focus:outline-none focus:border-none focus:ring-2 focus:ring-blue-300"
                        value={time_end}
                        onChange={(e) => setNoteTimeEnd(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">
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
                          />
                          <label htmlFor="low" className="ml-2">
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
                          />
                          <label htmlFor="medium" className="ml-2">
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
                          />
                          <label htmlFor="high" className="ml-2">
                            High
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between space-x-5 mt-5">
                      <button
                        type="button"
                        className="bg-[#DE3163] text-white font-semibold px-4 w-[120px] py-2 rounded-lg cursor-pointer hover:bg-[#E50046]"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#2DAA9E] text-white font-semibold w-[120px] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#3D8D7A]"
                      >
                        Save Note
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="flex">
              <div className="w-1/4 h-[300px] flex flex-col space-y-4">
                <div className=" bg-white/20 border-white/20 backdrop-blur-lg p-4 w-full rounded-xl shadow-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <button
                      onClick={() => changeMonth(-1)}
                      className="px-2 py-1 rounded cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fill-rule="evenodd">
                          <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                          <path
                            fill="currentColor"
                            d="M7.94 13.06a1.5 1.5 0 0 1 0-2.12l5.656-5.658a1.5 1.5 0 1 1 2.121 2.122L11.122 12l4.596 4.596a1.5 1.5 0 1 1-2.12 2.122l-5.66-5.658Z"
                          />
                        </g>
                      </svg>
                    </button>
                    <h2 className="font-semibold">
                      {selectedDate.toLocaleString("default", {
                        month: "long",
                      })}{" "}
                      {selectedDate.getFullYear()}
                    </h2>
                    <button
                      onClick={() => changeMonth(1)}
                      className="px-2 py-1 rounded cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none" fill-rule="evenodd">
                          <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                          <path
                            fill="currentColor"
                            d="M16.06 10.94a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 1 1-2.121-2.122L12.879 12L8.283 7.404a1.5 1.5 0 0 1 2.12-2.122l5.658 5.657Z"
                          />
                        </g>
                      </svg>
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
                            ? "bg-blue-500 text-white"
                            : "bg-transparent"
                        }`}
                      >
                        {day + 1}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/20 border-white/20 backdrop-blur-lg p-4 w-full rounded-xl shadow-2xl">
                  <h1 className="font-bold text-lg text-white">
                    Tasks Due Today
                  </h1>
                  <div className="flex items-center space-x-2 mt-4">
                    <div className="w-[2px] h-[20px] bg-red-500"></div>
                    <h1 className="text-sm text-white">
                      Meeting with Alpha Team
                    </h1>
                  </div>
                </div>
              </div>

              <div className="w-3/4 bg-white/20 border-white/20 backdrop-blur-lg ml-4 p-4 rounded-xl shadow-2xl">
                <div className="grid grid-cols-7 gap-1 mt-4">
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
                        className="p-2 bg-transparent h-[100px] border border-gray-300 rounded shadow-xl flex flex-col"
                      >
                        <div
                          className="flex-1 overflow-y-auto space-y-1 pr-1
            [&::-webkit-scrollbar-thumb]:bg-[#80CBC4]
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar]:w-[5px]
            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                        >
                          {dayNotes.map((note, idx) => (
                            <div
                              key={idx}
                              onClick={() => setSelectedNote(note)}
                              className={`cursor-pointer text-white px-2 py-1 rounded text-xs max-w-full whitespace-nowrap overflow-hidden text-ellipsis
                  ${
                    note.tag === "Low"
                      ? "bg-green-500"
                      : note.tag === "Medium"
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }
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
                    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl">
                        <h2 className="text-lg font-semibold mb-3">
                          ✏️ Chỉnh sửa ghi chú
                        </h2>

                        <input
                          type="text"
                          className="w-full border p-2 rounded mt-2"
                          value={editNote.title}
                          onChange={(e) =>
                            setEditNote({ ...editNote, title: e.target.value })
                          }
                          placeholder="Tiêu đề ghi chú"
                        />

                        <textarea
                          className="w-full border p-2 rounded mt-2"
                          value={editNote.content}
                          onChange={(e) =>
                            setEditNote({
                              ...editNote,
                              content: e.target.value,
                            })
                          }
                          placeholder="Nội dung chi tiết"
                        ></textarea>

                        <div className="flex justify-end gap-2 mt-4">
                          <button
                            className="bg-green-500 flex justify-center items-center gap-2 hover:bg-green-600 text-white px-4 py-2 rounded"
                            onClick={() => {
                              const updatedNotes = noteData.map((note) =>
                                note.id === editNote.id ? editNote : note
                              );
                              setNoteData(updatedNotes);
                              setIsEditing(false);
                              setSelectedNote(editNote);
                            }}
                          >
                            <Save className="w-4 h-4 text-white" />
                            <span className="text-sm font-medium">Lưu</span>
                          </button>
                          <button
                            className="bg-gray-400 flex gap-2 justify-center items-center hover:bg-gray-500 text-white px-4 py-2 rounded"
                            onClick={() => setIsEditing(false)}
                          >
                            <X className="w-4 h-4 text-white" />
                            <span className="text-sm font-medium">Exit</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <ModalViewNote
                      note={selectedNote}
                      onClose={() => setSelectedNote(null)}
                      onEdit={handleEdit}
                      // onDelete={handleDelete}
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
