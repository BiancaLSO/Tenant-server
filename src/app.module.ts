import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IssuesModule } from './issues/issues.module';
import { InfosModule } from './infos/infos.module';
import { RegionsModule } from './regions/regions.module';
import { ApartmentInfoModule } from './apartment-info/apartment-info.module';
import { UsersModule } from './users/users.module';
import { Issue } from './issues/entities/issue.entity';
import { Info } from './infos/entities/info.entity';
import { Region } from './regions/entities/region.entity';
import { ApartmentInfo } from './apartment-info/entities/apartment-info.entity';
import { User } from './users/entities/user.entity';
import { AuthModule } from './authentication/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        entities: [ Issue, Info, Region, ApartmentInfo, User, Category],
        synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
      }),
      inject: [ConfigService],
    }),
    IssuesModule,
    InfosModule,
    RegionsModule,
    ApartmentInfoModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
