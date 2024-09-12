/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.pokemon.com',
        pathname: '/static-assets/content-assets/cms2/img/pokedex/full/**',
      },
    ],
  },
};

export default nextConfig;