
import React from 'react';
import { ShieldCheck, Target, Eye } from 'lucide-react';

const ValueCard: React.FC<{ icon: React.ReactNode; title: string; text: string; }> = ({ icon, title, text }) => (
    <div className="bg-black/20 p-8 rounded-lg text-center">
        <div className="flex justify-center mb-4 text-[#31E0E0]">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{text}</p>
    </div>
);

const AboutPage: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">Acerca de Master Medical</h1>
                <p className="mt-4 text-lg text-gray-300">
                    En Master Medical ofrecemos productos auténticos y asesoría especializada para un consumo informado y responsable.
                </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                    <h2 className="text-3xl font-bold text-white mb-4">Nuestra Misión y Visión</h2>
                    <p className="text-gray-300 mb-4">
                        Nuestra misión es ser el proveedor más confiable y transparente de suplementos de alto rendimiento en el mercado. Nos esforzamos por ofrecer solo productos de la más alta pureza, verificados por laboratorios, garantizando la seguridad y eficacia para nuestros clientes.
                    </p>
                    <p className="text-gray-300">
                        Aspiramos a educar y guiar a la comunidad, promoviendo prácticas seguras y responsables. Creemos en el potencial humano y en proporcionar las herramientas para alcanzar el máximo rendimiento físico de manera informada.
                    </p>
                </div>
                 <div className="order-1 md:order-2">
                    <img src="https://picsum.photos/seed/about-us/600/400" alt="Laboratorio" className="rounded-lg shadow-2xl shadow-black/50"/>
                </div>
            </div>
            
            <div className="mt-24">
                 <h2 className="text-3xl font-bold text-center text-white mb-12">Nuestros Valores</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <ValueCard 
                         icon={<ShieldCheck size={40} />}
                         title="Calidad y Autenticidad"
                         text="Cada producto en nuestro catálogo es seleccionado rigurosamente y proviene de laboratorios de renombre."
                     />
                      <ValueCard 
                         icon={<Target size={40} />}
                         title="Asesoría Especializada"
                         text="Brindamos información clara y honesta para que tomes las mejores decisiones para tus objetivos."
                     />
                      <ValueCard 
                         icon={<Eye size={40} />}
                         title="Transparencia Total"
                         text="Creemos en la comunicación abierta. Precios claros, descripciones detalladas y sin promesas falsas."
                     />
                 </div>
            </div>
        </div>
    );
};

export default AboutPage;
