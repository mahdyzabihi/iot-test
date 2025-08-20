import { Module } from '@nestjs/common';
import { SignalsConsumer } from './signals.consumer';
import { DatabaseModule } from '../database/database.module';

@Module({
	imports: [DatabaseModule],
	providers: [SignalsConsumer],
	exports: [SignalsConsumer],
})
export class RabbitmqConsumerModule {}
