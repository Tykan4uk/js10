class MockServer {
  static #users = [];

  static getAllUsers = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.#users), 1000);
    });
  }

  static getUser = (id) => {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        user !== undefined
          ? resolve(user)
          : rejected({ httpCode: 404, errorMessage: `User with id=${id} not found.` })
      }, 1000);

      const user = this.#users.find(user => user.id === id);
    });
  }

  static addUser = (user) => {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        success === true
          ? resolve(success)
          : rejected({ httpCode: 400, errorMessage: `User with this id exist or not enough data.` })
      }, 1000);

      const success = user.id !== undefined
        && user.name !== undefined
        && user.age !== undefined
        && !this.#users.some(u => u.id === user.id);

      if (success)
        this.#users.push(user);
    });
  }

  static updateUser = (id, user) => {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        userIndex !== -1 && this.#users[userIndex]?.id === user.id
          ? resolve(this.#users[userIndex])
          : rejected({ httpCode: 404, errorMessage: `User with id=${id} not found.` })
      }, 1000);

      const userIndex = this.#users.findIndex(u => u.id === id);

      if (userIndex !== -1 && this.#users[userIndex].id === user.id) {
        this.#users[userIndex].name = user.name !== undefined ? user.name : this.#users[userIndex].name;
        this.#users[userIndex].age = user.age !== undefined ? user.age : this.#users[userIndex].age;
      }
    });
  }

  static deleteUser = (id) => {
    return new Promise((resolve, rejected) => {
      setTimeout(() => {
        userIndex !== -1
          ? resolve(true)
          : rejected({ httpCode: 404, errorMessage: `User with id=${id} not found.` })
      }, 1000);

      const userIndex = this.#users.findIndex(u => u.id === id);

      if (userIndex !== -1) {
        this.#users.splice(userIndex, 1);
      }
    });
  }
}

const readAllUsers = async () => {
  await MockServer.getAllUsers()
    .then(result => console.log(result))
    .catch(error => console.log(error))
};

const readUserById = async (id) => {
  await MockServer.getUser(id)
    .then(result => console.log(result))
    .catch(error => console.log(error))
};

const addUser = async (user) => {
  await MockServer.addUser(user)
    .then(result => console.log(result))
    .catch(error => console.log(error))
};

const updateUserById = async (id, user) => {
  await MockServer.updateUser(id, user)
    .then(result => console.log(result))
    .catch(error => console.log(error))
};

const deleteUserById = async (id) => {
  await MockServer.deleteUser(id)
    .then(result => console.log(result))
    .catch(error => console.log(error))
};

addUser({ id: 0, name: 'Alex', age: 24 });
addUser({ id: 1, name: 'Mykola', age: 19 });
addUser({ id: 2, name: 'Anna', age: 26 });
addUser({ id: 3, name: 'Dmytro', age: 29 });
addUser({ id: 4, name: 'Edward', age: 19 });

addUser({ id: 4, name: 'Edward' });
addUser({ id: 4, name: 'NotEdward', age: 19 });

readAllUsers();

readUserById(0);
readUserById(10);

updateUserById(4, { id: 4, name: 'EdwardFirst', age: 75 })
updateUserById(4, { id: 5, name: 'EdwardFirst', age: 75 })
updateUserById(40, { id: 5, name: 'EdwardFirst', age: 75 })
readUserById(4);

deleteUserById(4);
deleteUserById(4);
readUserById(4);

readAllUsers();