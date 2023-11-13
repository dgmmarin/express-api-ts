import { plainToClass } from "class-transformer";
import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { Role } from "../database/entities/Role";
import exp from "constants";
import { Roles } from "../auth/decorators";
import { Permission } from "../database/entities/Permission";

class RoleController {
    @Roles(['admin'])
    async createRole(req: Request, res: Response) {
        try {
            const { name, description } = req.body;
            const role = new Role();
            role.name = name;
            role.description = description;
            const result = await AppDataSource.manager.save(role);
            res.json(result);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    };

    @Roles(['admin'])
    async listRoles(req: Request, res: Response) {
        try {
            const roles = await AppDataSource.manager.find(Role);
            res.json(roles);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    };

    @Roles(['admin'])
    async getRole(req: Request, res: Response) {
        try {
            const roleRepository = AppDataSource.getRepository(Role);
            const role = await roleRepository.findOneOrFail({
                where: { id: Number(req.params.roleId) },
                relations: ['permissions']
            });
            res.json(role);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    };

    @Roles(['admin'])
    async updateRole(req: Request, res: Response) {
        try {
            const roleRepository = AppDataSource.getRepository(Role);
            const role = await roleRepository.findOneByOrFail({ id: Number(req.params.roleId) });
            const { name, description } = req.body;
            role.name = name ?? role.name;
            role.description = description ?? role.description;
            const result = await roleRepository.save(role);
            res.json(result);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    };

    @Roles(['admin'])
    async deleteRole(req: Request, res: Response) {
        try {
            const roleRepository = AppDataSource.getRepository(Role);
            const role = await roleRepository.findOneByOrFail({ id: Number(req.params.roleId) });
            await roleRepository.softDelete({ id: Number(role.id) });
            res.json({ message: "Role deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: error });
        }
    };

    @Roles(['admin'])
    async addPermission(req: Request, res: Response) {
        try {
            const { roleId, permissionId } = req.params;
            const roleRepository = AppDataSource.getRepository(Role);
            const role = await roleRepository.findOneOrFail({
                where: { id: Number(roleId) },
                relations: ['permissions']
            });
            const permissionRepository = AppDataSource.getRepository(Permission);
            const permission = await permissionRepository.findOneByOrFail({ id: Number(permissionId) });
            role.permissions.push(permission);
            await roleRepository.save(role);
            return res.json(role);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
    }
}

export default RoleController;