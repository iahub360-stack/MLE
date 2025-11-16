import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Configurações de imagem
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Configurações de headers para segurança e performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Configurações de redirecionamento
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Configurações de typescript
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Configurações de ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;