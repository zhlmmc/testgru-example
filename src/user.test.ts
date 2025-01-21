import { describe, it, expect, beforeEach } from 'vitest';
import { UserManager } from './user';

describe('UserManager', () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  describe('addUser', () => {
    it('should add a new user with incremented ID', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      expect(user1.id).toBe(1);
      expect(user1.name).toBe('John');
      expect(user1.email).toBe('john@example.com');

      expect(user2.id).toBe(2);
      expect(user2.name).toBe('Jane');
      expect(user2.email).toBe('jane@example.com');

      expect(userManager.getAllUsers()).toHaveLength(2);
    });
  });

  describe('findUserById', () => {
    it('should find an existing user by ID', () => {
      const addedUser = userManager.addUser('John', 'john@example.com');
      const foundUser = userManager.findUserById(addedUser.id);

      expect(foundUser).toBeDefined();
      expect(foundUser).toEqual(addedUser);
    });

    it('should return undefined for non-existent user ID', () => {
      const foundUser = userManager.findUserById(999);
      expect(foundUser).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete an existing user', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const result = userManager.deleteUser(user.id);

      expect(result).toBe(true);
      expect(userManager.getAllUsers()).toHaveLength(0);
      expect(userManager.findUserById(user.id)).toBeUndefined();
    });

    it('should return false when trying to delete non-existent user', () => {
      const result = userManager.deleteUser(999);
      expect(result).toBe(false);
    });
  });

  describe('getAllUsers', () => {
    it('should return empty array when no users exist', () => {
      expect(userManager.getAllUsers()).toEqual([]);
    });

    it('should return array of all added users', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      const allUsers = userManager.getAllUsers();

      expect(allUsers).toHaveLength(2);
      expect(allUsers).toContainEqual(user1);
      expect(allUsers).toContainEqual(user2);
    });
  });
});
