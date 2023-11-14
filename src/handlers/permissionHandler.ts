import PermissionController from "../controllers/PermissionController";
import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/auth";

export class PermissionHandler {
  controller: PermissionController;
  constructor() {
    this.controller = new PermissionController();
    this.listPermissions = this.listPermissions.bind(this);
    this.createPermission = this.createPermission.bind(this);
    this.getPermission = this.getPermission.bind(this);
    this.updatePermission = this.updatePermission.bind(this);
    this.deletePermission = this.deletePermission.bind(this);
  }

  async listPermissions(req: Request, res: Response) {
    try {
      const permissions = this.controller.listPermissions();
      res.json(permissions);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  public createPermission = async (req: Request, res: Response) => {
    try {
      const createPermissionDto = (req as CustomRequest)["createPermissionDto"];
      const result =
        await this.controller.createPermission(createPermissionDto);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
    }
  };

  public getPermission = async (req: Request, res: Response) => {
    try {
      const permission = await this.controller.getPermission(
        Number(req.params.permissionId),
      );
      res.json(permission);
    } catch (error) {
      res.status(400).json({ message: "Permission not found" });
    }
  };

  public updatePermission = async (req: Request, res: Response) => {
    try {
      const { permissionId } = req.params;
      const updatePermissionDto = (req as CustomRequest)["updatePermissionDto"];
      const result = await this.controller.updatePermission(
        Number(permissionId),
        updatePermissionDto,
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: "Permission not found" });
    }
  };

  public deletePermission = async (req: Request, res: Response) => {
    try {
      await this.controller.deletePermission(Number(req.params.permissionId));
      res.json({ message: "Permission deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "Permission not found" });
    }
  };
}
