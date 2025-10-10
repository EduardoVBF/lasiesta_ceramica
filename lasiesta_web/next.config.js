// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // A flag 'appDir' não é mais necessária no 'experimental'
  // O 'turbo' experimental foi movido para a chave 'turbopack'

  turbopack: {
    // Isso é o equivalente a 'experimental.turbo: true'
    // Embora o Turbopack seja focado principalmente no 'next dev',
    // manter a config correta ajuda a evitar conflitos.
    enabled: true,
  },
  
  // Se houver outras flags experimentais, mantenha o objeto 'experimental'
  // experimental: {
  //    ...
  // }
};

module.exports = nextConfig;