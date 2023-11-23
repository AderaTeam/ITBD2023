import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants';

@Module({
  imports: [UserModule,
            ConfigModule.forRoot(),
            JwtModule.register({
              global: true,
              secret: jwtConstants.secret,
              signOptions: { expiresIn: '60d' },
            }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
