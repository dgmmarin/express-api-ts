import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
export class CustomPagination implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err?: any) => any): any {
    const page = Number(request.query.page) || 1;
    const limit = Number(request.query.limit) || 10;
    const offset = ((page - 1) * limit);
    request["pagination"] = { limit, offset, page };
    next();
  }
}