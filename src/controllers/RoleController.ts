import { AppDataSource } from "../data-source";
import { Role } from "../database/entities/Role";
import { Permission } from "../database/entities/Permission";
import { CreateRoleDto, UpdateRoleDto } from "../dto/role.dto";
import { UpdateResult } from "typeorm";

class RoleController {
  constructor() {}

  createRole = async (createRoleDto: CreateRoleDto): Promise<Role> => {
    const role = new Role();
    role.name = createRoleDto.name;
    role.description = createRoleDto.description;
    return await AppDataSource.manager.save(role);
  };

  listRoles = async (): Promise<Role[]> => {
    return await AppDataSource.manager.find(Role);
  };

  getRole = async (roleId: number): Promise<Role> => {
    const roleRepository = AppDataSource.getRepository(Role);
    return await roleRepository.findOneOrFail({
      where: { id: roleId },
      relations: ["permissions"],
    });
  };

  updateRole = async (
    roleId: number,
    updateRoleDto: UpdateRoleDto,
  ): Promise<Role> => {
    const roleRepository = AppDataSource.getRepository(Role);
    const role = await roleRepository.findOneByOrFail({
      id: roleId,
    });
    role.name = updateRoleDto.name ?? role.name;
    role.description = updateRoleDto.description ?? role.description;
    return await roleRepository.save(role);
  };

  deleteRole = async (roleId: number): Promise<UpdateResult> => {
    const roleRepository = AppDataSource.getRepository(Role);
    const role = await roleRepository.findOneByOrFail({
      id: roleId,
    });
    return await roleRepository.softDelete({ id: Number(role.id) });
  };

  addPermission = async (
    roleId: number,
    permissionId: number,
  ): Promise<Role> => {
    const roleRepository = AppDataSource.getRepository(Role);
    const role = await roleRepository.findOneOrFail({
      where: { id: roleId },
      relations: ["permissions"],
    });
    const permissionRepository = AppDataSource.getRepository(Permission);
    const permission = await permissionRepository.findOneByOrFail({
      id: permissionId,
    });
    role.permissions.push(permission);
    return await roleRepository.save(role);
  };
}

export default RoleController;
