import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Injectable } from '@nestjs/common';
import { DB_CONFIG } from './db.env';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: process.env.HOST || DB_CONFIG.DB_HOST,
            port: parseInt(process.env.DB_PORT) || DB_CONFIG.DB_PORT,
            username: process.env.DB_USERNAME || DB_CONFIG.DB_USER,
            password: process.env.DB_PASSWORD || DB_CONFIG.DB_PASSWORD,
            database: process.env.DB_NAME || DB_CONFIG.DB_NAME,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
        };
    }
}
