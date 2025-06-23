import { Request } from 'express';
import { UserEntity } from 'src/users/user.entity';

export interface RequestWithUser extends Request {
  user?: UserEntity;
}
