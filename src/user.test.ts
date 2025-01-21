import { describe, it, expect, beforeEach } from 'vitest';
import { UserManager } from './user';

describe('UserManager', () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  describe('addUser', () => {
    it('should add a user with auto-incremented ID', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
      expect(user1.name).toBe('John');
      expect(user1.email).toBe('john@example.com');
      expect(userManager.getAllUsers()).toHaveLength(2);
    });

    it('should add user with correct data', () => {
      const user = userManager.addUser('Test User', 'test@example.com');

      expect(user).toEqual({
        id: 1,
        name: 'Test User',
        email: 'test@example.com'
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete existing user and return true', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const result = userManager.deleteUser(user.id);

      expect(result).toBe(true);
      expect(userManager.getAllUsers()).toHaveLength(0);
    });

    it('should return false when deleting non-existent user', () => {
      const result = userManager.deleteUser(999);
      expect(result).toBe(false);
    });

    it('should only delete the specified user', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      userManager.deleteUser(user1.id);

      expect(userManager.getAllUsers()).toHaveLength(1);
      expect(userManager.findUserById(user2.id)).toBeDefined();
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
      const foundUser = userManager.findUserByEmail(user.email);
      expect(foundUser).toEqual(user);
    });

    it('should return undefined for non-existent email', () => {
      const foundUser = userManager.findUserByEmail('nonexistent@example.com');
      expect(foundUser).toBeUndefined();
    });
  });

  describe('getAllUsers', () => {
    it('should return empty array when no users exist', () => {
      expect(userManager.getAllUsers()).toEqual([]);
    });

    it('should return array of all users', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      expect(userManager.getAllUsers()).toEqual([user1, user2]);
    });
  });
});
