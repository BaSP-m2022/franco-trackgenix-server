import firebase from '../helper/firebase';

const authMiddlewareEmployee = (req, res, next) => {
  const { token } = req.headers;
  if (!token) return res.status(400).json({ message: 'Provide a Token.', error: true, data: null });
  return firebase.auth().verifyIdToken(token)
    .then(() => { next(); })
    .catch((error) => {
      res.status(401)
        .json({ message: error.toString(), error: true, data: null });
    });
};

const authMiddlewareAdmin = (req, res, next) => {
  const { token } = req.headers;
  if (!token) return res.status(400).json({ message: 'Provide a Token.', error: true, data: null });
  return firebase.auth().verifyIdToken(token)
    .then((claims) => {
      if (claims.role !== 'ADMIN' || claims.role !== 'SUPERADMIN') return res.status(400).json({ message: 'You dont have the credentials to alter this', error: true, data: null });
      return next();
    })
    .then(() => { next(); })
    .catch((error) => {
      res.status(401)
        .json({ message: error.toString(), error: true, data: null });
    });
};

const authMiddlewareSuperAdmin = (req, res, next) => {
  const { token } = req.headers;
  if (!token) return res.status(400).json({ message: 'Provide a Token.', error: true, data: null });
  return firebase.auth().verifyIdToken(token)
    .then((claims) => {
      if (claims.role !== 'SUPERADMIN') return res.status(400).json({ message: 'You dont have the credentials to alter this', error: true, data: null });
      return next();
    })
    .then(() => { next(); })
    .catch((error) => {
      res.status(401)
        .json({ message: error.toString(), error: true, data: null });
    });
};

export default { authMiddlewareEmployee, authMiddlewareAdmin, authMiddlewareSuperAdmin };
