// template.tsx se vuelve a montar en cada navegación: la entrada de sección
// corre una vez y, al terminar, no deja transform aplicado (texto nítido).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="mechanical-slide-scenario">{children}</div>;
}
