import React, { useState, useEffect } from 'react';
// FIX: Replaced react-router-dom import to fix module resolution errors.
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Logo = () => (
    <div className="flex flex-col items-center -my-2">
        <span className="text-2xl font-light tracking-[0.3em] text-gray-300/90 uppercase">
            MASTER MEDICAL
        </span>
        <div className="flex items-center w-full mt-1">
            <div className="flex-grow h-[1px] bg-gray-600"></div>
            <span className="mx-4 text-[9px] font-light tracking-[0.2em] text-gray-500 uppercase">
                EST 2025
            </span>
            <div className="flex-grow h-[1px] bg-gray-600"></div>
        </div>
    </div>
);


const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Catálogo', path: '/catalog' },
        { name: 'Acerca de', path: '/about' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Contacto', path: '/contact' },
    ];
    
    const linkClasses = "relative text-sm font-medium uppercase tracking-wider text-gray-300 transition-colors duration-300 hover:text-white after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-[#31E0E0] after:transition-all after:duration-300";
    const activeLinkClasses = "after:w-full text-white";

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ease-out ${isScrolled ? 'bg-[#0F1B3A]/80 backdrop-blur-lg shadow-lg shadow-black/20' : 'bg-transparent'}`}>
            <nav className={`container mx-auto px-6 transition-all duration-300 ease-out ${isScrolled ? 'py-3' : 'py-6'}`}>
                <div className="flex justify-between items-center">
                    <NavLink to="/"><Logo /></NavLink>
                    
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink 
                                key={link.name} 
                                to={link.path} 
                                className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-[#0F1B3A] transition-all duration-300 ease-out overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col items-center space-y-6 py-8">
                    {navLinks.map((link) => (
                        <NavLink 
                            key={link.name} 
                            to={link.path} 
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) => `text-lg font-semibold transition-colors duration-200 ${isActive ? 'text-[#31E0E0]' : 'text-gray-300 hover:text-white'}`}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;