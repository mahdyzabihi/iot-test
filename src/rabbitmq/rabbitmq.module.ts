import { Global, Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
	providers: [RabbitmqService, ConfigService],
	exports: [RabbitmqService],
})
export class RabbitmqModule {}
