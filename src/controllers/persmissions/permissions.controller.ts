import { Body, Delete, Get, JsonController, Param, Post, Put, Req, UseBefore } from "routing-controllers";
import Container, { Inject } from "typedi";
import { PermissionsService } from "./permissions.service";
import { CreatePermisionDto, UpdatePermisionDto } from "./dto/permission.dto";
import { AuthMiddleware } from "../../middlewares/AuthMiddleware";

@JsonController('/permissions')
@UseBefore(AuthMiddleware)
export class PermissionsController {
  constructor(
    @Inject() readonly permissionsService: PermissionsService = Container.get(PermissionsService)
  ) { }

  @Get('/')
  async getAllPermissions(@Req() req: any) {
    const { limit, offset } = req.pagination;
    return await this.permissionsService.paginatePermissions(limit, offset);
  }

  @Get('/:uuid')
  async getPermission(@Param('uuid') uuid: string) {
    return await this.permissionsService.getPermission(uuid);
  }

  @Post('/')
  async createPermission(@Body() createPermissionDto: CreatePermisionDto) {
    return await this.permissionsService.createPermission(createPermissionDto);
  }

  @Put('/:uuid')
  async updatePermission(@Param('uuid') uuid: string, @Body() updatePermissionDto: UpdatePermisionDto) {
    return await this.permissionsService.updatePermission(uuid, updatePermissionDto);
  }

  @Delete('/:uuid')
  async deletePermission(@Param('uuid') uuid: string) {
    return await this.permissionsService.deletePermission(uuid);
  }
}