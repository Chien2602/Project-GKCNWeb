import React from "react";
import { Routes, Route } from "react-router";
import NoteUI from "./components/pages/NoteUI";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ProtectedRoute from "./middleware/ProtectedRoute";

export default function App() {
  return (
    <div
      className="overflow-y-auto h-screen [&::-webkit-scrollbar-thumb]:bg-gray-600
                          [&::-webkit-scrollbar-thumb]:rounded-full
                          [&::-webkit-scrollbar]:w-2
                          [&::-webkit-scrollbar-track]:bg-gray-800"
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/note"
          element={
            <ProtectedRoute>
              <NoteUI />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
