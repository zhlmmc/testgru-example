import { describe, it, expect, beforeEach } from 'vitest';
import { UserManager } from './user';

describe('UserManager', () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  describe('addUser', () => {
    it('should add a user with auto-incrementing ID', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
      expect(user1.name).toBe('John');
      expect(user1.email).toBe('john@example.com');
      expect(userManager.getAllUsers()).toHaveLength(2);
    });

    it('should store users correctly', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const storedUser = userManager.findUserById(user.id);

      expect(storedUser).toEqual(user);
    });
  });

  describe('findUserById', () => {
    it('should find existing user by ID', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const foundUser = userManager.findUserById(user.id);

      expect(foundUser).toEqual(user);
    });

    it('should return undefined for non-existent ID', () => {
      const foundUser = userManager.findUserById(999);
      expect(foundUser).toBeUndefined();
    });
  });

  describe('findUserByEmail', () => {
    it('should find existing user by email', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const foundUser = userManager.findUserByEmail('john@example.com');

      expect(foundUser).toEqual(user);
    });

    it('should return undefined for non-existent email', () => {
      const foundUser = userManager.findUserByEmail('notfound@example.com');
      expect(foundUser).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete existing user', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const result = userManager.deleteUser(user.id);

      expect(result).toBe(true);
      expect(userManager.findUserById(user.id)).toBeUndefined();
      expect(userManager.getAllUsers()).toHaveLength(0);
    });

    it('should return false when deleting non-existent user', () => {
      const result = userManager.deleteUser(999);
      expect(result).toBe(false);
    });

    it('should only delete specified user', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      userManager.deleteUser(user1.id);

      expect(userManager.findUserById(user2.id)).toEqual(user2);
      expect(userManager.getAllUsers()).toHaveLength(1);
    });
  });

  describe('deleteUserByName', () => {
    it('should delete existing user by name', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const result = userManager.deleteUserByName('John');

      expect(result).toBe(true);
      expect(userManager.findUserById(user.id)).toBeUndefined();
      expect(userManager.getAllUsers()).toHaveLength(0);
    });

    it('should return false when deleting non-existent user by name', () => {
      const result = userManager.deleteUserByName('NonExistentUser');
      expect(result).toBe(false);
    });

    it('should delete first user when multiple users have same name', () => {
      const user1 = userManager.addUser('John', 'john1@example.com');
      const user2 = userManager.addUser('John', 'john2@example.com');
      const user3 = userManager.addUser('Jane', 'jane@example.com');

      const result = userManager.deleteUserByName('John');

      expect(result).toBe(true);
      expect(userManager.findUserById(user1.id)).toBeUndefined();
      expect(userManager.findUserById(user2.id)).toBeDefined();
      expect(userManager.findUserById(user3.id)).toBeDefined();
      expect(userManager.getAllUsers()).toHaveLength(2);
    });
  });

  describe('getAllUsers', () => {
    it('should return empty array when no users exist', () => {
      expect(userManager.getAllUsers()).toEqual([]);
    });

    it('should return all added users', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      expect(userManager.getAllUsers()).toEqual([user1, user2]);
    });
  });
});
