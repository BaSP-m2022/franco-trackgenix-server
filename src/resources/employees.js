import express from 'express';
// eslint-disable-next-line no-unused-vars
import res from 'express/lib/response';
import fs from 'fs';

const router = express.Router();
const employees = require('../data/employees.json');

// eslint-disable-next-line no-shadow
router.get('/', (req, res) => {
  res.send(employees);
});

// get an employee by id

// eslint-disable-next-line no-shadow
router.get('/getById/:id', (req, res) => {
  const employeeId = req.params.id;
  // eslint-disable-next-line no-shadow
  const employee = employees.find((employee) => employee.id === employeeId);
  if (employee) {
    res.send(employee);
  } else {
    res.send('Employee not found');
  }
});

// delete an employee by id

// eslint-disable-next-line no-shadow
router.delete('/deleted/:id', (req, res) => {
  const employeeId = req.params.id;
  // eslint-disable-next-line no-shadow
  const deleteEmployee = employees.filter((deleteEmployee) => deleteEmployee.id !== employeeId);
  if (employees.length === deleteEmployee.length) {
    res.send('Employee was not found to delete');
  } else {
    fs.writeFile('src/data/employees.json', JSON.stringify(deleteEmployee), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.send('Employee deleted');
      }
    });
  }
});

// filter employee by name

// router.get('/getByName', (req, res) => {
//   const employeeName = req.query.name;
//   const employeeFilter = employees.filter((s) => s.Name === employeeName);
//   if (employeeFilter.length > 0) {
//     res.send(employeeFilter);
//   } else {
//     res.send('This name was not found');
//   }
// });

// add an employee

// router.post('/add', (req, res) => {
//   const employeeAdd = req.body;
//   employees.push(employeeAdd);
//   fs.writeFile('src/data/employees.json', JSON.stringify(employees), (error) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send('employee not added');
//     }
//   });
// });

// filter employee

// eslint-disable-next-line no-shadow
router.get('/filter', (req, res) => {
  const employeeId = req.query.id;
  const employeeName = req.query.Name;
  const employeeLastName = req.query.lastName;
  const employeeEmail = req.query.email;
  const employeeDoB = req.query.dateOfBirth;
  const employeeDni = req.query.dni;
  if (!employeeId && !employeeName && !employeeLastName && !employeeEmail
    && !employeeDoB && !employeeDni) {
    res.send(employees);
  }
  const employeeFilter = employees.filter((employee) => {
    if (employeeId && employeeName && employeeLastName && employeeEmail
        && employeeDoB && employeeDni) {
      return employee.id.includes(employeeId) && employee.Name.includes(employeeName)
            // eslint-disable-next-line max-len
            && employee.lastName.includes(employeeLastName) && employee.email.includes(employeeEmail)
            && employee.dateOfBirth.includes(employeeDoB) && employee.dni.includes(employeeDni);
    }
    if (employeeName && employeeLastName && employeeEmail && employeeDoB && employeeDni) {
      return employee.Name.includes(employeeName) && employee.lastName.includes(employeeLastName)
            && employee.email.includes(employeeEmail) && employee.dateOfBirth.includes(employeeDoB)
            && employee.dni.includes(employeeDni);
    }
    if (employeeLastName && employeeEmail && employeeDoB && employeeDni) {
      return employee.lastName.includes(employeeLastName) && employee.email.includes(employeeEmail)
            && employee.dateOfBirth.includes(employeeDoB) && employee.dni.includes(employeeDni);
    }
    if (employeeEmail && employeeDoB && employeeDni) {
      return employee.email.includes(employeeEmail) && employee.dateOfBirth.includes(employeeDoB)
            && employee.dni.includes(employeeDni);
    }
    if (employeeDoB && employeeDni) {
      return employee.dateOfBirth.includes(employeeDoB) && employee.dni.includes(employeeDni);
    }
    if (employeeDni) {
      return employee.dni.includes(employeeDni);
    }
    if (employeeDoB) {
      return employee.dateOfBirth.includes(employeeDoB);
    }
    if (employeeEmail) {
      return employee.email.includes(employeeEmail);
    }
    if (employeeLastName) {
      return employee.lastName.includes(employeeLastName);
    }
    if (employeeName) {
      return employee.Name.includes(employeeName);
    }
    if (employeeId) {
      return employee.id.includes(employeeId);
    }
    return false;
  });

  if (employeeFilter.length > 0) {
    res.send(employeeFilter);
  } else {
    res.send('Employee not found');
  }
});

export default router;
