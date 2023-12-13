import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../database/entities/User";
import { CustomRequest } from "./auth";
import { ExpressMiddlewareInterface, Middleware, NotAcceptableError } from "routing-controllers";
import Container, { Inject } from "typedi";
import { UsersService } from "../controllers/users/users.service";

const getRequestedUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const email = (req as CustomRequest)["email"];
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneOrFail({
      where: { email: email },
    });
    (req as CustomRequest)["user"] = user;
    const roles = (req as CustomRequest)["roles"];

    if (req.params.userId != undefined) {
      if (user.id != Number(req.params.userId)) {
        if (roles.length > 0 && roles.indexOf("admin") == -1) {
          return res.status(401).json({ message: "Unauthorized" });
        }
      }
    }

    next();
  } catch (error) {
    res.status(400).json({ message: "User not found" });
  }
};
export default getRequestedUser;

@Middleware({ type: 'before' })
export class CurrentUserMiddleware implements ExpressMiddlewareInterface {
  constructor(
    @Inject() private usersService: UsersService = Container.get(UsersService),
  ) { }
  async use(request: any, response: any, next: (err?: any) => any): Promise<any> {
    const email = request.email;

    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      return response.status(400).json({ message: "User not found" });
    }
    user.password = "";
    request.user = user;
    const roles = request.roles;
    if (request.params.userUuid != undefined) {
      if (user.id != Number(request.params.userId)) {
        if (roles.length > 0 && roles.indexOf("admin") == -1) {
          return next(new NotAcceptableError("Unauthorized"));
        }
      }
    }
    next();
  }
}
