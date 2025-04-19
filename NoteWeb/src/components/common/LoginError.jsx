import React from "react";
import { AlertOctagon } from "lucide-react";
import { motion } from "framer-motion";

const ErrorModal = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white p-6 rounded-2xl shadow-2xl w-90 text-center relative"
            >
                <motion.div
                    animate={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 0.5, repeat: 2, repeatType: "mirror" }}
                    className="flex justify-center mb-4"
                >
                    <AlertOctagon size={60} className="text-red-500 animate-bounce" />
                </motion.div>

                <h2 className="text-xl font-bold text-red-600 mb-2">Error Occurred</h2>

                <p className="text-gray-700">{message}</p>

                <button 
                    onClick={onClose} 
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300 transform hover:scale-105"
                >
                    Close
                </button>
            </motion.div>
        </div>
    );
};

export default ErrorModal;
