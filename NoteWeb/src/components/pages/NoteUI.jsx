"use client";

import { useState, useEffect } from "react";
import HeaderWithTheme from "../partials/Header";
import Calendar from "../Calendar";
import NoteGrid from "../notes/NoteGrid";
import ModalAddNote from "../common/ModalAddNote";
import ModalViewNote from "../common/ModalViewNote";
import ModalEditNote from "../common/ModalEditNote";
import NotificationAlert from "../common/NotificationAlert";
import TodayTasks from "../notes/TodayTasks";
import api from "../../api/AxiosInstance";
import { Plus } from "lucide-react";

export default function NoteUI() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("delete");

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
        setNoteToDay(response.data.filter((note) => note.day === today));
      } catch (err) {
        console.error("Lỗi khi lấy ghi chú:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
        }
      }
    };
    fetchNotes();
  }, []);

  const handleAddNote = async (noteData) => {
    try {
      const response = await api.post("/notes/create/", noteData);
      setNoteData((prevNotes) => [...prevNotes, response.data.note]);
      if (response.data.note.day === today) {
        setNoteToDay((prevNotes) => [...prevNotes, response.data.note]);
      }
      closeModal();
      setAlertType("create");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      console.error("Lỗi khi thêm ghi chú:", err);
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
      setSelectedNote(null);
      setAlertType("delete");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      console.error("Lỗi khi xoá ghi chú:", err);
    }
  };

  const handleUpdateNote = async (noteId) => {
    try {
      if (!editNote) return;
      const response = await api.patch(`/notes/update/${noteId}/`, editNote);
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
      setAlertType("update");
      setUpdateAlert(true);
      setTimeout(() => setUpdateAlert(false), 3000);
    } catch (error) {
      console.error("Lỗi khi cập nhật ghi chú:", error);
    }
  };

  return (
    <div className="p-10 bg-gray-100 dark:bg-gray-900 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop')] bg-blend-overlay bg-opacity-10 dark:bg-opacity-90 min-h-screen text-gray-800 dark:text-gray-200 transition-colors duration-300">
      {showAlert && (
        <NotificationAlert
          type={
            alertType === "update" || alertType === "create"
              ? "success"
              : alertType === "delete"
              ? "warning"
              : "info"
          }
          title={
            alertType === "update"
              ? "Note Updated!"
              : alertType === "create"
              ? "Note Added!"
              : alertType === "delete"
              ? "Note Deleted!"
              : "Notification"
          }
          message={
            alertType === "update"
              ? "The note has been successfully updated."
              : alertType === "create"
              ? "The note has been successfully added."
              : alertType === "delete"
              ? "The note has been successfully deleted."
              : "Action completed successfully."
          }
        />
      )}

      <HeaderWithTheme username={userName} />

      <div className="py-10">
        <div>
          <div className="flex flex-col py-6 min-h-screen">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {selectedDate.toLocaleString("default", { month: "long" })}{" "}
                {selectedDate.getFullYear()}
              </h1>
              <button
                onClick={openModal}
                className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white px-4 py-2 rounded-lg flex space-x-1 justify-center items-center cursor-pointer transition-colors duration-200"
              >
                <Plus className="w-5 h-5" />
                <h1 className="text-sm font-semibold">Add Note</h1>
              </button>
            </div>

            {isModalOpen && (
              <ModalAddNote
                onClose={closeModal}
                onSubmit={handleAddNote}
                userId={user}
              />
            )}

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/4 flex flex-col space-y-4">
                <Calendar
                  selectedDate={selectedDate}
                  onChangeMonth={changeMonth}
                />
                <TodayTasks notes={noteToday} />
              </div>

              <div className="w-full md:w-3/4 bg-white/90 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 backdrop-blur-lg p-4 rounded-xl shadow-xl">
                <NoteGrid
                  selectedDate={selectedDate}
                  notes={noteData}
                  onSelectNote={setSelectedNote}
                />

                {selectedNote && !isEditing && (
                  <ModalViewNote
                    note={selectedNote}
                    onClose={() => setSelectedNote(null)}
                    onEdit={handleEdit}
                    onDelete={handleDeleteNote}
                  />
                )}

                {isEditing && editNote && (
                  <ModalEditNote
                    note={editNote}
                    onClose={() => setIsEditing(false)}
                    onUpdate={(updatedNote) => {
                      setEditNote(updatedNote);
                      handleUpdateNote(updatedNote.id);
                    }}
                    onChange={setEditNote}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
