
import React, { useState, useMemo } from 'react';
// FIX: Replaced react-router-dom import to fix module resolution errors.
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import type { Product } from '../types';
import { Category, Form } from '../types';
import { Filter, List } from 'lucide-react';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const CatalogPage: React.FC = () => {
    const query = useQuery();
    const initialCategory = query.get('category') as Category || 'All';
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: initialCategory,
        form: 'All',
        lab: 'All',
    });
    const [sort, setSort] = useState('name-asc');
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const uniqueLabs = useMemo(() => ['All', ...Array.from(new Set(products.map(p => p.lab)))], []);

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = filters.category === 'All' || product.category === filters.category;
            const matchesForm = filters.form === 'All' || product.form === filters.form;
            const matchesLab = filters.lab === 'All' || product.lab === filters.lab;
            return matchesSearch && matchesCategory && matchesForm && matchesLab;
        });

        return filtered.sort((a, b) => {
            switch (sort) {
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'name-desc': return b.name.localeCompare(a.name);
                case 'name-asc':
                default:
                    return a.name.localeCompare(b.name);
            }
        });
    }, [searchTerm, filters, sort]);

    const FilterControl: React.FC<{ label: string; name: string; value: string; options: { value: string; label: string }[]; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }> = ({ label, name, value, options, onChange }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-[#1a2647] border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-[#31E0E0] focus:border-[#31E0E0] transition"
            >
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
    );

    const FiltersSidebar = () => (
        <aside className="lg:w-1/4 xl:w-1/5 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center"><Filter className="mr-2 text-[#31E0E0]" size={20} /> Filtros</h3>
            <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-1">Buscar Producto</label>
                <input
                    type="text"
                    id="search"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#1a2647] border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-2 focus:ring-[#31E0E0] focus:border-[#31E0E0] transition"
                />
            </div>
            <FilterControl
                label="Categoría"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                options={[
                    { value: 'All', label: 'Todas' },
                    ...Object.values(Category).map(c => ({ value: c, label: c }))
                ]}
            />
            <FilterControl
                label="Forma"
                name="form"
                value={filters.form}
                onChange={handleFilterChange}
                options={[
                    { value: 'All', label: 'Todas' },
                    ...Object.values(Form).map(f => ({ value: f, label: f }))
                ]}
            />
            <FilterControl
                label="Laboratorio"
                name="lab"
                value={filters.lab}
                onChange={handleFilterChange}
                options={uniqueLabs.map(l => ({ value: l, label: l }))}
            />
        </aside>
    );

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">Nuestro Catálogo</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">Encuentra productos de la más alta calidad y pureza.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Mobile Filter Button */}
                <div className="lg:hidden">
                    <button onClick={() => setIsFiltersOpen(!isFiltersOpen)} className="w-full flex items-center justify-center py-2 px-4 bg-[#1a2647] border border-gray-600 rounded-md text-white font-semibold">
                        <Filter className="mr-2" size={20} /> {isFiltersOpen ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                    </button>
                </div>
                
                {/* Filters sidebar with transition for mobile */}
                <div className={`transition-all duration-300 ease-out lg:block ${isFiltersOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 lg:max-h-full lg:opacity-100 overflow-hidden'}`}>
                    <div className="mt-4 lg:mt-0">
                        <FiltersSidebar />
                    </div>
                </div>

                <main className="w-full">
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                        <p className="text-gray-400">{filteredAndSortedProducts.length} productos encontrados</p>
                        <div className="flex items-center gap-2">
                            <label htmlFor="sort" className="text-sm font-medium text-gray-300"><List size={16} className="inline-block mr-1"/>Ordenar por:</label>
                            <select
                                id="sort"
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="bg-[#1a2647] border border-gray-600 rounded-md py-1 px-2 text-white text-sm focus:ring-2 focus:ring-[#31E0E0] focus:border-[#31E0E0] transition"
                            >
                                <option value="name-asc">Nombre (A-Z)</option>
                                <option value="name-desc">Nombre (Z-A)</option>
                                <option value="price-asc">Precio (Menor a Mayor)</option>
                                <option value="price-desc">Precio (Mayor a Menor)</option>
                            </select>
                        </div>
                    </div>
                    {filteredAndSortedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredAndSortedProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-black/20 rounded-lg">
                            <h3 className="text-2xl font-bold text-white">No se encontraron productos</h3>
                            <p className="text-gray-400 mt-2">Intenta ajustar tus filtros de búsqueda.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default CatalogPage;