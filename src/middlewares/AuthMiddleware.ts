import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

@Middleware({ type: "before" })
export class AuthMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err?: any) => any): any {
    const authHeader = request.headers.authorization;
    const SECRET_KEY: Secret = process.env.NODE_JWT_SECRET ?? "";
    if (SECRET_KEY === "") {
      throw new Error("Secret key not found");
    }

    try {
      if (request.headers["public"] && request.headers["public"] === "true") {
        next();
        return;
      }
      if (authHeader) {
        const token = request.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
          return response.sendStatus(403);
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        request.token = decoded;
        request.email = (decoded as JwtPayload).email;
        request.exp = (decoded as JwtPayload).exp as number;
        request.iat = (decoded as JwtPayload).iat as number;
        request.roles = (decoded as JwtPayload).roles as string[];
        next();
      } else {
        response.sendStatus(401);
      }
    } catch (err) {
      response.status(401).send("Please authenticate");
    }

  }
}