import { useState } from "react";
import { Link, useNavigate  } from "react-router"; // Import Link để điều hướng
import { Eye, EyeOff, User, Lock } from "lucide-react";
import LoginError from "../common/LoginError"; // Import component LoginError
import axios from "axios";

function Login() {
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // Lưu thông báo lỗi
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!username || !password) {
      setError("Please fill in all fields!");
      return;
    }
  
    try {
      setLoading(true);
  
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });
      console.log("Response:", response.data);
      const token = response.data.access;
      localStorage.setItem("token", token);
      localStorage.setItem("refresh", response.data.refresh);
  
      console.log("Login successful:", response.data);
      setError("");
      navigate("/note");
  
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password!");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] bg-white p-8 shadow-2xl rounded-3xl"
      >
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h1>

        {/* Username */}
        <div className="flex items-center mb-4 p-3 bg-gray-100 rounded-xl">
          <User size={24} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Username"
            className="w-full bg-transparent outline-none text-gray-700"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="flex items-center mb-6 p-3 bg-gray-100 rounded-xl">
          <Lock size={24} className="text-gray-500 mr-2" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-transparent outline-none text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <Eye
              size={24}
              className="text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeOff
              size={24}
              className="text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition duration-300"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Chuyển sang trang đăng ký */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Create one
          </Link>
        </p>
      </form>
      {error && <LoginError message={error} onClose={() => setError("")} />}
    </div>
  );
}

export default Login;
