import { IsString, IsIn } from 'class-validator';

export class UpdateBookingStatusDto {
  @IsString()
  @IsIn(['Pending', 'Confirmed', 'Cancelled'])
  status: 'Pending' | 'Confirmed' | 'Cancelled';
}

