/**
 * Esquemas técnicos ilustrativos de cada especialidad.
 * Son dibujos de referencia: no representan mediciones ni certificaciones reales.
 */

const INK = "#141413";
const MUTED = "#605F5B";
const ACCENT = "#B8332A";
const PAPER = "#FAF9F5";
const SURFACE = "#EBE9E1";
const GRAIN = "#DCDAD0";

const svgProps = {
  viewBox: "0 30 540 310",
  className: "diagram h-auto w-full select-none",
  role: "img" as const,
};

function Grid({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke={GRAIN} strokeWidth="0.5" strokeOpacity="0.6" />
        </pattern>
      </defs>
      <rect y="30" width="540" height="310" fill={`url(#${id})`} />
    </>
  );
}

// ---------------------------------------------------------------------------
// 01 · Electrobomba centrífuga y nivel de cisterna
// ---------------------------------------------------------------------------
export function TurbineCisternDiagram() {
  return (
    <svg {...svgProps} aria-label="Esquema de una electrobomba centrífuga y del control de nivel de una cisterna">
      <Grid id="grid1" />

      {/* Carcasa */}
      <circle cx="150" cy="170" r="95" fill="none" stroke={INK} strokeWidth="1" strokeDasharray="6 3" />
      <circle cx="150" cy="170" r="82" fill={PAPER} stroke={INK} strokeWidth="1.25" />

      {/* Descarga y succión */}
      <rect x="135" y="45" width="30" height="44" fill={PAPER} stroke={INK} strokeWidth="1" />
      <line x1="125" y1="45" x2="175" y2="45" stroke={INK} strokeWidth="2" />
      <text x="150" y="39" textAnchor="middle" fontSize="9" fill={MUTED}>DESCARGA Ø 1½″</text>

      <rect x="25" y="155" width="44" height="30" fill={PAPER} stroke={INK} strokeWidth="1" />
      <line x1="25" y1="145" x2="25" y2="195" stroke={INK} strokeWidth="2" />
      <text x="25" y="139" fontSize="9" fill={MUTED}>SUCCIÓN Ø 2″</text>

      {/* Pernos */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle key={deg} cx={150 + 88 * Math.cos(rad)} cy={170 + 88 * Math.sin(rad)} r="2.5" fill={INK} stroke={PAPER} strokeWidth="0.75" />
        );
      })}

      {/* Impulsor giratorio */}
      <g className="spin-impeller">
        <circle cx="150" cy="170" r="70" fill="none" stroke={ACCENT} strokeWidth="1" strokeDasharray="3 2" />
        {[0, 60, 120, 180, 240, 300].map((rot) => (
          <g key={rot} transform={`rotate(${rot} 150 170)`}>
            <path d="M 150 148 Q 172 132 190 120" fill="none" stroke={INK} strokeWidth="1.5" />
          </g>
        ))}
        <circle cx="150" cy="170" r="22" fill={PAPER} stroke={INK} strokeWidth="1.25" />
        <circle cx="150" cy="170" r="8" fill={INK} />
      </g>

      {/* Flujo */}
      <path d="M 45 170 L 105 170" stroke={ACCENT} strokeWidth="1" />
      <path d="M 150 120 L 150 60" stroke={ACCENT} strokeWidth="1" />
      <text x="150" y="284" textAnchor="middle" fontSize="9" fill={INK}>ELECTROBOMBA CENTRÍFUGA · 1750 RPM</text>

      {/* Manómetro */}
      <g transform="translate(195, 75)">
        <circle cx="20" cy="20" r="18" fill={PAPER} stroke={INK} strokeWidth="1" />
        <line x1="20" y1="20" x2="30" y2="12" stroke={ACCENT} strokeWidth="1.5" />
        <circle cx="20" cy="20" r="2" fill={INK} />
        <text x="44" y="17" fontSize="8" fill={MUTED}>MANÓMETRO</text>
        <text x="44" y="29" fontSize="9" fill={ACCENT} fontWeight="bold">≈ 4 BAR</text>
      </g>

      {/* Cisterna */}
      <defs>
        <clipPath id="tankClip">
          <rect x="341" y="56" width="158" height="228" rx="2" />
        </clipPath>
      </defs>
      <rect x="340" y="55" width="160" height="230" rx="3" fill={PAPER} stroke={INK} strokeWidth="1.25" />

      {/* Agua, superficie, boya y cable suben y bajan juntos (transform: funciona en todos los navegadores) */}
      <g clipPath="url(#tankClip)">
        <g className="cistern-level">
          <rect x="341" y="125" width="158" height="220" fill={ACCENT} fillOpacity="0.08" />
          <path d="M 341 125 Q 380 120 420 125 T 499 125" fill="none" stroke={ACCENT} strokeWidth="1.5" />
          <line x1="450" y1="-200" x2="450" y2="120" stroke={INK} strokeWidth="1" strokeDasharray="3 2" />
          <rect x="442" y="118" width="16" height="12" rx="2" fill={ACCENT} stroke={INK} strokeWidth="1" />
        </g>
      </g>

      {/* Regla de nivel */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const y = 75 + i * 24;
        return (
          <g key={i}>
            <line x1="340" y1={y} x2="352" y2={y} stroke={INK} strokeWidth="1" />
            <text x="356" y={y + 3} fontSize="8" fill={MUTED}>{`${(4 - i * 0.5).toFixed(1)} m`}</text>
          </g>
        );
      })}

      {/* Ficha a la derecha de la regla para no tapar las graduaciones */}
      <rect x="392" y="222" width="102" height="50" fill={PAPER} stroke={INK} strokeWidth="0.75" />
      <text x="399" y="238" fontSize="8.5" fill={INK} fontWeight="bold">CONTROL DE NIVEL</text>
      <text x="399" y="251" fontSize="8.5" fill={ACCENT}>Corte en seco</text>
      <text x="399" y="264" fontSize="8" fill={MUTED}>Tablero alternador</text>

      <text x="420" y="304" textAnchor="middle" fontSize="9" fill={INK}>CISTERNA · NIVEL DE AGUA</text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 02 · Tabiquería metálica y drywall (isométrico)
// ---------------------------------------------------------------------------
export function StructuralIsometricDiagram() {
  return (
    <svg {...svgProps} aria-label="Isométrico de un tabique de drywall sobre parantes metálicos, con sus cotas">
      <defs>
        <pattern id="isoGrid" width="30" height="17.32" patternUnits="userSpaceOnUse">
          <path d="M 0 0 L 30 17.32 M 30 0 L 0 17.32" stroke={GRAIN} strokeWidth="0.5" strokeOpacity="0.5" />
        </pattern>
      </defs>
      <rect y="30" width="540" height="310" fill="url(#isoGrid)" />

      {/* Todo el dibujo se baja 24px para que el canal superior quede dentro del encuadre */}
      <g transform="translate(0, 24)">
        <polygon points="60,250 240,310 460,230 280,170" fill={PAPER} stroke={GRAIN} strokeWidth="1" />

        {/* Canal inferior */}
        <path d="M 120 230 L 340 160 L 340 168 L 120 238 Z" fill={SURFACE} stroke={INK} strokeWidth="1" />

        {/* Parantes */}
        {[0, 1, 2, 3, 4].map((i) => {
          const x = 140 + i * 45;
          const y = 224 - i * 14;
          const h = 140;
          return (
            <g key={i}>
              <path d={`M ${x} ${y} L ${x} ${y - h} L ${x + 12} ${y - h - 4} L ${x + 12} ${y - 4} Z`} fill={PAPER} stroke={INK} strokeWidth="1" />
              <line x1={x} y1={y - 70} x2={x + 12} y2={y - 74} stroke={ACCENT} strokeWidth="1" strokeDasharray="2 2" />
            </g>
          );
        })}

        {/* Canal superior */}
        <path d="M 120 90 L 340 20 L 340 28 L 120 98 Z" fill={SURFACE} stroke={INK} strokeWidth="1" />

        {/* Placa de yeso en corte */}
        <polygon points="230,195 340,160 340,20 230,55" fill={PAPER} fillOpacity="0.9" stroke={INK} strokeWidth="1.25" />
        {[185, 150, 115].map((y) => (
          <line key={y} x1="240" y1={y} x2="330" y2={y - 30} stroke={GRAIN} strokeWidth="0.75" />
        ))}
        <text x="285" y="105" fontSize="8.5" fill={MUTED} transform="rotate(-17.6 285 105)">PLACA DE YESO ½″</text>

        {/* Cotas */}
        <g className="trace-cota-anim">
          <line x1="120" y1="258" x2="340" y2="188" stroke={ACCENT} strokeWidth="1.25" />
          <line x1="115" y1="250" x2="125" y2="266" stroke={ACCENT} strokeWidth="1.25" />
          <line x1="335" y1="180" x2="345" y2="196" stroke={ACCENT} strokeWidth="1.25" />
        </g>
        <text x="236" y="246" fontSize="10" fill={ACCENT} fontWeight="bold" transform="rotate(-17.6 236 246)">L = 3600</text>

        <g className="trace-cota-anim">
          <line x1="370" y1="160" x2="370" y2="20" stroke={ACCENT} strokeWidth="1.25" />
          <line x1="362" y1="160" x2="378" y2="160" stroke={ACCENT} strokeWidth="1.25" />
          <line x1="362" y1="20" x2="378" y2="20" stroke={ACCENT} strokeWidth="1.25" />
        </g>
        <text x="382" y="94" fontSize="10" fill={ACCENT} fontWeight="bold">H = 2750</text>

        <text x="150" y="252" fontSize="8.5" fill={INK}>@ 406</text>

        <circle cx="120" cy="230" r="3" fill={ACCENT} />
        <text x="30" y="222" fontSize="9" fill={ACCENT}>NPT ±0.00</text>
        <line x1="82" y1="225" x2="115" y2="230" stroke={ACCENT} strokeWidth="0.75" strokeDasharray="2 2" />
      </g>

      <rect x="25" y="298" width="490" height="36" fill={PAPER} stroke={INK} strokeWidth="0.75" />
      <text x="38" y="313" fontSize="9" fill={INK} fontWeight="bold">PARANTES Y RIELES DE ACERO GALVANIZADO · ANCLAJES MECÁNICOS ⅜″</text>
      <text x="38" y="326" fontSize="8.5" fill={MUTED}>COTAS EN MM · AISLAMIENTO ACÚSTICO OPCIONAL · ACABADO EPÓXICO</text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 03 · Red sanitaria y tablero eléctrico
// ---------------------------------------------------------------------------
export function SanitaryElectricalDiagram() {
  const main = "M 40 100 L 160 100 L 160 210 L 320 210 L 320 120 L 340 120";
  return (
    <svg {...svgProps} aria-label="Esquema de una red de agua con válvulas y de un tablero eléctrico trifásico">
      <Grid id="grid3" />

      {/* Tubería principal */}
      <path d={main} fill="none" stroke={INK} strokeWidth="6" strokeLinecap="square" />
      <path d={main} fill="none" stroke={PAPER} strokeWidth="3" strokeLinecap="square" />
      <path d={main} fill="none" stroke={ACCENT} strokeWidth="2.5" className="pulse-flow-anim" />

      {/* Derivaciones */}
      {["M 160 210 L 160 280 L 250 280", "M 320 210 L 320 280 L 400 280"].map((d) => (
        <g key={d}>
          <path d={d} fill="none" stroke={INK} strokeWidth="3" />
          <path d={d} fill="none" stroke={ACCENT} strokeWidth="1.5" className="pulse-flow-anim" />
        </g>
      ))}

      {/* Válvula de compuerta */}
      <g transform="translate(100, 100)">
        <polygon points="-8,-8 8,8 8,-8 -8,8" fill={INK} stroke={INK} strokeWidth="1" />
        <line x1="0" y1="-8" x2="0" y2="-16" stroke={INK} strokeWidth="1.5" />
        <line x1="-6" y1="-16" x2="6" y2="-16" stroke={ACCENT} strokeWidth="2" />
        <text x="0" y="-21" textAnchor="middle" fontSize="8.5" fill={MUTED}>V-01</text>
      </g>

      {/* Válvula check */}
      <g transform="translate(240, 210)">
        <circle r="12" fill={PAPER} stroke={INK} strokeWidth="1" />
        <polygon points="-5,-6 6,0 -5,6" fill={ACCENT} />
        <text y="-17" textAnchor="middle" fontSize="8.5" fill={MUTED}>CHECK</text>
      </g>

      {/* Nodos */}
      {[
        { cx: 160, cy: 100, label: "A" },
        { cx: 160, cy: 210, label: "B" },
        { cx: 320, cy: 210, label: "C" },
        { cx: 320, cy: 120, label: "D" },
      ].map((n) => (
        <g key={n.label}>
          <circle cx={n.cx} cy={n.cy} r="4" fill={ACCENT} />
          <circle cx={n.cx} cy={n.cy} r="8" fill="none" stroke={ACCENT} strokeWidth="0.75" opacity="0.6" />
          <text x={n.cx + 9} y={n.cy - 8} fontSize="8.5" fill={INK}>{`NODO ${n.label}`}</text>
        </g>
      ))}

      {/* Tablero */}
      <rect x="370" y="45" width="130" height="60" fill={PAPER} stroke={INK} strokeWidth="1.25" />
      <line x1="370" y1="65" x2="500" y2="65" stroke={INK} strokeWidth="0.75" />
      <text x="380" y="59" fontSize="8.5" fill={INK} fontWeight="bold">TABLERO GENERAL TG-1</text>
      {[0, 1, 2, 3].map((b) => (
        <rect key={b} x={385 + b * 26} y={72} width="16" height="24" fill={SURFACE} stroke={INK} strokeWidth="0.75" />
      ))}
      {/* Puesta a tierra */}
      <line x1="435" y1="105" x2="435" y2="138" stroke={INK} strokeWidth="1" />
      <line x1="427" y1="138" x2="443" y2="138" stroke={INK} strokeWidth="1.5" />
      <line x1="430" y1="142" x2="440" y2="142" stroke={INK} strokeWidth="1" />
      <line x1="433" y1="146" x2="437" y2="146" stroke={INK} strokeWidth="1" />
      <text x="450" y="145" fontSize="8.5" fill={MUTED}>POZO A TIERRA</text>

      {/* Fichas */}
      <rect x="40" y="236" width="104" height="48" fill={PAPER} stroke={INK} strokeWidth="0.75" />
      <text x="48" y="251" fontSize="8" fill={MUTED}>TUBERÍA</text>
      <text x="48" y="266" fontSize="11" fill={ACCENT} fontWeight="bold">PPR / PVC</text>
      <text x="48" y="278" fontSize="8" fill={MUTED}>TERMOFUSIÓN</text>

      <rect x="370" y="176" width="130" height="48" fill={PAPER} stroke={INK} strokeWidth="0.75" />
      <text x="378" y="191" fontSize="8" fill={MUTED}>RED ELÉCTRICA</text>
      <text x="378" y="206" fontSize="11" fill={INK} fontWeight="bold">220 V · 3Ø</text>
      <text x="378" y="218" fontSize="8" fill={ACCENT}>BALANCEO DE FASES</text>

      <text x="270" y="322" textAnchor="middle" fontSize="9" fill={INK}>
        DETECCIÓN DE FUGAS · PROTECCIÓN DIFERENCIAL 30 mA
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// 04 · Transmisión por engranajes (equipos y motores)
// Geometría coherente: radios primitivos 62.9 y 47.1 (20 y 15 dientes, mismo paso),
// distancia entre ejes 110 y velocidades en relación 20/15, así los dientes engranan sin cruzarse.
// ---------------------------------------------------------------------------
function Gear({ cx, cy, teeth, root, tip, phase }: { cx: number; cy: number; teeth: number; root: number; tip: number; phase: number }) {
  // Diente trapezoidal: más ancho en la base que en la punta
  const d = `M ${cx - 5.5} ${cy - root + 1} L ${cx + 5.5} ${cy - root + 1} L ${cx + 3} ${cy - tip} L ${cx - 3} ${cy - tip} Z`;
  return (
    <>
      {Array.from({ length: teeth }).map((_, i) => (
        <path key={i} d={d} fill={PAPER} stroke={INK} strokeWidth="1.1" transform={`rotate(${phase + (i * 360) / teeth} ${cx} ${cy})`} />
      ))}
      <circle cx={cx} cy={cy} r={root} fill={PAPER} stroke={INK} strokeWidth="1.25" />
    </>
  );
}

export function PrecisionGearsDiagram() {
  const A = { cx: 165, cy: 170, pitch: 62.86 };
  const B = { cx: 275, cy: 170, pitch: 47.14 };
  const contactX = A.cx + A.pitch;

  return (
    <svg {...svgProps} aria-label="Dos engranajes de 20 y 15 dientes girando sincronizados">
      <Grid id="grid4" />

      <line x1={A.cx} y1="170" x2={B.cx} y2="170" stroke={ACCENT} strokeWidth="1" strokeDasharray="4 2" />

      {/* Engranaje motriz: 20 dientes, horario */}
      <g className="spin-gear-a">
        <Gear cx={A.cx} cy={A.cy} teeth={20} root={57} tip={69} phase={0} />
        <circle cx={A.cx} cy={A.cy} r={A.pitch} fill="none" stroke={ACCENT} strokeWidth="0.6" strokeDasharray="3 3" />
        {[0, 90, 180, 270].map((deg) => (
          <circle
            key={deg}
            cx={A.cx + 32 * Math.cos((deg * Math.PI) / 180)}
            cy={A.cy + 32 * Math.sin((deg * Math.PI) / 180)}
            r="10"
            fill={SURFACE}
            stroke={INK}
            strokeWidth="0.75"
          />
        ))}
        <circle cx={A.cx} cy={A.cy} r="16" fill={PAPER} stroke={INK} strokeWidth="1.5" />
        <rect x={A.cx - 3} y={A.cy - 18} width="6" height="8" fill={INK} />
        <circle cx={A.cx} cy={A.cy} r="4" fill={ACCENT} />
      </g>

      {/* Engranaje conducido: 15 dientes, antihorario. Fase desplazada medio paso para encajar en el hueco. */}
      <g className="spin-gear-b">
        <Gear cx={B.cx} cy={B.cy} teeth={15} root={41} tip={53} phase={18} />
        <circle cx={B.cx} cy={B.cy} r={B.pitch} fill="none" stroke={ACCENT} strokeWidth="0.6" strokeDasharray="3 3" />
        {[0, 120, 240].map((deg) => (
          <circle
            key={deg}
            cx={B.cx + 22 * Math.cos((deg * Math.PI) / 180)}
            cy={B.cy + 22 * Math.sin((deg * Math.PI) / 180)}
            r="8"
            fill={SURFACE}
            stroke={INK}
            strokeWidth="0.75"
          />
        ))}
        <circle cx={B.cx} cy={B.cy} r="12" fill={PAPER} stroke={INK} strokeWidth="1.5" />
        <rect x={B.cx - 3} y={B.cy - 14} width="6" height="6" fill={INK} />
        <circle cx={B.cx} cy={B.cy} r="4" fill={ACCENT} />
      </g>

      {/* Punto primitivo */}
      <line x1={contactX} y1="174" x2={contactX} y2="252" stroke={ACCENT} strokeWidth="0.75" strokeDasharray="2 2" />
      <circle cx={contactX} cy="170" r="2.5" fill={ACCENT} />
      <text x={contactX} y="264" textAnchor="middle" fontSize="8.5" fill={ACCENT}>PUNTO PRIMITIVO</text>

      {/* Sentidos de giro */}
      <path d="M 118 108 A 78 78 0 0 1 182 94" fill="none" stroke={INK} strokeWidth="1.5" />
      <polygon points="182,90 190,95 181,99" fill={INK} />
      <text x="150" y="84" textAnchor="middle" fontSize="8.5" fill={MUTED}>HORARIO · 1750 RPM</text>

      <path d="M 300 120 A 58 58 0 0 0 252 118" fill="none" stroke={ACCENT} strokeWidth="1.5" />
      <polygon points="252,122 245,117 253,113" fill={ACCENT} />
      <text x="280" y="104" textAnchor="middle" fontSize="8.5" fill={ACCENT}>ANTIHORARIO · 2333 RPM</text>

      {/* Ficha del equipo */}
      <rect x="360" y="60" width="155" height="215" fill={PAPER} stroke={INK} strokeWidth="1" />
      <text x="372" y="82" fontSize="9" fill={INK} fontWeight="bold">FICHA DEL EQUIPO</text>
      <line x1="360" y1="92" x2="515" y2="92" stroke={GRAIN} strokeWidth="1" />

      <text x="372" y="112" fontSize="8" fill={MUTED}>RELACIÓN DE TRANSMISIÓN</text>
      <text x="372" y="126" fontSize="11" fill={INK} fontWeight="bold">20 : 15 (i = 1.33)</text>

      <text x="372" y="148" fontSize="8" fill={MUTED}>PRUEBAS</text>
      <text x="372" y="162" fontSize="10" fill={ACCENT} fontWeight="bold">En banco de pruebas</text>

      <text x="372" y="184" fontSize="8" fill={MUTED}>SERVICIO</text>
      <text x="372" y="198" fontSize="10" fill={INK} fontWeight="bold">Rebobinado de motores</text>

      <text x="372" y="220" fontSize="8" fill={MUTED}>EQUIPOS</text>
      <text x="372" y="234" fontSize="10" fill={INK}>Nuevos y reacondicionados</text>

      <rect x="370" y="246" width="135" height="20" fill={SURFACE} />
      <text x="378" y="260" fontSize="8.5" fill={ACCENT} fontWeight="bold">CON GARANTÍA OPERATIVA</text>

      <text x="240" y="318" textAnchor="middle" fontSize="9" fill={INK}>
        SUMINISTRO, INSTALACIÓN Y REBOBINADO DE MOTORES Y ELECTROBOMBAS
      </text>
    </svg>
  );
}
