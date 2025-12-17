import { IsOptional, IsString, IsNotEmpty, IsObject } from 'class-validator';

export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsObject()
  @IsOptional()
  sections?: Record<string, string>;
}







