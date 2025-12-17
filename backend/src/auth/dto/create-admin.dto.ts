import { IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { AdminRole } from '../schemas/admin-user.schema';

export class CreateAdminDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsIn(['super_admin', 'editor'])
  role?: AdminRole;
}







