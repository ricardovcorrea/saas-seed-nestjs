import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import { DTOUser } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  async validateUser(jwtPayload: any): Promise<DTOUser> {
    const user = await this.userService.getUserByEmail(jwtPayload.email);

    return user || null;
  }

  async login(email: string, password: string): Promise<{ user: DTOUser, access_token: string }> {
    const user = await this.userService.validateUserPassword(email, password);

    return {
      user,
      access_token: this.jwtService.sign({ ...user })
    };
  }
}