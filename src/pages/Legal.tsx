import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Cookie, FileText } from 'lucide-react';

const Legal = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('privacidad');

  useEffect(() => {
    if (location.hash === '#cookies') {
      setActiveTab('cookies');
    } else if (location.hash === '#aviso') {
      setActiveTab('aviso');
    } else {
      setActiveTab('privacidad');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <div className="pt-36 md:pt-44 pb-24 bg-[#fafbf7] min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Header */}
        <header className="mb-12 text-center md:text-left space-y-4">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">Transparencia y Confianza</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary">
            Políticas y Textos Legales
          </h1>
          <p className="text-gray-500 font-sans text-base max-w-2xl leading-relaxed">
            Aquí encontrarás toda la información relativa a cómo tratamos tus datos personales, el uso de las cookies y los términos legales de nuestra floristería en Sevilla.
          </p>
        </header>

        {/* Layout */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Tabs Navigation (Sidebar) */}
          <aside className="md:col-span-4 space-y-2">
            {[
              { id: 'privacidad', label: 'Política de Privacidad', icon: Shield, hash: '#privacidad' },
              { id: 'cookies', label: 'Política de Cookies', icon: Cookie, hash: '#cookies' },
              { id: 'aviso', label: 'Aviso Legal', icon: FileText, hash: '#aviso' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <a
                  key={tab.id}
                  href={tab.hash}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.hash = tab.hash;
                  }}
                  className={`flex items-center gap-3.5 w-full px-5 py-4 rounded-2xl font-bold transition-all text-sm ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/15'
                      : 'bg-white hover:bg-gray-50 text-gray-650 border border-gray-100 shadow-sm'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-white' : 'text-primary'} />
                  {tab.label}
                </a>
              );
            })}
          </aside>

          {/* Content Pane */}
          <main className="md:col-span-8 bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm font-sans text-gray-600 leading-relaxed text-sm md:text-base space-y-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'privacidad' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-display font-bold text-secondary flex items-center gap-3">
                    <Shield className="text-primary" size={24} />
                    Política de Privacidad
                  </h2>
                  <p className="text-xs text-gray-400">Última actualización: Junio de 2026</p>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-secondary">1. Responsable del Tratamiento</h3>
                    <p>
                      El responsable del tratamiento de los datos personales es <strong>Floristería Rafael</strong>, con domicilio en Calle Ventura de la Vega, 1, 41005 Sevilla, España. Teléfono de contacto: +34 954 63 86 60.
                    </p>

                    <h3 className="text-lg font-bold text-secondary">2. Finalidad del Tratamiento</h3>
                    <p>
                      Tratamos tus datos personales con el fin de gestionar tu proceso de compra de nuestros arreglos florales, atender tus consultas realizadas a través de nuestros formularios de contacto, enviarte presupuestos personalizados para eventos y, si así lo autorizas, remitirte comunicaciones comerciales sobre nuestros productos y servicios.
                    </p>

                    <h3 className="text-lg font-bold text-secondary">3. Conservación de los Datos</h3>
                    <p>
                      Tus datos personales se conservarán mientras se mantenga la relación comercial, mientras no solicites su supresión o durante los años necesarios para cumplir con las obligaciones legales aplicables (tales como la normativa fiscal y de consumo).
                    </p>

                    <h3 className="text-lg font-bold text-secondary">4. Legitimación</h3>
                    <p>
                      La base legal para el tratamiento de tus datos es la ejecución de un contrato de compra de productos, el interés legítimo para responder a tus dudas o el consentimiento explícito que nos otorgas al rellenar nuestros formularios de contacto o suscribirte a nuestras novedades.
                    </p>

                    <h3 className="text-lg font-bold text-secondary">5. Derechos del Usuario</h3>
                    <p>
                      Tienes derecho a acceder a tus datos personales, rectificar los datos inexactos, solicitar su supresión cuando ya no sean necesarios, oponerse al tratamiento, limitar el tratamiento, así como el derecho a la portabilidad de los datos. Puedes ejercer estos derechos enviando una comunicación escrita con copia de tu DNI a nuestra dirección física o poniéndote en contacto por teléfono.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'cookies' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-display font-bold text-secondary flex items-center gap-3">
                    <Cookie className="text-primary" size={24} />
                    Política de Cookies
                  </h2>
                  <p className="text-xs text-gray-400">Última actualización: Junio de 2026</p>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-secondary">1. ¿Qué son las Cookies?</h3>
                    <p>
                      Una cookie es un pequeño fichero de texto que se descarga en tu navegador (ordenador, smartphone o tablet) cuando visitas nuestra web. Permiten a la página, entre otras cosas, recordar tu sesión y almacenar información de tus preferencias o tu carrito de compras de manera temporal.
                    </p>

                    <h3 className="text-lg font-bold text-secondary">2. ¿Qué tipos de Cookies utilizamos en esta web?</h3>
                    <p>
                      Nuestra web utiliza principalmente las siguientes cookies:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Cookies Técnicas Obligatorias:</strong> Necesarias para el funcionamiento del carrito de compras y la navegación del sitio. No almacenan información identificable.
                      </li>
                      <li>
                        <strong>Cookies de Preferencias/Personalización:</strong> Nos permiten recordar tus elecciones, como los artículos guardados en el carrito para que no los pierdas si refrescas el navegador.
                      </li>
                      <li>
                        <strong>Cookies de Análisis (Opcionales):</strong> Si se habilitan sistemas de métrica como Google Analytics, nos ayudan a entender de forma anónima cuántos usuarios nos visitan y qué secciones prefieren.
                      </li>
                    </ul>

                    <h3 className="text-lg font-bold text-secondary">3. Desactivación de Cookies</h3>
                    <p>
                      Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la configuración de las opciones del navegador que utilices en tu dispositivo. Si decides desactivar las cookies obligatorias, algunas funcionalidades esenciales de la tienda en línea (como el carrito de compra) podrían no funcionar correctamente.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'aviso' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-display font-bold text-secondary flex items-center gap-3">
                    <FileText className="text-primary" size={24} />
                    Aviso Legal
                  </h2>
                  <p className="text-xs text-gray-400">Última actualización: Junio de 2026</p>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-secondary">1. Datos Identificativos</h3>
                    <p>
                      En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se hace constar que el sitio web <strong>Floristería Rafael</strong> es propiedad de su titular con domicilio comercial en Calle Ventura de la Vega, 1, 41005 Sevilla, España.
                    </p>

                    <h3 className="text-lg font-bold text-secondary">2. Propiedad Intelectual</h3>
                    <p>
                      Todos los contenidos de esta página web, incluidos textos, diseños gráficos, logotipos, imágenes fijas o en movimiento, y código fuente, están protegidos por los derechos de propiedad intelectual e industrial propiedad de Floristería Rafael o de terceros colaboradores autorizados. Queda terminantemente prohibida su reproducción o distribución sin el consentimiento expreso de la floristería.
                    </p>

                    <h3 className="text-lg font-bold text-secondary">3. Limitación de Responsabilidad</h3>
                    <p>
                      Floristería Rafael no se hace responsable de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar errores u omisiones en los contenidos, falta de disponibilidad del portal, o la transmisión de virus o programas maliciosos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Legal;
