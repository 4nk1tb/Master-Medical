

import React, { useMemo } from 'react';
// FIX: Corrected import from 'react-router-dom' to resolve module export errors.
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import { ShoppingCart } from 'lucide-react';

interface ProductDetailPageProps {
    products: Product[];
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products }) => {
    const { id: routeId } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const productGroup = useMemo(() => {
        if (!routeId) return [];
        
        // Find all variants that match the group ID (derived from product name)
        const variants = products.filter(p => p.name.toLowerCase().replace(/\s+/g, '-').replace(/[/.]/g, '') === routeId);
        
        if (variants.length > 0) {
            return variants.sort((a,b) => a.price - b.price);
        }

        // Fallback for single products (like promos) that are accessed by their unique ID
        const singleProduct = products.find(p => p.id === routeId);
        return singleProduct ? [singleProduct] : [];
    }, [routeId, products]);

    // FIX: The type inference for `labsGroup` was failing, causing `variants` to be of type `unknown` in a downstream `.map()` call.
    // The `reduce` function has been updated to use a generic type argument (`reduce<Record<string, Product[]>>`) instead of a type assertion on its initial value.
    // This is a more robust method for ensuring TypeScript correctly infers the accumulator's type throughout the reduction, resolving the error.
    const labsGroup = useMemo(() => {
        return productGroup.reduce<Record<string, Product[]>>((acc, variant) => {
            const lab = variant.lab;
            if (!acc[lab]) {
                acc[lab] = [];
            }
            acc[lab].push(variant);
            return acc;
        }, {});
    }, [productGroup]);
    
    const commonDetails = productGroup?.[0];

    if (!commonDetails) {
        return (
            <div className="container mx-auto px-6 py-24 text-center">
                <h1 className="text-4xl font-bold text-white">Producto no encontrado</h1>
                <p className="text-gray-400 mt-4">El producto que buscas no existe o fue removido.</p>
                <button 
                    onClick={() => navigate('/catalog')} 
                    className="mt-8 inline-block px-8 py-3 text-sm font-bold uppercase tracking-wider rounded-md transition-all duration-300 ease-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 bg-gradient-to-r from-[#31E0E0] to-[#25a2a2] text-[#0F1B3A] shadow-lg shadow-[#31E0E0]/20 hover:shadow-xl hover:shadow-[#31E0E0]/30 focus:ring-[#31E0E0]/50"
                >
                    Volver al Catálogo
                </button>
            </div>
        );
    }
    
    const handleBuyRequest = (variant: Product) => {
        const message = "Hola quiero hacer un pedido de Master Medical";
        const whatsappUrl = `https://wa.me/34690656118?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="container mx-auto px-6 py-12 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Product Image */}
                <div className="bg-[#1a2647] p-8 rounded-lg shadow-lg md:sticky md:top-28">
                    <img src={commonDetails.image} alt={commonDetails.name} className="w-full h-auto object-contain rounded-md" />
                </div>
                
                {/* Product Details */}
                <div>
                    <span className="text-sm font-semibold text-[#31E0E0] uppercase tracking-wider">{commonDetails.category}</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2 mb-4">{commonDetails.name}</h1>
                    <p className="text-gray-300 mb-6">{commonDetails.description}</p>
                    
                     <div className="space-y-6 text-gray-300">
                        <div className="grid grid-cols-2 gap-4 text-sm border-t border-b border-white/10 py-4">
                            <div><strong className="text-white block">Categoría:</strong> {commonDetails.category}</div>
                            <div><strong className="text-white block">Forma:</strong> {commonDetails.form}</div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-white mb-4">Opciones Disponibles</h2>
                        <div className="space-y-6">
                            {Object.entries(labsGroup).map(([labName, variants]) => (
                                <div key={labName} className="bg-[#1a2647]/80 p-4 rounded-lg border border-gray-700">
                                    <h3 className="text-xl font-semibold text-[#31E0E0] mb-3">{labName}</h3>
                                    <div className="space-y-3">
                                        {variants.map(variant => (
                                            <div key={variant.id} className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-t border-gray-700 pt-3 first:border-t-0 first:pt-0">
                                                <div>
                                                    <p className="text-white font-medium">{variant.presentation}</p>
                                                    <p className="text-xl font-bold text-[#FF4DA3]">${variant.price.toFixed(2)}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleBuyRequest(variant)}
                                                    className="group/button relative w-full sm:w-auto flex-shrink-0 px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-md transition-all duration-300 ease-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 bg-gradient-to-r from-[#31E0E0] to-[#25a2a2] text-[#0F1B3A] shadow-md shadow-[#31E0E0]/10 hover:shadow-lg hover:shadow-[#31E0E0]/20 focus:ring-[#31E0E0]/50 flex items-center justify-center overflow-hidden"
                                                >
                                                    <span className="transition-all duration-300 ease-out group-hover/button:opacity-0 group-hover/button:-translate-x-full">Comprar</span>
                                                    <ShoppingCart className="absolute transform translate-x-full opacity-0 transition-all duration-300 ease-out group-hover/button:translate-x-0 group-hover/button:opacity-100" size={16} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mt-10 space-y-6 text-gray-300">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Ingredientes</h3>
                            <ul className="list-disc list-inside text-sm">
                                {commonDetails.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Modo de Uso</h3>
                            <p className="text-sm">{commonDetails.usage}</p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Advertencias</h3>
                            <p className="text-sm bg-yellow-900/30 border-l-4 border-yellow-500 p-4 rounded">{commonDetails.warnings}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;