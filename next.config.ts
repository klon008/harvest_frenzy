import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', // Статический экспорт
  basePath: '/harvest_frenzy', // Если проект НЕ в корне (user.github.io/repo-name)
  images: {
    unoptimized: true, // Обязательно для gh-pages
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
