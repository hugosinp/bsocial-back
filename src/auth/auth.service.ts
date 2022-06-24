import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) { }

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.usersService.findOnePrivate(username);
		const isMatch = await bcrypt.compare(pass, user.password);
		if (user && isMatch) {
			const { ...result } = user;
			return result;
		}
		return null;
	}

	async generateJwt(user: UserEntity) {
		const payload = { username: user.username };
		return {
			accessToken: this.jwtService.sign(payload),
			username: user.username
		};
	}
}
