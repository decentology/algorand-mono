module.exports = {
  apps: [
    {
      name: 'algorand.dev.trunk',
      script: './main.js',
      node_args: '--experimental-specifier-resolution=node'
    }
  ]
};