// Define the User interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Define the UserManager class
class UserManager {
  private users: User[] = [];
  private nextId: number = 1;

  // Add a user
  addUser(name: string, email: string): User {
    const newUser: User = {
      id: this.nextId++,
      name,
      email,
    };
    this.users.push(newUser);
    return newUser;
  }

  // Edit a user
  editUser(id: number, name: string, email: string): User | undefined {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      user.name = name;
      user.email = email;
    }
    return user;
  }

  // Find a user by ID
  findUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  // Find a user by email
  findUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  // Find all users by name
  findUsersByName(name: string): User[] {
    return this.users.filter((user) => user.name === name);
  }
  
  // Delete a user
  deleteUser(id: number): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  // delete user by name
  deleteUserByName(name: string): boolean {
    const index = this.users.findIndex((user) => user.name === name);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }


  deleteAllUsers(): void {
    this.users = [];
  }

  // Get all users
  getAllUsers(): User[] {
    return this.users;
  }
}


export { UserManager };
