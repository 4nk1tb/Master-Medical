
import React from 'react';
// FIX: Replaced react-router-dom import to fix module resolution errors.
import { useParams, useNavigate } from 'react-router-dom';
import type { Product } from '../types';
import Button from '../components/Button';

interface ProductDetailPageProps {
    products: Product[];
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const product = products.find(p => p.id === id);

    if (!product) {
        return (
            <div className="container mx-auto px-6 py-24 text-center">
                <h1 className="text-4xl font-bold text-white">Producto no encontrado</h1>
                <p className="text-gray-400 mt-4">El producto que buscas no existe o fue removido.</p>
                <Button to="/catalog" className="mt-8">Volver al Catálogo</Button>
            </div>
        );
    }
    
    const handleRequestInfo = () => {
        navigate(`/contact?product=${encodeURIComponent(product.name)}`);
    };

    return (
        <div className="container mx-auto px-6 py-12 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {/* Product Image */}
                <div className="bg-[#1a2647] p-8 rounded-lg shadow-lg">
                    <img src={product.image} alt={product.name} className="w-full h-auto object-contain rounded-md" />
                </div>
                
                {/* Product Details */}
                <div>
                    <span className="text-sm font-semibold text-[#31E0E0] uppercase tracking-wider">{product.lab}</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2 mb-4">{product.name}</h1>
                    <p className="text-2xl font-bold text-[#FF4DA3] mb-6">${product.price.toFixed(2)}</p>
                    
                    <div className="space-y-6 text-gray-300">
                        <p>{product.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm border-t border-b border-white/10 py-4">
                            <div><strong className="text-white block">Categoría:</strong> {product.category}</div>
                            <div><strong className="text-white block">Forma:</strong> {product.form}</div>
                            <div><strong className="text-white block">Presentación:</strong> {product.presentation}</div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Ingredientes</h3>
                            <ul className="list-disc list-inside text-sm">
                                {product.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                            </ul>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Modo de Uso</h3>
                            <p className="text-sm">{product.usage}</p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Advertencias</h3>
                            <p className="text-sm bg-yellow-900/30 border-l-4 border-yellow-500 p-4 rounded">{product.warnings}</p>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <Button onClick={handleRequestInfo} variant="primary" className="w-full md:w-auto">Solicitar Información</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;