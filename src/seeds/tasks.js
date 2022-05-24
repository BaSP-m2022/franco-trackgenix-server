import mongoose from 'mongoose';

export default [
  {
    _id: mongoose.Types.ObjectId('6289a9f3c375d9047b94a4c5'),
    description: 'Figma design',
    workedHours: 12,
    projectId: mongoose.Types.ObjectId('6289ad47d8843229e170f328'),
    date: '2020-01-09T00:00:00.000+00:00',
  },
  {
    _id: mongoose.Types.ObjectId('628ae0e4d17167de51a40dd6'),
    description: 'Landing page: HTML structure',
    workedHours: 9,
    projectId: mongoose.Types.ObjectId('6289ad47d8843229e170f328'),
    date: '2020-02-09T00:00:00.000+00:00',
  },
  {
    _id: mongoose.Types.ObjectId('6289adc53ba4baea7bf2defd'),
    description: 'Landing page: CSS styles (without flexbox and grid)',
    workedHours: 11,
    projectId: mongoose.Types.ObjectId('6289add0d120b10098f11b98'),
    date: '2020-03-09T00:00:00.000+00:00',
  },
  {
    _id: mongoose.Types.ObjectId('6289ae1eddf4236679923912'),
    description: 'Landing page: CSS styles with flexbox',
    workedHours: 8,
    projectId: mongoose.Types.ObjectId('6289ae2826280830345a9864'),
    date: '2020-04-09T00:00:00.000+00:00',
  },
  {
    _id: mongoose.Types.ObjectId('6289aec7b0e2e0dacd30311d'),
    description: 'Login and signup validations with JavaScript ES5',
    workedHours: 12,
    projectId: mongoose.Types.ObjectId('6289aed1ba4eec80445aaf6e'),
    date: '2020-06-09T00:00:00.000+00:00',
  },
  {
    _id: mongoose.Types.ObjectId('628a54662094397759102c14'),
    description: 'HTTP request with fetch method and LocalStorage',
    workedHours: 12,
    projectId: mongoose.Types.ObjectId('628a546eb2342572d3f59d53'),
    date: '2020-07-09T00:00:00.000+00:00',
  },
];
