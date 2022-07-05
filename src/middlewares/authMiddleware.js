import firebase from '../helper/firebase';

const Employee = (req, res, next) => {
  const { token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Provide a Token.', error: true, data: null });
  return firebase.auth().verifyIdToken(token)
    .then(() => { next(); })
    .catch((error) => {
      res.status(401)
        .json({ message: error.toString(), error: true, data: null });
    });
};

const Admin = (req, res, next) => {
  const { token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Provide a Token.', error: true, data: null });
  return firebase.auth().verifyIdToken(token)
    .then((claims) => {
      if (claims.role !== 'ADMIN' || claims.role !== 'SUPERADMIN') return res.status(401).json({ message: 'You dont have the permissions to access this', error: true, data: null });
      return next();
    })
    .catch((error) => {
      res.status(401)
        .json({ message: error.toString(), error: true, data: null });
    });
};

const SuperAdmin = (req, res, next) => {
  const { token } = req.headers;
  if (!token) return res.status(401).json({ message: 'Provide a Token.', error: true, data: null });
  return firebase.auth().verifyIdToken(token)
    .then((claims) => {
      if (claims.role !== 'SUPERADMIN') return res.status(401).json({ message: 'You dont have the permissions to access this', error: true, data: null });
      return next();
    })
    .catch((error) => {
      res.status(401)
        .json({ message: error.toString(), error: true, data: null });
    });
};

export default { Employee, Admin, SuperAdmin };
