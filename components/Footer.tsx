
import React from 'react';
// FIX: Replaced react-router-dom import to fix module resolution errors.
import { NavLink } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black/20 border-t border-white/10 mt-16">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-lg font-semibold text-white uppercase tracking-wider">Master Medical</h3>
                        <p className="mt-2 text-sm text-gray-400">Calidad y confianza en suplementos.</p>
                        <div className="flex justify-center md:justify-start space-x-4 mt-4">
                            <a href="#" className="text-gray-400 hover:text-[#31E0E0] transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-[#31E0E0] transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-[#31E0E0] transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-md font-semibold text-white uppercase tracking-wider">Navegación</h3>
                        <nav className="mt-4 flex flex-col space-y-2">
                            <NavLink to="/catalog" className="text-gray-400 hover:text-white transition-colors">Catálogo</NavLink>
                            <NavLink to="/about" className="text-gray-400 hover:text-white transition-colors">Acerca de</NavLink>
                            <NavLink to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</NavLink>
                            <NavLink to="/contact" className="text-gray-400 hover:text-white transition-colors">Contacto</NavLink>
                        </nav>
                    </div>
                    <div className="text-sm text-gray-500">
                         <h3 className="text-md font-semibold text-white uppercase tracking-wider mb-2">Aviso Legal</h3>
                         <p>
                             “Estas declaraciones no han sido evaluadas por la Administración de Alimentos y Medicamentos. 
                             Este producto no está destinado a diagnosticar, tratar, curar ni prevenir ninguna enfermedad.”
                         </p>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Master Medical. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;