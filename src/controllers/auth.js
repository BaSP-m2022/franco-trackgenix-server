import Firebase from '../helper/firebase';
import Users from '../models/Users';

const register = async (req, res) => {
  try {
    const newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    const userCreated = new Users({
      email: req.body.email,
      firebaseUid: newFirebaseUser.uid,
    }); const userSaved = await userCreated.save();
    return res.status(201).json({
      message: 'User created',
      data: userSaved,
    });
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
};
// const signIn = (email, password) => Firebase.auth().signInWithEmailAndPassword(email, password)
//   .then((response) => response).catch((error) => error);

const login = async (req, res) => {
  try {
    const signedUser = await Firebase.auth()
      .signInWithEmailAndPassword(req.body.email, req.body.password);
    return res.status(200).json(signedUser);
  } catch (error) {
    return res.status(400).json({ message: 'there been error', data: error.toString() });
  }
};

const checkToken = async (req, res, next) => {
  if (process.env.IS_TEST) {
    req.firebaseUid = 'NBq0Pu4Z2aW5GZSWGpt1Te3C3qL2';
    next();
  } else if (!req.headers.authorization) {
    res.boom.badRequest('Token is required');
  } else {
    try {
      const decodedToken = await Firebase.auth().verifyIdToken(req.headers.authorization);
      req.role = decodedToken.role;
      req.firebaseUid = decodedToken.uid;
      next();
    } catch (error) {
      res.boom.unauthorized('Access not allowed');
    }
  }
};

export default { register, login, checkToken };
