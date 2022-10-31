const allowedCors = [
  'https://memesto.nomoredomains.icu',
  'http://memesto.nomoredomains.icu',
  'https://api.memesto.nomoredomains.icu',
  'http://api.memesto.nomoredomains.icu',
  'http://localhost:7777',
  'https://localhost:7777',
  'http://localhost: 127.0.0.1',
  'localhost:127.0.0.1',
];

const handleCors = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

module.exports = {
  handleCors,
};
