/* Un planeta, un futuro · lógica de la página. Todo va dentro de una función para no crear variables globales. */
(() => {
const $ = id => document.getElementById(id);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ===== Íconos SVG (trazos simples) ===== */
const P = {
 users:'<circle cx="9" cy="8" r="3"/><path d="M3 20c0-4 3-6 6-6s6 2 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14c3 0 5 2 5 6"/>',
 tree:'<path d="M12 21v-6M12 3l6 8h-3l4 6H5l4-6H6z"/>',
 link:'<path d="M10 14a4 4 0 005.6 0l3-3a4 4 0 00-5.6-5.6l-1 1"/><path d="M14 10a4 4 0 00-5.6 0l-3 3a4 4 0 005.6 5.6l1-1"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
 drop:'<path d="M12 3c4 5 6 8 6 11a6 6 0 01-12 0c0-3 2-6 6-11z"/>',
 temp:'<path d="M10 14V5a2 2 0 014 0v9a4 4 0 11-4 0z"/>',
 bug:'<path d="M12 8c-3-5-8-3-7 1s5 4 7 4c2 0 6 0 7-4s-4-6-7-1z"/><path d="M12 8v12"/>',
 trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
 book:'<path d="M4 5h7a2 2 0 012 2v13a2 2 0 00-2-2H4zM20 5h-7"/><path d="M20 5v13h-7"/>'
};
const svg = (k, c = "ico") => `<svg class="${c}" viewBox="0 0 24 24" aria-hidden="true">${P[k]}</svg>`;
const li = a => a.map(t => `<li>${t}</li>`).join("");

/* ===== Datos ===== */
const timeline = [
 ["1972","Conferencia de Estocolmo sobre el Medio Ambiente Humano."],
 ["1987","Informe Brundtland, «Nuestro futuro común»: define el desarrollo sostenible."],
 ["1992","Cumbre de Río (3–14 junio): Declaración, Agenda 21 y dos convenios."],
 ["1993–94","Entran en vigor el Convenio sobre Diversidad Biológica y la Convención sobre Cambio Climático."],
 ["2012","Conferencia Río+20."],
 ["2015","Agenda 2030 y los Objetivos de Desarrollo Sostenible."]];

/* Los 27 principios: [número, título, idea central, destacado] */
const principios = [
 [1,"Personas en el centro","Los seres humanos son el centro del desarrollo sostenible y tienen derecho a una vida saludable en armonía con la naturaleza.",1],
 [2,"Soberanía y responsabilidad","Los Estados pueden aprovechar sus recursos, pero sin causar daño ambiental fuera de sus fronteras."],
 [3,"Derecho al desarrollo","Debe ejercerse de modo que satisfaga equitativamente las necesidades de generaciones presentes y futuras.",1],
 [4,"Ambiente y desarrollo","La protección del ambiente es parte integrante del proceso de desarrollo."],
 [5,"Erradicar la pobreza","Es requisito indispensable del desarrollo sostenible y debe ser tarea de todos."],
 [6,"Países vulnerables","Se dará prioridad especial a los países menos adelantados y más vulnerables ambientalmente."],
 [7,"Responsabilidades comunes pero diferenciadas","Todos cooperan para proteger el planeta, pero los países desarrollados tienen mayor responsabilidad por su presión sobre el ambiente.",1],
 [8,"Producción y consumo","Reducir y eliminar modalidades insostenibles y fomentar políticas demográficas apropiadas."],
 [9,"Capacidades y ciencia","Fortalecer la capacidad propia mediante intercambio científico y transferencia de tecnologías."],
 [10,"Participación ciudadana","Cada persona debe tener acceso a la información, poder participar en decisiones y acceder a la justicia.",1],
 [11,"Legislación ambiental","Los Estados promulgarán leyes ambientales eficaces."],
 [12,"Sistema económico abierto","Cooperar en un sistema económico internacional que favorezca el crecimiento y el ambiente."],
 [13,"Responsabilidad e indemnización","Los Estados elaborarán leyes sobre responsabilidad e indemnización por daños ambientales."],
 [14,"Traslado de actividades dañinas","Evitar reubicar a otros países actividades o sustancias graves para el ambiente o la salud."],
 [15,"Principio de precaución","La falta de certeza científica no debe impedir medidas para evitar daños graves o irreversibles.",1],
 [16,"Quien contamina paga","Se procurará que quien contamina asuma los costos de la contaminación.",1],
 [17,"Evaluación de impacto ambiental","Se aplicará a actividades que puedan tener un efecto negativo considerable."],
 [18,"Emergencias naturales","Notificar de inmediato a otros Estados los desastres que puedan afectarlos."],
 [19,"Aviso de efectos transfronterizos","Informar con antelación a los Estados que pueden resultar afectados."],
 [20,"Mujeres","Su participación plena es esencial para lograr el desarrollo sostenible.",1],
 [21,"Jóvenes","Se movilizará su creatividad e ideales para forjar una alianza mundial.",1],
 [22,"Pueblos indígenas y comunidades locales","Tienen un papel vital por sus conocimientos y prácticas tradicionales; deben apoyarse sus intereses.",1],
 [23,"Pueblos oprimidos u ocupados","Se protegerán el ambiente y los recursos naturales de los pueblos sometidos a opresión, dominación u ocupación."],
 [24,"Guerra y ambiente","La guerra es enemiga del desarrollo sostenible; se respetará el derecho internacional que protege el ambiente en conflictos."],
 [25,"Paz, desarrollo y ambiente","Son interdependientes e inseparables."],
 [26,"Solución pacífica","Las controversias ambientales se resolverán por medios pacíficos."],
 [27,"Cooperación","Los Estados y los pueblos cooperarán de buena fe en la aplicación de estos principios."]];

/* Agenda 21: [sección, ícono, título, capítulos, descripción, lista de capítulos] */
const agenda = [
 ["I","users","Dimensiones sociales y económicas","Capítulos 2–8","Cooperación internacional, pobreza, consumo, población, salud, asentamientos humanos y toma de decisiones.",
  ["2 Cooperación internacional","3 Lucha contra la pobreza","4 Modalidades de consumo","5 Dinámica demográfica","6 Salud humana","7 Asentamientos humanos","8 Ambiente y desarrollo en la toma de decisiones"]],
 ["II","tree","Conservación y gestión de recursos","Capítulos 9–22","Atmósfera, tierras, bosques, biodiversidad, océanos, agua dulce, químicos y desechos.",
  ["9 Atmósfera","10 Recursos de tierras","11 Lucha contra la deforestación","12 Desertificación y sequía","13 Zonas de montaña","14 Agricultura y desarrollo rural","15 Diversidad biológica","16 Biotecnología","17 Océanos y zonas costeras","18 Agua dulce","19 Productos químicos tóxicos","20 Desechos peligrosos","21 Desechos sólidos y aguas cloacales","22 Desechos radiactivos"]],
 ["III","link","Fortalecimiento de grupos principales","Capítulos 23–32","Mujeres, niñez y juventud, pueblos indígenas, ONG, autoridades locales, trabajadores, empresas, ciencia y agricultores.",
  ["23 Preámbulo","24 Mujeres","25 Niñez y juventud","26 Pueblos indígenas","27 ONG","28 Autoridades locales","29 Trabajadores y sindicatos","30 Comercio e industria","31 Comunidad científica y tecnológica","32 Agricultores"]],
 ["IV","gear","Medios de ejecución","Capítulos 33–40","Financiación, tecnología, ciencia, educación, cooperación, instituciones, instrumentos jurídicos e información.",
  ["33 Recursos financieros","34 Transferencia de tecnología","35 La ciencia","36 Educación y conciencia pública","37 Fomento de capacidad","38 Arreglos institucionales","39 Instrumentos jurídicos","40 Información para decidir"]]];

/* Problemas: [ícono, nombre, causas, soluciones, imagen, texto alternativo] */
const problemas = [
 ["tree","Deforestación",["Expansión agrícola y ganadera","Tala ilegal","Incendios forestales"],["Reforestación y manejo forestal sostenible","Fiscalización de la tala","Sistemas agroforestales"],"deforestacion.jpg","Vista aérea de cultivos junto a la costa: el avance agrícola transforma el paisaje"],
 ["drop","Contaminación del agua",["Aguas residuales sin tratar","Agroquímicos","Vertido de desechos"],["Plantas de tratamiento","Reducir agroquímicos","Proteger cuencas y fuentes de agua"],"agua.jpg","Lago de montaña de aguas limpias rodeado de bosque"],
 ["temp","Cambio climático",["Quema de combustibles fósiles","Deforestación","Agricultura intensiva"],["Energías renovables","Eficiencia energética","Adaptación en comunidades y agricultura"]],
 ["bug","Pérdida de biodiversidad",["Destrucción de hábitats","Caza y tráfico ilegal","Especies invasoras"],["Áreas protegidas","Corredores biológicos","Uso sostenible de los recursos"]],
 ["trash","Manejo de residuos",["Consumo excesivo","Falta de clasificación","Botaderos a cielo abierto"],["Reducir, reutilizar, reciclar","Compostaje","Rellenos sanitarios controlados"]]];

const nica = [
 ["tree","Protección de los bosques","Nicaragua cuenta con un Sistema Nacional de Áreas Protegidas que incluye la Reserva de Biosfera Bosawás, reconocida por la UNESCO, y campañas nacionales de reforestación."],
 ["drop","Lago Cocibolca","Es el mayor lago de Centroamérica y una gran reserva de agua dulce. La Ley General de Aguas Nacionales (Ley 620) regula el uso y la protección del recurso hídrico."],
 ["trash","Gestión de residuos","La Ley 217 sienta las bases del manejo de desechos; alcaldías y comunidades promueven clasificación, reciclaje y compostaje."],
 ["bug","Protección de la biodiversidad","Además de Bosawás, las Reservas de Biosfera Río San Juan y Ometepe protegen ecosistemas y especies. El país es parte del Convenio sobre la Diversidad Biológica."],
 ["book","Educación ambiental","La Ley 217 contempla la educación ambiental; escuelas y universidades realizan jornadas de reforestación, limpieza y huertos escolares."]];

const ind = ["Ahorrar agua y energía","Separar y reducir residuos","Consumir de forma responsable","Preferir transporte limpio o caminar","Informarse y compartir lo aprendido"];
const com = ["Jornadas de reforestación y limpieza","Centros de acopio y compostaje comunitario","Cuidar las fuentes de agua locales","Participar en decisiones ambientales (Principio 10)","Impulsar educación ambiental en escuelas y barrios"];

const preguntas = [
 ["¿En qué ciudad y año se celebró la Cumbre de la Tierra?",["Estocolmo, 1972","Río de Janeiro, 1992","Johannesburgo, 2002","Kioto, 1997"],1,"Se celebró en Río de Janeiro, Brasil, del 3 al 14 de junio de 1992."],
 ["¿Cuántos principios tiene la Declaración de Río?",["10","21","27","40"],2,"La Declaración contiene 27 principios."],
 ["¿Qué es la Agenda 21?",["Un tratado obligatorio sobre clima","Un plan de acción no vinculante de 40 capítulos","Una ley de Brasil","Un informe científico"],1,"Es un programa de acción mundial no vinculante organizado en 40 capítulos."],
 ["¿Cuál NO es una de las cuatro secciones de la Agenda 21?",["Dimensiones sociales y económicas","Medios de ejecución","Fortalecimiento de grupos principales","Comercio de armas"],3,"Las secciones son: dimensiones sociales y económicas, conservación y gestión de recursos, grupos principales y medios de ejecución."],
 ["Según el principio «quien contamina paga», ¿quién asume los costos de la contaminación?",["El Estado siempre","Quien contamina","Las generaciones futuras","Nadie"],1,"Es el Principio 16 de la Declaración de Río."]];

/* ===== Renderizado ===== */
$("timeline").innerHTML = timeline.map(([y,t]) => `<li><b>${y}</b><br>${t}</li>`).join("");
$("ind").innerHTML = li(ind); $("com").innerHTML = li(com);
$("nica").innerHTML = nica.map(([i,t,d]) => `<div class="card">${svg(i)}<h3>${t}</h3><p>${d}</p></div>`).join("");

/* Principios con filtro y tarjetas desplegables */
function drawPrin(f) {
 $("principios").innerHTML = principios.filter(p => f === "all" || p[3]).map(([n,t,d,s]) =>
  `<div class="card flip${s ? " star" : ""}" tabindex="0" role="button" aria-expanded="false"><span class="num">${n}</span><h3>${t}</h3><p class="more">${d}</p></div>`).join("");
 document.querySelectorAll("#principios .flip").forEach(c => {
  const t = () => { c.classList.toggle("open"); c.setAttribute("aria-expanded", c.classList.contains("open")); };
  c.onclick = t; c.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); t(); } };
 });
}
document.querySelector(".filters").onclick = e => {
 const f = e.target.dataset.f; if (!f) return;
 document.querySelectorAll(".filters button").forEach(b => b.classList.toggle("on", b === e.target));
 drawPrin(f);
};
drawPrin("top");

/* Agenda 21 con lista de capítulos */
$("agenda").innerHTML = agenda.map(([n,i,t,c,d,l],k) =>
 `<div class="card">${svg(i)}<p class="tag">Sección ${n} · ${c}</p><h3>${t}</h3><p>${d}</p>
 <button class="link" data-k="${k}" aria-expanded="false">Ver capítulos +</button><ul class="caps more">${l.map(x => `<li><b>${x.split(" ")[0]}</b> ${x.slice(x.indexOf(" ") + 1)}</li>`).join("")}</ul></div>`).join("");
$("agenda").onclick = e => {
 if (!e.target.dataset.k) return;
 const card = e.target.closest(".card"), open = card.classList.toggle("open");
 e.target.textContent = open ? "Ocultar capítulos −" : "Ver capítulos +"; e.target.setAttribute("aria-expanded", open);
};

/* Pestañas de problemas */
$("tabs").innerHTML = problemas.map((p,i) => `<button role="tab" data-i="${i}">${svg(p[0],"")}${p[1]}</button>`).join("");
function showProblem(i) {
 const [,t,c,s,img,alt] = problemas[i];
 $("panel").innerHTML = (img ? `<figure class="ph"><img src="images/${img}" loading="lazy" alt="${alt}"><figcaption>${t}</figcaption></figure>` : "") +
  `<div><h3>Causas</h3><ul class="check">${li(c)}</ul></div><div><h3>Posibles soluciones</h3><ul class="check">${li(s)}</ul></div>`;
 document.querySelectorAll("#tabs button").forEach((b,j) => { b.classList.toggle("on", i === j); b.setAttribute("aria-selected", i === j); });
}
$("tabs").onclick = e => { const b = e.target.closest("button"); if (b) showProblem(+b.dataset.i); };
showProblem(0);

/* ===== Cuestionario ===== */
let q = 0, pts = 0;
function renderQ() {
 const box = $("quizBox");
 if (q >= preguntas.length) {
  const m = pts === 5 ? "¡Excelente! Dominas el tema." : pts >= 3 ? "Buen trabajo, repasa algunos puntos." : "Repasa las secciones y vuelve a intentarlo.";
  box.innerHTML = `<h3>Resultado final</h3><p class="score">${pts} / ${preguntas.length}</p><p>${m}</p><br><button class="btn" id="again">Reintentar</button>`;
  $("again").onclick = () => { q = 0; pts = 0; renderQ(); }; return;
 }
 const [t,o,c,e] = preguntas[q];
 box.innerHTML = `<div class="bar"><i style="width:${q / preguntas.length * 100}%"></i></div><p class="tag">Pregunta ${q + 1} de ${preguntas.length}</p><h3>${t}</h3>` +
  o.map((x,i) => `<button class="opt" data-i="${i}">${x}</button>`).join("") + `<p class="fb" id="fb" aria-live="polite"></p><button class="btn" id="next" hidden>${q === 4 ? "Ver resultado" : "Siguiente"}</button>`;
 const opts = box.querySelectorAll(".opt");
 opts.forEach(b => b.onclick = () => {
  const i = +b.dataset.i; opts.forEach(x => x.disabled = true); opts[c].classList.add("ok");
  if (i === c) pts++; else b.classList.add("bad");
  $("fb").textContent = (i === c ? "Correcto. " : "Incorrecto. ") + e; $("next").hidden = false;
 });
 $("next").onclick = () => { q++; renderQ(); };
}
renderQ();

/* ===== Menú, progreso, parallax, sección activa ===== */
$("burger").onclick = () => { const o = $("menu").classList.toggle("open"); $("burger").setAttribute("aria-expanded", o); };
$("menu").onclick = () => $("menu").classList.remove("open");
const toTop = $("toTop"); toTop.onclick = () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
let tick = false;
addEventListener("scroll", () => {
 if (tick) return; tick = true;
 requestAnimationFrame(() => {
  const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
  $("progress").style.width = (y / h * 100) + "%";
  toTop.classList.toggle("show", y > 600);
  if (!reduce && y < innerHeight) $("heroBg").style.transform = `translateY(${y * .3}px)`;
  tick = false;
 });
}, { passive: true });

const links = [...document.querySelectorAll("#menu a")];
const spy = new IntersectionObserver(es => es.forEach(e => {
 if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
links.forEach(a => { const s = document.querySelector(a.getAttribute("href")); if (s) spy.observe(s); });

/* ===== Apariciones y contadores ===== */
function count(el) {
  const to = +el.dataset.to; if (reduce) { el.textContent = to; return; }
  const t0 = performance.now();
  (function f(t) { const p = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0);
}
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); } }), { threshold: .1 });
document.querySelectorAll(".reveal").forEach(s => io.observe(s));
const co = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { count(e.target); co.unobserve(e.target); } }), { threshold: .6 });
document.querySelectorAll(".count").forEach(c => co.observe(c));
})();
