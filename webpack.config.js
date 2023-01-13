module.exports = {
  devServer: {
    contentBase: './app',
    compress: true,
    proxy: {
      '/graphql': {
        target: 'https://plant-shop-strapi-production.up.railway.app/server.js',
        secure: false,
      },
    },
  },
};