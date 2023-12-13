import { Body, HttpError, JsonController, Post } from "routing-controllers";
import Container, { Inject } from "typedi";
import { UsersService } from "../users/users.service";
import AuthService from "../../auth/Auth";
import { LoginBodyDto } from "./dto/auth.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import QueueWorker from "../../components/services/queue";
import Main from "../../components/processes/main";
import { App } from "../..";


@JsonController('/auth')
export class AuthController {
  constructor(
    @Inject() private readonly usersService: UsersService = Container.get(UsersService),
    @Inject() private readonly mainService: Main = Container.get(Main),
  ) { }

  @Post('/login')
  async login(@Body() authDto: LoginBodyDto) {
    const user = await this.usersService.getUserByEmail(authDto.email);
    if (user) {
      const validUser = AuthService.comparePassword(authDto.password, user.password);
      if (validUser) {
        await (App.getService('queue') as QueueWorker).getDefaultQueue().add("sendEmail", { to: authDto.email, subject: "Welcome to the app", body: "Welcome to the app" });
        return {
          auth_token: AuthService.generateAccessToken(user),
          email: user.email,
          roles: user.roles.map((role) => role.name),
        };
      } else {
        throw new Error("Invalid credentials");
      }
    } else {
      throw new Error("Invalid credentials");
    }
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(createUserDto.email);
    if (user) {
      throw new HttpError(400, "User already exists");
    }
    const newUser = await this.usersService.createUser(createUserDto);
    await (App.getService('queue') as QueueWorker).getDefaultQueue().add("sendEmail", { to: createUserDto.email, subject: "Welcome to the app", body: "Welcome to the app" });
    return newUser;
  }

  @Post('/logout')
  async logout() {
    return { message: 'logout' };
  }
}