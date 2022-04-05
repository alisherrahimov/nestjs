import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({ title: 'email', description: 'email of user' })
  email: string;

  @ApiProperty({ title: 'password', description: 'email of user' })
  password: string;
}
