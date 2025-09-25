
import React from 'react';
import Accordion from '../components/Accordion';

const FaqPage: React.FC = () => {
    const faqs = [
        {
            q: "¿Son auténticos los productos que ofrecen?",
            a: "Absolutamente. En Master Medical, la autenticidad es nuestro pilar fundamental. Todos nuestros productos provienen directamente de laboratorios reconocidos y cuentan con códigos de verificación para que puedas comprobar su legitimidad en el sitio web del fabricante."
        },
        {
            q: "¿Publican precios actualizados?",
            a: "Sí. Todos los precios que ves en nuestro catálogo están siempre actualizados. Nos esforzamos por mantener la transparencia total, por lo que el precio que ves es el precio final, sin costos ocultos."
        },
        {
            q: "¿Cómo solicito información sobre un producto?",
            a: "Puedes hacer clic en el botón 'Solicitar Información' en la página de cualquier producto. Esto te llevará a nuestro formulario de contacto con el nombre del producto ya incluido. También puedes contactarnos directamente a través de nuestro correo electrónico o teléfono."
        },
        {
            q: "¿Hacen envíos internacionales?",
            a: "Actualmente, nos centramos en envíos nacionales para garantizar la entrega más rápida y segura posible. Para consultas sobre envíos a otros países, por favor contáctanos directamente para evaluar las posibilidades."
        },
        {
            q: "¿Qué métodos de contacto ofrecen?",
            a: "Puedes contactarnos a través del formulario en nuestra página de contacto, por correo electrónico a info@mastermedical.com, o llamando a nuestro número de atención al cliente. Buscamos responder todas las consultas en menos de 24 horas."
        }
    ];

    return (
        <div className="container mx-auto px-6 py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">Preguntas Frecuentes</h1>
                <p className="mt-4 text-lg text-gray-300">
                    Encuentra respuestas a las dudas más comunes sobre nuestros productos y servicios.
                </p>
            </div>
            <div className="mt-16 max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                    <Accordion key={index} title={faq.q}>
                        <p>{faq.a}</p>
                    </Accordion>
                ))}
            </div>
        </div>
    );
};

export default FaqPage;
