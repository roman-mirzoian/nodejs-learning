const user = {
  name: 'Roma',
  age: 24
};

module.exports = {
  user: user,
  say() {
    console.log(`hello, ${this.user.name}`);
  } 
};