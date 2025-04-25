const jwt = require('jsonwebtoken');

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Malformed token' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
      }
      req.user = decoded;
      next();
    });
  };
};

module.exports = authorizeRoles;
