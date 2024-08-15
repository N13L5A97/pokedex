/** @type {import('next').NextConfig} */
const nextConfig = {
        images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'www.pokemon.com',
            },
          ],
        },
};

export default nextConfig;
