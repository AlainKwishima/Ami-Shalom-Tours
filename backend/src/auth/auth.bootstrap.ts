import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class AuthBootstrapService implements OnModuleInit {
  private readonly logger = new Logger(AuthBootstrapService.name);

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const email =
      this.configService.get<string>('DEFAULT_ADMIN_EMAIL') ?? 'alainkwishima@gmail.com';
    const password =
      this.configService.get<string>('DEFAULT_ADMIN_PASSWORD') ?? 'mukabareke';
    const name = this.configService.get<string>('DEFAULT_ADMIN_NAME') ?? 'Super Admin';

    if (!email || !password) {
      this.logger.warn('Default admin credentials not provided. Skipping seed.');
      return;
    }

    try {
      await this.authService.ensureDefaultAdmin({
        email,
        password,
        name,
        role: 'super_admin',
      });
      this.logger.log(`Default admin ensured for ${email}`);
    } catch (error) {
      this.logger.error('Failed to ensure default admin', error as Error);
    }
  }
}


