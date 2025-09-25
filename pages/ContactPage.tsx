
import React, { useState, useEffect } from 'react';
// FIX: Replaced react-router-dom import to fix module resolution errors.
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MessageSquare } from 'lucide-react';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const ContactPage: React.FC = () => {
    const query = useQuery();
    const productName = query.get('product');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState({ submitted: false, message: '' });

    useEffect(() => {
        if (productName) {
            setFormData(prev => ({ ...prev, message: `Hola, estoy interesado en obtener más información sobre el producto: ${productName}.` }));
        }
    }, [productName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        console.log('Form data submitted:', formData);
        setFormStatus({ submitted: true, message: 'Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.' });
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <div className="container mx-auto px-6 py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">Contacto</h1>
                <p className="mt-4 text-lg text-gray-300">
                    ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Contáctanos a través del formulario o por nuestros canales directos.
                </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-black/20 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold text-white mb-6">Envíanos un Mensaje</h2>
                    {formStatus.submitted ? (
                        <div className="text-center p-8 bg-green-900/50 border border-green-500 rounded-lg">
                            <p className="text-lg font-semibold text-green-300">{formStatus.message}</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nombre Completo</label>
                                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full bg-[#1a2647] border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-[#31E0E0] focus:border-[#31E0E0] transition" />
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Correo Electrónico</label>
                                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full bg-[#1a2647] border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-[#31E0E0] focus:border-[#31E0E0] transition" />
                            </div>
                             <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Teléfono (Opcional)</label>
                                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="w-full bg-[#1a2647] border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-[#31E0E0] focus:border-[#31E0E0] transition" />
                            </div>
                             <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Mensaje</label>
                                <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleChange} className="w-full bg-[#1a2647] border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-[#31E0E0] focus:border-[#31E0E0] transition"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full px-8 py-3 text-sm font-bold uppercase tracking-wider rounded-md transition-all duration-300 ease-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 bg-gradient-to-r from-[#31E0E0] to-[#25a2a2] text-[#0F1B3A] shadow-lg shadow-[#31E0E0]/20 hover:shadow-xl hover:shadow-[#31E0E0]/30 focus:ring-[#31E0E0]/50">
                                    Enviar Mensaje
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Canales Directos</h2>
                    <div className="flex items-start gap-4">
                        <div className="bg-[#31E0E0]/10 p-3 rounded-md text-[#31E0E0]">
                           <Mail size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Correo Electrónico</h3>
                            <p className="text-gray-400">Nuestro equipo responderá en menos de 24 horas.</p>
                            <a href="mailto:info@mastermedical.com" className="text-[#31E0E0] hover:underline">info@mastermedical.com</a>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-[#31E0E0]/10 p-3 rounded-md text-[#31E0E0]">
                           <Phone size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">Teléfono</h3>
                            <p className="text-gray-400">Para consultas urgentes, de Lunes a Viernes, 9am - 5pm.</p>
                            <a href="tel:+1234567890" className="text-[#31E0E0] hover:underline">+1 (234) 567-890</a>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-[#FF4DA3]/10 p-3 rounded-md text-[#FF4DA3]">
                           <MessageSquare size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">WhatsApp / Telegram</h3>
                            <p className="text-gray-400">Atención rápida y directa para tus dudas.</p>
                            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-[#FF4DA3] hover:underline">Iniciar chat</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;