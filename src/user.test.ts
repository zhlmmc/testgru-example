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
    });

    it('should store users correctly', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const storedUser = userManager.findUserById(user.id);
      expect(storedUser).toEqual(user);
    });
  });

  describe('editUser', () => {
    it('should edit existing user', () => {
      const user = userManager.addUser('John', 'john@example.com');
      const editedUser = userManager.editUser(user.id, 'Jane', 'jane@example.com');

      expect(editedUser).toBeDefined();
      expect(editedUser?.name).toBe('Jane');
      expect(editedUser?.email).toBe('jane@example.com');
    });

    it('should return undefined when editing non-existent user', () => {
      const result = userManager.editUser(999, 'Jane', 'jane@example.com');
      expect(result).toBeUndefined();
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

  describe('findUsersByName', () => {
    it('should find users by name', () => {
      const user1 = userManager.addUser('John', 'john1@example.com');
      const user2 = userManager.addUser('John', 'john2@example.com');
      userManager.addUser('Jane', 'jane@example.com');

      const foundUsers = userManager.findUsersByName('John');
      expect(foundUsers).toHaveLength(2);
      expect(foundUsers).toContainEqual(user1);
      expect(foundUsers).toContainEqual(user2);
    });

    it('should return empty array when no users match name', () => {
      userManager.addUser('John', 'john@example.com');
      const foundUsers = userManager.findUsersByName('Jane');
      expect(foundUsers).toEqual([]);
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

  describe('deleteAllUsers', () => {
    it('should delete all users', () => {
      userManager.addUser('John', 'john@example.com');
      userManager.addUser('Jane', 'jane@example.com');

      userManager.deleteAllUsers();

      expect(userManager.findUserById(1)).toBeUndefined();
      expect(userManager.findUserById(2)).toBeUndefined();
    });
  });
});
