"use client"

import { useState } from "react"
import {Lock, Eye, EyeOff, Save, X, Settings } from "lucide-react"
import api from "../../api/AxiosInstance"

function Header({ username }) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setError("")
    setSuccess("")
  }

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false)
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới không khớp")
      setIsLoading(false)
      return
    }

    if (newPassword.length < 8) {
      setError("Mật khẩu mới phải có ít nhất 8 ký tự")
      setIsLoading(false)
      return
    }

    try {
      // Replace with your actual API endpoint
      await api.put("/change-password/", {
        current_password: currentPassword,
        new_password: newPassword,
      })

      setSuccess("Đổi mật khẩu thành công!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")

      // Auto close after success
      setTimeout(() => {
        closePasswordModal()
      }, 2000)
    } catch (err) {
      console.error("Lỗi khi đổi mật khẩu:", err)
      setError(err.response?.data?.detail || "Mật khẩu hiện tại không đúng hoặc có lỗi xảy ra")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="bg-purple-600/20 p-2 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-purple-400"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm0 5h18M10 3v18"
            />
          </svg>
        </div>
        <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
          Notes
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={openPasswordModal}
          className="p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-colors duration-200"
          title="Đổi mật khẩu"
        >
          <Settings className="w-5 h-5 text-purple-400" />
        </button>

        <div className="flex items-center space-x-3 bg-gray-800/50 py-2 px-4 rounded-full">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-medium">
              {username ? username.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-200">{username || "User"}</span>
            <span className="text-xs text-gray-400">Online</span>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-gray-800 w-full max-w-md p-7 rounded-2xl shadow-2xl border border-gray-700/50 animate-fadeIn">
            <div className="flex items-center gap-3 mb-5 border-b border-gray-700/50 pb-4">
              <div className="bg-purple-600/20 p-2 rounded-lg">
                <Lock className="h-5 w-5 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-100">Đổi mật khẩu</h2>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-rose-500/20 border border-rose-500/30 rounded-lg text-rose-200 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-200 text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Mật khẩu hiện tại</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    className="w-full bg-gray-700/50 border border-gray-600/50 p-3 pl-4 pr-10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all duration-200"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Nhập mật khẩu hiện tại"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Mật khẩu mới</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="w-full bg-gray-700/50 border border-gray-600/50 p-3 pl-4 pr-10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all duration-200"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1 ml-1">Mật khẩu phải có ít nhất 8 ký tự</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Xác nhận mật khẩu mới</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full bg-gray-700/50 border border-gray-600/50 p-3 pl-4 pr-10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-transparent transition-all duration-200"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-700/50">
                <button
                  type="button"
                  className="bg-gray-700 hover:bg-gray-600 flex gap-2 justify-center items-center text-gray-200 px-4 py-2.5 rounded-lg transition-colors duration-200 font-medium"
                  onClick={closePasswordModal}
                  disabled={isLoading}
                >
                  <X className="w-4 h-4" />
                  <span>Hủy</span>
                </button>
                <button
                  type="submit"
                  className={`${
                    isLoading
                      ? "bg-purple-700/70"
                      : "bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500"
                  } flex justify-center items-center gap-2 text-white px-5 py-2.5 rounded-lg transition-all duration-200 shadow-lg shadow-purple-900/20 font-medium`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Lưu thay đổi</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
