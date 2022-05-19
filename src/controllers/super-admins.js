import SuperAdmin from '../models/Super-admins';

const deleteById = async (req, res) => {
  try {
    const result = await SuperAdmin.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'Super Admin not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Super Admin deleted successfully',
      data: undefined,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

const getById = async (req, res) => {
  try {
    if (req.params.id) {
      const sAdmin = await SuperAdmin.findById(req.params.id);
      if (Object.entries(sAdmin).length) {
        return res.status(200).json({
          sAdmin,
          error: false,
        });
      }
      return res.status(404).json({
        message: 'Super Admin not found, invalid ID',
        data: undefined,
        error: true,
      });
    }
    return false;
  } catch (error) {
    return res.status(500).json({
      message: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

const post = async (req, res) => {
  try {
    const sAdmin = new SuperAdmin({
      password: req.body.password,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    const result = await sAdmin.save();
    return res.status(201).json({
      result,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'An error has ocurred',
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
          result,
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
      message: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

const getFilter = async (req, res) => {
  try {
    const result = await SuperAdmin.find(req.query);
    if (result.length > 0) {
      return res.status(200).json({
        result,
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
      message: 'An error has ocurred',
      data: undefined,
      error: true,
    });
  }
};

export default {
  getById,
  getFilter,
  deleteById,
  post,
  put,
};
