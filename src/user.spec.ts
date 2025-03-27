import { describe, it, expect, beforeEach } from 'vitest';
import { UserManager } from './user';

describe('UserManager', () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  describe('addUser', () => {
    it('should add a user and return the created user', () => {
      const user = userManager.addUser('John Doe', 'john@example.com');
      expect(user).toEqual({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      });
    });

    it('should increment ids for multiple users', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');
      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
    });
  });

  describe('editUser', () => {
    it('should edit an existing user', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const editedUser = userManager.editUser(user.id, 'John Doe', 'johndoe@example.com');
      expect(editedUser).toEqual({
        id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com'
      });
    });

    it('should return undefined when editing non-existent user', () => {
      const result = userManager.editUser(999, 'John', 'john@example.com');
      expect(result).toBeUndefined();
    });
  });

  describe('findUserById', () => {
    it('should find user by id', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const foundUser = userManager.findUserById(user.id);
      expect(foundUser).toEqual(user);
    });

    it('should return undefined for non-existent id', () => {
      const foundUser = userManager.findUserById(999);
      expect(foundUser).toBeUndefined();
    });
  });

  describe('findUserByEmail', () => {
    it('should find user by email', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const foundUser = userManager.findUserByEmail('john@example.com');
      expect(foundUser).toEqual(user);
    });

    it('should return undefined for non-existent email', () => {
      const foundUser = userManager.findUserByEmail('notfound@example.com');
      expect(foundUser).toBeUndefined();
    });
  });

  describe('findUsersByName', () => {
    it('should find all users with matching name', () => {
      const user1 = userManager.addUser('John', 'john1@example.com');
      const user2 = userManager.addUser('John', 'john2@example.com');
      userManager.addUser('Jane', 'jane@example.com');

      const foundUsers = userManager.findUsersByName('John');
      expect(foundUsers).toEqual([user1, user2]);
    });

    it('should return empty array when no users match name', () => {
      userManager.addUser('John', 'john@example.com');
      const foundUsers = userManager.findUsersByName('Jane');
      expect(foundUsers).toEqual([]);
    });
  });

  describe('deleteUser', () => {
    it('should delete user by id', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const result = userManager.deleteUser(user.id);
      expect(result).toBe(true);
      expect(userManager.findUserById(user.id)).toBeUndefined();
    });

    it('should return false when deleting non-existent user', () => {
      const result = userManager.deleteUser(999);
      expect(result).toBe(false);
    });
  });

  describe('deleteUserByName', () => {
    it('should delete first user with matching name', () => {
      const user1 = userManager.addUser('John', 'john1@example.com');
      const user2 = userManager.addUser('John', 'john2@example.com');

      const result = userManager.deleteUserByName('John');
      expect(result).toBe(true);
      expect(userManager.findUserById(user1.id)).toBeUndefined();
      expect(userManager.findUserById(user2.id)).toBeDefined();
    });

    it('should return false when deleting non-existent name', () => {
      const result = userManager.deleteUserByName('NotFound');
      expect(result).toBe(false);
    });
  });

  describe('deleteAllUsers', () => {
    it('should delete all users', () => {
      userManager.addUser('John', 'john@example.com');
      userManager.addUser('Jane', 'jane@example.com');
      userManager.deleteAllUsers();
      expect(userManager.getAllUsers()).toEqual([]);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');
      expect(userManager.getAllUsers()).toEqual([user1, user2]);
    });

    it('should return empty array when no users exist', () => {
      expect(userManager.getAllUsers()).toEqual([]);
    });
  });
});
