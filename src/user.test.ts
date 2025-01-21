import { describe, it, expect, beforeEach } from 'vitest';
import { UserManager } from './user';

describe('UserManager', () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  describe('addUser', () => {
    it('should add a user with incremental id', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      expect(user1.id).toBe(1);
      expect(user2.id).toBe(2);
      expect(user1.name).toBe('John');
      expect(user1.email).toBe('john@example.com');
      expect(user2.name).toBe('Jane');
      expect(user2.email).toBe('jane@example.com');
    });

    it('should store users in internal array', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const allUsers = userManager.getAllUsers();

      expect(allUsers).toHaveLength(1);
      expect(allUsers[0]).toEqual(user);
    });
  });

  describe('findUserById', () => {
    it('should find existing user by id', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const found = userManager.findUserById(user.id);
      expect(found).toEqual(user);
    });

    it('should return undefined for non-existing id', () => {
      const found = userManager.findUserById(999);
      expect(found).toBeUndefined();
    });
  });

  describe('findUserByEmail', () => {
    it('should find existing user by email', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const found = userManager.findUserByEmail('john@example.com');
      expect(found).toEqual(user);
    });

    it('should return undefined for non-existing email', () => {
      const found = userManager.findUserByEmail('notfound@example.com');
      expect(found).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete existing user', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const result = userManager.deleteUser(user.id);

      expect(result).toBe(true);
      expect(userManager.getAllUsers()).toHaveLength(0);
    });

    it('should return false when deleting non-existing user', () => {
      const result = userManager.deleteUser(999);
      expect(result).toBe(false);
    });

    it('should only delete specified user', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      userManager.deleteUser(user1.id);

      const remaining = userManager.getAllUsers();
      expect(remaining).toHaveLength(1);
      expect(remaining[0]).toEqual(user2);
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
