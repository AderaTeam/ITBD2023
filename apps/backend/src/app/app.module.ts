import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { ProcessModule } from '../process/process.module';
import { DataController } from '../data/data.controller';
import { databaseProviders } from '../database.providers';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule,
            ConfigModule.forRoot(),
            JwtModule.register({
              global: true,
              secret: jwtConstants.secret,
              signOptions: { expiresIn: '60d' },
            }),
            ProcessModule
          ],
  controllers: [DataController],
  providers: [...databaseProviders],
})
export class AppModule {}
