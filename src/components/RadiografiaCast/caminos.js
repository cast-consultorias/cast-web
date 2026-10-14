// ─── LOS CUATRO CAMINOS DE LA RADIOGRAFÍA CAST™ (14-oct-2026) ────────────────
//
// Carlos: "una cosa son los emprendedores, otra los empresarios con un negocio
// propio, otra los profesionales, otra los negocios como el de Daymer". La
// primera pregunta decide el camino y a cada persona solo le sale el suyo.
//
// - El perfil sale del Estudio de Mercado v4 (8 buyer personas: BP01-a,
//   BP01-b, BP02, BP03, BP04-a, BP04-b, BP05, BP06).
// - El puntaje (0–100) ya NO decide quién agenda: la Radiografía misma es el
//   filtro y todos llegan a Cal.com. Sirve para ordenar la atención.
// - Cada perfil trae quién lo atiende y qué ofrecerle (la "ruta de oferta" del
//   estudio), para que llegue al CRM listo para Stefanny, Mateo o Carlos.
//
// El camino de emprendedor usa las 17 preguntas de siempre (questions.js).

import { QUESTIONS, calculateScore, getBanderaBP05 } from './questions'

export const PREGUNTA_CAMINO = {
  id: 'camino',
  type: 'single',
  text: '¿Cómo te *describes* mejor?',
  options: [
    { id: '01', text: 'Tengo una idea o un emprendimiento que estoy arrancando' },
    { id: '02', text: 'Soy profesional de la salud (médico, odontólogo, especialista) y quiero abrir o hacer crecer mi práctica' },
    { id: '03', text: 'Tengo un negocio o empresa que ya opera y quiero crecer, ordenarlo o conseguir capital' },
    { id: '04', text: 'Trabajo en una institución o empresa (IPS, clínica, colegio, inmobiliaria, hotel…) y buscamos mejorar la atención, las ventas o la facturación' },
  ],
}

const CAMINO_POR_OPCION = { '01': 'emprendedor', '02': 'profesional', '03': 'empresario', '04': 'institucion' }
export const caminoDe = (respuestas) => CAMINO_POR_OPCION[respuestas.camino] ?? null

// ─── Preguntas que se repiten entre caminos ─────────────────────────────────
const ubicacion = (id) => ({
  id,
  type: 'single',
  text: '¿Dónde *operas*?',
  options: [
    { id: '01', text: 'Barranquilla' },
    { id: '02', text: 'Cartagena o Santa Marta' },
    { id: '03', text: 'Otra ciudad de Colombia' },
    { id: '04', text: 'Estados Unidos' },
    { id: '05', text: 'España' },
    { id: '06', text: 'Otro país' },
  ],
})
const UBICACION = {
  '01': { pais: '🇨🇴 Colombia', ciudad: 'Barranquilla' },
  '02': { pais: '🇨🇴 Colombia', ciudad: 'Cartagena o Santa Marta' },
  '03': { pais: '🇨🇴 Colombia', ciudad: null },
  '04': { pais: '🇺🇸 Estados Unidos', ciudad: null },
  '05': { pais: '🇪🇸 España', ciudad: null },
  '06': { pais: 'Otro país', ciudad: null },
}

const cuando = (id) => ({
  id,
  type: 'single',
  text: 'Si encuentras la ruta correcta, ¿cuándo quieres *iniciar*?',
  options: [
    { id: '01', text: 'De inmediato, este mes' },
    { id: '02', text: 'En 1 a 3 meses' },
    { id: '03', text: 'En 3 a 6 meses' },
    { id: '04', text: 'En más de 6 meses' },
    { id: '05', text: 'Por ahora solo estoy explorando' },
  ],
})
const PTS_CUANDO = { '01': 20, '02': 15, '03': 10, '04': 5, '05': 0 }

const inversion = (id) => ({
  id,
  type: 'single',
  text: '¿Qué rango de *inversión* podrías destinar a ejecutar una ruta clara y viable?',
  options: [
    { id: '01', text: 'Menos de $2,5 millones COP (≈ US$600)' },
    { id: '02', text: 'Entre $2,5 y $8 millones COP (≈ US$600 – 2.000)' },
    { id: '03', text: 'Entre $8 y $18 millones COP (≈ US$2.000 – 4.500)' },
    { id: '04', text: 'Más de $18 millones COP (≈ US$4.500)' },
    { id: '05', text: 'Prefiero conocer primero el diagnóstico' },
  ],
})
const PTS_INVERSION = { '01': 5, '02': 10, '03': 15, '04': 20, '05': 8 }

const facturacion = (id, sujeto) => ({
  id,
  type: 'single',
  text: `¿Cuánto *factura* ${sujeto} al mes aproximadamente?`,
  options: [
    { id: '01', text: 'Aún no genera ingresos' },
    { id: '02', text: 'Menos de $5 millones COP' },
    { id: '03', text: 'Entre $5 y $20 millones COP' },
    { id: '04', text: 'Entre $20 y $50 millones COP' },
    { id: '05', text: 'Entre $50 y $200 millones COP' },
    { id: '06', text: 'Más de $200 millones COP' },
  ],
})

// ─── PROFESIONAL DE LA SALUD · BP01-a ────────────────────────────────────────
const PROFESIONAL = [
  { id: 'pr1', type: 'text', text: '¿Cuál es tu *profesión* o especialidad?', placeholder: 'Ej: Médica internista, odontólogo, fisioterapeuta…', minLength: 3 },
  {
    id: 'pr2', type: 'single', text: '¿En qué *momento* estás?',
    options: [
      { id: '01', text: 'Voy a abrir mi consultorio' },
      { id: '02', text: 'Ya tengo consultorio y quiero crecer' },
      { id: '03', text: 'Quiero ofrecer telemedicina' },
      { id: '04', text: 'Me voy a asociar para crear una IPS' },
      { id: '05', text: 'Trabajo como empleado y quiero independizarme' },
    ],
  },
  {
    id: 'pr3', type: 'single', text: '¿Tu consultorio está *habilitado* en el REPS?',
    options: [
      { id: '01', text: 'Sí, está habilitado' },
      { id: '02', text: 'Está en trámite' },
      { id: '03', text: 'Todavía no' },
      { id: '04', text: 'No sé qué necesito para habilitarlo' },
    ],
  },
  {
    id: 'pr4', type: 'single', text: '¿Tu software de historia clínica genera y transmite el *RDA* (Resolución 1888 de 2025)?',
    options: [
      { id: '01', text: 'Sí, está certificado' },
      { id: '02', text: 'Tengo software, pero no sé si cumple' },
      { id: '03', text: 'No tengo software de historia clínica' },
      { id: '04', text: 'No sé qué es el RDA' },
    ],
  },
  {
    id: 'pr5', type: 'multi', text: '¿Por dónde te *contactan* tus pacientes?',
    options: [
      { id: '01', text: 'WhatsApp' },
      { id: '02', text: 'Llamadas' },
      { id: '03', text: 'Instagram o Facebook' },
      { id: '04', text: 'Correo' },
      { id: '05', text: 'Página web' },
      { id: '06', text: 'Plataformas como Doctoralia' },
      { id: '07', text: 'Referidos' },
    ],
  },
  {
    id: 'pr6', type: 'single', text: '¿Cuántos *pacientes* atiendes al mes?',
    options: [
      { id: '01', text: 'Aún no atiendo' },
      { id: '02', text: 'Menos de 50' },
      { id: '03', text: 'Entre 50 y 150' },
      { id: '04', text: 'Entre 150 y 400' },
      { id: '05', text: 'Más de 400' },
    ],
  },
  {
    id: 'pr7', type: 'single', text: '¿Quién te *agenda* las citas hoy?',
    options: [
      { id: '01', text: 'Yo mismo, desde mi celular' },
      { id: '02', text: 'Una asistente o secretaria' },
      { id: '03', text: 'Un software de agenda' },
      { id: '04', text: 'Nadie de forma organizada' },
    ],
  },
  {
    id: 'pr8', type: 'single', text: '¿Cuál es tu *obstáculo* principal hoy?',
    options: [
      { id: '01', text: 'La habilitación y los requisitos legales' },
      { id: '02', text: 'No alcanzo a contestar ni a agendar a todos' },
      { id: '03', text: 'Pacientes que no confirman o no llegan' },
      { id: '04', text: 'Cobros, facturación electrónica y RIPS' },
      { id: '05', text: 'Conseguir más pacientes particulares' },
      { id: '06', text: 'Financiar equipos o el local' },
    ],
  },
  facturacion('pr9', 'tu práctica'),
  ubicacion('pr10'),
  cuando('pr11'),
  inversion('pr12'),
  { id: 'pr13', type: 'textarea', text: 'Cuéntanos tu *caso*: qué quieres lograr y qué te lo impide.', minLength: 20, placeholder: 'Cuéntanos sobre tu práctica…' },
]

// ─── EMPRESARIO · BP02, BP03, BP04-b, BP05 (y BP06 si el dolor es atención) ─
const EMPRESARIO = [
  { id: 'em1', type: 'text', text: '¿Cómo se llama tu *empresa* o negocio?', placeholder: 'Nombre del negocio', minLength: 2 },
  {
    id: 'em2', type: 'single', text: '¿A qué *sector* pertenece?',
    options: [
      { id: '01', text: 'Comercio' },
      { id: '02', text: 'Alimentos y restaurantes' },
      { id: '03', text: 'Construcción e inmobiliario' },
      { id: '04', text: 'Turismo y hotelería' },
      { id: '05', text: 'Agropecuario' },
      { id: '06', text: 'Minería, gas, petróleo o energía' },
      { id: '07', text: 'Servicios profesionales' },
      { id: '08', text: 'Manufactura' },
      { id: '09', text: 'Salud' },
      { id: '10', text: 'Educación' },
      { id: '11', text: 'Transporte y logística' },
      { id: '12', text: 'Otro' },
    ],
  },
  ubicacion('em3'),
  {
    id: 'em4', type: 'single', text: '¿Hace cuánto *opera* tu negocio?',
    options: [
      { id: '01', text: 'Menos de 1 año' },
      { id: '02', text: 'Entre 1 y 3 años' },
      { id: '03', text: 'Entre 3 y 10 años' },
      { id: '04', text: 'Más de 10 años' },
    ],
  },
  {
    id: 'em5', type: 'single', text: '¿Tu negocio está *formalizado*?',
    options: [
      { id: '01', text: 'Sí, con Cámara de Comercio y RUT' },
      { id: '02', text: 'Tengo RUT, pero no empresa registrada' },
      { id: '03', text: 'No, opero de manera informal' },
    ],
  },
  facturacion('em6', 'tu negocio'),
  {
    id: 'em7', type: 'single', text: '¿Cuántas *personas* trabajan en tu negocio?',
    options: [
      { id: '01', text: '1 o 2' },
      { id: '02', text: 'Entre 3 y 10' },
      { id: '03', text: 'Entre 11 y 50' },
      { id: '04', text: 'Más de 50' },
    ],
  },
  {
    id: 'em8', type: 'single', text: '¿Cuál describe mejor tu *obstáculo* principal hoy?',
    options: [
      { id: '01', text: 'El banco me rechazó o condicionó un crédito' },
      { id: '02', text: 'Vendo bien, pero opero artesanalmente: WhatsApp como CRM, Excel, sin sistema' },
      { id: '03', text: 'Mi negocio factura, pero es informal y toqué un techo de crecimiento' },
      { id: '04', text: 'Tengo un activo real (minero, agro, energía, inmobiliario) y la banca no me financia' },
      { id: '05', text: 'Nos escriben y nos llaman más de lo que alcanzamos a contestar' },
      { id: '06', text: 'Mi contabilidad, cartera y finanzas no están en orden' },
      { id: '07', text: 'Otro' },
    ],
    conditional: { show_field_on: '07', field_type: 'text', field_label: '¿Cuál?' },
  },
  {
    id: 'em9', type: 'multi', text: '¿Qué *usas* hoy para operar?',
    options: [
      { id: '01', text: 'WhatsApp Business' },
      { id: '02', text: 'Excel u hojas de cálculo' },
      { id: '03', text: 'Un CRM' },
      { id: '04', text: 'Software contable (Siigo, Alegra u otro)' },
      { id: '05', text: 'Facturación electrónica' },
      { id: '06', text: 'Nada en particular' },
    ],
  },
  {
    id: 'em10', type: 'single', text: '¿Tienes un *activo* real que quieras usar para conseguir capital?',
    options: [
      { id: '01', text: 'Sí, y tengo el activo como colateral' },
      { id: '02', text: 'No' },
      { id: '03', text: 'Tengo activos y me interesa saber cómo funciona la tokenización' },
    ],
  },
  cuando('em11'),
  inversion('em12'),
  { id: 'em13', type: 'textarea', text: '*Describe* tu negocio y qué quieres lograr.', minLength: 20, placeholder: 'Cuéntanos sobre tu negocio…' },
]

// ─── INSTITUCIÓN O EMPRESA · BP01-b (salud) o BP06 (alto volumen) ────────────
const INSTITUCION = [
  { id: 'in1', type: 'text', text: '¿Cómo se llama la *institución* o empresa?', placeholder: 'Nombre de la institución', minLength: 2 },
  {
    id: 'in2', type: 'single', text: '¿Qué *tipo* de institución es?',
    options: [
      { id: '01', text: 'IPS, clínica u hospital' },
      { id: '02', text: 'Centro médico u odontológico con varios profesionales' },
      { id: '03', text: 'Laboratorio clínico o centro de imágenes' },
      { id: '04', text: 'Colegio, universidad o academia' },
      { id: '05', text: 'Inmobiliaria o constructora' },
      { id: '06', text: 'Hotel, turismo o restaurante' },
      { id: '07', text: 'Concesionario o comercio' },
      { id: '08', text: 'Servicios profesionales' },
      { id: '09', text: 'Otro' },
    ],
    conditional: { show_field_on: '09', field_type: 'text', field_label: '¿Cuál?' },
  },
  {
    id: 'in3', type: 'single', text: '¿Cuál es tu *rol* en la institución?',
    options: [
      { id: '01', text: 'Dueño, gerente o representante legal' },
      { id: '02', text: 'Directivo (dirección, administración, finanzas)' },
      { id: '03', text: 'Líder de un área (atención al usuario, admisiones, comercial)' },
      { id: '04', text: 'Colaborador del área' },
    ],
  },
  ubicacion('in4'),
  {
    id: 'in5', type: 'single', text: '¿Cuántas *sedes* tienen?',
    options: [
      { id: '01', text: 'Una' },
      { id: '02', text: 'Entre 2 y 3' },
      { id: '03', text: 'Entre 4 y 10' },
      { id: '04', text: 'Más de 10' },
    ],
  },
  {
    id: 'in6', type: 'multi', text: '¿Por dónde los *contactan* sus clientes, pacientes o familias?',
    options: [
      { id: '01', text: 'WhatsApp' },
      { id: '02', text: 'Llamadas o conmutador' },
      { id: '03', text: 'Instagram o Facebook' },
      { id: '04', text: 'Correo' },
      { id: '05', text: 'Formularios de la página web' },
      { id: '06', text: 'Portales o plataformas (inmobiliarios, de citas, de reservas)' },
    ],
  },
  {
    id: 'in7', type: 'single', text: '¿Cuántas *consultas* reciben al mes, sumando todos los canales?',
    options: [
      { id: '01', text: 'Menos de 300' },
      { id: '02', text: 'Entre 300 y 1.000' },
      { id: '03', text: 'Entre 1.000 y 5.000' },
      { id: '04', text: 'Más de 5.000' },
      { id: '05', text: 'No lo sabemos' },
    ],
  },
  {
    id: 'in8', type: 'single', text: '¿Qué pasa con quien escribe o llama *fuera de horario*?',
    options: [
      { id: '01', text: 'Nadie le contesta hasta el día siguiente' },
      { id: '02', text: 'Recibe un mensaje automático' },
      { id: '03', text: 'Alguien contesta desde su celular' },
      { id: '04', text: 'Atendemos las 24 horas' },
    ],
  },
  {
    id: 'in9', type: 'multi', text: '¿Qué *sistemas* usan hoy?',
    options: [
      { id: '01', text: 'Un CRM (Follow Up Boss, HubSpot u otro)' },
      { id: '02', text: 'Software de historia clínica, académico o del sector' },
      { id: '03', text: 'Software contable (Siigo u otro)' },
      { id: '04', text: 'Agenda en línea' },
      { id: '05', text: 'Excel u hojas de cálculo' },
      { id: '06', text: 'Ninguno en particular' },
    ],
  },
  {
    id: 'in10', type: 'single', text: '¿Qué les *duele* más hoy?',
    options: [
      { id: '01', text: 'No alcanzamos a contestar a todos y perdemos clientes' },
      { id: '02', text: 'Agendar y confirmar citas o visitas' },
      { id: '03', text: 'Los leads de la publicidad no tienen seguimiento' },
      { id: '04', text: 'Glosas, facturación o cartera con EPS o aseguradoras' },
      { id: '05', text: 'Contabilidad, cobranza y control financiero' },
      { id: '06', text: 'Habilitación, RDA o cumplimiento normativo' },
      { id: '07', text: 'Otro' },
    ],
    conditional: { show_field_on: '07', field_type: 'text', field_label: '¿Cuál?' },
  },
  {
    id: 'in11', type: 'single', text: '¿Cómo se toma la *decisión* de contratar algo así?',
    options: [
      { id: '01', text: 'La tomo yo' },
      { id: '02', text: 'La tomo junto con la gerencia o la junta' },
      { id: '03', text: 'Yo lo presento y otra persona decide' },
      { id: '04', text: 'Por ahora estamos explorando' },
    ],
  },
  cuando('in12'),
  {
    id: 'in13', type: 'single', text: '¿Qué *presupuesto mensual* podrían destinar?',
    options: [
      { id: '01', text: 'Menos de $1 millón COP (≈ US$250)' },
      { id: '02', text: 'Entre $1 y $3 millones COP (≈ US$250 – 750)' },
      { id: '03', text: 'Entre $3 y $8 millones COP (≈ US$750 – 2.000)' },
      { id: '04', text: 'Más de $8 millones COP (≈ US$2.000)' },
      { id: '05', text: 'Prefiero conocer primero el diagnóstico' },
    ],
  },
  { id: 'in14', type: 'textarea', text: 'Cuéntanos qué quieren *resolver*.', minLength: 20, placeholder: 'Cuéntanos qué está pasando hoy…' },
]

export const CAMINOS = {
  emprendedor: { etiqueta: 'Emprendedor', preguntas: QUESTIONS },
  profesional: { etiqueta: 'Profesional de la salud', preguntas: PROFESIONAL },
  empresario: { etiqueta: 'Empresario', preguntas: EMPRESARIO },
  institucion: { etiqueta: 'Institución o empresa', preguntas: INSTITUCION },
}

/** Las preguntas que se muestran: la del camino y, cuando ya se eligió, las del camino. */
export function preguntasDe(respuestas) {
  const c = caminoDe(respuestas)
  return [PREGUNTA_CAMINO, ...(c ? CAMINOS[c].preguntas : [])]
}

// ─── A QUIÉN Y QUÉ (ruta de oferta del Estudio de Mercado v4) ────────────────
const RESPONSABLE = {
  'BP06': 'Mateo Herrera', 'BP03': 'Mateo Herrera',
  'BP01-b': 'Carlos Suárez', 'BP05': 'Carlos Suárez',
}
const OFERTA = {
  'BP01-a': 'Ruta de habilitación + LATIDO (RDA y agenda) + CAST Voice Starter',
  'BP01-b': 'PULSO / LATIDO (RDA, auditoría preventiva de glosas) + CAST AI Workforce',
  'BP02': 'Estructuración financiera y estudio de viabilidad para crédito',
  'BP03': 'CAST Gravedad (sistema a la medida) + CAST AI Workforce',
  'BP04-a': 'Blueprint tier Emprendedor: validar la idea antes de invertir',
  'BP04-b': 'Formalización y estructura del negocio',
  'BP05': 'Tokenización: Blueprint Session Premium (filtro de 5 criterios)',
  'BP06': 'CAST AI Workforce (plan CAST Voice) + implementación',
}

const nivelDe = (score) => (score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : 'D')
const pts = (tabla, valor) => tabla[valor] ?? 0
const textoDe = (pregunta, valor) => pregunta.options?.find((o) => o.id === valor)?.text ?? null

/**
 * Todo lo que se calcula al terminar: puntaje, nivel, perfil, a quién y qué
 * ofrecerle, y los datos de la empresa para la tarjeta del CRM.
 */
export function evaluar(respuestas) {
  const camino = caminoDe(respuestas)
  const r = respuestas
  let score = 0
  let bp = 'SIN_CLASIFICAR'
  let bandera = false
  const datos = { empresa: null, cargo: null, sector: null, pais: null, ciudad: null }
  const extras = []

  if (camino === 'emprendedor') {
    score = calculateScore(r)
    bandera = getBanderaBP05(r)
    const MAPA = { '01': 'BP01-a', '02': 'BP02', '03': 'BP03', '04': 'BP04-b', '05': 'BP04-a', '06': 'BP05', '07': 'BP04-a' }
    bp = MAPA[r.p15] ?? 'BP04-a'
    datos.sector = textoDe(QUESTIONS.find((q) => q.id === 'p4'), r.p4)
  }

  if (camino === 'profesional') {
    score =
      pts({ '01': 8, '02': 10, '03': 8, '04': 10, '05': 6 }, r.pr2) +
      pts({ '01': 3, '02': 4, '03': 5, '04': 5 }, r.pr3) +
      pts({ '01': 0, '02': 4, '03': 8, '04': 12, '05': 15 }, r.pr6) +
      pts({ '01': 2, '02': 5, '03': 10, '04': 15, '05': 18, '06': 20 }, r.pr9) +
      pts(PTS_CUANDO, r.pr11) + pts(PTS_INVERSION, r.pr12) +
      pts({ '01': 7, '02': 7, '03': 6, '04': 7, '05': 5, '06': 5 }, r.pr8)
    bp = 'BP01-a'
    datos.sector = 'Salud'
    datos.cargo = r.pr1 || null
    Object.assign(datos, UBICACION[r.pr10] ?? {})
    if (r.pr8 === '04') extras.push('PULSO: facturación electrónica y RIPS')
  }

  if (camino === 'empresario') {
    score =
      pts({ '01': 2, '02': 6, '03': 11, '04': 15, '05': 20, '06': 25 }, r.em6) +
      pts({ '01': 3, '02': 6, '03': 8, '04': 10 }, r.em7) +
      pts({ '01': 5, '02': 3, '03': 2 }, r.em5) +
      pts(PTS_CUANDO, r.em11) + pts(PTS_INVERSION, r.em12) +
      pts({ '01': 7, '02': 7, '03': 6, '04': 7, '05': 7, '06': 7, '07': 4 }, r.em8)
    bandera = r.em10 === '01' || r.em10 === '03' || r.em8 === '04'
    if (bandera) score += 3
    score = Math.min(score, 100)
    const MAPA = { '01': 'BP02', '02': 'BP03', '03': 'BP04-b', '04': 'BP05', '05': 'BP06', '06': 'BP03' }
    bp = MAPA[r.em8] ?? (bandera ? 'BP05' : 'BP03')
    datos.empresa = r.em1 || null
    datos.sector = textoDe(EMPRESARIO[1], r.em2)
    datos.cargo = 'Dueño del negocio'
    Object.assign(datos, UBICACION[r.em3] ?? {})
    if (r.em8 === '06') extras.push('Daniela: contabilidad y cartera')
  }

  if (camino === 'institucion') {
    score =
      pts({ '01': 4, '02': 7, '03': 9, '04': 10 }, r.in5) +
      pts({ '01': 6, '02': 12, '03': 17, '04': 20, '05': 8 }, r.in7) +
      pts({ '01': 10, '02': 7, '03': 5, '04': 2 }, r.in8) +
      pts({ '01': 15, '02': 12, '03': 9, '04': 4 }, r.in11) +
      pts(PTS_CUANDO, r.in12) +
      pts({ '01': 5, '02': 9, '03': 12, '04': 15, '05': 7 }, r.in13) +
      pts({ '01': 10, '02': 9, '03': 9, '04': 10, '05': 8, '06': 9, '07': 5 }, r.in10)
    const salud = ['01', '02', '03'].includes(r.in2)
    bp = salud ? 'BP01-b' : 'BP06'
    datos.empresa = r.in1 || null
    datos.sector = r.in2 === '09' && r.in2_detail ? r.in2_detail : textoDe(INSTITUCION[1], r.in2)
    datos.cargo = textoDe(INSTITUCION[2], r.in3)
    Object.assign(datos, UBICACION[r.in4] ?? {})
    if (r.in10 === '04') extras.push('PULSO: auditoría preventiva de glosas y cartera')
    if (r.in10 === '05') extras.push('Daniela: contabilidad y cobranza')
    if (r.in10 === '06') extras.push('LATIDO: habilitación y RDA')
    if (r.in11 === '03') extras.push('Quien respondió presenta el proyecto a quien decide: preparar material para la gerencia')
  }

  return {
    camino,
    score,
    nivel: nivelDe(score),
    buyerPersona: bp,
    banderaBP05: bandera,
    responsable: RESPONSABLE[bp] ?? 'Stefanny Fontalvo',
    ofertas: [OFERTA[bp], ...extras].filter(Boolean).join(' · '),
    ...datos,
  }
}
