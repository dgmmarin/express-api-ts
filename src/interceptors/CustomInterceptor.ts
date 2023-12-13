import { InterceptorInterface, Action, createParamDecorator, Interceptor } from 'routing-controllers';
import { User } from '../controllers/users/entity/user.entity';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../controllers/users/dto/user.dto';
import { PaginationResponse } from '../interfaces/generic'; // Import the PaginationResponse type
import { Order } from '../controllers/orders/entity/order.entity';
import { OrderDto } from '../controllers/orders/dto/order.dto';
import Product from '../controllers/products/entity/product.entity';
import { ProductDto } from '../controllers/products/dto/product.dto';
import { CustomRequest } from '../middlewares/auth';
import { AppDataSource } from '../data-source';
import { Category } from '../controllers/categories/entity/category.entity';
import { CategoryDto } from '../controllers/categories/dto/category.dto';

@Interceptor()
export class CustomInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    if (content instanceof User) {
      return plainToClass(UserDto, content);
    }

    if (content instanceof Order) {
      return plainToClass(OrderDto, content);
    }

    if (content instanceof Product) {
      return plainToClass(ProductDto, content);
    }

    if (content instanceof Category) {
      return plainToClass(CategoryDto, content);
    }

    if (content instanceof Object) {
      if (typeof<PaginationResponse<any>>content?.data == "object" && content?.meta?.total != undefined) {
        content.meta.limit = action.request.pagination.limit;
        content.meta.offset = action.request.pagination.offset;
        content.meta.page = action.request.pagination.page;
        content.meta.pages = Math.ceil(content.meta.total / action.request.pagination.limit);
      }

      if (typeof<PaginationResponse<Order>>content?.data == "object" && content?.data instanceof Array && content?.data[0] instanceof Order) {
        content.data = content.data.map((order: Order) => plainToClass(OrderDto, order));
        return content;
      }

      if (typeof<PaginationResponse<User>>content?.data == "object" && content?.data instanceof Array && content?.data[0] instanceof User) {
        content.data = content.data.map((user: User) => plainToClass(UserDto, user));
        return content;
      }

      if (typeof<PaginationResponse<Product>>content?.data == "object" && content?.data instanceof Array && content?.data[0] instanceof Product) {
        content.data = content.data.map((product: Product) => plainToClass(ProductDto, product));
        return content;
      }

      if (typeof<PaginationResponse<Category>>content?.data == "object" && content?.data instanceof Array && content?.data[0] instanceof Category) {
        content.data = content.data.map((category: Category) => plainToClass(CategoryDto, category));
        return content;
      }
    }

    return content;
  }
}

export function UserFromSession(options?: { required?: boolean }) {
  return createParamDecorator({
    required: options && options.required ? true : false,
    value: async action => {
      const email = (action.request as CustomRequest)["email"];
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneOrFail({
        where: { email: email },
      });
      (action.request as CustomRequest)["user"] = user;
      const roles = (action.request as CustomRequest)["roles"];

      if (action.request.params.userId != undefined) {
        if (user.id != Number(action.request.params.userId)) {
          if (roles.length > 0 && roles.indexOf("admin") == -1) {
            return action.response.status(401).json({ message: "Unauthorized" });
          }
        }
      }
      return user;
    },
  });
}