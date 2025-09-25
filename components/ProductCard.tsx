
import React from 'react';
import type { Product } from '../types';
// FIX: Replaced react-router-dom import to fix module resolution errors.
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleRequestInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/contact?product=${encodeURIComponent(product.name)}`);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-[#1a2647] rounded-lg overflow-hidden group transition-all duration-300 ease-out transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/50 cursor-pointer border border-transparent hover:border-[#31E0E0]/50"
    >
      <div className="relative h-48 bg-gray-800">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <span className="absolute top-2 right-2 bg-[#31E0E0] text-black text-xs font-bold px-2 py-1 rounded">{product.lab}</span>
      </div>
      <div className="p-5 flex flex-col h-full">
        <h3 className="text-lg font-bold text-white truncate">{product.name}</h3>
        <p className="text-sm text-gray-400 mt-1 flex-grow">{product.shortDescription}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xs text-gray-400">{product.presentation}</p>
          <p className="text-xl font-extrabold text-[#31E0E0]">${product.price.toFixed(2)}</p>
        </div>
        <button 
          onClick={handleRequestInfo}
          className="w-full mt-4 bg-transparent border-2 border-[#31E0E0] text-[#31E0E0] font-bold py-2 px-4 rounded-md transition-all duration-300 hover:bg-[#31E0E0] hover:text-[#0F1B3A] focus:outline-none focus:ring-2 focus:ring-[#31E0E0] focus:ring-opacity-50"
        >
          Solicitar Información
        </button>
      </div>
    </div>
  );
};

export default ProductCard;