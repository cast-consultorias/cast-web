-- Migración 001 — Tabla de leads de la Radiografía CAST™
-- Ejecutar en: Supabase Dashboard > SQL Editor

CREATE TABLE leads_radiografia (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          timestamptz DEFAULT now(),

  -- Datos de contacto (capturados en Portada)
  nombre_completo     text        NOT NULL,
  profesion           text,
  email               text        NOT NULL,
  whatsapp            text        NOT NULL,

  -- Respuestas completas como texto legible
  -- Formato: { "p1": "03. Emprendedor con negocio registrado", "p3_detail": "5.000.000", ... }
  respuestas          jsonb       NOT NULL,

  -- Campo condicional de P3: capital estimado en COP
  capital_estimado_cop numeric,

  -- Resultado del motor de scoring
  score               integer     NOT NULL,          -- 0–100
  nivel               text        NOT NULL           -- 'A' | 'B' | 'C' | 'D'
    CHECK (nivel IN ('A', 'B', 'C', 'D')),

  -- Segmentación
  buyer_persona       text        NOT NULL           -- 'BP01'…'BP05', 'BP04-a', 'BP04-b', 'SIN_CLASIFICAR'
    CHECK (buyer_persona IN ('BP01','BP02','BP03','BP04-a','BP04-b','BP05','SIN_CLASIFICAR')),
  bandera_bp05        boolean     DEFAULT false,      -- true = lead con activos tokenizables

  -- Trazabilidad operativa
  origen              text        DEFAULT 'landing_blueprint',
  estado_crm          text        DEFAULT 'nuevo',   -- actualizado por el agente CRM
  importado_crm       boolean     DEFAULT false       -- true una vez el lead entra al Kanban
);

-- RLS: el público anónimo solo puede insertar, nunca leer.
ALTER TABLE leads_radiografia ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert_public"
  ON leads_radiografia
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Índices para consultas frecuentes del CRM
CREATE INDEX idx_leads_nivel     ON leads_radiografia (nivel);
CREATE INDEX idx_leads_bp05      ON leads_radiografia (bandera_bp05) WHERE bandera_bp05 = true;
CREATE INDEX idx_leads_crm       ON leads_radiografia (estado_crm, importado_crm);
CREATE INDEX idx_leads_created   ON leads_radiografia (created_at DESC);


-- ═══════════════════════════════════════════════════════════════════════════════
-- INTEGRACIÓN CRM CAST — Guía para el agente del Pipeline Kanban
-- ═══════════════════════════════════════════════════════════════════════════════
--
-- Tabla: leads_radiografia
-- Schema: public
--
-- CAMPOS CLAVE:
--   nivel            A=Prioritario (≥80), B=Calificado (60-79), C=Nurturing (40-59), D=No califica (0-39)
--   bandera_bp05     true → lead con activos tokenizables; mover a columna PREMIUM en Kanban
--                    o a columna correspondiente sin importar nivel.
--   buyer_persona    BP01=Salud/Consultorio, BP02=Crédito/Docs, BP03=Ops Artesanal,
--                    BP04-a=Idea+Ahorros, BP04-b=Negocio Informal, BP05=Activos RWA
--   estado_crm       Valores sugeridos: 'nuevo' | 'contactado' | 'en_proceso' | 'ganado' | 'perdido'
--   importado_crm    Poner a true una vez el lead se registre en el Kanban (evita duplicados)
--
-- CONSULTA PARA INGESTIÓN DIARIA:
--   SELECT * FROM leads_radiografia
--   WHERE importado_crm = false
--   ORDER BY created_at DESC;
--
-- ACTUALIZACIÓN POST-IMPORTACIÓN:
--   UPDATE leads_radiografia SET importado_crm = true WHERE id = '<uuid>';
-- ═══════════════════════════════════════════════════════════════════════════════
