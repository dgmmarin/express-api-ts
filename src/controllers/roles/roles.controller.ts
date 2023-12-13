import { Body, Delete, Get, JsonController, Param, Post, Put, Req, UseBefore } from "routing-controllers";
import Container, { Inject } from "typedi";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/role.dto";
import { AuthMiddleware } from "../../middlewares/AuthMiddleware";

@JsonController('/roles')
@UseBefore(AuthMiddleware)
export class RolesController {
  constructor(@Inject() readonly rolesService: RolesService = Container.get(RolesService)) { }

  @Get('/')
  async getAllRoles(@Req() req: any) {
    const { limit, offset } = req.pagination;
    const [data, count] = await this.rolesService.paginateRoles(limit, offset);
    return {
      data: data,
      meta: {
        total: count,
      },
    }
  }

  @Get('/:uuid')
  async getRole(@Param('uuid') uuid: string) {
    return await this.rolesService.getRoleById(uuid);
  }

  @Post('/')
  async createRole(@Body() crateRoleDto: CreateRoleDto) {
    return await this.rolesService.createRole(crateRoleDto);
  }

  @Put('/:uuid')
  async updateRole(@Param('uuid') uuid: string, @Body() updateRoleDto: CreateRoleDto) {
    return await this.rolesService.updateRole(uuid, updateRoleDto);
  }

  @Post('/:uuid/permissions/:permissionId')
  async addPermission(@Param('uuid') uuid: string, @Param('permissionId') permissionId: string) {
    return await this.rolesService.addPermission(uuid, permissionId);
  }

  @Delete('/:uuid/permissions/:permissionId')
  async removePermission(@Param('uuid') uuid: string, @Param('permissionId') permissionId: string) {
    return await this.rolesService.removePermission(uuid, permissionId);
  }
}