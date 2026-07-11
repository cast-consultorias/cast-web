// ─── PREGUNTAS ────────────────────────────────────────────────────────────────
// type: 'single' | 'multi' | 'textarea'
// conditional: { show_field_on: optId, field_type: 'text'|'number', field_label: '...' }
// minLength: para textarea (caracteres mínimos)
// Los textos *palabra* → Merriweather italic dorado en el renderizador.

export const QUESTIONS = [
  {
    id: 'p1',
    type: 'single',
    text: '¿A qué te *dedicas*?',
    options: [
      { id: '01', text: 'Empleado' },
      { id: '02', text: 'Emprendedor sin negocio registrado' },
      { id: '03', text: 'Emprendedor con negocio registrado' },
      { id: '04', text: 'Emprendedor independiente' },
      { id: '05', text: 'Empresario dueño de negocio' },
      { id: '06', text: 'Desempleado, pero con una idea de negocio que quiero realizar' },
    ],
  },
  {
    id: 'p2',
    type: 'single',
    text: '¿Tienes una *idea* de negocio o proyecto, pero no sabes cómo iniciar?',
    options: [
      { id: '01', text: 'Sí, tengo una idea de negocio o proyecto, pero no sé por dónde comenzar' },
      { id: '02', text: 'No, pero quiero crear un plan de negocios que funcione para mí' },
    ],
  },
  {
    id: 'p3',
    type: 'single',
    text: '¿Sabes cuánto *capital* necesitas para desarrollar tu idea de negocio o proyecto?',
    options: [
      { id: '01', text: 'Sí' },
      { id: '02', text: 'No' },
    ],
    conditional: { show_field_on: '01', field_type: 'number', field_label: '¿Cuánto sería ese valor? COP $' },
  },
  {
    id: 'p4',
    type: 'single',
    text: '¿De qué es tu *idea* de negocio o proyecto?',
    options: [
      { id: '01', text: 'Consultorio Médico/Odontológico' },
      { id: '02', text: 'IPS Nivel I, II o III' },
      { id: '03', text: 'Profesional de salud sin consultorio / Telemedicina' },
      { id: '04', text: 'Profesional independiente' },
      { id: '05', text: 'Empresa del sector alimentos' },
      { id: '06', text: 'Empresa del sector Minero/Gas/Petróleo' },
      { id: '07', text: 'Empresa del sector Agropecuario' },
      { id: '08', text: 'Empresa Constructora' },
      { id: '09', text: 'Empresa de servicios financieros' },
      { id: '10', text: 'Empresa Solar' },
      { id: '11', text: 'Empresa Personal' },
      { id: '12', text: 'Empresa Comercial' },
      { id: '13', text: 'Empresa de Turismo' },
      { id: '14', text: 'Otro' },
    ],
    conditional: { show_field_on: '14', field_type: 'text', field_label: '¿Cuál?' },
  },
  {
    id: 'p5',
    type: 'textarea',
    text: '*Describe* aquí tu idea de negocio o proyecto.',
    minLength: 20,
  },
  {
    id: 'p6',
    type: 'single',
    text: '¿Tienes un proyecto o idea de negocio que quieras *tokenizar*?',
    options: [
      { id: '01', text: 'Sí, además tengo el activo real de colateral' },
      { id: '02', text: 'No' },
      { id: '03', text: 'Tengo activos reales, no sé cómo funciona la tokenización, pero me interesa' },
    ],
  },
  {
    id: 'p7',
    type: 'multi',
    text: '¿Cuál es tu *objetivo* con tu idea de negocio o proyecto?',
    options: [
      { id: '01', text: 'Validar viabilidad' },
      { id: '02', text: 'Crear modelo' },
      { id: '03', text: 'Conseguir inversión' },
      { id: '04', text: 'Estructurar empresa' },
      { id: '05', text: 'Escalar negocio' },
      { id: '06', text: 'Otro' },
    ],
  },
  {
    id: 'p8',
    type: 'single',
    text: '¿Experiencia previa con *consultoría*?',
    options: [
      { id: '01', text: 'No, nunca' },
      { id: '02', text: 'Sí, positiva' },
      { id: '03', text: 'Sí, negativa' },
    ],
  },
  {
    id: 'p9',
    type: 'single',
    text: 'Si logras obtener lo que buscas con tu idea de negocio o proyecto, ¿estarías *dispuesto* a invertir para lograrlo?',
    options: [
      { id: '01', text: 'Sí, claro, quiero lograr mi objetivo' },
      { id: '02', text: 'No por ahora' },
    ],
  },
  {
    id: 'p10',
    type: 'single',
    text: '¿Tienes *capital* propio para invertir en tu proyecto o idea de negocio?',
    options: [
      { id: '01', text: 'Sí' },
      { id: '02', text: 'Tengo alguien que me puede financiar' },
      { id: '03', text: 'No, pero lo busco' },
      { id: '04', text: 'No, ahora solo quiero más información' },
    ],
  },
  {
    id: 'p11',
    type: 'single',
    text: '¿Estás *dispuesto* a hacer todo lo necesario por lograr tu idea de negocio o proyecto?',
    options: [
      { id: '01', text: 'Sí, en un 100%' },
      { id: '02', text: 'Sí, en un 70%' },
      { id: '03', text: 'Sí, en un 50%' },
      { id: '04', text: 'Sí, en un 30%' },
      { id: '05', text: 'Tal vez' },
      { id: '06', text: 'No' },
    ],
  },
  {
    id: 'p12',
    type: 'single',
    text: '¿Cómo *impactaría* tu idea de negocio en tus finanzas personales, familiares y estilo de vida?',
    options: [
      { id: '01', text: 'Sería excelente' },
      { id: '02', text: 'Sería muy positivo' },
      { id: '03', text: 'Sería bueno' },
      { id: '04', text: 'Sería normal' },
      { id: '05', text: 'No impactaría nada' },
    ],
  },
  {
    id: 'p13',
    type: 'single',
    text: '¿Tu idea de negocio impactaría positivamente la *sostenibilidad* ESG (Ambiental, Social y Gobernanza)?',
    options: [
      { id: '01', text: 'Sí' },
      { id: '02', text: 'No' },
    ],
  },
  {
    id: 'p14',
    type: 'single',
    text: '¿Tu negocio ya genera ingresos? ¿Cuánto *factura* al mes aproximadamente?',
    options: [
      { id: '01', text: 'Aún no genera ingresos, es una idea' },
      { id: '02', text: 'Menos de $5 millones COP/mes' },
      { id: '03', text: 'Entre $5 y $20 millones COP/mes' },
      { id: '04', text: 'Entre $20 y $50 millones COP/mes' },
      { id: '05', text: 'Más de $50 millones COP/mes' },
    ],
  },
  {
    id: 'p15',
    type: 'single',
    text: '¿Cuál describe mejor tu *obstáculo* principal hoy?',
    options: [
      { id: '01', text: 'Necesito habilitar o estructurar mi consultorio, IPS o servicio de telemedicina' },
      { id: '02', text: 'El banco me rechazó o condicionó un crédito por falta de documentación técnica' },
      { id: '03', text: 'Vendo bien, pero opero artesanalmente: WhatsApp como CRM, Excel, sin automatización' },
      { id: '04', text: 'Mi negocio factura pero es informal y toqué un techo de crecimiento' },
      { id: '05', text: 'Tengo la idea y los ahorros, pero temo invertir sin validarla primero' },
      { id: '06', text: 'Tengo un activo real (minero, agro, energía, inmobiliario) y la banca tradicional dijo no' },
      { id: '07', text: 'Otro' },
    ],
  },
  {
    id: 'p16',
    type: 'single',
    text: 'Si encuentras la ruta correcta, ¿cuándo quieres *iniciar*?',
    options: [
      { id: '01', text: 'De inmediato, este mes' },
      { id: '02', text: 'En 1 a 3 meses' },
      { id: '03', text: 'En 3 a 6 meses' },
      { id: '04', text: 'En más de 6 meses' },
      { id: '05', text: 'Por ahora solo estoy explorando' },
    ],
  },
  {
    id: 'p17',
    type: 'single',
    text: '¿Qué rango de *inversión* podrías destinar a ejecutar una ruta clara y viable?',
    options: [
      { id: '01', text: 'Menos de $2.5 millones COP' },
      { id: '02', text: 'Entre $2.5 y $8 millones COP' },
      { id: '03', text: 'Entre $8 y $18 millones COP' },
      { id: '04', text: 'Más de $18 millones COP' },
      { id: '05', text: 'Prefiero conocer primero el diagnóstico' },
    ],
  },
]

// ─── MOTOR DE SCORING ─────────────────────────────────────────────────────────
// Suma máxima: 7+5+3+12+12+8+5+2+18+6+10+12 = 100
const SCORING = {
  p1:  { '01': 2, '02': 4, '03': 6, '04': 5, '05': 7, '06': 1 },
  p6:  { '01': 5, '02': 2, '03': 4 },
  p8:  { '01': 2, '02': 3, '03': 1 },
  p9:  { '01': 12, '02': 0 },
  p10: { '01': 12, '02': 9, '03': 4, '04': 0 },
  p11: { '01': 8, '02': 6, '03': 4, '04': 2, '05': 1, '06': 0 },
  p12: { '01': 5, '02': 4, '03': 3, '04': 1, '05': 0 },
  p13: { '01': 2, '02': 0 },
  p14: { '01': 2, '02': 6, '03': 11, '04': 15, '05': 18 },
  p15: { '01': 6, '02': 6, '03': 5, '04': 5, '05': 2, '06': 6, '07': 3 },
  p16: { '01': 10, '02': 8, '03': 5, '04': 2, '05': 0 },
  p17: { '01': 3, '02': 7, '03': 10, '04': 12, '05': 4 },
}

// Test profiles (internos):
// BP02 ideal:  p1='03'(6)+p6='01'(5)+p8='02'(3)+p9='01'(12)+p10='01'(12)+p11='01'(8)+p12='01'(5)+p13='01'(2)+p14='04'(15)+p15='02'(6)+p16='01'(10)+p17='04'(12) = 96 → A
// BP03 medio:  p1='03'(6)+p6='02'(2)+p8='02'(3)+p9='01'(12)+p10='02'(9)+p11='02'(6)+p12='02'(4)+p13='01'(2)+p14='03'(11)+p15='03'(5)+p16='02'(8)+p17='03'(10) = 78 → B
// BP04-a:      p1='06'(1)+p6='02'(2)+p8='01'(2)+p9='01'(12)+p10='03'(4)+p11='02'(6)+p12='02'(4)+p13='01'(2)+p14='01'(2)+p15='05'(2)+p16='02'(8)+p17='02'(7) = 52 → C
// Curioso s/K: p1='01'(2)+p6='02'(2)+p8='01'(2)+p9='02'(0)+p10='04'(0)+p11='05'(1)+p12='04'(1)+p13='02'(0)+p14='01'(2)+p15='05'(2)+p16='04'(2)+p17='05'(4) = 18 → D

const BP_MAP = {
  '01': 'BP01', '02': 'BP02', '03': 'BP03',
  '04': 'BP04-b', '05': 'BP04-a', '06': 'BP05', '07': 'SIN_CLASIFICAR',
}

export function calculateScore(respuestas) {
  return Object.entries(SCORING).reduce((total, [key, map]) => {
    return total + (map[respuestas[key]] ?? 0)
  }, 0)
}

export function getLevel(score) {
  if (score >= 80) return 'A'
  if (score >= 60) return 'B'
  if (score >= 40) return 'C'
  return 'D'
}

export function getBuyerPersona(respuestas) {
  return BP_MAP[respuestas.p15] ?? 'SIN_CLASIFICAR'
}

export function getBanderaBP05(respuestas) {
  return respuestas.p6 === '01' || respuestas.p6 === '03' || respuestas.p15 === '06'
}

export function buildRespuestasText(respuestas) {
  const result = {}
  QUESTIONS.forEach(q => {
    const val = respuestas[q.id]
    if (val === undefined || val === null || val === '') return

    if (q.type === 'multi' && Array.isArray(val)) {
      result[q.id] = val
        .map(id => {
          const opt = q.options.find(o => o.id === id)
          return opt ? `${id}. ${opt.text}` : id
        })
        .join('; ')
    } else if (q.type === 'textarea') {
      result[q.id] = val
    } else {
      const opt = q.options?.find(o => o.id === val)
      result[q.id] = opt ? `${val}. ${opt.text}` : val
    }

    const detail = respuestas[`${q.id}_detail`]
    if (detail) result[`${q.id}_detail`] = String(detail)
  })
  return result
}
