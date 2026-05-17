module.exports = function verifyRequest(req, expectedToken) {
  const auth = req.headers.authorization || '';
  const token = auth.replace(/^Bearer\s+/i, '');
  return token && token === expectedToken;
};
