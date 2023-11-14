import { AppDataSource } from "../data-source";
import { Permission } from "../database/entities/Permission";
import { CreatePermisionDto, UpdatePermisionDto } from "../dto/permission.dto";
import { UpdateResult } from "typeorm";

export default class PermissionController {
  listPermissions = async (): Promise<Permission[]> => {
    return await AppDataSource.manager.find(Permission);
  };

  createPermission = async (
    createPermissionDto: CreatePermisionDto,
  ): Promise<Permission> => {
    const permission = new Permission();
    permission.name = createPermissionDto.name;
    permission.description = createPermissionDto.description;
    return await AppDataSource.manager.save(permission);
  };

  getPermission = async (permissionId: number): Promise<Permission> => {
    const permissionRepository = AppDataSource.getRepository(Permission);
    return await permissionRepository.findOneByOrFail({
      id: permissionId,
    });
  };

  updatePermission = async (
    permissionId: number,
    updatePermissionDto: UpdatePermisionDto,
  ): Promise<Permission> => {
    const permissionRepository = AppDataSource.getRepository(Permission);
    const permission = await permissionRepository.findOneByOrFail({
      id: permissionId,
    });
    permission.name = updatePermissionDto.name ?? permission.name;
    permission.description =
      updatePermissionDto.description ?? permission.description;
    return await permissionRepository.save(permission);
  };

  deletePermission = async (permissionId: number): Promise<UpdateResult> => {
    const permissionRepository = AppDataSource.getRepository(Permission);
    const permission = await permissionRepository.findOneByOrFail({
      id: permissionId,
    });
    return await permissionRepository.softDelete({ id: Number(permission.id) });
  };
}
