import { Catch, HasRole, Roles } from "../auth/decorators";
import { Request, Response } from "express";
import { plainToClass } from "class-transformer";
import SanitizedUser from "../serializers/user";
import { User } from "../database/entities/User";
import UserController from "../controllers/UserController";
import { CustomRequest } from "../middlewares/auth";

export class UserHandler {
  controller: UserController;
  constructor() {
    this.controller = new UserController();
    this.listUsers = this.listUsers.bind(this);
    this.getUser = this.getUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.addRole = this.addRole.bind(this);
    this.removeRole = this.removeRole.bind(this);
    this.listOrders = this.listOrders.bind(this);
    this.getOrder = this.getOrder.bind(this);
  }

  @Roles(["admin"])
  async createUser(req: Request, res: Response) {
    try {
      const user = await this.controller.createUser(
        (req as CustomRequest)["createUserDto"],
      );
      res.json(plainToClass(SanitizedUser, user));
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }

  @Roles(["admin", "user"])
  async getUser(req: Request, res: Response) {
    try {
      const user = await this.controller.getUser(req.params.userId);
      res.json(plainToClass(SanitizedUser, user, {}));
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  @HasRole("admin")
  async addRole(req: Request, res: Response) {
    try {
      const user = this.controller.addRole(
        req.params.userId,
        req.params.roleId,
      );
      return res.json(plainToClass(SanitizedUser, user, {}));
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }

  @HasRole("admin")
  async removeRole(req: Request, res: Response) {
    try {
      const user = this.controller.removeRole(
        req.params.userId,
        req.params.roleId,
      );
      return res.json(plainToClass(SanitizedUser, user, {}));
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }

  @Roles(["admin"])
  async updateUser(req: Request, res: Response) {
    try {
      const result = await this.controller.updateUser(
        req.params.userId,
        (req as CustomRequest)["updateUserDto"],
      );
      res.json(plainToClass(SanitizedUser, result));
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }

  @Roles(["admin"])
  async deleteUser(req: Request, res: Response) {
    try {
      await this.controller.deleteUser(req.params.userId);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "User not found" });
    }
  }

  @Roles(["admin"])
  async listUsers(req: Request, res: Response) {
    try {
      const { offset, limit } = (req as CustomRequest)["pagination"];
      const users = await this.controller.listUsers(offset, limit);
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Users not found" });
    }
  }

  getUserByEmail = async (email: string): Promise<User | null> => {
    try {
      return await this.controller.getUserByEmail(email);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  async listOrders(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { offset, limit } = (req as CustomRequest)["pagination"];
      const orders = await this.controller.listOrders(userId, limit, offset);
      res.json(orders);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  @Catch(["QueryFailedError", "EntityNotFoundError"])
  async getOrder(req: Request, res: Response) {
    const { userId, orderId } = req.params;
    const order = await this.controller.getOrder(
      userId,
      orderId,
    );
    res.json(order);
  }
}
