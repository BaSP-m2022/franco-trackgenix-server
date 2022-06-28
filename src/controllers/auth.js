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

export default register;
