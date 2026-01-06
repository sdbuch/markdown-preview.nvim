module.exports = {
  pageExtensions: ['jsx'],
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/404.html': { page: '/404' }
    }
  },
  // Enable WebAssembly support for Shiki
  webpack: (config, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // Fix for "Can't resolve 'fs'" errors in browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    return config;
  },
}
