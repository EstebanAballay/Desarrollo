import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from '../interfaces/register.dto';
import { UserEntity } from './user.entity';
import { compareSync } from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    private jwtService: JwtService,
  ) {}

  async refreshToken(refreshToken: string) {
    return this.jwtService.refreshToken(refreshToken);
  }

  canDo(user: UserEntity, permission: string): boolean {
    const result = user.permissionCodes?.includes(permission);
    if (!result) {
      throw new UnauthorizedException('No tenés permiso para esta acción');
    }
    return true;
  }

  async register(body: RegisterDTO): Promise<UserEntity> {
    try {
      const existing = await this.usersRepository.findOne({ where: { email: body.email } });
      if (existing) {
        throw new HttpException('El email ya está registrado', 409);
      }

      const user = new UserEntity();
      user.email = body.email;
      user.password = await bcrypt.hash(body.password, 10);

      return await this.usersRepository.save(user);
    } catch (error) {
      throw new HttpException('Error de creación', 500);
    }
  }

  async login(body: LoginDTO) {
    const user = await this.usersRepository.findOne({
      where: { email: body.email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isValid = compareSync(body.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return {
      accessToken: this.jwtService.generateToken({ email: user.email }, 'auth'),
      refreshToken: this.jwtService.generateToken({ email: user.email }, 'refresh'),
    };
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
  return this.usersRepository.findOneBy({ email });
}


  async findAllUsers() {
    const users = await this.usersRepository.find();
    return users.map(user => ({
      id: user.id,
      email: user.email,
    }));
  }
}
