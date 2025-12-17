import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'editor')
  @Post('destinations/description')
  generateDestinationDescription(
    @Body()
    payload: {
      title: string;
      location?: string;
      highlights?: string[];
      tone?: 'friendly' | 'luxury' | 'adventure';
    },
  ) {
    return this.aiService.generateDestinationDescription(payload);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'editor')
  @Post('messages/reply')
  suggestReply(
    @Body()
    payload: {
      name: string;
      subject: string;
      message: string;
    },
  ) {
    return this.aiService.suggestReply(payload);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'editor')
  @Post('bookings/insights')
  generateInsight(
    @Body()
    payload: {
      context: string;
    },
  ) {
    return this.aiService.generateBookingInsight(payload.context);
  }
}


