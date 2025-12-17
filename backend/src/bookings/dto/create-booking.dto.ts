import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsInt,
  Min,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsOptional()
  destinationId?: string;

  @IsDateString()
  @IsNotEmpty()
  tourDate: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  numberOfPeople: number;

  @IsString()
  @IsOptional()
  specialRequest?: string;
}

