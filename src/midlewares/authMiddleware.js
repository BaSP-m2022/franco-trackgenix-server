import firebase from '../helper/firebase';

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;
  if (!token) return res.status(400).json({ message: 'Provide a Token.' });
  return firebase.auth().verifyIdToken(token)
    .then(() => { next(); })
    .catch((error) => { res.status(401).json({ message: error.toString() }); });
};

export default authMiddleware;
