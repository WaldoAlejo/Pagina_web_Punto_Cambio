module.exports = {
  apps: [{
    name: 'punto-cambio',
    script: 'npx',
    args: 'vite preview',
    env: {
      NODE_ENV: 'production',
      PORT: 4173
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
