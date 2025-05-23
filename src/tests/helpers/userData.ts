// Dummy data generator for signup and auth flows
// Ensures unique, valid data for each test run

export function generateUser() {
  const id = Date.now();
  return {
    firstName: `Test${id}`,
    lastName: 'User',
    email: `testuser${id}@example.com`,
    password: 'Test@1234',
    phone: `90000${id.toString().slice(-6)}`,
    countryCode: '+91',
  };
} 