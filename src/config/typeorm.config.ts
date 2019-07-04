import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: 5432,
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'admin',
            database: process.env.DB_NAME || 'weighttracker',
            entities: ['src/**/**.entity{.ts,.js}'],
            synchronize: true,
        };
    }
}
