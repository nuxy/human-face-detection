module.exports = {
  openapi: '3.0.0',
  info: {
    title: process.env.npm_package_name,
    description: process.env.npm_package_description,
    version: process.env.npm_package_version
  },
  servers: [{
    url: 'http://localhost:3000'
  }]
};
