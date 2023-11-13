import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { Permission } from "../database/entities/Permission";

export default class PermissionController {
    public listPermissions = async (req: Request, res: Response) => {
       try {
        const permissions = await AppDataSource.manager.find(Permission);
        res.json(permissions);
       } catch (error) {
        res.status(400).json({ message: error });
       }
    }

    public createPermission = async (req: Request, res: Response) => {
        try {
            const { name, description } = req.body;
            const permission = new Permission();
            permission.name = name;
            permission.description = description;
            const result = await AppDataSource.manager.save(permission);
            res.json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }

    public getPermission = async (req: Request, res: Response) => {
        try {
            const permissionRepository = AppDataSource.getRepository(Permission);
            const permission = await permissionRepository.findOneByOrFail({ id: Number(req.params.permissionId) });
            res.json(permission);
        } catch (error) {
            res.status(400).json({ message: "Permission not found" });
        }
    }

    public updatePermission = async (req: Request, res: Response) => {
        try {
            const permissionRepository = AppDataSource.getRepository(Permission);
            const permission = await permissionRepository.findOneByOrFail({ id: Number(req.params.permissionId) });
            const { name, description } = req.body;
            permission.name = name ?? permission.name;
            permission.description = description ?? permission.description;
            const result = await permissionRepository.save(permission);
            res.json(result);
        } catch (error) {
            res.status(400).json({ message: "Permission not found" });
        }
    }

    public deletePermission = async (req: Request, res: Response) => {
        try {
            const permissionRepository = AppDataSource.getRepository(Permission);
            const permission = await permissionRepository.findOneByOrFail({ id: Number(req.params.permissionId) });
            await permissionRepository.softDelete({ id: Number(permission.id) });
            res.json({ message: "Permission deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: "Permission not found" });
        }
    }
}