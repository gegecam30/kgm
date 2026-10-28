# KGM INDUSTRIAS E.I.R.L. — sitio web

Sitio corporativo de KGM INDUSTRIAS E.I.R.L. (mantenimiento de sistemas de bombeo, acondicionamiento de edificios y redes sanitarias y eléctricas en Lima).

Next.js 14 (App Router) + Tailwind CSS, exportado como sitio estático y publicado en GitHub Pages.

## Estructura

| Ruta | Contenido |
| --- | --- |
| `/` | Presentación, ficha técnica (cajetín) e índice de especialidades |
| `/especialidades/` | Las cuatro especialidades con su esquema técnico. Cada una tiene su ancla: `#bombeo`, `#acondicionamiento`, `#redes`, `#suministro` |
| `/protocolo/` | Flujo de trabajo en tres etapas y riesgos que mitiga |
| `/cotizacion/` | Formulario de cotización (abre el correo del visitante) y datos de la sede. Acepta `?area=<ancla>` para preseleccionar la especialidad |

```
src/
  app/                  rutas, layout, metadatos, sitemap, ícono e imagen para compartir
  components/           secciones y esquemas SVG (Diagrams.tsx)
  data/kgm-data.ts      TODO el contenido editable del sitio
```

## Editar contenido

Todos los textos, datos de contacto y servicios están en `src/data/kgm-data.ts`.

Antes de publicar, completar en `contact`:

- `phone`: teléfono público. Si queda vacío, no se muestra.
- `whatsapp`: número solo con dígitos, con código de país (ej. `51987654321`). Si queda vacío, no aparece el botón de WhatsApp.
- `email`: confirmar que el buzón existe; el formulario envía la solicitud a esa dirección.

Si se usa un dominio propio, cambiar `site.origin` y `site.basePath` en `kgm-data.ts` y `basePath` en `next.config.mjs`.

## Desarrollo

```bash
npm ci
npm run dev      # http://localhost:3000
npm run lint
npm run build    # genera ./out (requiere acceso a Google Fonts)
```

## Publicación

Cada push a `main` ejecuta `.github/workflows/deploy.yml`, que compila y publica `./out` en GitHub Pages.
