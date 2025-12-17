import { IsString, IsOptional } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  destinationId?: string;

  @IsString()
  @IsOptional()
  caption?: string;
}

