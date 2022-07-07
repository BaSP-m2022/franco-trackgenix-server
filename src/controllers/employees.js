import Employee from '../models/Employees';

const getById = async (req, res) => {
  try {
    if (req.params.id) {
      const employeeById = await Employee.findById(req.params.id).find({ isDeleted: false });
      if (!employeeById) {
        return res.status(404).json({
          message: 'Employee was not found',
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'Success',
        data: employeeById,
        error: false,
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
    const result = await Employee.find({ ...req.query, isDeleted: false });
    if (result.length > 0) {
      return res.status(200).json({
        message: 'Success',
        data: result,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'Employee was not found',
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

const deleteById = async (req, res) => {
  try {
    const findAndDeleteEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
    );
    if (!findAndDeleteEmployee) {
      return res.status(404).json({
        message: 'Employee ID not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee deleted successfully',
      data: findAndDeleteEmployee,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Employee can not be deleted',
      data: undefined,
      error: true,
    });
  }
};

const put = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'missing id parameter',
        data: undefined,
        error: true,
      });
    }
    const result = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'The employee has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Employee edited successfully',
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

const post = async (req, res) => {
  try {
    const newEmployee = await Employee.create({ ...req.body, isDeleted: false });
    return res.status(201).json({
      message: 'Employee created successfully',
      data: newEmployee,
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

export default {
  getById,
  getFilter,
  deleteById,
  put,
  post,
};
