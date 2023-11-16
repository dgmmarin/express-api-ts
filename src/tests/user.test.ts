import { describe } from "node:test";
import UserController from "../controllers/UserController";
import { AppDataSource } from "../data-source";
import { User } from "../database/entities/User";

describe("User testing", () => {
  const controller = new UserController();
  let user: User;

  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.manager.query("DELETE FROM users WHERE email LIKE 'testUserEmail%'");
    await AppDataSource.destroy();
  });

  test("Create user", async () => {
    user = await controller.createUser({
      firstName: "testUserFirstName",
      lastName: "testUserLastName",
      email: `testUserEmail@test12.com`,
      password: "123456"
    });
    expect(user).toHaveProperty("firstName", "testUserFirstName");
  });

  test("Get all users", async () => {
    const users = await controller.listUsers();
    expect(users.length).toBeGreaterThanOrEqual(1);
  });

  test("Get user by id", async () => {
    user = await controller.getUser(user.id);
    expect(user).toHaveProperty("firstName", "testUserFirstName");
  });

  test("Update user", async () => {
    user = await controller.updateUser(user.id, {
      firstName: "testUserFirstNameUpdated",
      lastName: "testUserLastNameUpdated"
    } as any);
    expect(user).toHaveProperty("firstName", "testUserFirstNameUpdated");
    expect(user).toHaveProperty("lastName", "testUserLastNameUpdated");
  });

  test("Delete user", async () => {
    const rez = await controller.deleteUser(user.id);
    expect(rez.affected).toEqual(1);
  });
});