import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { DestinationsModule } from './destinations/destinations.module';
import { GalleryModule } from './gallery/gallery.module';
import { ServicesModule } from './services/services.module';
import { BookingsModule } from './bookings/bookings.module';
import { ContactModule } from './contact/contact.module';
import { EmailModule } from './email/email.module';
import { PagesModule } from './pages/pages.module';
import { AiModule } from './ai/ai.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ContentBootstrapService } from './content.bootstrap';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI', 'mongodb://localhost:27017/ami-shalom'),
      }),
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    EmailModule,
    AuthModule,
    PagesModule,
    DestinationsModule,
    GalleryModule,
    ServicesModule,
    BookingsModule,
    ContactModule,
    AiModule,
    ReviewsModule,
  ],
  providers: [ContentBootstrapService],
})
export class AppModule { }

