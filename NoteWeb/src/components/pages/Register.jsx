import { useState } from "react";
import { Link } from "react-router"; // Sửa lỗi import
import { Eye, EyeOff, User, Lock, Mail } from "lucide-react";
import api from "../../api/AxiosInstance";

function Register() {
    const [userData, setUserData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.password !== userData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        else {
            try {
                await api.post("register/",
                    userData
                );
            } catch(err){
                console.log(err);
            }
        }
        console.log("User Data:", userData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
            <form 
                onSubmit={handleSubmit} 
                className="w-[400px] bg-white p-8 shadow-2xl rounded-3xl"
            >
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Register</h1>

                {/* Username */}
                <div className="flex items-center mb-4 p-3 bg-gray-100 rounded-xl">
                    <User size={24} className="text-gray-500 mr-2" />
                    <input 
                        type="text" 
                        name="username"
                        placeholder="Username" 
                        className="w-full bg-transparent outline-none text-gray-700"
                        value={userData.username}
                        onChange={handleChange}
                    />
                </div>

                {/* Email */}
                <div className="flex items-center mb-4 p-3 bg-gray-100 rounded-xl">
                    <Mail size={24} className="text-gray-500 mr-2" />
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        className="w-full bg-transparent outline-none text-gray-700"
                        value={userData.email}
                        onChange={handleChange}
                    />
                </div>

                {/* Password */}
                <div className="flex items-center mb-4 p-3 bg-gray-100 rounded-xl">
                    <Lock size={24} className="text-gray-500 mr-2" />
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="password"
                        placeholder="Password" 
                        className="w-full bg-transparent outline-none text-gray-700"
                        value={userData.password}
                        onChange={handleChange}
                    />
                    {showPassword ? (
                        <Eye size={24} className="text-gray-500 cursor-pointer" onClick={() => setShowPassword(false)} />
                    ) : (
                        <EyeOff size={24} className="text-gray-500 cursor-pointer" onClick={() => setShowPassword(true)} />
                    )}
                </div>

                {/* Confirm Password */}
                <div className="flex items-center mb-6 p-3 bg-gray-100 rounded-xl">
                    <Lock size={24} className="text-gray-500 mr-2" />
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="confirmPassword"
                        placeholder="Confirm Password" 
                        className="w-full bg-transparent outline-none text-gray-700"
                        value={userData.confirmPassword}
                        onChange={handleChange}
                    />
                    {showConfirmPassword ? (
                        <Eye size={24} className="text-gray-500 cursor-pointer" onClick={() => setShowConfirmPassword(false)} />
                    ) : (
                        <EyeOff size={24} className="text-gray-500 cursor-pointer" onClick={() => setShowConfirmPassword(true)} />
                    )}
                </div>

                {/* Button */}
                <button 
                    type="submit" 
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition duration-300"
                >
                    Register
                </button>

                {/* Chuyển về trang Login */}
                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
                        Login here
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Register;
