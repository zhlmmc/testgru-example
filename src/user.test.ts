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
      expect(user1.name).toBe('John');
      expect(user1.email).toBe('john@example.com');

      expect(user2.id).toBe(2);
      expect(user2.name).toBe('Jane');
      expect(user2.email).toBe('jane@example.com');
    });

    it('should store users in internal array', () => {
      const user = userManager.addUser('John', 'john@example.com');
      expect(userManager.getAllUsers()).toContainEqual(user);
    });
  });

  describe('findUserById', () => {
    it('should find existing user by ID', () => {
      const addedUser = userManager.addUser('John', 'john@example.com');
      const foundUser = userManager.findUserById(addedUser.id);
      expect(foundUser).toEqual(addedUser);
    });

    it('should return undefined for non-existent user ID', () => {
      const foundUser = userManager.findUserById(999);
      expect(foundUser).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete existing user', () => {
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

  describe('getAllUsers', () => {
    it('should return empty array initially', () => {
      expect(userManager.getAllUsers()).toEqual([]);
    });

    it('should return all added users', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      expect(userManager.getAllUsers()).toEqual([user1, user2]);
    });
  });
});
