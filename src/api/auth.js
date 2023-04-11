const USER_EMAIL = 'my@email.com';
const USER_PASSWORD = '1234';

export const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === USER_EMAIL && password === USER_PASSWORD) {
        resolve(email);
      } else {
        reject('Wrong email or password!');
      }
    }, 1000);
  });
};
