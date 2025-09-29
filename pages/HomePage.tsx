import React from 'react';
import { Search, Syringe, Pill, HeartPulse, Shield, FlaskConical, ShoppingCart } from 'lucide-react';
// FIX: Corrected import from 'react-router-dom' to resolve module export errors.
import { Link, useNavigate } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { products } from '../data/products';
import { Category } from '../types';

const CategoryCard: React.FC<{ icon: React.ReactNode; title: string; category: Category }> = ({ icon, title, category }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/catalog?category=${encodeURIComponent(category)}`);
    }

    return (
        <div onClick={handleClick} className="bg-black/20 p-6 rounded-lg text-center flex flex-col items-center justify-center transition-all duration-300 ease-out transform hover:-translate-y-2 hover:bg-[#31E0E0]/10 hover:shadow-xl hover:shadow-[#31E0E0]/10 cursor-pointer">
            <div className="text-[#31E0E0] mb-4">{icon}</div>
            <h3 className="font-bold text-white">{title}</h3>
        </div>
    );
};

const HomePage: React.FC = () => {
    const featuredProducts = products.filter(p => p.category !== Category.Promo).slice(0, 4);
    const promoProducts = products.filter(p => p.category === Category.Promo);

    const navigate = useNavigate();

    return (
        <div className="overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
                <ParticleBackground />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0F1B3A] via-[#0F1B3A]/80 to-[#0F1B3A]"></div>
                <div className="relative z-10 px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                        Confianza y Calidad en <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#31E0E0] to-[#FF4DA3]">
                            Suplementos Avanzados
                        </span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
                        Catálogo confiable de esteroides anabólicos y suplementos de alta calidad.
                    </p>
                    <div className="mt-8 max-w-md mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar por nombre o categoría"
                                className="w-full py-3 pl-12 pr-4 bg-white/10 border-2 border-white/20 rounded-md focus:ring-2 focus:ring-[#31E0E0] focus:border-[#31E0E0] transition-all duration-300 placeholder-gray-400"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center items-center gap-4">
                        <Button to="/catalog" variant="primary">Ver Catálogo Completo</Button>
                        <Button to="/contact" variant="secondary">Solicitar Información</Button>
                    </div>
                </div>
            </section>
            
            {/* Promotions Section */}
            {promoProducts.length > 0 && (
                <section className="py-16 sm:py-24 bg-gradient-to-r from-[#31E0E0]/5 to-[#FF4DA3]/5">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center text-white mb-12">Promociones Especiales</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {promoProducts.map(product => {
                                const message = `Hola, estoy interesado en comprar la promoción: ${product.name}.`;
                                const whatsappUrl = `https://wa.me/34690656118?text=${encodeURIComponent(message)}`;
                                return (
                                <div key={product.id} onClick={() => navigate(`/product/${product.id}`)}
                                     className="bg-[#1a2647] rounded-lg overflow-hidden group transition-all duration-300 ease-out transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 cursor-pointer border-2 border-transparent hover:border-[#FF4DA3]/50 p-6 flex flex-col text-center items-center">
                                    <span className="absolute top-2 right-2 bg-gradient-to-r from-[#FF4DA3] to-[#ff7acb] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">PROMO</span>
                                    <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-gray-700 group-hover:border-[#FF4DA3]/50 transition-colors"/>
                                    <h3 className="text-xl font-bold text-white">{product.name}</h3>
                                    <p className="text-sm text-gray-400 mt-1 flex-grow">{product.presentation}</p>
                                    <p className="text-2xl font-extrabold text-[#FF4DA3] mt-4">
                                        €{product.price.toFixed(2)}
                                    </p>
                                    <a 
                                      href={whatsappUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="group/button relative mt-4 inline-flex items-center justify-center px-6 py-2 text-sm font-bold rounded-md transition-all duration-300 ease-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-opacity-50 border-2 border-[#FF4DA3] text-[#FF4DA3] hover:bg-[#FF4DA3] hover:text-[#0F1B3A] focus:ring-[#FF4DA3] overflow-hidden"
                                    >
                                      <span className="transition-all duration-300 ease-out group-hover/button:opacity-0 group-hover/button:-translate-x-full">Comprar</span>
                                      <ShoppingCart className="absolute transform translate-x-full opacity-0 transition-all duration-300 ease-out group-hover/button:translate-x-0 group-hover/button:opacity-100" size={20} />
                                    </a>
                                </div>
                            )})}
                        </div>
                    </div>
                </section>
            )}

            {/* Categories Section */}
            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">Categorías Destacadas</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        <CategoryCard icon={<Syringe size={40} />} title="Inyectables" category={Category.Inyectables} />
                        <CategoryCard icon={<Pill size={40} />} title="Orales" category={Category.Orales} />
                        <CategoryCard icon={<FlaskConical size={40} />} title="HGH & Péptidos" category={Category.HGHPeptides} />
                        <CategoryCard icon={<Shield size={40} />} title="Salud y Bienestar" category={Category.HealthWellness} />
                        <CategoryCard icon={<HeartPulse size={40} />} title="Bienestar Sexual" category={Category.SexualWellness} />
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 sm:py-24 bg-black/20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">Productos Destacados</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;