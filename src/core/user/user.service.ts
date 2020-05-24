import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { DTOUser } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@Inject('USER_REPOSITORY') private userRepository: Repository<User>) { }

    async validateUserPassword(email: string, password: string): Promise<DTOUser> {
        const user = await this.userRepository.findOne({ email: email });
        if (!user) throw new UnauthorizedException('Invalid user or password');

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) throw new UnauthorizedException('Invalid user or password');

        return new DTOUser(user);
    }

    async getUserByEmail(email: string): Promise<DTOUser> {
        const user = await this.userRepository.findOne({ email: email });
        return new DTOUser(user);
    }
}
