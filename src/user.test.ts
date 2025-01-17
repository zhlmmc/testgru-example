import { describe, it, expect, beforeEach } from 'vitest';
import { UserManager } from './user';

describe('UserManager', () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  describe('addUser', () => {
    it('should add a new user with incremental id', () => {
      const user1 = userManager.addUser('John Doe', 'john@example.com');
      const user2 = userManager.addUser('Jane Doe', 'jane@example.com');

      expect(user1.id).toBe(1);
      expect(user1.name).toBe('John Doe');
      expect(user1.email).toBe('john@example.com');

      expect(user2.id).toBe(2);
      expect(user2.name).toBe('Jane Doe');
      expect(user2.email).toBe('jane@example.com');
    });
  });

  describe('findUserById', () => {
    it('should find user by id when user exists', () => {
      const addedUser = userManager.addUser('John Doe', 'john@example.com');
      const foundUser = userManager.findUserById(addedUser.id);

      expect(foundUser).toEqual(addedUser);
    });

    it('should return undefined when user does not exist', () => {
      const foundUser = userManager.findUserById(999);
      expect(foundUser).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete existing user and return true', () => {
      const user = userManager.addUser('John Doe', 'john@example.com');
      const result = userManager.deleteUser(user.id);

      expect(result).toBe(true);
      expect(userManager.findUserById(user.id)).toBeUndefined();
    });

    it('should return false when trying to delete non-existent user', () => {
      const result = userManager.deleteUser(999);
      expect(result).toBe(false);
    });
  });

  describe('getAllUsers', () => {
    it('should return empty array when no users exist', () => {
      const users = userManager.getAllUsers();
      expect(users).toEqual([]);
    });

    it('should return array of all added users', () => {
      const user1 = userManager.addUser('John Doe', 'john@example.com');
      const user2 = userManager.addUser('Jane Doe', 'jane@example.com');

      const users = userManager.getAllUsers();

      expect(users).toHaveLength(2);
      expect(users).toEqual([user1, user2]);
    });
  });
});
