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

    it('should store added users', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const allUsers = userManager.getAllUsers();

      expect(allUsers).toHaveLength(1);
      expect(allUsers[0]).toEqual(user);
    });
  });

  describe('findUserById', () => {
    it('should find existing user by id', () => {
      const addedUser = userManager.addUser('John', 'john@example.com');
      const foundUser = userManager.findUserById(addedUser.id);

      expect(foundUser).toEqual(addedUser);
    });

    it('should return undefined for non-existing id', () => {
      const foundUser = userManager.findUserById(999);
      expect(foundUser).toBeUndefined();
    });
  });

  describe('findUserByEmail', () => {
    it('should find existing user by email', () => {
      const addedUser = userManager.addUser('John', 'john@example.com');
      const foundUser = userManager.findUserByEmail('john@example.com');

      expect(foundUser).toEqual(addedUser);
    });

    it('should return undefined for non-existing email', () => {
      const foundUser = userManager.findUserByEmail('nonexistent@example.com');
      expect(foundUser).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete existing user', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const result = userManager.deleteUser(user.id);

      expect(result).toBe(true);
      expect(userManager.getAllUsers()).toHaveLength(0);
      expect(userManager.findUserById(user.id)).toBeUndefined();
    });

    it('should return false when deleting non-existing user', () => {
      const result = userManager.deleteUser(999);
      expect(result).toBe(false);
    });

    it('should only delete specified user', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      userManager.deleteUser(user1.id);

      expect(userManager.getAllUsers()).toHaveLength(1);
      expect(userManager.findUserById(user2.id)).toEqual(user2);
    });
  });

  describe('getAllUsers', () => {
    it('should return empty array when no users exist', () => {
      expect(userManager.getAllUsers()).toEqual([]);
    });

    it('should return all added users', () => {
      const user1 = userManager.addUser('John', 'john@example.com');
      const user2 = userManager.addUser('Jane', 'jane@example.com');

      const allUsers = userManager.getAllUsers();

      expect(allUsers).toHaveLength(2);
      expect(allUsers).toEqual([user1, user2]);
    });
  });
});
