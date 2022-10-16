require('dotenv').config();

console.log('checking envs...');

const requiredVariables = ['REACT_APP_API_URL', 'REACT_APP_MOCK_API'];

let errors = [];

for (const variable of requiredVariables) {
  if (variable in process.env) {
    console.log(`${variable} is set`);
  } else {
    errors = [...errors, new Error(`${variable} is NOT set`)];
  }
}

if (errors.length > 0) throw new AggregateError(errors, 'Environment variables check error');
