import { InterceptorInterface, Action, createParamDecorator } from 'routing-controllers';
import { User } from '../database/entities/User';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../routed-components/user/dto/user.dto';

export class CustomInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    if (content instanceof User) {
      return plainToClass(UserDto, content);
    }
    if (content instanceof Array) {
      return content.map((user: User) => plainToClass(UserDto, user));
    }
    return content;
  }
}

export function UserFromSession(options?: { required?: boolean }) {
  return createParamDecorator({
    required: options && options.required ? true : false,
    value: action => {
      const token = action.request.headers['authorization'] ?? null;
      return token;
    },
  });
}