import { Service } from "typedi";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Permission } from "./entity/permission.entity";
import { CreatePermisionDto, UpdatePermisionDto } from "./dto/permission.dto";

@Service()
export class PermissionsService {
  private permissionsRepository: Repository<Permission>;
  constructor() {
    this.permissionsRepository = AppDataSource.getRepository(Permission);
  }

  paginatePermissions = async (limit: number, offset: number) => {
    return await AppDataSource.getRepository(Permissions).findAndCount({ skip: offset, take: limit });
  }

  getPermission = async (uuid: string) => {
    return await this.permissionsRepository.findOneOrFail({
      where: {
        uuid: uuid
      }
    });
  }

  createPermission = async (createPermissionDto: CreatePermisionDto) => {
    const permission = new Permission();
    permission.name = createPermissionDto.name;
    permission.description = createPermissionDto.description;
    return await this.permissionsRepository.save(permission);
  }

  updatePermission = async (uuid: string, updatePermissionDto: UpdatePermisionDto) => {
    const permission = await this.permissionsRepository.findOneOrFail({ where: { uuid: uuid } });
    permission.name = updatePermissionDto.name ?? permission.name;
    permission.description = updatePermissionDto.description ?? permission.description;
    return await this.permissionsRepository.save(permission);
  }

  deletePermission = async (uuid: string) => {
    return await this.permissionsRepository.softDelete({ uuid: uuid });
  }
}