import mongoose from 'mongoose';

export default [{
  _id: mongoose.Types.ObjectId('62817f227d1213af0d9d1ab8'),
  name: 'multi',
  status: 'active',
  description: 'asd',
  employees: [
    {
      rate: 123,
      role: 'role1',
      _id: mongoose.Types.ObjectId('62817f227d1213af0d9d1ab9'),
    },
  ],
  startDate: '2002-12-09T00:00:00.000+00:00',
}];
