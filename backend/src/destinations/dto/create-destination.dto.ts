import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ItineraryItemDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  day?: number;
}

class DestinationEventDto {
  @IsString()
  title: string;

  @IsString()
  date: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateDestinationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  fullDescription?: string;

  @IsString()
  @IsOptional()
  price?: string;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsArray()
  @IsOptional()
  gallery?: string[];

  @IsArray()
  @IsOptional()
  highlights?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItineraryItemDto)
  @IsOptional()
  itinerary?: ItineraryItemDto[];

  @IsArray()
  @IsOptional()
  included?: string[];

  @IsArray()
  @IsOptional()
  notIncluded?: string[];

  @IsString()
  @IsOptional()
  bestTime?: string;

  @IsString()
  @IsOptional()
  difficulty?: string;

  @IsString()
  @IsOptional()
  groupSize?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DestinationEventDto)
  @IsOptional()
  events?: DestinationEventDto[];
}

