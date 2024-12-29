import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { join } from 'path';

// const isDevelopment = process.env.NODE_ENV !== 'production';
// const entitiesPath = isDevelopment
//   ? join(__dirname, '/../**/*.entity.ts') // Development: TypeScript
//   : join(__dirname, '/../**/*.entity.js'); // Production: Compiled JavaScript
console.log(`Entities path: ${join(__dirname, '**', '*.entity.{ts,js}')}`);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'P@ssw0rd',
      database: 'node_typeorm_db',
      autoLoadEntities: true,
      // entities: ['src/**/*.entity.ts'],
      // entities: [entitiesPath],
      entities: [User],
      // entities: ['src/../**/*.entity{.ts,.js}'],
      // entities: [__dirname + '/../**/*.entity.{ts,js}'],
      synchronize: true, // Set this to true only for development purposes
      logging: true, // Enable logging to see connection logs
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
