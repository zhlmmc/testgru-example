import { describe, it, expect, beforeEach } from "vitest";
import { UserManager } from "./user";

describe("UserManager", () => {
  let userManager: UserManager;

  beforeEach(() => {
    userManager = new UserManager();
  });

  it("should add a user and return the added user", () => {
    const user = userManager.addUser("John Doe", "john@example.com");
    expect(user).toEqual({
      id: 1,
      name: "John Doe",
      email: "john@example.com",
    });
    expect(userManager.getAllUsers()).toHaveLength(1);
  });

  it("should find a user by ID", () => {
    const user = userManager.addUser("Jane Doe", "jane@example.com");
    const foundUser = userManager.findUserById(user.id);
    expect(foundUser).toEqual(user);
  });

  it("should return undefined when trying to find a non-existent user by ID", () => {
    const foundUser = userManager.findUserById(999);
    expect(foundUser).toBeUndefined();
  });

  it("should delete a user and return true", () => {
    const user = userManager.addUser("Alice", "alice@example.com");
    const result = userManager.deleteUser(user.id);
    expect(result).toBe(true);
    expect(userManager.getAllUsers()).toHaveLength(0);
  });

  it("should return false when trying to delete a non-existent user", () => {
    const result = userManager.deleteUser(999);
    expect(result).toBe(false);
  });

  it("should retrieve all users", () => {
    const user1 = userManager.addUser("User1", "user1@example.com");
    const user2 = userManager.addUser("User2", "user2@example.com");
    const allUsers = userManager.getAllUsers();
    expect(allUsers).toHaveLength(2);
    expect(allUsers).toEqual([user1, user2]);
  });
});
