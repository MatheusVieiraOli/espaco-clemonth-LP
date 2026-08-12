// Servidor estático para pré-visualizar o site durante o desenvolvimento.
// Serve a raiz do repositório, que é de onde a Vercel também serve.
// Uso: node _dev/serve.js   →  http://localhost:4321
const http = require('http');
const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PORT = 4321;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css' : 'text/css; charset=utf-8',
  '.js'  : 'text/javascript; charset=utf-8',
  '.jpg' : 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png' : 'image/png',  '.webp': 'image/webp',
  '.svg' : 'image/svg+xml',
  '.mp4' : 'video/mp4',
  '.ico' : 'image/x-icon'
};

http.createServer((req, res) => {
  let rel = decodeURIComponent(req.url.split('?')[0]);
  if (rel === '/') rel = '/index.html';
  const file = path.join(ROOT, rel);
  if (!file.startsWith(ROOT)) { res.writeHead(403).end('forbidden'); return; }

  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404).end('404'); return; }
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Content-Length': st.size,
      'Cache-Control': 'no-cache'
    });
    fs.createReadStream(file).pipe(res);
  });
}).listen(PORT, () => console.log('Servindo /site em http://localhost:' + PORT));
