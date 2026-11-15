# KGM INDUSTRIAS E.I.R.L. — sitio web

Sitio corporativo de KGM INDUSTRIAS E.I.R.L. (sistemas contra incendio, bombeo, estructuras metálicas, acondicionamiento y redes en Lima).

Next.js 14 (App Router) + Tailwind CSS, exportado como sitio estático y publicado en GitHub Pages.

## Estructura

| Ruta | Contenido |
| --- | --- |
| `/` | Presentación, ficha técnica (cajetín) e índice de especialidades |
| `/especialidades/` | Las seis especialidades con su esquema técnico. Cada una tiene su ancla: `#contraincendio`, `#bombeo`, `#estructuras`, `#acondicionamiento`, `#redes`, `#suministro` |
| `/protocolo/` | Flujo de trabajo en tres etapas y riesgos que mitiga |
| `/trabajos/` | Obras y clientes de referencia (del brochure) y galería de fotos |
| `/privacidad/` | Política de privacidad (Ley 29733) — revisar con asesoría legal |
| `/cotizacion/` | Formulario de cotización (abre el correo del visitante) y datos de la sede. Acepta `?area=<ancla>` para preseleccionar la especialidad |

```
src/
  app/                  rutas, layout, metadatos, sitemap, ícono e imagen para compartir
  components/           secciones y esquemas SVG (Diagrams.tsx)
  data/kgm-data.ts      TODO el contenido editable del sitio
```

## Editar contenido

Todos los textos, datos de contacto y servicios están en `src/data/kgm-data.ts`.

Datos de contacto en `contact`:

- `phone` / `landline`: celular y teléfono fijo (tomados del brochure y del membrete). Vacíos = no se muestran.
- `whatsapp`: número solo con dígitos, con código de país (ej. `51987654321`). Vacío = no aparece el botón de WhatsApp.
- `email`: buzón que recibe las solicitudes del formulario.
- `formEndpoint`: URL de un servicio de formularios (Formspree, Web3Forms…). Con ella el formulario envía la solicitud directamente; vacío, abre el programa de correo del visitante.
- `complaintsBookUrl`: enlace al Libro de Reclamaciones virtual. Vacío = no aparece en el pie.

### Fotos de la galería

1. Copiar las fotos a `public/galeria/` (JPG de ~1600 px de ancho, comprimidas).
2. Opcional: una copia diminuta de cada una (~40 px de ancho, ej. `foto-mini.jpg`) para el efecto borroso mientras carga.
3. En `gallery.items` de `kgm-data.ts`, completar `src: "/galeria/foto.jpg"` (y `lqip: "/galeria/foto-mini.jpg"`).

Sin `src` se muestra el marco "Foto pendiente"; mientras la foto carga se ve un marco animado "Cargando foto…".

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
