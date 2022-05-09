import express from 'express';
import fs from 'fs';

const router = express.Router();
const employees = require('../data/employees.json');

router.get('/', (req, res) => {
  res.send(employees);
});

// get an employee by id

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

// router.get('/', (req, res) => {
//     const employeeId = req.query.id;
//     const employeeName = req.query.Name;
//     const employeeLastName = req.query.lastName;
//     const employeeEmail = req.query.email;
//     const employeeDoB = req.query.dateOfBirth;
//     const employeeDni = req.query.dni;
//     if (!employeeId & !employeeName & !employeeLastName &!employeeEmail
//     &!employeeDoB &!employeeDni) {
//         res.send(employees);
//     }
//     const filterById = employees.filter((employee) => {
//         if (employeeId & employeeName & employeeName & employeeLastName &employeeEmail &
//         employeeDoB &employeeDni) {
//             return employee.id.includes(employeeId) & employee.Name.includes(employeeName) &
//         employee.Name.includes(employeeName)
//         }
//     }
// })

export default router;
