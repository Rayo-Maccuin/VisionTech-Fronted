"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Calendar, Clock, Award, BookOpen, Microscope, Eye, Shield, Star, ChevronDown, ChevronUp } from 'lucide-react'
import "./Servicios.css"

function Servicios() {
  const [activeDoctor, setActiveDoctor] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)

  const doctors = [
    {
      id: 1,
      name: "Dra. Maria Camila Taborda",
      title: "Oftalmóloga especialista en Retina",
      image: "cam.jpg",
      education: [
        "Doctorado en Medicina, Universidad Nacional, 2005",
        "Especialidad en Oftalmología, Hospital Central, 2009",
        "Fellowship en Retina y Vítreo, Instituto Oftalmológico Internacional, 2011",
      ],
      experience: [
        "Jefa de Servicio de Oftalmología, Hospital Universitario, 2015-2020",
        "Profesora Asociada de Oftalmología, Universidad Nacional, 2012-Presente",
        "Investigadora principal en estudios sobre degeneración macular, 2013-2018",
      ],
      specialties: ["Cirugía de retina", "Tratamiento de degeneración macular", "Retinopatía diabética"],
      certifications: ["Junta Americana de Oftalmología", "Sociedad Internacional de Cirugía Ocular"],
      languages: ["Español", "Inglés", "Francés"],
      publications: [
        "Avances en el tratamiento de la retinopatía diabética (Revista Oftalmológica, 2019)",
        "Nuevas técnicas quirúrgicas para desprendimiento de retina (Journal of Ophthalmology, 2017)",
      ],
      bio: "La Dra. Taborda cuenta con más de 15 años de experiencia en el campo de la oftalmología, especializándose en el diagnóstico y tratamiento de enfermedades de la retina. Su enfoque combina las técnicas más avanzadas con un trato humano y cercano hacia sus pacientes. Ha participado en numerosos congresos internacionales y es autora de múltiples publicaciones científicas en el campo de la oftalmología.",
    },
    {
      id: 2,
      name: "Dr. Mario Sosa",
      title: "Oftalmólogo especialista en Córnea",
      image: "md.jpg",
      education: [
        "Médico Cirujano, Universidad Central, 2007",
        "Especialidad en Oftalmología, Instituto Oftalmológico Nacional, 2011",
        "Fellowship en Córnea y Cirugía Refractiva, Centro Internacional de Ojos, 2013",
      ],
      experience: [
        "Director Médico, Clínica de Cirugía Refractiva, 2016-Presente",
        "Oftalmólogo consultor, Hospital General, 2014-2018",
        "Miembro del equipo de trasplantes de córnea, Instituto Nacional, 2013-2016",
      ],
      specialties: ["Cirugía refractiva LASIK", "Trasplantes de córnea", "Tratamiento de queratocono"],
      certifications: ["Consejo de Cirugía Refractiva", "Asociación de Especialistas en Córnea"],
      languages: ["Español", "Inglés", "Portugués"],
      publications: [
        "Resultados a largo plazo de la cirugía LASIK (Ophthalmology Today, 2020)",
        "Avances en el tratamiento del queratocono (Cornea Journal, 2018)",
      ],
      bio: "El Dr. Sosa es reconocido por su experiencia en cirugía refractiva y tratamientos de córnea. Con más de 5,000 cirugías realizadas, se ha convertido en un referente en el campo de la corrección visual mediante láser. Su compromiso con la innovación lo mantiene a la vanguardia de las técnicas quirúrgicas más avanzadas, ofreciendo a sus pacientes soluciones personalizadas para mejorar su calidad visual.",
    },
  ]

  const services = [
    {
      id: 1,
      name: "Examen Visual Completo",
      icon: <Eye size={40} />,
      description:
        "Evaluación integral de la salud visual que incluye pruebas de agudeza visual, presión intraocular, evaluación de la retina y examen de la córnea.",
      duration: "45-60 minutos",
      price: "$80",
      details: [
        "Anamnesis y revisión de historial médico",
        "Medición de agudeza visual",
        "Refracción para determinar graduación",
        "Evaluación de la salud ocular externa",
        "Examen con lámpara de hendidura",
        "Tonometría (medición de presión intraocular)",
        "Evaluación del fondo de ojo",
      ],
    },
    {
      id: 2,
      name: "Evaluación de Retina",
      icon: <Microscope size={40} />,
      description:
        "Examen especializado de la retina para detectar y monitorear condiciones como degeneración macular, retinopatía diabética y desprendimiento de retina.",
      duration: "30-45 minutos",
      price: "$120",
      details: [
        "Oftalmoscopía indirecta",
        "Tomografía de coherencia óptica (OCT)",
        "Angiografía con fluoresceína (si es necesario)",
        "Evaluación de la mácula y nervio óptico",
        "Detección de anomalías vasculares",
        "Fotografía de fondo de ojo",
      ],
    },
    {
      id: 3,
      name: "Evaluación para Cirugía Refractiva",
      icon: <Shield size={40} />,
      description:
        "Consulta completa para determinar si el paciente es candidato para cirugía refractiva (LASIK, PRK, etc.) para corregir miopía, hipermetropía o astigmatismo.",
      duration: "60-75 minutos",
      price: "$150",
      details: [
        "Topografía corneal",
        "Paquimetría (medición del grosor corneal)",
        "Aberrometría",
        "Pupilometría",
        "Evaluación de la película lagrimal",
        "Simulación de resultados visuales",
        "Consulta detallada sobre opciones quirúrgicas",
      ],
    },
    {
      id: 4,
      name: "Control de Glaucoma",
      icon: <BookOpen size={40} />,
      description:
        "Seguimiento especializado para pacientes con glaucoma o con factores de riesgo, incluyendo mediciones precisas de presión intraocular y evaluación del nervio óptico.",
      duration: "40-50 minutos",
      price: "$100",
      details: [
        "Tonometría de aplanación de Goldmann",
        "Gonioscopia",
        "Paquimetría corneal",
        "Campimetría computarizada",
        "Análisis de la capa de fibras nerviosas",
        "Evaluación del nervio óptico",
        "Ajuste de tratamiento si es necesario",
      ],
    },
  ]

  const faqs = [
    {
      question: "¿Con qué frecuencia debo realizarme un examen visual?",
      answer:
        "Recomendamos un examen visual completo anual para adultos, incluso si no tiene problemas de visión aparentes. Para niños, se recomienda un primer examen a los 6 meses, otro a los 3 años y luego anualmente desde que comienzan la escuela. Las personas con condiciones como diabetes o glaucoma pueden necesitar revisiones más frecuentes según la recomendación de su oftalmólogo.",
    },
    {
      question: "¿Qué debo llevar a mi cita oftalmológica?",
      answer:
        "Es importante traer sus gafas o lentes de contacto actuales, una lista de medicamentos que esté tomando, información sobre su historial médico y ocular, y su tarjeta de seguro médico. Si ha tenido exámenes previos en otro centro, es útil traer esos registros o resultados.",
    },
    {
      question: "¿Cuánto tiempo dura la dilatación de las pupilas después del examen?",
      answer:
        "La dilatación de las pupilas suele durar entre 4 y 6 horas, aunque puede variar según la persona. Durante este tiempo, experimentará sensibilidad a la luz y visión borrosa para objetos cercanos. Recomendamos traer gafas de sol para después del examen y, si es posible, contar con alguien que lo acompañe para conducir de regreso.",
    },
    {
      question: "¿Los exámenes visuales son dolorosos?",
      answer:
        "No, los exámenes visuales no son dolorosos. Algunas pruebas pueden causar una leve incomodidad momentánea, como la tonometría (medición de la presión ocular) o la instilación de gotas para dilatar las pupilas, pero no son procedimientos dolorosos.",
    },
    {
      question: "¿Cómo sé si necesito gafas o lentes de contacto?",
      answer:
        "Durante el examen visual completo, el oftalmólogo realizará pruebas de refracción para determinar si necesita corrección visual. Los síntomas que pueden indicar que necesita gafas incluyen visión borrosa, dolores de cabeza frecuentes, fatiga visual, entrecerrar los ojos para ver mejor, o dificultad para ver de noche.",
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Laura Gómez",
      image: "",
      text: "La atención de la Dra. Martínez fue excepcional. Me explicó detalladamente mi condición y las opciones de tratamiento. Gracias a su intervención, mi visión ha mejorado significativamente.",
      rating: 5,
    },
    {
      id: 2,
      name: "Miguel Sánchez",
      image: "",
      text: "El Dr. Ramírez realizó mi cirugía LASIK y los resultados superaron mis expectativas. El proceso fue rápido, indoloro y la recuperación muy breve. Ahora disfruto de una visión perfecta sin gafas.",
      rating: 5,
    },
    {
      id: 3,
      name: "Ana Rodríguez",
      image: "",
      text: "Llevo años tratándome con la Dra. Martínez por mi retinopatía diabética. Su seguimiento constante y profesionalismo han sido clave para mantener mi visión estable a pesar de mi condición.",
      rating: 4,
    },
  ]

  const toggleFaq = (index) => {
    if (openFaq === index) {
      setOpenFaq(null)
    } else {
      setOpenFaq(index)
    }
  }

  return (
    <div className="servicios-page">
      <section className="servicios-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Servicios Oftalmológicos Especializados</h1>
            <p className="hero-subtitle">
              En VisionTech ofrecemos atención visual integral con tecnología de vanguardia y profesionales altamente
              calificados
            </p>
            <div className="hero-cta">
              <Link to="/citas" className="btn btn-primary">
                Agendar una Cita
              </Link>
              <a href="#servicios" className="btn btn-outline">
                Ver Servicios
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="servicios-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nuestros Servicios</h2>
            <p className="section-subtitle">
              Ofrecemos una amplia gama de servicios oftalmológicos para cuidar la salud visual de toda la familia
            </p>
          </div>

          <div className="servicios-grid">
            {services.map((service) => (
              <div key={service.id} className="servicio-card">
                <div className="servicio-icon">{service.icon}</div>
                <h3 className="servicio-title">{service.name}</h3>
                <p className="servicio-description">{service.description}</p>
                <div className="servicio-meta">
                  <div className="meta-item">
                    <Clock size={16} />
                    <span>{service.duration}</span>
                  </div>
                  <div className="meta-item">
                    <span className="servicio-price">{service.price}</span>
                  </div>
                </div>
                <div className="servicio-details">
                  <h4 className="details-title">El examen incluye:</h4>
                  <ul className="details-list">
                    {service.details.map((detail, index) => (
                      <li key={index} className="detail-item">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to="/citas" className="btn btn-secondary servicio-btn">
                  Agendar Cita
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="equipo-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Nuestro Equipo Médico</h2>
            <p className="section-subtitle">
              Contamos con oftalmólogos especializados y con amplia experiencia en diferentes áreas de la salud visual
            </p>
          </div>

          <div className="equipo-tabs">
            <div className="doctor-tabs">
              {doctors.map((doctor, index) => (
                <button
                  key={doctor.id}
                  className={`doctor-tab ${activeDoctor === index ? "active" : ""}`}
                  onClick={() => setActiveDoctor(index)}
                >
                  <img src={doctor.image || "/placeholder.svg"} alt={doctor.name} className="doctor-tab-img" />
                  <div className="doctor-tab-info">
                    <h3 className="doctor-tab-name">{doctor.name}</h3>
                    <p className="doctor-tab-title">{doctor.title}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="doctor-content">
              {doctors[activeDoctor] && (
                <div className="doctor-profile">
                  <div className="doctor-header">
                    <div className="doctor-image-container">
                      <img src={doctors[activeDoctor].image || "/placeholder.svg"} alt={doctors[activeDoctor].name} className="doctor-image" />
                    </div>
                    <div className="doctor-info">
                      <h3 className="doctor-name">{doctors[activeDoctor].name}</h3>
                      <p className="doctor-title">{doctors[activeDoctor].title}</p>
                      <div className="doctor-languages">
                        <span className="info-label">Idiomas:</span>
                        <span className="info-value">{doctors[activeDoctor].languages.join(", ")}</span>
                      </div>
                      <div className="doctor-actions">
                        <Link to={`/citas?doctor=${doctors[activeDoctor].id}`} className="btn btn-primary">
                          Agendar Cita
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="doctor-bio">
                    <h4 className="bio-title">Biografía</h4>
                    <p className="bio-text">{doctors[activeDoctor].bio}</p>
                  </div>

                  <div className="doctor-details">
                    <div className="detail-column">
                      <div className="detail-section">
                        <h4 className="detail-title">
                          <BookOpen size={18} />
                          Educación
                        </h4>
                        <ul className="detail-list">
                          {doctors[activeDoctor].education.map((item, index) => (
                            <li key={index} className="detail-item">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="detail-section">
                        <h4 className="detail-title">
                          <Award size={18} />
                          Certificaciones
                        </h4>
                        <ul className="detail-list">
                          {doctors[activeDoctor].certifications.map((item, index) => (
                            <li key={index} className="detail-item">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="detail-column">
                      <div className="detail-section">
                        <h4 className="detail-title">
                          <Calendar size={18} />
                          Experiencia Profesional
                        </h4>
                        <ul className="detail-list">
                          {doctors[activeDoctor].experience.map((item, index) => (
                            <li key={index} className="detail-item">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="detail-section">
                        <h4 className="detail-title">
                          <Microscope size={18} />
                          Especialidades
                        </h4>
                        <ul className="detail-list">
                          {doctors[activeDoctor].specialties.map((item, index) => (
                            <li key={index} className="detail-item">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {doctors[activeDoctor].publications.length > 0 && (
                    <div className="doctor-publications">
                      <h4 className="publications-title">Publicaciones Destacadas</h4>
                      <ul className="publications-list">
                        {doctors[activeDoctor].publications.map((item, index) => (
                          <li key={index} className="publication-item">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="testimonios-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Lo que dicen nuestros pacientes</h2>
            <p className="section-subtitle">
              Conoce las experiencias de quienes han confiado en nuestros servicios oftalmológicos
            </p>
          </div>

          <div className="testimonios-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonio-card">
                <div className="testimonio-header">
                  <img src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} className="testimonio-image" />
                  <div className="testimonio-info">
                    <h3 className="testimonio-name">{testimonial.name}</h3>
                    <div className="testimonio-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < testimonial.rating ? "star-filled" : "star-empty"}
                          fill={i < testimonial.rating ? "#f8c51d" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="testimonio-text">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Preguntas Frecuentes</h2>
            <p className="section-subtitle">Respuestas a las dudas más comunes sobre nuestros servicios</p>
          </div>

          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${openFaq === index ? "open" : ""}`}>
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{faq.question}</span>
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">¿Listo para cuidar tu salud visual?</h2>
            <p className="cta-text">
              Agenda una cita con nuestros especialistas y descubre por qué somos la opción preferida en servicios
              oftalmológicos.
            </p>
            <Link to="/citas" className="btn btn-primary cta-btn">
              Agendar una Cita Ahora
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Servicios

