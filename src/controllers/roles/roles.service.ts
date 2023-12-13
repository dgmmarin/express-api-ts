import { Repository } from "typeorm";
import { Role } from "./entity/role.entity";
import { AppDataSource } from "../../data-source";
import { CreateRoleDto, UpdateRoleDto } from "./dto/role.dto";
import { Permission } from "../persmissions/entity/permission.entity";
import { Service } from "typedi";

@Service()
export class RolesService {
  private rolesRepository: Repository<Role>;
  constructor() {
    this.rolesRepository = AppDataSource.getRepository(Role);
  }

  paginateRoles = async (limit: number, offset: number) => {
    return await this.rolesRepository.findAndCount({ skip: offset, take: limit });
  }

  getRoleById = async (uuid: string) => {
    return await this.rolesRepository.findOneOrFail({ where: { uuid: uuid } });
  }

  createRole = async (createRoleDto: CreateRoleDto) => {
    const role = new Role();
    role.name = createRoleDto.name;
    role.description = createRoleDto.description;
    return await this.rolesRepository.save(role);
  }

  updateRole = async (uuid: string, updateRoleDto: UpdateRoleDto) => {
    const role = await this.rolesRepository.findOneOrFail({ where: { uuid: uuid } });
    role.name = updateRoleDto.name ?? role.name;
    role.description = updateRoleDto.description ?? role.description;
    return await this.rolesRepository.save(role);
  }

  deleteRole = async (uuid: string) => {
    return await this.rolesRepository.softDelete({ uuid: uuid });
  }

  addPermission = async (uuid: string, permissionId: string) => {
    const roleRepository = AppDataSource.getRepository(Role);
    const role = await roleRepository.findOneOrFail({
      where: { uuid: uuid },
      relations: ["permissions"],
    });
    const permissionRepository = AppDataSource.getRepository(Permission);
    const permission = await permissionRepository.findOneOrFail({
      where: { uuid: permissionId },
    });
    role.permissions.push(permission);
    return await roleRepository.save(role);
  }

  removePermission = async (uuid: string, permissionId: string) => {
    const roleRepository = AppDataSource.getRepository(Role);
    const role = await roleRepository.findOneOrFail({
      where: { uuid: uuid },
      relations: ["permissions"],
    });
    const permissionRepository = AppDataSource.getRepository(Permission);
    const permission = await permissionRepository.findOneOrFail({
      where: { uuid: permissionId },
    });
    role.permissions = role.permissions.filter((rolePermission) => rolePermission.id !== permission.id);
    return await roleRepository.save(role);
  }
}