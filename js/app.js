import { icon } from "./icons.js";
import {
  TURNO, FUENTE, REGLA_CENTRAL, AVISO_URGENCIA, PRINCIPIOS, URGENCIA,
  PASOS, CONTROL_FINAL, HECHOS, PREGUNTAS, DUDAS,
} from "./data.js";

const main = document.getElementById("contenido");
const STORE_KEY = "mpf-recepcion-v1";

/* ---------- Estado de la recepción en curso (solo en este navegador) ---------- */

function cargarEstado() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY));
    if (s && typeof s === "object") return { urg: s.urg || {}, checks: s.checks || {} };
  } catch { /* sin almacenamiento disponible: se trabaja en memoria */ }
  return { urg: {}, checks: {} };
}
let estado = cargarEstado();
function guardar() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(estado)); } catch { /* idem */ }
}

/* ---------- Utilidades ---------- */

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
// Normaliza carácter por carácter para que los índices coincidan con el texto original.
const norm = (s) => Array.from(s, (c) => c.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().charAt(0) || c).join("");
const hechoPorId = (id) => HECHOS.find((h) => h.id === id);

let toastTimer;
function toast(msg) {
  const t = document.getElementById("toast");
  t.innerHTML = `${icon("check", "sm")}<span>${esc(msg)}</span>`;
  t.classList.add("on");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("on"), 2400);
}

function telefonoTurno() {
  return TURNO.telefono
    ? `<a href="tel:${esc(TURNO.telefono.replace(/[^\d+]/g, ""))}"><b>${esc(TURNO.telefono)}</b></a>`
    : `<span class="marcador">[Teléfono de turno: a completar por la Unidad Fiscal]</span>`;
}

// Círculos anidados tangentes abajo, en eco del logo institucional.
// Cada anillo representa una pregunta de la entrevista inicial.
function radar(respuestas, opts = {}) {
  const color = (r) => (r === "si" ? "var(--danger)" : r === "no" ? "var(--accent)" : "var(--line-strong)");
  let out = "";
  for (let i = 0; i < 5; i++) {
    const r = 96 - i * 16;
    const cy = 197 - r;
    const st = opts.decorativo ? "currentColor" : color(respuestas[i]);
    const op = opts.decorativo ? 0.25 + i * 0.12 : 1;
    out += i === 4
      ? `<circle cx="100" cy="${cy}" r="${r}" fill="${st}" opacity="${op}"/><circle cx="104" cy="${cy - 12}" r="9" fill="var(--surface)"/>`
      : `<circle cx="100" cy="${cy}" r="${r}" fill="none" stroke="${st}" stroke-width="${opts.decorativo ? 3 : 5}" opacity="${op}"/>`;
  }
  return `<svg class="${opts.cls || ""}" viewBox="0 0 200 200" aria-hidden="true">${out}</svg>`;
}

/* ---------- Vistas ---------- */

function vistaInicio() {
  const urgentes = new Set(["violencia-genero", "integridad-sexual"]);
  return `
  <section class="hero">
    <div>
      <span class="eyebrow">Guía operativa · Versión 2026</span>
      <h1>¿Qué denuncia tenés <em>enfrente</em>?</h1>
      <p class="lead">Todo lo que dice el instructivo de la Procuración General, ordenado para usarlo en el momento: qué preguntar, qué cargar, qué preservar y cuándo llamar al turno.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#/recepcion/1">${icon("list-checks")}Empezar recepción guiada</a>
        <a class="btn btn-ghost" href="#/preguntas">${icon("message-circle-question")}Guía de preguntas</a>
      </div>
      <div class="sello">
        <span class="sello-label">Regla central</span>
        <p>${esc(REGLA_CENTRAL)}</p>
      </div>
    </div>
    <aside class="radar-card" aria-labelledby="radar-t">
      ${radar([], { decorativo: true, cls: "radar-art" })}
      <div>
        <span class="chip danger">${icon("siren", "sm")}Antes que nada</span>
        <h2 id="radar-t">¿Hay riesgo ahora?</h2>
        <p>Cinco preguntas de la entrevista inicial. Si alguna da “sí”, se avisa al turno.</p>
        <ol>
          ${URGENCIA.map((u, i) => `<li><b>${i + 1}</b>${esc(u.q.replace(/^¿|\?$/g, ""))}</li>`).join("")}
        </ol>
      </div>
      <div><a class="btn btn-danger" href="#/urgencia">${icon("siren")}Hacer el chequeo</a></div>
    </aside>
  </section>

  <section class="section" aria-labelledby="ruta-t">
    <div class="section-head">
      <div>
        <span class="eyebrow">Ruta rápida</span>
        <h2 id="ruta-t">Cinco pasos, en este orden</h2>
      </div>
      <p>Cada paso tiene su lista de tareas. Lo que vas tildando queda guardado en esta computadora hasta que arranques una recepción nueva.</p>
    </div>
    <div class="ruta">
      ${PASOS.map((p) => `
        <a class="solapa" data-n="PASO ${p.n}" href="#/recepcion/${p.n}">
          <b>${esc(p.titulo)}</b>
          ${icon("arrow-right")}
        </a>`).join("")}
    </div>
  </section>

  <section class="section" aria-labelledby="hechos-t">
    <div class="section-head">
      <div>
        <span class="eyebrow">Pautas según el tipo de hecho</span>
        <h2 id="hechos-t">Elegí lo que te están contando</h2>
      </div>
      <p>Complementan, y no reemplazan, los modelos específicos, los protocolos vigentes y las órdenes del equipo fiscal.</p>
    </div>
    <div class="hechos">
      ${HECHOS.map((h) => `
        <a class="hecho-card${urgentes.has(h.id) ? " urgente" : ""}" data-tono="${h.tono}" href="#/hecho/${h.id}">
          <span class="badge">${icon(h.icon)}</span>
          <span><b>${esc(h.nombre)}</b><small>${urgentes.has(h.id) ? "Puede requerir aviso inmediato" : `${h.pautas.length} pautas${h.turno.length ? " · consulta al turno" : ""}`}</small></span>
          <span class="go">${icon("chevron-right", "sm")}</span>
        </a>`).join("")}
    </div>
  </section>

  <section class="section" aria-labelledby="dudas-t">
    <div class="section-head">
      <div>
        <span class="eyebrow">Dudas de mostrador</span>
        <h2 id="dudas-t">Lo que más se pregunta</h2>
      </div>
      <a class="btn btn-quiet" href="#/dudas">Ver todas ${icon("arrow-right", "sm")}</a>
    </div>
    ${listaDudas(DUDAS.slice(0, 6))}
  </section>`;
}

function listaDudas(items, abierta) {
  return `<div class="dudas">${items.map((d) => `
    <details class="duda" id="duda-${d.id}" ${d.id === abierta ? "open" : ""}>
      <summary>${icon(d.icon)}<span>${esc(d.q)}</span>${icon("chevron-right", "sm plus")}</summary>
      <div class="resp"><p>${esc(d.r)}</p><span class="ref">Instructivo, punto ${esc(d.ref)}</span></div>
    </details>`).join("")}</div>`;
}

function bloqueUrgencia() {
  const resp = URGENCIA.map((u) => estado.urg[u.id]);
  const nSi = resp.filter((r) => r === "si").length;
  const nResp = resp.filter(Boolean).length;
  const acciones = URGENCIA.filter((u) => estado.urg[u.id] === "si").flatMap((u) => u.acciones);

  let resultado;
  if (nSi > 0) {
    resultado = `
      <div class="urg-result alto" id="urg-res" aria-live="polite">
        ${radar(resp, { cls: "radar-mini" })}
        <span class="chip danger">${nSi} ${nSi === 1 ? "alerta" : "alertas"}</span>
        <h3 style="margin-top:12px">Avisá ya al turno</h3>
        <p>${esc(AVISO_URGENCIA)}</p>
        <div class="urg-acciones">
          <div>
            <h4>Además, según lo que marcaste</h4>
            <ul>${acciones.map((a) => `<li>${icon("chevron-right", "sm")}<span>${esc(a)}</span></li>`).join("")}</ul>
          </div>
        </div>
        <div class="urg-foot">
          <button class="btn btn-danger" type="button" data-turno>${icon("phone")}Datos del turno</button>
        </div>
      </div>`;
  } else if (nResp === URGENCIA.length) {
    resultado = `
      <div class="urg-result bajo" aria-live="polite">
        ${radar(resp, { cls: "radar-mini" })}
        <span class="chip">Sin alertas</span>
        <h3 style="margin-top:12px">No surge urgencia de la entrevista inicial</h3>
        <p>Seguí con la identificación y el registro. Si durante el relato aparece algún riesgo, volvé a este chequeo.</p>
        <div class="urg-foot"><a class="btn btn-primary" href="#/recepcion/2">Ir al paso 2 ${icon("arrow-right", "sm")}</a></div>
      </div>`;
  } else {
    resultado = `
      <div class="urg-result" aria-live="polite">
        ${radar(resp, { cls: "radar-mini" })}
        <span class="chip neutral">${nResp} de ${URGENCIA.length} respondidas</span>
        <h3 style="margin-top:12px">Respondé las cinco</h3>
        <p>Cada anillo es una pregunta. Si alguna da “sí”, acá te aparece qué hacer.</p>
      </div>`;
  }

  return `
    <div class="urg" id="urg">
      <div class="urg-list" role="list">
        ${URGENCIA.map((u, i) => `
          <div class="urg-q" role="listitem" data-r="${estado.urg[u.id] || ""}">
            <span class="n">${i + 1}</span>
            <p id="uq-${u.id}">${esc(u.q)}</p>
            <div class="sino" role="group" aria-labelledby="uq-${u.id}">
              <button type="button" class="si" data-urg="${u.id}" data-val="si" aria-pressed="${estado.urg[u.id] === "si"}">Sí</button>
              <button type="button" class="no" data-urg="${u.id}" data-val="no" aria-pressed="${estado.urg[u.id] === "no"}">No</button>
            </div>
          </div>`).join("")}
        ${nSi > 0 ? `<button type="button" class="urg-strip" data-ver-resultado>${icon("siren", "sm")}${nSi} ${nSi === 1 ? "alerta" : "alertas"}: avisá ya al turno${icon("chevron-right", "sm")}</button>` : ""}
      </div>
      ${resultado}
    </div>`;
}

function vistaUrgencia() {
  return `
    <a class="volver" href="#/">${icon("arrow-left", "sm")}Inicio</a>
    <div class="paso-head" style="margin-top:16px">
      <span class="eyebrow">Entrevista inicial · Punto 2.1</span>
      <h1>Chequeo de urgencia</h1>
      <p class="lead">Una entrevista breve para saber si hay peligro, lesiones o evidencia que pueda perderse. Respondé con lo que te cuenten en los primeros minutos.</p>
    </div>
    <div style="margin-top:32px">${bloqueUrgencia()}</div>`;
}

function progresoPaso(p) {
  if (p.urgencia) return { hechos: Object.keys(estado.urg).length, total: URGENCIA.length };
  const ids = [...(p.checks || []), ...(p.control ? CONTROL_FINAL : [])].map((c) => c.id);
  return { hechos: ids.filter((id) => estado.checks[id]).length, total: ids.length };
}

function rielHTML(actual) {
  return `
    <nav class="riel" aria-label="Pasos de la recepción">
      <h2>Ruta rápida</h2>
      <ol>
        ${PASOS.map((p) => {
          const { hechos, total } = progresoPaso(p);
          const listo = total > 0 && hechos === total;
          return `<li><a href="#/recepcion/${p.n}" class="${listo ? "hecho" : ""}" ${p.n === actual ? 'aria-current="step"' : ""}>
            <span class="bola">${listo && p.n !== actual ? icon("check", "sm") : p.n}</span>
            <span class="rt"><b>${esc(p.corto)}</b><small>${hechos} de ${total}</small></span>
          </a></li>`;
        }).join("")}
      </ol>
      <div class="acciones-riel">
        <button class="btn btn-ghost" type="button" data-reset>${icon("rotate-ccw", "sm")}<span>Nueva recepción</span></button>
      </div>
    </nav>`;
}

function checkHTML(c) {
  return `<li><label class="check">
      <input type="checkbox" data-check="${c.id}" ${estado.checks[c.id] ? "checked" : ""}>
      <span class="caja">${icon("check")}</span>
      <span><b>${esc(c.t)}</b>${c.d ? `<span class="d">${esc(c.d)}</span>` : ""}</span>
    </label></li>`;
}

function bloqueHTML(b) {
  return `<article class="bloque">
    <header>${icon(b.icon)}<h3>${esc(b.t)}</h3></header>
    ${b.d ? `<p>${esc(b.d)}</p>` : ""}
    ${b.lista ? `<ul>${b.lista.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>` : ""}
    ${b.no ? `<ul>${b.no.map((l) => `<li class="no">${esc(l)}</li>`).join("")}</ul>` : ""}
  </article>`;
}

function vistaPaso(n) {
  const p = PASOS.find((x) => x.n === n) || PASOS[0];
  const ant = PASOS.find((x) => x.n === p.n - 1);
  const sig = PASOS.find((x) => x.n === p.n + 1);
  const hechosCheck = (p.checks || []).filter((c) => estado.checks[c.id]).length;
  const hechosControl = CONTROL_FINAL.filter((c) => estado.checks[c.id]).length;

  return `
  <div class="guiada">
    ${rielHTML(p.n)}
    <div>
      <div class="paso-head">
        <span class="eyebrow">Paso ${p.n} de ${PASOS.length}</span>
        <h1>${esc(p.titulo)}</h1>
        <p class="lead">${esc(p.intro)}</p>
      </div>
      <div class="paso-body">
        ${p.urgencia ? `<section><h2>Detección de urgencia</h2>${bloqueUrgencia()}</section>` : ""}

        ${p.hechos ? `<section>
            <h2>¿Qué tipo de hecho es?</h2>
            <div class="elegir-hecho">
              ${HECHOS.map((h) => `<a data-tono="${h.tono}" href="#/hecho/${h.id}?desde=${p.n}">${icon(h.icon)}${esc(h.nombre)}</a>`).join("")}
            </div>
          </section>` : ""}

        ${p.checks ? `<section>
            <h2>${p.n === 3 ? "Contenido mínimo del relato" : "Tareas"} <small data-cuenta="${p.n}">${hechosCheck} de ${p.checks.length}</small></h2>
            <ul class="checks">${p.checks.map(checkHTML).join("")}</ul>
          </section>` : ""}

        ${p.bloques ? `<section>
            ${p.urgencia ? "<h2>Situaciones a tener en cuenta</h2>" : ""}
            <div class="bloques">${p.bloques.map(bloqueHTML).join("")}</div>
          </section>` : ""}

        ${p.nota ? `<div class="sello oro"><span class="sello-label">${esc(p.nota.t)}</span><p>${esc(p.nota.d)}</p></div>` : ""}

        ${p.control ? `<section class="control" aria-labelledby="control-t">
            <div class="control-head">
              <h2 id="control-t">Lista de control final</h2>
              <div class="progreso"><span class="barra"><i style="width:${(hechosControl / CONTROL_FINAL.length) * 100}%"></i></span><span data-control>${hechosControl} de ${CONTROL_FINAL.length}</span></div>
            </div>
            <ul class="checks">${CONTROL_FINAL.map(checkHTML).join("")}</ul>
            <div class="control-foot no-print">
              <button class="btn btn-ghost" type="button" data-print>${icon("printer", "sm")}Imprimir</button>
              <button class="btn btn-quiet" type="button" data-reset>${icon("rotate-ccw", "sm")}<span>Nueva recepción</span></button>
            </div>
          </section>` : ""}
      </div>

      <nav class="paso-nav" aria-label="Navegación entre pasos">
        ${ant ? `<a class="btn btn-ghost" href="#/recepcion/${ant.n}">${icon("arrow-left", "sm")}Paso ${ant.n}</a>` : "<span></span>"}
        ${sig ? `<a class="btn btn-primary" href="#/recepcion/${sig.n}"><span>Paso ${sig.n}<span class="sig-corto">: ${esc(sig.corto)}</span></span>${icon("arrow-right", "sm")}</a>` : `<a class="btn btn-ghost" href="#/">Volver al inicio</a>`}
      </nav>
    </div>
  </div>`;
}

function vistaHecho(id, desde) {
  const h = hechoPorId(id);
  if (!h) return vistaNoEncontrada();
  const otros = HECHOS.filter((x) => x.id !== h.id);
  const volver = desde
    ? `<a class="volver" href="#/recepcion/${desde}">${icon("arrow-left", "sm")}Volver al paso ${desde}</a>`
    : `<a class="volver" href="#/">${icon("arrow-left", "sm")}Todos los tipos de hecho</a>`;

  return `
    ${volver}
    <div class="ficha">
      <div class="ficha-head" data-tono="${h.tono}">
        <span class="badge">${icon(h.icon)}</span>
        <h1>${esc(h.nombre)}</h1>
        <div class="meta">
          <span class="chip">${icon("file-text", "sm")}${esc(h.modelo === "—" ? "Aplica a cualquier hecho" : h.modelo)}</span>
        </div>
      </div>
      <div class="ficha-body" data-tono="${h.tono}">
        <ol class="pautas">${h.pautas.map((p) => `<li>${esc(p)}</li>`).join("")}</ol>
        ${h.instancia ? `<div class="sello" style="margin-top:32px"><span class="sello-label">Instancia</span><p>${esc(h.instancia)}</p></div>` : ""}
        <div style="margin-top:40px">
          <span class="eyebrow">Otros tipos de hecho</span>
          <div class="elegir-hecho otros">
            ${otros.map((o) => `<a data-tono="${o.tono}" href="#/hecho/${o.id}${desde ? `?desde=${desde}` : ""}">${icon(o.icon)}${esc(o.nombre)}</a>`).join("")}
          </div>
        </div>
      </div>
      <aside>
        ${h.turno.length ? `<div class="aside-card turno">
            <h3>${icon("siren", "sm")}Avisá o consultá al turno</h3>
            <ul>${h.turno.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
            <button class="btn btn-danger" type="button" data-turno style="margin-top:16px;width:100%">${icon("phone", "sm")}Datos del turno</button>
          </div>` : ""}
        <div class="aside-card">
          <h3>Para todos los hechos</h3>
          <div class="links">
            <a href="#/urgencia">${icon("siren", "sm")}Chequeo de urgencia</a>
            <a href="#/recepcion/3">${icon("list-checks", "sm")}Contenido mínimo del relato</a>
            <a href="#/preguntas">${icon("message-circle-question", "sm")}Guía breve de preguntas</a>
            <a href="#/recepcion/4">${icon("fingerprint", "sm")}Evidencia y medidas inmediatas</a>
          </div>
        </div>
        <div class="aside-card">
          <h3>Evitar revictimización</h3>
          <p style="font-size:var(--fs-sm);color:var(--ink-soft)">No exigir detalles innecesarios ni reiterar preguntas ya respondidas.</p>
        </div>
      </aside>
    </div>`;
}

function vistaPreguntas() {
  return `
    <div class="paso-head">
      <span class="eyebrow">Punto 9 del instructivo</span>
      <h1>Guía breve de preguntas</h1>
      <p class="lead">Diez ejes para no dejar nada afuera. Primero dejá que la persona cuente libremente; después usá estas preguntas abiertas para completar lo que falte.</p>
    </div>
    <div class="ejes">
      ${PREGUNTAS.map((e, i) => `
        <article class="eje ${norm(e.eje)}">
          <h3><span>${String(i + 1).padStart(2, "0")}</span>${esc(e.eje)}</h3>
          <ul>${e.p.map((q) => `<li>${esc(q)}</li>`).join("")}</ul>
        </article>`).join("")}
    </div>
    <div class="sello oro" style="margin-top:40px">
      <span class="sello-label">Criterio de derivación</span>
      <p>La claridad del relato y la detección temprana de riesgos permiten asignar correctamente el caso, definir su urgencia y orientar las primeras medidas. La denuncia debe ser completa, pero no convertirse en un interrogatorio exhaustivo.</p>
    </div>`;
}

function vistaDudas(abierta) {
  return `
    <div class="paso-head">
      <span class="eyebrow">Dudas de mostrador</span>
      <h1>Situaciones que traban la recepción</h1>
      <p class="lead">Respuestas cortas, tomadas del instructivo. Si la duda incide en la protección de la persona, la evidencia, la competencia o la derivación, consultá al turno.</p>
    </div>
    <div style="margin-top:32px">${listaDudas(DUDAS, abierta)}</div>`;
}

function vistaPrincipios() {
  return `
    <div class="paso-head">
      <span class="eyebrow">Punto 1 del instructivo</span>
      <h1>Finalidad y principios de actuación</h1>
      <p class="lead">El objetivo es obtener un relato útil para la investigación, identificar riesgos, preservar evidencia y asegurar un trato digno.</p>
    </div>
    <div class="principios">
      ${PRINCIPIOS.map((p) => `<article class="principio"><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p></article>`).join("")}
    </div>
    <div class="sello" style="margin-top:40px">
      <span class="sello-label">Regla central</span>
      <p>${esc(REGLA_CENTRAL)}</p>
    </div>
    <div class="bloques" style="margin-top:40px">
      <article class="bloque">
        <header>${icon("info")}<h3>Observaciones institucionales</h3></header>
        <p>Los nombres de modelos, unidades, turnos, canales de comunicación y módulos del sistema deben interpretarse conforme a su denominación y configuración vigentes. Toda modificación institucional posterior prevalece sobre este documento.</p>
      </article>
      <article class="bloque">
        <header>${icon("book-open")}<h3>Fuentes normativas</h3></header>
        <p>Código Penal de la Nación, especialmente arts. 71 y 72 (texto actualizado); Código Procesal Penal de Entre Ríos y protocolos, resoluciones e instrucciones generales vigentes del Ministerio Público Fiscal.</p>
      </article>
    </div>`;
}

/* ---------- Búsqueda ---------- */

const INDICE = [
  ...URGENCIA.map((u) => ({ tipo: "Urgencia", titulo: u.q, texto: u.acciones.join(" "), href: "#/urgencia" })),
  ...PASOS.flatMap((p) => [
    { tipo: `Paso ${p.n}`, titulo: p.titulo, texto: p.intro, href: `#/recepcion/${p.n}` },
    ...(p.checks || []).map((c) => ({ tipo: `Paso ${p.n}`, titulo: c.t, texto: c.d, href: `#/recepcion/${p.n}` })),
    ...(p.bloques || []).map((b) => ({ tipo: `Paso ${p.n}`, titulo: b.t, texto: [b.d, ...(b.lista || []), ...(b.no || [])].filter(Boolean).join(" "), href: `#/recepcion/${p.n}` })),
    ...(p.nota ? [{ tipo: `Paso ${p.n}`, titulo: p.nota.t, texto: p.nota.d, href: `#/recepcion/${p.n}` }] : []),
  ]),
  ...HECHOS.map((h) => ({ tipo: "Tipo de hecho", titulo: h.nombre, texto: [...h.pautas, ...h.turno, h.instancia || ""].join(" "), href: `#/hecho/${h.id}` })),
  ...DUDAS.map((d) => ({ tipo: "Duda", titulo: d.q, texto: d.r, href: `#/dudas/${d.id}` })),
  ...PREGUNTAS.map((e) => ({ tipo: "Pregunta", titulo: e.eje, texto: e.p.join(" "), href: "#/preguntas" })),
  ...PRINCIPIOS.map((p) => ({ tipo: "Principio", titulo: p.t, texto: p.d, href: "#/principios" })),
].map((e) => ({ ...e, n: norm(`${e.titulo} ${e.texto}`) }));

function buscar(q) {
  const terms = norm(q).split(/\s+/).filter((t) => t.length > 1);
  if (!terms.length) return [];
  return INDICE
    .filter((e) => terms.every((t) => e.n.includes(t)))
    .map((e) => ({ ...e, score: terms.reduce((s, t) => s + (norm(e.titulo).includes(t) ? 3 : 1), 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 30);
}

function resaltar(texto, terms) {
  const n = norm(texto);
  const first = terms.map((t) => n.indexOf(t)).filter((i) => i >= 0).sort((a, b) => a - b)[0] ?? 0;
  const start = Math.max(0, first - 60);
  let frag = texto.slice(start, start + 200);
  let nfrag = norm(frag);
  const marcas = [];
  terms.forEach((t) => { let i = nfrag.indexOf(t); while (i >= 0) { marcas.push([i, i + t.length]); i = nfrag.indexOf(t, i + t.length); } });
  marcas.sort((a, b) => a[0] - b[0]);
  let out = "", pos = 0;
  for (const [a, b] of marcas) { if (a < pos) continue; out += esc(frag.slice(pos, a)) + `<mark>${esc(frag.slice(a, b))}</mark>`; pos = b; }
  out += esc(frag.slice(pos));
  return (start > 0 ? "…" : "") + out + (start + 200 < texto.length ? "…" : "");
}

function vistaBuscar(q) {
  const res = buscar(q);
  const terms = norm(q).split(/\s+/).filter((t) => t.length > 1);
  return `
    <label class="msearch">
      <span class="visually-hidden">Buscar en la guía</span>
      ${icon("search")}
      <input type="search" data-msearch value="${esc(q)}" placeholder="Buscar: firma, celular, menor…" autocomplete="off">
    </label>
    <div class="paso-head">
      <span class="eyebrow">Búsqueda</span>
      <h1>${q ? `Resultados para “${esc(q)}”` : "Buscar en la guía"}</h1>
      ${q ? `<p class="lead">${res.length} ${res.length === 1 ? "coincidencia" : "coincidencias"}</p>` : ""}
    </div>
    ${res.length ? `<ul class="resultados">${res.map((r) => `
        <li><a href="${r.href}">
          <span class="tipo">${esc(r.tipo)}</span>
          <span><b>${resaltar(r.titulo, terms)}</b><p>${resaltar(r.texto, terms)}</p></span>
          ${icon("chevron-right", "sm")}
        </a></li>`).join("")}</ul>`
      : `<div class="vacio">${icon("search", "lg")}<b>${q ? "No encontramos nada con esas palabras" : "Escribí qué estás buscando"}</b><p>Probá con una palabra sola, por ejemplo “firma”, “celular”, “menor” o “jurisdicción”.</p></div>`}`;
}

function vistaNoEncontrada() {
  return `<div class="vacio">${icon("compass", "lg")}<b>Esa página no existe</b><p><a href="#/">Volver al inicio</a></p></div>`;
}

/* ---------- Diálogo de turno ---------- */

function abrirTurno() {
  const dlg = document.getElementById("turno");
  dlg.innerHTML = `
    <div class="dlg-head">${icon("siren")}<h2 id="turno-titulo">Consulta al turno</h2>
      <button class="cerrar" type="button" data-cerrar aria-label="Cerrar">${icon("x")}</button></div>
    <div class="dlg-body">
      <p>${esc(AVISO_URGENCIA)}</p>
      <div class="dato">${icon("phone")}<div><small>Teléfono de turno</small>${telefonoTurno()}</div></div>
      <div class="dato">${icon("info")}<div><small>Canal institucional</small>${TURNO.canal ? `<b>${esc(TURNO.canal)}</b>` : `<span class="marcador">[Canal: a completar por la Unidad Fiscal]</span>`}</div></div>
      <a class="btn btn-ghost" href="#/urgencia" data-cerrar>${icon("siren", "sm")}Hacer el chequeo de urgencia</a>
    </div>`;
  dlg.showModal();
}

/* ---------- Router ---------- */

function ruta() {
  const raw = location.hash.replace(/^#/, "") || "/";
  const [path, qs] = raw.split("?");
  const params = new URLSearchParams(qs || "");
  const partes = path.split("/").filter(Boolean);
  return { partes, params };
}

let ultimaRuta = "";
function render() {
  const { partes, params } = ruta();
  const [seccion, arg] = partes;
  let html, nav;
  switch (seccion) {
    case undefined: html = vistaInicio(); nav = "inicio"; break;
    case "urgencia": html = vistaUrgencia(); nav = "recepcion"; break;
    case "recepcion": html = vistaPaso(Number(arg) || 1); nav = "recepcion"; break;
    case "hecho": html = vistaHecho(arg, params.get("desde")); nav = "inicio"; break;
    case "preguntas": html = vistaPreguntas(); nav = "preguntas"; break;
    case "dudas": html = vistaDudas(arg); nav = "dudas"; break;
    case "principios": html = vistaPrincipios(); nav = "principios"; break;
    case "buscar": html = vistaBuscar(params.get("q") || ""); nav = "buscar"; break;
    default: html = vistaNoEncontrada(); nav = "";
  }
  main.innerHTML = `<div class="view">${html}</div>`;
  document.querySelectorAll("[data-nav]").forEach((a) => {
    if (a.dataset.nav === nav) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  const clave = `${seccion}/${arg || ""}`;
  if (seccion === "dudas" && arg) {
    const el = document.getElementById(`duda-${arg}`);
    if (el) { el.classList.add("flash"); el.scrollIntoView({ block: "center" }); }
  } else if (seccion !== "buscar" && clave !== ultimaRuta) {
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }
  ultimaRuta = clave;
  centrarPasoActual();
  const busc = document.getElementById("buscar");
  if (seccion !== "buscar" && document.activeElement !== busc) busc.value = "";
}

/* ---------- Eventos ---------- */

function refrescarUrgencia() {
  const urg = document.getElementById("urg");
  if (urg) urg.outerHTML = bloqueUrgencia();
  refrescarRiel();
}

function refrescarRiel() {
  const riel = document.querySelector(".riel");
  if (!riel) return;
  const lista = riel.querySelector("ol");
  const scroll = lista ? lista.scrollLeft : 0;
  const actual = Number(ruta().partes[1]) || 1;
  riel.outerHTML = rielHTML(actual);
  const nueva = document.querySelector(".riel ol");
  if (nueva) nueva.scrollLeft = scroll;
}

// En celular el riel es una tira horizontal: dejamos visible el paso actual.
function centrarPasoActual() {
  const lista = document.querySelector(".riel ol");
  const activo = lista?.querySelector('[aria-current="step"]');
  if (!lista || !activo || lista.scrollWidth <= lista.clientWidth) return;
  lista.scrollLeft = activo.parentElement.offsetLeft - (lista.clientWidth - activo.offsetWidth) / 2;
}

document.addEventListener("click", (e) => {
  const urgBtn = e.target.closest("[data-urg]");
  if (urgBtn) {
    const { urg, val } = urgBtn.dataset;
    if (estado.urg[urg] === val) delete estado.urg[urg];
    else estado.urg[urg] = val;
    guardar();
    refrescarUrgencia();
    document.querySelector(`[data-urg="${urg}"][data-val="${val}"]`)?.focus();
    return;
  }
  if (e.target.closest("[data-ver-resultado]")) { document.getElementById("urg-res")?.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
  if (e.target.closest("[data-turno]")) { abrirTurno(); return; }
  if (e.target.closest("[data-cerrar]")) { document.getElementById("turno").close(); return; }
  if (e.target.closest("[data-print]")) { window.print(); return; }

  const reset = e.target.closest("[data-reset]");
  if (reset) {
    if (reset.dataset.confirmando) {
      estado = { urg: {}, checks: {} };
      guardar();
      location.hash = "#/recepcion/1";
      render();
      toast("Listo: arrancás una recepción nueva");
    } else {
      reset.dataset.confirmando = "1";
      reset.querySelector("span").textContent = "¿Borrar todo? Tocá de nuevo";
      setTimeout(() => {
        if (!reset.isConnected) return;
        delete reset.dataset.confirmando;
        reset.querySelector("span").textContent = "Nueva recepción";
      }, 3500);
    }
  }
});

document.getElementById("turno").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) e.currentTarget.close();
});

document.addEventListener("change", (e) => {
  const id = e.target.dataset?.check;
  if (!id) return;
  if (e.target.checked) estado.checks[id] = true;
  else delete estado.checks[id];
  guardar();

  const n = Number(ruta().partes[1]) || 1;
  const p = PASOS.find((x) => x.n === n);
  const cuenta = document.querySelector(`[data-cuenta="${n}"]`);
  if (cuenta && p?.checks) cuenta.textContent = `${p.checks.filter((c) => estado.checks[c.id]).length} de ${p.checks.length}`;
  const ctrl = document.querySelector("[data-control]");
  if (ctrl) {
    const h = CONTROL_FINAL.filter((c) => estado.checks[c.id]).length;
    ctrl.textContent = `${h} de ${CONTROL_FINAL.length}`;
    document.querySelector(".barra i").style.width = `${(h / CONTROL_FINAL.length) * 100}%`;
    if (h === CONTROL_FINAL.length && e.target.checked) toast("Lista de control completa");
  }
  refrescarRiel();
});

let buscarTimer;
function alBuscar(valor) {
  clearTimeout(buscarTimer);
  buscarTimer = setTimeout(() => {
    const q = valor.trim();
    if (q) history.replaceState(null, "", `#/buscar?q=${encodeURIComponent(q)}`);
    else if (ruta().partes[0] === "buscar") history.replaceState(null, "", "#/buscar");
    render();
    const m = document.querySelector("[data-msearch]");
    if (m && document.activeElement !== document.getElementById("buscar")) { m.focus(); m.setSelectionRange(m.value.length, m.value.length); }
  }, 180);
}
document.getElementById("buscar").addEventListener("input", (e) => alBuscar(e.target.value));
document.addEventListener("input", (e) => { if (e.target.matches("[data-msearch]")) alBuscar(e.target.value); });
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && !e.target.closest("input, textarea")) { e.preventDefault(); document.getElementById("buscar").focus(); }
});

/* ---------- Arranque ---------- */

document.querySelectorAll("[data-icon]").forEach((el) => { el.outerHTML = icon(el.dataset.icon); });
document.getElementById("pie-fuente").textContent = FUENTE.nombre;
document.getElementById("pie-version").textContent = FUENTE.version;
document.getElementById("pie-aviso").textContent = FUENTE.aviso;

window.addEventListener("hashchange", render);
render();
