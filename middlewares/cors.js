const allowedCors = [
  'http://51.250.29.209',
  'https://51.250.29.209',
  // 'http://localhost:3001',
  'http://localhost:3000',
  // 'https://localhost:3001',
  'https://localhost:3000',
  // 'https://api.trumesto.nomoredomains.xyz',
  // 'https://trumesto.nomoredomains.xyz',
  // 'http://api.trumesto.nomoredomains.xyz',
  // 'http://trumesto.nomoredomains.xyz',
];

const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};