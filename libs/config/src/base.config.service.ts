import { Optional } from '@common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  getMode(): string {
    return this.getValue<string>('MODE') ?? 'development';
  }

  isProduction(): boolean {
    return this.getMode() === 'production';
  }

  isStaging(): boolean {
    return this.getMode() === 'staging';
  }

  isProductionOrStaging(): boolean {
    return this.isProduction() || this.isStaging();
  }

  isDevelopment(): boolean {
    return this.getMode() === 'development';
  }

  getDatabaseUrl(): string {
    return this.getValue<string>('DATABASE_URL', true);
  }

  protected getValue<T>(key: string, throwOnMissing = false): Optional<T> {
    const value = this.configService.get<T>(key);

    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value ?? null;
  }
}
