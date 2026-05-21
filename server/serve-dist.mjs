import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = Number(process.env.XSC_DIST_PORT || 3001);
const root = process.cwd();
const distRoot = path.join(root, 'dist');
const indexPath = path.join(root, 'dist', 'index.html');
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || '127.0.0.1'}`);

  if (url.pathname === '/' || url.pathname === '/index.html') {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    fs.createReadStream(indexPath).pipe(res);
    return;
  }

  const requested = path.normalize(decodeURIComponent(url.pathname.replace(/^\/+/, '')));
  const filePath = path.join(distRoot, requested);
  const relativePath = path.relative(distRoot, filePath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('not found');
    return;
  }

  const contentType = contentTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
  res.writeHead(200, { 'content-type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[xsc-dist-preview] http://127.0.0.1:${PORT}`);
});
