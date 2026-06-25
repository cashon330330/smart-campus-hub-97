import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// 1. Supabase Initialization (Image Rule: How it works with Supabase)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ContactForm() {
    // Image Rule: "useState is the switch" (Modal State)
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Image Rule: "Keep modal open during loading" (Loading State)
    const [loading, setLoading] = useState<boolean>(false);

    // Form values hold karne ke liye state
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    // Image Rule: "Only the submit action talks to the backend"
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Loading starts, modal remains open

        const { error } = await supabase
            .from('contacts')
            .insert([formData]);

        setLoading(false); // Loading stops

        if (error) {
            alert('Error saving contact: ' + error.message);
        } else {
            // Image Rule: "Close on success" & clear input values
            alert('Contact saved successfully!');
            setFormData({ name: '', email: '', phone: '' });
            setIsOpen(false); // Switch turns OFF (Bulb goes dark)
        }
    };

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>

            {/* Trigger Button (Image Rule: One button = zero confusion) */}
            <button
                onClick={() => setIsOpen(true)}
                // Image Rule: "Use aria-expanded on the button so screen readers announce state"
                aria-expanded={isOpen}
                style={{
                    padding: '12px 24px', backgroundColor: '#0f172a', color: '#fff',
                    border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600',
                    transition: 'background-color 0.2s'
                }}
            >
                Contact Us
            </button>

            {/* Image Rule: "Conditional render is the bulb" */}
            {isOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    zIndex: 1000
                }}>

                    {/* Modal Container Box (Image Design & Animation Specs) */}
                    <div style={{
                        backgroundColor: '#fff', padding: '20px', borderRadius: '12px', width: '90%', maxWidth: '340px',
                        position: 'relative', boxShadow: '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.04)',
                        // Image Rule: "Scale from 0.96 -> 1, opacity 0 -> 1, 180ms ease-out"
                        animation: 'fadeInScalezix 180ms ease-out forwards'
                    }}>

                        {/* Close Button '✕' (Image Mockup Point number 2) */}
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: 'absolute', top: '16px', right: '16px', background: 'none',
                                border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b', fontWeight: 'bold'
                            }}
                        >
                            ✕
                        </button>

                        {/* Mockup Heading */}
                        <h3 style={{ margin: '0 0 6px 0', fontSize: '22px', fontWeight: '600', color: '#1e293b' }}>Contact us</h3>
                        <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#64748b' }}>We will get back to you soon.</p>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text" placeholder="Your Name" required
                                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{ width: '100%', padding: '10px 12px', marginBottom: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px' }}
                            />
                            <input
                                type="email" placeholder="Your Email" required
                                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{ width: '100%', padding: '10px 12px', marginBottom: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px' }}
                            />
                            <input
                                type="text" placeholder="Your Phone Number" required
                                value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                style={{ width: '100%', padding: '10px 12px', marginBottom: '24px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '14px' }}
                            />

                            {/* Big Green Submit Button (Image Mockup: Green SEND button) */}
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%', padding: '12px', backgroundColor: '#24b47e', color: 'white',
                                    border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px',
                                    cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '0.5px', boxShadow: '0 4px 6px -1px rgba(36,180,126,0.2)'
                                }}
                            >
                                {loading ? 'SENDING...' : 'SEND'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Embedded CSS Stylesheet for exact 180ms animation metrics */}
            <style>{`
        @keyframes fadeInScalezix {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
        </div>
    );
}
