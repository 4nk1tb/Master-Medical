import React, { useState, useMemo, useEffect } from 'react';
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
        if (!routeId) return null;
        
        // First, try to find a group by matching a generated group ID from the product name
        const variants = products.filter(p => p.name.toLowerCase().replace(/\s+/g, '-') === routeId);
        
        if (variants.length > 0) {
            return variants.sort((a,b) => a.price - b.price);
        }

        // If no group is found, assume it's a single product's unique ID
        const singleProduct = products.find(p => p.id === routeId);
        if (singleProduct) {
            return [singleProduct];
        }

        return [];
    }, [routeId, products]);

    const [selectedVariant, setSelectedVariant] = useState<Product | null>(null);

    useEffect(() => {
        if (productGroup && productGroup.length > 0) {
            setSelectedVariant(productGroup[0]);
        } else {
            setSelectedVariant(null);
        }
    }, [productGroup]);
    
    const product = selectedVariant;
    const commonDetails = productGroup?.[0];

    if (!product || !commonDetails) {
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
    
    const handleBuyRequest = () => {
        const productName = productGroup && productGroup.length > 1 
            ? `${product.name} (${product.lab} - ${product.presentation})` 
            : `${product.name} (${product.presentation})`;
        const message = `Hola, estoy interesado en comprar el siguiente producto: ${productName}`;
        const whatsappUrl = `https://wa.me/34690656118?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="container mx-auto px-6 py-12 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Product Image */}
                <div className="bg-[#1a2647] p-8 rounded-lg shadow-lg md:sticky md:top-28">
                    <img src={product.image} alt={product.name} className="w-full h-auto object-contain rounded-md" />
                </div>
                
                {/* Product Details */}
                <div>
                    {productGroup && productGroup.length > 1 && (
                        <div className="mb-6">
                            <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider block mb-3">Seleccionar Laboratorio:</span>
                            <div className="flex flex-wrap gap-3">
                                {productGroup.map(variant => (
                                    <button
                                        key={variant.id}
                                        onClick={() => setSelectedVariant(variant)}
                                        className={`px-4 py-2 text-sm font-bold rounded-md transition-all duration-200 border-2 ${
                                            selectedVariant?.id === variant.id
                                                ? 'bg-[#31E0E0] text-[#0F1B3A] border-[#31E0E0] scale-105 shadow-lg shadow-[#31E0E0]/20'
                                                : 'bg-transparent text-gray-300 border-gray-600 hover:border-[#31E0E0] hover:text-[#31E0E0] hover:scale-105'
                                        }`}
                                    >
                                        {variant.lab}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <span className="text-sm font-semibold text-[#31E0E0] uppercase tracking-wider">{product.lab}</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2 mb-4">{product.name}</h1>
                    <p className="text-2xl font-bold text-[#FF4DA3] mb-6">${product.price.toFixed(2)}</p>
                    
                    <div className="space-y-6 text-gray-300">
                        <p>{commonDetails.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm border-t border-b border-white/10 py-4">
                            <div><strong className="text-white block">Categoría:</strong> {commonDetails.category}</div>
                            <div><strong className="text-white block">Forma:</strong> {commonDetails.form}</div>
                            <div><strong className="text-white block">Presentación:</strong> {product.presentation}</div>
                        </div>

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
                    
                    <div className="mt-8">
                        <button
                            onClick={handleBuyRequest}
                            className="group/button relative w-full md:w-auto px-8 py-3 text-sm font-bold uppercase tracking-wider rounded-md transition-all duration-300 ease-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 bg-gradient-to-r from-[#31E0E0] to-[#25a2a2] text-[#0F1B3A] shadow-lg shadow-[#31E0E0]/20 hover:shadow-xl hover:shadow-[#31E0E0]/30 focus:ring-[#31E0E0]/50 flex items-center justify-center overflow-hidden"
                        >
                             <span className="transition-all duration-300 ease-out group-hover/button:opacity-0 group-hover/button:-translate-x-full">Comprar</span>
                             <ShoppingCart className="absolute transform translate-x-full opacity-0 transition-all duration-300 ease-out group-hover/button:translate-x-0 group-hover/button:opacity-100" size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;