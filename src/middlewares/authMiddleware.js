import firebase from '../helper/firebase';

const Employee = async (req, res, next) => {
  const { token } = req.headers;
  if (!token || token === 'null') return res.status(401).json({ message: 'Provide a Token.', error: true, data: null });
  try {
    const { role } = await firebase.auth().verifyIdToken(token);
    return (role !== 'EMPLOYEE' && role !== 'ADMIN' && role !== 'SUPER-ADMIN')
      ? res.status(401).json({ message: 'You dont have the permissions to access this.', error: true, data: null })
      : next();
  } catch (error) {
    return res.status(401)
      .json({ message: error.toString(), error: true, data: null });
  }
};

const Admin = async (req, res, next) => {
  const { token } = req.headers;
  if (!token || token === 'null') return res.status(401).json({ message: 'Provide a Token.', error: true, data: null });
  try {
    const { role } = await firebase.auth().verifyIdToken(token);
    return (role !== 'ADMIN' && role !== 'SUPER-ADMIN')
      ? res.status(401).json({ message: 'You dont have the permissions to access this.', error: true, data: null })
      : next();
  } catch (error) {
    return res.status(401)
      .json({ message: error.toString(), error: true, data: null });
  }
};

const SuperAdmin = async (req, res, next) => {
  const { token } = req.headers;
  if (!token || token === 'null') return res.status(401).json({ message: 'Provide a Token.', error: true, data: null });
  try {
    const { role } = await firebase.auth().verifyIdToken(token);
    return (role !== 'SUPER-ADMIN')
      ? res.status(401).json({ message: 'You dont have the permissions to access this.', error: true, data: null })
      : next();
  } catch (error) {
    return res.status(401)
      .json({ message: error.toString(), error: true, data: null });
  }
};

export default { Employee, Admin, SuperAdmin };
