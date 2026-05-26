#!/bin/bash

# Script para deployment en GCP VM

echo "🚀 Iniciando deployment de Punto Cambio..."

# Construir proyecto
echo "📦 Construyendo proyecto..."
npm run build

# Iniciar con PM2
echo "🔄 Iniciando servidor con PM2..."
pm2 delete punto-cambio 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "✅ Deployment completado!"
echo ""
echo "📍 El sitio está disponible en:"
echo "   - Local: http://localhost:4173"
echo "   - IP Externa de GCP: http://TU_IP_EXTERNA_GCP:4173"
echo ""
echo "📊 Para ver logs: pm2 logs punto-cambio"
echo "🔍 Para ver status: pm2 status"
echo "🔄 Para reiniciar: pm2 restart punto-cambio"
