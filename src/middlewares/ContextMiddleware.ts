import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import Context from "node-execution-context"

@Middleware({ type: 'before' })
export class ContextMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err?: any) => any): any {
    Context.run(next, { reference: Math.random(), request: request.headers });
  }
}