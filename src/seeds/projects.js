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
        _id: mongoose.Types.ObjectId('628a5ad8f6a8cdd3cefb2b07'),
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
        _id: mongoose.Types.ObjectId('628a5ae1c56212ee7a5618cd'),
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
        _id: mongoose.Types.ObjectId('628a5ae941697271968cd673'),
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
        _id: mongoose.Types.ObjectId('628a5af52a91d6871a6ebb81'),
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
        _id: mongoose.Types.ObjectId('628a5b0333675625aa393918'),
      },
    ],
    startDate: '2002-12-09T00:00:00.000+00:00',
  }, {
    _id: mongoose.Types.ObjectId('628abb62edfde385f408fe4f'),
    name: 'Twitter',
    status: 'active',
    description: 'BaSP-TG-26: twitter',
    employees: [
      {
        rate: 3,
        role: 'PM',
        _id: mongoose.Types.ObjectId('628abb6852be388c3fcef04a'),
      },
    ],
    startDate: '2002-12-09T00:00:00.000+00:00',
  },
];
