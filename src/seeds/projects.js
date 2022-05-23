import mongoose from 'mongoose';

export default [
  {
    _id: mongoose.Types.ObjectId('628a59c9f67d45161581886f'),
    name: 'Radium Rocket',
    status: 'active',
    description: 'BaSP-TG-26: radium',
    employees: [
      {
        rate: 1,
        role: 'QA',
        employeeId: mongoose.Types.ObjectId('60d4a32f257e066e9495ce12'),
      },
    ],
    startDate: '2002-12-09T00:00:00.000+00:00',
  },
  {
    _id: mongoose.Types.ObjectId('628a59f1a847f0ea55251cc2'),
    name: 'Facebook',
    status: 'inactive',
    description: 'BaSP-TG-26: facebook',
    employees: [
      {
        rate: 2,
        role: 'DEV',
        employeeId: mongoose.Types.ObjectId('62830ed24887fa4590d33107'),
      },
      {
        rate: 2,
        role: 'QA',
        employeeId: mongoose.Types.ObjectId('60d4a32f257e066e9495ce12'),
      },
    ],
    startDate: '2002-12-09T00:00:00.000+00:00',
  },
  {
    _id: mongoose.Types.ObjectId('628a5a1d3a9e2db5eeebf009'),
    name: 'Twitter',
    status: 'active',
    description: 'BaSP-TG-26: twitter',
    employees: [
      {
        rate: 3,
        role: 'PM',
        employeeId: mongoose.Types.ObjectId('6289016df4d67ad85b52d9af'),
      },
    ],
    startDate: '2002-12-09T00:00:00.000+00:00',
  },
  {
    _id: mongoose.Types.ObjectId('628a5a47f97f778e395a8b9a'),
    name: 'Instagram',
    status: 'active',
    description: 'BaSP-TG-26: instagram',
    employees: [
      {
        rate: 4,
        role: 'QA',
        employeeId: mongoose.Types.ObjectId('62840603549ef329a075ef63'),
      },
    ],
    startDate: '2002-12-09T00:00:00.000+00:00',
  },
  {
    _id: mongoose.Types.ObjectId('628a5a6d243774d9ac3969f7'),
    name: 'Snapchat',
    status: 'inactive',
    description: 'BaSP-TG-26: snapchat',
    employees: [
      {
        rate: 5,
        role: 'PM',
        employeeId: mongoose.Types.ObjectId('6289016df4d67ad85b52d9aa'),
      },
    ],
    startDate: '2002-12-09T00:00:00.000+00:00',
  },
];
