import { Roles } from "../auth/decorators";
import RoleController from "../controllers/RoleController";
import { CustomRequest } from "../middlewares/auth";
import { Request, Response } from "express";

export class RoleHandler {
  constroller: RoleController;
  constructor() {
    this.constroller = new RoleController();
    this.createRole = this.createRole.bind(this);
    this.listRoles = this.listRoles.bind(this);
    this.getRole = this.getRole.bind(this);
    this.updateRole = this.updateRole.bind(this);
    this.deleteRole = this.deleteRole.bind(this);
    this.addPermission = this.addPermission.bind(this);
  }

  @Roles(["admin"])
  async createRole(req: Request, res: Response) {
    try {
      const createRoleDto = (req as CustomRequest)["createRoleDto"];
      const result = await this.constroller.createRole(createRoleDto);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }

  @Roles(["admin"])
  async listRoles(req: Request, res: Response) {
    try {
      const roles = await this.constroller.listRoles();
      res.json(roles);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }

  @Roles(["admin"])
  async getRole(req: Request, res: Response) {
    try {
      const role = await this.constroller.getRole(Number(req.params.roleId));
      res.json(role);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  @Roles(["admin"])
  async updateRole(req: Request, res: Response) {
    try {
      const { roleId } = req.params;
      const updateRoleDto = (req as CustomRequest)["updateRoleDto"];
      const result = await this.constroller.updateRole(
        Number(roleId),
        updateRoleDto,
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  @Roles(["admin"])
  async deleteRole(req: Request, res: Response) {
    try {
      await this.constroller.deleteRole(Number(req.params.roleId));
      res.json({ message: "Role deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  @Roles(["admin"])
  async addPermission(req: Request, res: Response) {
    try {
      const { roleId, permissionId } = req.params;
      const role = await this.constroller.addPermission(
        Number(roleId),
        Number(permissionId),
      );
      return res.json(role);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  }
}
