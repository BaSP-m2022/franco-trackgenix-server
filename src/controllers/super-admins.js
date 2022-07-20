import Firebase from '../helper/firebase';
import SuperAdmin from '../models/Super-admins';

const deleteById = async (req, res) => {
  try {
    const result = await SuperAdmin.findByIdAndUpdate(req.params.id, { isDeleted: true });
    await Firebase.auth().deleteUser(result.firebaseUid).catch(() => { throw new Error('Firebase error'); });
    if (!result) {
      return res.status(404).json({
        message: 'Super Admin not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Super Admin deleted successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getById = async (req, res) => {
  try {
    if (req.params.id) {
      const sAdmin = await SuperAdmin.findById(req.params.id).find({ isDeleted: false });
      if (!sAdmin) {
        return res.status(404).json({
          message: 'Super Admin not found, invalid ID',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Super Admin found successfully',
        data: sAdmin,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Invalid params',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const createSuperAdmin = async (req, res) => {
  let newFirebaseUser;
  try {
    newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    await Firebase.auth().setCustomUserClaims(newFirebaseUser.uid, { role: 'SUPER-ADMIN' });
  } catch (error) {
    return res.status(500).json({
      message: `Firebase Error: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
  const bodySuperAdmin = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    firebaseUid: newFirebaseUser.uid,
    isDeleted: false,
  };
  try {
    const newSuperAdmin = await SuperAdmin.create(bodySuperAdmin);
    return res.status(201).json({
      message: 'Your registration was successful',
      data: newSuperAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: `MongoDB Error: ${error.message}`,
      data: undefined,
      error: true,
    });
  }
};

const put = async (req, res) => {
  try {
    if (req.params) {
      const result = await SuperAdmin.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (result) {
        return res.status(200).json({
          message: 'Super Admin edited successfully',
          data: result,
          error: false,
        });
      }
      return res.status(404).json({
        message: 'Super Admin not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(400).json({
      message: 'Missing id parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

const getFilter = async (req, res) => {
  try {
    const result = await SuperAdmin.find({ ...req.query, isDeleted: false });
    if (result.length > 0) {
      return res.status(200).json({
        message: 'Super Admins found successfully',
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Super Admins not found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getById,
  getFilter,
  deleteById,
  put,
  createSuperAdmin,
};
