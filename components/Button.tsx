
import React from 'react';
// FIX: Replaced react-router-dom import to fix module resolution errors.
import { Link } from 'react-router-dom';

interface ButtonProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ to, onClick, children, variant = 'primary', className = '' }) => {
  const baseClasses = "inline-block px-8 py-3 text-sm font-bold uppercase tracking-wider rounded-md transition-all duration-300 ease-out transform hover:-translate-y-1 focus:outline-none focus:ring-4";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-[#31E0E0] to-[#25a2a2] text-[#0F1B3A] shadow-lg shadow-[#31E0E0]/20 hover:shadow-xl hover:shadow-[#31E0E0]/30 focus:ring-[#31E0E0]/50",
    secondary: "bg-transparent border-2 border-[#FF4DA3] text-[#FF4DA3] hover:bg-[#FF4DA3] hover:text-[#0F1B3A] shadow-lg shadow-[#FF4DA3]/20 hover:shadow-xl hover:shadow-[#FF4DA3]/30 focus:ring-[#FF4DA3]/50"
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};

export default Button;