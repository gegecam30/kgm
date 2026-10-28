/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  // NEXT_BASE_PATH permite compilar la vista previa en /kgm/preview sin tocar la web publicada.
  basePath: process.env.NEXT_BASE_PATH ?? (isProd ? "/kgm" : ""),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
