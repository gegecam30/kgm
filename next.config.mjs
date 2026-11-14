/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

// NEXT_BASE_PATH permite compilar la vista previa en /kgm/preview sin tocar la web publicada.
const basePath = process.env.NEXT_BASE_PATH ?? (isProd ? "/kgm" : "");

const nextConfig = {
  output: "export",
  basePath,
  // Las <img> de la galería no pasan por next/image: necesitan el prefijo a mano.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
