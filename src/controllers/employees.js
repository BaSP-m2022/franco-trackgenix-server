import Employee from '../models/Employees';

const post = async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json({
      message: 'Employee created successfully',
      data: newEmployee,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating new employee',
      data: undefined,
      error: true,
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const findAndDeleteEmployee = await Employee.findByIdAndRemove(req.params.id);
    if (!findAndDeleteEmployee) {
      res.status(404).json({
        message: 'Employee ID not found',
        data: undefined,
        error: true,
      });
    }
    res.status(200).json({
      message: 'Employee deleted successfully',
      data: findAndDeleteEmployee,
      error: false,
    });
  } catch (error) {
    res.status(500)({
      message: 'Employee can not be deleted',
      data: undefined,
      error: true,
    });
  }
};

export default {
  post,
  deleteById,
};
