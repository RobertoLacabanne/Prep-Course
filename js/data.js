// Contenido tomado del "Instructivo para la recepción de denuncias · Versión 2026"
// (Procuración General · MPF Entre Ríos). Si el instructivo cambia, se actualiza acá.

// Datos de contacto del turno. Los completa cada Unidad Fiscal: mientras estén
// vacíos, la app muestra un marcador visible en lugar de inventar un número.
export const TURNO = {
  telefono: "",
  canal: "",
};

export const FUENTE = {
  nombre: "Instructivo para la recepción de denuncias",
  version: "Versión 2026 · Procuración General",
  aviso:
    "Documento de uso interno. Debe aplicarse junto con las instrucciones generales o particulares vigentes y con los protocolos específicos de cada Unidad Fiscal.",
};

export const REGLA_CENTRAL =
  "La persona receptora no debe exigir una calificación jurídica precisa. Debe registrar el hecho denunciado, detectar riesgos y consultar de inmediato al equipo en turno cuando la situación lo requiera.";

export const AVISO_URGENCIA =
  "Dar aviso inmediato al/la fiscal o delegado/a judicial en turno y seguir sus indicaciones. La consulta no debe demorar la atención médica, el resguardo de la persona ni la preservación de evidencia.";

export const PRINCIPIOS = [
  { t: "Recepción", d: "Ante la noticia de un posible delito, recibir la denuncia aun cuando corresponda su posterior remisión a otra jurisdicción." },
  { t: "Escucha respetuosa", d: "Evitar juicios de valor, interrupciones innecesarias, preguntas culpabilizantes o la reiteración injustificada del relato." },
  { t: "Claridad", d: "Registrar hechos concretos con circunstancias de tiempo, modo y lugar, distinguiendo lo percibido directamente de lo conocido por terceros." },
  { t: "Urgencia", d: "Priorizar la protección de personas, la atención médica y la preservación de evidencia." },
  { t: "Confidencialidad", d: "Resguardar la intimidad y limitar el acceso a la información conforme a las reglas del sistema de gestión y los protocolos vigentes." },
  { t: "Accesibilidad", d: "Efectuar los ajustes necesarios cuando existan barreras de comunicación, discapacidad, idioma, edad o especial vulnerabilidad." },
];

// Preguntas de la entrevista inicial (2.1). Cada una, si se responde "sí",
// suma las acciones que el instructivo prevé para ese supuesto.
export const URGENCIA = [
  {
    id: "peligro",
    q: "¿Existe peligro actual para la persona o para terceros?",
    acciones: [
      "Priorizar la protección de la persona.",
      "En violencia de género, precisar el lugar seguro donde permanecerá y un medio seguro de contacto; si no existe lugar seguro o el riesgo es alto, dar intervención inmediata al turno.",
    ],
  },
  {
    id: "lesiones",
    q: "¿Hay lesiones, dolor o necesidad de atención médica?",
    acciones: [
      "Coordinar sin demora la atención o revisión médica según el protocolo y la indicación funcional.",
      "Si la persona rechaza el examen o se retira, dejar constancia, sin emitir valoraciones.",
    ],
  },
  {
    id: "evidencia",
    q: "¿El hecho es reciente y puede existir evidencia física o digital perecedera?",
    acciones: [
      "No manipular, explorar ni copiar dispositivos sin autorización o instrucción funcional.",
      "No pedir a la persona que elimine, reenvíe o modifique el contenido original.",
      "En hechos contra la integridad sexual con posible evidencia biológica, consultar de inmediato al/la fiscal en turno antes de finalizar.",
    ],
  },
  {
    id: "vulnerables",
    q: "¿Hay niñas, niños, adolescentes o personas especialmente vulnerables involucradas?",
    acciones: [
      "Efectuar los ajustes necesarios de accesibilidad.",
      "Marcar la opción “Menor de edad” en el sistema, tanto para víctimas como para personas denunciadas.",
      "Evitar interrogatorios impropios y consultar al equipo especializado.",
    ],
  },
  {
    id: "armas",
    q: "¿Existen armas, medidas de protección vigentes o incumplimientos recientes?",
    acciones: [
      "Registrar armas, medidas vigentes y hechos previos, diferenciándolos del nuevo episodio.",
    ],
  },
];

// Ruta rápida (sección 1) desplegada en pasos con sus tareas.
export const PASOS = [
  {
    n: 1,
    titulo: "Entrevista inicial y detección de urgencia",
    corto: "Entrevista inicial",
    intro:
      "Una entrevista breve para conocer el hecho central, el lugar, la fecha aproximada, las personas intervinientes y si hay riesgos o evidencia que pueda perderse. Con esto elegís el modelo de denuncia y activás intervenciones urgentes.",
    urgencia: true,
    bloques: [
      {
        t: "Si el hecho es de otra jurisdicción",
        icon: "compass",
        d: "Recibí la denuncia y gestioná su remisión. La falta de competencia territorial no debe transformarse en una barrera de acceso.",
      },
      {
        t: "Si el relato no describe un delito",
        icon: "circle-help",
        d: "Brindá orientación clara sobre la vía adecuada, sin desatender situaciones de vulnerabilidad. Ante una duda razonable sobre la naturaleza penal del hecho, hacé la consulta funcional correspondiente.",
      },
      {
        t: "Quién puede denunciar",
        icon: "scale",
        d: "En los delitos de acción pública, la denuncia puede provenir de la víctima o de cualquier persona que comunique el hecho. En las acciones dependientes de instancia privada, verificá quién está habilitado para instar, conforme al art. 72 del Código Penal.",
      },
    ],
  },
  {
    n: 2,
    titulo: "Identificación y control de antecedentes en el sistema",
    corto: "Registro en el sistema",
    intro:
      "Cargá el proceso y a cada persona con datos actuales, completos, precisos y coherentes: de eso dependen las citaciones, las medidas de protección y las demás diligencias.",
    checks: [
      { id: "s-proceso", t: "Crear un nuevo proceso", d: "Lugar, fecha y hora del hecho; dependencia de origen; unidad a la que corresponde derivar (si la unidad fiscal tiene unidades especializadas); tipo de legajo; tipo de delito y fiscal responsable." },
      { id: "s-buscar", t: "Buscar a cada persona antes de crearla", d: "Búsqueda por nombre, apellido o DNI. Si no está registrada, recién ahí crearla." },
      { id: "s-caracter", t: "Asignar el carácter de cada persona", d: "Denunciante, víctima, persona denunciada, testigo u otro carácter pertinente." },
      { id: "s-alertas", t: "Revisar las alertas del sistema", d: "Al cargar una persona, el sistema avisa si ya fue registrada en legajos anteriores." },
      { id: "s-menor", t: "Marcar “Menor de edad” cuando corresponda", d: "Tanto para víctimas como para personas denunciadas." },
      { id: "s-efectos", t: "Registrar efectos y vehículos", d: "Si el proceso los tiene, especificando los datos de cada uno." },
      { id: "s-diligencias", t: "Registrar todas las diligencias", d: "Comunicaciones, consultas, derivaciones, entrega de evidencia y cualquier otra actuación hecha fuera del cuerpo del acta." },
    ],
    bloques: [
      {
        t: "Datos mínimos de las personas",
        icon: "user-round-search",
        d: "Con el DNI, hacé la consulta al momento de registrarla: el sistema trae del Padrón Electoral y de RENAPER nombre, apellido, sexo, fecha de nacimiento y domicilio registrado en el DNI.",
        lista: [
          "Domicilio real o lugar de residencia, teléfono, correo electrónico y medio seguro de contacto.",
          "Vínculos relevantes con otras personas intervinientes.",
          "Datos de familiares o referentes útiles para su localización, cuando sean pertinentes.",
          "Personas menores de edad: progenitores o responsables adultos, escolaridad y toda información para determinar su edad y situación de cuidado.",
        ],
      },
    ],
    nota: { t: "Control de calidad", d: "Antes de continuar, verificá que los datos sean actuales, completos, precisos y coherentes." },
  },
  {
    n: 3,
    titulo: "Recepción del relato con el modelo aplicable",
    corto: "Relato",
    intro:
      "Usá el modelo específico del tipo de hecho; si no existe, el modelo de denuncia base. Las preguntas y ayudas de las plantillas orientan la entrevista y no deben quedar copiadas en el acta.",
    hechos: true,
    checks: [
      { id: "r-hecho", t: "Hecho central", d: "Qué ocurrió y cuál fue la conducta concreta atribuida." },
      { id: "r-tiempo", t: "Tiempo", d: "Fecha y hora exactas o aproximadas; referencias para establecer una franja temporal." },
      { id: "r-lugar", t: "Lugar", d: "Ubicación precisa, recorrido y características relevantes del sitio." },
      { id: "r-modo", t: "Modo", d: "Medios utilizados, palabras pronunciadas, objetos, armas, daños, accesos o desplazamientos." },
      { id: "r-personas", t: "Personas", d: "Identidad o descripción de autoría, participación y testigos; vínculos entre ellas." },
      { id: "r-consecuencias", t: "Consecuencias", d: "Lesiones, dolor, temor, daños, pérdida económica u otras afectaciones." },
      { id: "r-evidencia", t: "Evidencia", d: "Objetos, documentos, cámaras, mensajes, audios, fotografías, publicaciones, ubicación digital y dispositivos." },
      { id: "r-antecedentes", t: "Antecedentes", d: "Denuncias anteriores, medidas vigentes y hechos previos relevantes, diferenciados del nuevo episodio." },
    ],
    bloques: [
      {
        t: "Cómo llevar la entrevista",
        icon: "message-circle-question",
        lista: [
          "Recibí el relato personalmente y en un ámbito que preserve la intimidad.",
          "Primero narración libre; después preguntas abiertas y, al final, precisá los datos faltantes.",
          "Lenguaje sencillo, respetuoso y no sugestivo. Registrá con fidelidad las expresiones relevantes.",
          "No prometas resultados ni anticipes decisiones. Explicá en términos claros los pasos inmediatos.",
          "Si una persona acompañante fue testigo, entrevistala por separado. La presencia de apoyo puede admitirse cuando no afecte la espontaneidad ni la prueba.",
          "La videograbación solo procede conforme a la decisión fiscal y a los protocolos vigentes, con explicación previa de su finalidad y resguardo.",
        ],
      },
    ],
    nota: { t: "Evitar revictimización", d: "No exigir detalles innecesarios ni reiterar preguntas ya respondidas. En violencia de género, violencia institucional o integridad sexual, aplicar además el modelo y protocolo especializado." },
  },
  {
    n: 4,
    titulo: "Evidencia, medidas inmediatas y consultas",
    corto: "Evidencia y medidas",
    intro:
      "La atención de la salud y la seguridad de la víctima prevalecen. La obtención de evidencia requiere consentimiento, trato digno y aplicación del protocolo específico.",
    checks: [
      { id: "e-describir", t: "Describir cada elemento aportado", d: "Y dejar constancia de la entrega voluntaria." },
      { id: "e-individualizar", t: "Individualizar el soporte", d: "Marca, modelo, color, estado, número identificatorio y demás características útiles." },
      { id: "e-custodia", t: "Iniciar rótulo, registro y cadena de custodia", d: "Conforme al protocolo vigente." },
      { id: "e-preservar", t: "Preservar en un continente adecuado", d: "Documentos y elementos físicos: evitar contaminación, deterioro o pérdida." },
    ],
    bloques: [
      {
        t: "Evidencia digital",
        icon: "smartphone",
        d: "Identificá plataforma, usuario, enlace, fecha, hora y dispositivo. Registrá la existencia de mensajes, audios, imágenes o publicaciones y consultá sobre su preservación o secuestro.",
        no: [
          "No manipular, explorar ni copiar dispositivos sin autorización o instrucción funcional.",
          "No pedir a la persona que elimine, reenvíe o modifique el contenido original.",
        ],
      },
      {
        t: "Lesiones y atención médica",
        icon: "stethoscope",
        d: "Preguntá por lesiones visibles, dolor o síntomas aunque no sean evidentes. Coordiná sin demora la atención o revisión médica según el protocolo y la indicación funcional. Si la persona rechaza el examen o se retira, dejá constancia, sin emitir valoraciones.",
      },
      {
        t: "Integridad sexual y evidencia biológica",
        icon: "fingerprint",
        d: "Ante hechos recientes o cuando pueda subsistir evidencia física o biológica, consultá de inmediato al/la fiscal en turno antes de finalizar. La posibilidad de obtener evidencia debe evaluarse profesionalmente y no descartarse solo por el transcurso de un plazo predeterminado. Preservá ropa u otros elementos en envases de papel, conforme a indicación especializada.",
      },
    ],
  },
  {
    n: 5,
    titulo: "Lectura, firma, registro y comunicación",
    corto: "Cierre",
    intro:
      "Antes de cerrar: si persiste una duda que incide en la protección de la persona, la preservación de evidencia, la competencia o la derivación, consultá al/la delegado/a judicial o fiscal en turno.",
    checks: [
      { id: "f-leer", t: "Leer el acta completa o permitir su lectura", d: "Efectuar las correcciones solicitadas que correspondan." },
      { id: "f-firma", t: "Solicitar las firmas", d: "De la persona denunciante y de quien intervino en la recepción." },
      { id: "f-nofirma", t: "Si no sabe o no puede firmar", d: "Dejar constancia, dar lectura en voz alta y utilizar la impresión digital u otro mecanismo previsto por la normativa aplicable." },
      { id: "f-registrar", t: "Registrar todo lo actuado", d: "Evidencia recibida, consultas realizadas, medidas adoptadas y toda circunstancia relevante, incluida la interrupción del acto o el retiro de la persona." },
      { id: "f-informar", t: "Informar a la persona", d: "Canal de contacto, pautas de seguridad y pasos inmediatos, sin garantizar resultados." },
      { id: "f-inhabil", t: "En días u horarios inhábiles", d: "Remitir la denuncia a la Unidad Fiscal competente por el canal institucional y comunicarla al teléfono de turno conforme a las instrucciones vigentes." },
    ],
    control: true,
  },
];

export const CONTROL_FINAL = [
  { id: "c-relato", t: "Relato con tiempo, modo y lugar" },
  { id: "c-datos", t: "Datos actualizados de todas las personas" },
  { id: "c-riesgo", t: "Riesgo y urgencia evaluados" },
  { id: "c-lesiones", t: "Lesiones y atención médica consideradas" },
  { id: "c-evidencia", t: "Evidencia identificada y preservada" },
  { id: "c-antecedentes", t: "Antecedentes y medidas vigentes verificados" },
  { id: "c-acta", t: "Acta leída, corregida y firmada" },
  { id: "c-diligencias", t: "Diligencias y comunicaciones registradas" },
];

// Pautas según el tipo de hecho (secciones 7 y 8). "turno" reúne los supuestos
// en que el instructivo manda avisar o consultar; "ver" remite a otros puntos.
export const HECHOS = [
  {
    id: "violencia-genero",
    nombre: "Violencia de género",
    icon: "shield-alert",
    tono: "rosa",
    modelo: "Modelo específico aprobado",
    pautas: [
      "Indagar riesgo actual, armas, convivencia, red de apoyo, niñas o niños involucrados y medidas de protección vigentes.",
      "Precisar el lugar seguro donde permanecerá la persona y un medio seguro de contacto.",
      "Consultar por lesiones, dolor, atención médica y necesidad de asistencia psicológica.",
      "Aplicar además el protocolo especializado; no exigir detalles innecesarios ni reiterar preguntas ya respondidas.",
    ],
    turno: [
      "Dar intervención inmediata al turno cuando no exista un lugar seguro, el riesgo sea alto o se requieran medidas urgentes.",
    ],
  },
  {
    id: "integridad-sexual",
    nombre: "Delitos contra la integridad sexual",
    icon: "hand",
    tono: "lila",
    modelo: "Modelo específico",
    pautas: [
      "Evitar preguntas sugestivas o reiterativas.",
      "Explicar la importancia de los detalles sin presionar ni responsabilizar a la víctima.",
      "Preservar ropa y objetos conforme a indicaciones técnicas: no lavar, mezclar ni manipular innecesariamente. Usar envases de papel, conforme a indicación especializada.",
      "La posibilidad de obtener evidencia biológica no se descarta solo por el transcurso de un plazo predeterminado: la evalúan profesionales.",
      "La obtención de evidencia requiere consentimiento, trato digno y aplicación del protocolo específico.",
    ],
    turno: [
      "Ante contacto físico reciente, lesiones, dolor o posible evidencia biológica, avisar de inmediato al turno y aplicar el protocolo médico-forense.",
      "Ante hechos recientes, consultar al/la fiscal en turno antes de finalizar.",
    ],
    instancia:
      "Si la víctima es menor de 18 años o fue declarada incapaz, se procede de oficio. En todos los casos se recibe la denuncia y, ante dudas sobre la instancia, se consulta al/la fiscal o delegado/a judicial en turno.",
  },
  {
    id: "violencia-institucional",
    nombre: "Violencia institucional",
    icon: "landmark",
    tono: "azul",
    modelo: "Modelo y protocolo especializado",
    pautas: [
      "Precisar dependencia, lugar, horario, móvil, uniforme, jerarquía, rasgos, armas, cámaras y testigos.",
      "Preguntar si las personas señaladas prestan funciones en la jurisdicción de residencia de la víctima y evaluar medidas de resguardo.",
      "Documentar lesiones y dar intervención médica conforme al protocolo.",
    ],
    turno: [],
  },
  {
    id: "amenazas",
    nombre: "Amenazas",
    icon: "message-square-warning",
    tono: "ambar",
    modelo: "Modelo específico, si existe; si no, modelo base",
    pautas: [
      "Registrar las palabras o conductas exactas.",
      "Medio empleado, contexto, testigos y temor generado.",
      "Armas y pertenencia de la persona denunciada a fuerzas de seguridad.",
      "Identificar y preservar la evidencia digital: plataforma, usuario, enlace, fecha, hora y dispositivo.",
    ],
    turno: [],
  },
  {
    id: "lesiones",
    nombre: "Lesiones",
    icon: "bandage",
    tono: "coral",
    modelo: "Modelo específico, si existe; si no, modelo base",
    pautas: [
      "Consultar por dolor y lesiones visibles o no visibles.",
      "Mecanismo de producción y atención previa.",
      "Coordinar revisión médica.",
      "Registrar la negativa o la imposibilidad de revisión, sin emitir valoraciones.",
    ],
    turno: [],
  },
  {
    id: "asistencia-familiar",
    nombre: "Incumplimiento de asistencia familiar",
    icon: "hand-coins",
    tono: "arena",
    modelo: "Modelo específico, si existe; si no, modelo base",
    pautas: [
      "Individualizar la obligación, el período y la resolución o acuerdo.",
      "Pagos realizados, personas beneficiarias y antecedentes.",
      "Verificar si la acción corresponde al régimen aplicable.",
    ],
    turno: ["Consultar ante dudas sobre el régimen aplicable."],
  },
  {
    id: "impedimento-contacto",
    nombre: "Impedimento de contacto",
    icon: "users",
    tono: "verde",
    modelo: "Modelo específico, si existe; si no, modelo base",
    pautas: [
      "Precisar el régimen de comunicación y la autoridad o acuerdo que lo estableció.",
      "Episodio concreto, antecedentes y personas involucradas.",
      "Diferenciar el conflicto familiar del hecho penal denunciado.",
    ],
    turno: [],
  },
  {
    id: "usurpacion",
    nombre: "Usurpación",
    icon: "house",
    tono: "oliva",
    modelo: "Modelo específico, si existe; si no, modelo base",
    pautas: [
      "Individualizar el inmueble y la relación de la persona con él.",
      "Describir cómo, cuándo y mediante qué medios se produjo el ingreso, la permanencia, el despojo o la alteración de la posesión.",
    ],
    turno: [],
  },
  {
    id: "menores-senalados",
    nombre: "Personas menores de edad señaladas",
    icon: "backpack",
    tono: "cielo",
    modelo: "Modelo aplicable al hecho",
    pautas: [
      "Recabar edad o rango aproximado, escolaridad, domicilio, progenitores o responsables y teléfonos.",
      "Registrar situaciones de vulnerabilidad.",
      "Evitar interrogatorios impropios.",
      "Marcar la opción “Menor de edad” al cargarla en el sistema.",
    ],
    turno: ["Consultar al equipo especializado."],
  },
  {
    id: "testigos",
    nombre: "Testigos",
    icon: "eye",
    tono: "menta",
    modelo: "—",
    pautas: [
      "Obtener datos suficientes para individualizarlos y localizarlos.",
      "Vínculo con las partes y forma en que conocieron el hecho.",
      "Si una persona acompañante fue testigo, entrevistarla por separado.",
      "Si faltan datos, informar un canal y un plazo breve para aportarlos.",
    ],
    turno: [],
  },
  {
    id: "otro",
    nombre: "Otro hecho o no sé cómo encuadrarlo",
    icon: "file-text",
    tono: "piedra",
    modelo: "Modelo de denuncia base",
    pautas: [
      "No hace falta una calificación jurídica precisa: registrá el hecho denunciado.",
      "Cubrí el contenido mínimo del relato: hecho, tiempo, lugar, modo, personas, consecuencias, evidencia y antecedentes.",
      "Usá la guía breve de preguntas para no dejar ejes sin cubrir.",
    ],
    turno: ["Ante una duda razonable sobre la naturaleza penal del hecho, hacer la consulta funcional correspondiente."],
  },
];

export const PREGUNTAS = [
  { eje: "Hecho", p: ["¿Qué ocurrió?", "¿Cuál es el episodio que desea denunciar hoy?"] },
  { eje: "Tiempo", p: ["¿Cuándo ocurrió?", "¿Puede vincularlo con otra actividad o suceso?"] },
  { eje: "Lugar", p: ["¿Dónde ocurrió?", "¿Hubo desplazamientos?", "¿Existen cámaras?"] },
  { eje: "Personas", p: ["¿Quiénes intervinieron?", "¿Cómo pueden ser identificadas o localizadas?"] },
  { eje: "Testigos", p: ["¿Quién vio u oyó el hecho?", "¿Qué vínculo tiene con las personas involucradas?"] },
  { eje: "Riesgo", p: ["¿Existe peligro actual?", "¿Hay armas, amenazas recientes o medidas incumplidas?"] },
  { eje: "Salud", p: ["¿Tiene dolor o lesiones?", "¿Necesita atención médica inmediata?"] },
  { eje: "Evidencia", p: ["¿Qué elementos, mensajes, imágenes, audios, documentos o dispositivos existen?"] },
  { eje: "Antecedentes", p: ["¿Hubo hechos o denuncias anteriores?", "¿Existen medidas vigentes?"] },
  { eje: "Contacto", p: ["¿Cuál es un medio seguro para comunicarse?", "¿Dónde permanecerá?"] },
];

// Situaciones que suelen generar dudas en el mostrador, con la respuesta del instructivo.
export const DUDAS = [
  {
    id: "otra-jurisdiccion",
    q: "El hecho pasó en otra jurisdicción",
    icon: "compass",
    r: "Recibí igual la denuncia y gestioná su remisión. La falta de competencia territorial no debe transformarse en una barrera de acceso.",
    ref: "2.2",
  },
  {
    id: "no-es-delito",
    q: "No sé si lo que me cuentan es un delito",
    icon: "circle-help",
    r: "No se te exige una calificación jurídica precisa. Si el relato no describe inicialmente un delito, orientá con claridad sobre la vía adecuada sin desatender situaciones de vulnerabilidad. Ante una duda razonable sobre la naturaleza penal del hecho, hacé la consulta funcional correspondiente.",
    ref: "1 y 2.3",
  },
  {
    id: "instancia-privada",
    q: "¿Quién puede denunciar? ¿Es de instancia privada?",
    icon: "scale",
    r: "En los delitos de acción pública puede denunciar la víctima o cualquier persona que comunique el hecho. En las acciones dependientes de instancia privada, verificá quién está habilitado para instar (art. 72 del Código Penal). En delitos contra la integridad sexual, si la víctima es menor de 18 años o fue declarada incapaz, se procede de oficio. En todos los casos se recibe la denuncia y, ante dudas sobre la instancia, se consulta al/la fiscal o delegado/a judicial en turno.",
    ref: "2.4",
  },
  {
    id: "no-firma",
    q: "La persona no sabe o no puede firmar",
    icon: "pen-line",
    r: "Dejá constancia, dale lectura en voz alta al acta y utilizá la impresión digital u otro mecanismo previsto por la normativa aplicable.",
    ref: "6",
  },
  {
    id: "inhabil",
    q: "Es día u horario inhábil",
    icon: "moon",
    r: "Remití la denuncia a la Unidad Fiscal competente por el canal institucional y comunicala al teléfono de turno conforme a las instrucciones vigentes.",
    ref: "6",
  },
  {
    id: "rechaza-medico",
    q: "No quiere revisión médica o se va en medio del acto",
    icon: "stethoscope",
    r: "Si rechaza el examen o se retira, dejá constancia sin emitir valoraciones. Registrá también la interrupción del acto o el retiro de la persona.",
    ref: "5.3 y 6",
  },
  {
    id: "acompanante",
    q: "Vino acompañada",
    icon: "users",
    r: "Si la persona acompañante fue testigo, entrevistala por separado. La presencia de apoyo puede admitirse cuando no afecte la espontaneidad ni la prueba.",
    ref: "4.2",
  },
  {
    id: "celular",
    q: "Me quiere mostrar mensajes o el celular",
    icon: "smartphone",
    r: "Identificá plataforma, usuario, enlace, fecha, hora y dispositivo, registrá la existencia del contenido y consultá sobre su preservación o secuestro. No manipules, explores ni copies dispositivos sin autorización o instrucción funcional, y no le pidas que elimine, reenvíe o modifique el contenido original.",
    ref: "5.1 y 5.2",
  },
  {
    id: "barreras",
    q: "Hay barreras de idioma, discapacidad o comunicación",
    icon: "accessibility",
    r: "Efectuá los ajustes necesarios cuando existan barreras de comunicación, discapacidad, idioma, edad o especial vulnerabilidad.",
    ref: "1",
  },
  {
    id: "grabar",
    q: "¿Se puede grabar la entrevista?",
    icon: "video",
    r: "La videograbación solo procede conforme a la decisión fiscal y a los protocolos vigentes, con explicación previa de su finalidad y resguardo.",
    ref: "4.2",
  },
  {
    id: "que-va-a-pasar",
    q: "Me pregunta qué va a pasar con su denuncia",
    icon: "info",
    r: "No prometas resultados ni anticipes decisiones. Explicá en términos claros los pasos inmediatos e informá el canal de contacto y las pautas de seguridad, sin garantizar resultados.",
    ref: "4.2 y 6",
  },
];
