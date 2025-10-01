import React from 'react';
import type { Product } from '../types';
// FIX: Corrected import from 'react-router-dom' to resolve module export errors.
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isGrouped?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isGrouped = false }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const message = "Hola quiero hacer un pedido de Master Medical";
  const whatsappUrl = `https://wa.me/34690656118?text=${encodeURIComponent(message)}`;


  return (
    <div 
      onClick={handleCardClick}
      className="bg-[#1a2647] rounded-lg overflow-hidden group transition-all duration-300 ease-out transform hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/50 cursor-pointer border border-transparent hover:border-[#31E0E0]/50 flex flex-col"
    >
      <div className="relative h-48 bg-gray-800">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <span className="absolute top-2 right-2 bg-[#31E0E0] text-black text-xs font-bold px-2 py-1 rounded">{product.lab}</span>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white truncate">{product.name}</h3>
        <p className="text-sm text-gray-400 mt-1 flex-grow">{product.shortDescription}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xs text-gray-400">{product.presentation}</p>
          <p className="text-xl font-extrabold text-[#31E0E0]">
            {isGrouped && <span className="text-sm font-normal text-gray-400">Desde </span>}
            ${product.price.toFixed(2)}
          </p>
        </div>
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="group/button relative w-full mt-4 bg-transparent border-2 border-[#31E0E0] text-[#31E0E0] font-bold py-2 px-4 rounded-md transition-all duration-300 hover:bg-[#31E0E0] hover:text-[#0F1B3A] focus:outline-none focus:ring-2 focus:ring-[#31E0E0] focus:ring-opacity-50 flex items-center justify-center overflow-hidden"
        >
          <span className="transition-all duration-300 ease-out group-hover/button:opacity-0 group-hover/button:-translate-x-full">Comprar</span>
          <ShoppingCart className="absolute transform translate-x-full opacity-0 transition-all duration-300 ease-out group-hover/button:translate-x-0 group-hover/button:opacity-100" size={20} />
        </a>
      </div>
    </div>
  );
};

export default ProductCard;