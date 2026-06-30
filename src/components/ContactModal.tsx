import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client"; // Purani line hata kar ise yahan paste karein
interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [isRendered, setIsRendered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Smooth 200ms Animation Logic (Page 7)
    useEffect(() => {
        if (isOpen) {
            setIsRendered(true);
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => setIsRendered(false), 200);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isRendered) return null;

    // Form Submit Handler (Page 9 & 10)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setToast(null);

        try {
            const { error } = await (supabase as any).from("contacts").insert([formData] as any);

            if (error) {
                // Handling duplicate error 23505 (Page 10)
                if (error.code === "23505") {
                    setToast({ message: "You have already submitted this form!", type: "error" });
                } else {
                    setToast({ message: "Something went wrong. Please try again.", type: "error" });
                }
                console.error("Database Error:", error.message);
            } else {
                setToast({ message: "Thank you! Message sent successfully.", type: "success" });
                setFormData({ name: "", email: "", message: "" });

                // Auto-Close after 2.5 seconds (Page 11)
                startAutoCloseTimer();
            }
        } catch (err) {
            console.error("System Error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Auto-close with Hover Pause management
    const startAutoCloseTimer = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            onClose();
            setToast(null);
        }, 2500);
    };

    const handleMouseEnter = () => {
        if (timerRef.current && toast?.type === "success") {
            clearTimeout(timerRef.current); // Pause closing on hover
        }
    };

    const handleMouseLeave = () => {
        if (toast?.type === "success") {
            startAutoCloseTimer(); // Resume closing when mouse leaves
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${isAnimating ? "opacity-100" : "opacity-0"}`}
            aria-busy={loading ? "true" : "false"}
        >
            {/* Toast Notification Container */}
            {toast && (
                <div
                    role={toast.type === "error" ? "alert" : "status"}
                    className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white font-medium z-[60] transition-all duration-300 ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
                >
                    {toast.message}
                </div>
            )}

            {/* Modal Content Box */}
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`w-full max-w-md mx-4 p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 transform transition-all duration-200 ${isAnimating ? "scale-100" : "scale-95"}`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Contact Us</h2>
                    <button
                        onClick={onClose}
                        className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-lg"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-2.5 border rounded-lg bg-transparent border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-2.5 border rounded-lg bg-transparent border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Message</label>
                        <textarea
                            rows={4}
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full p-2.5 border rounded-lg bg-transparent border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Sending...
                            </>
                        ) : "Send Message"}
                    </button>
                </form>
            </div>
        </div>
    );
}
