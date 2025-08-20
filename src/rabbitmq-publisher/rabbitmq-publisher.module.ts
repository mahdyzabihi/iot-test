import { Module } from '@nestjs/common';
import { SignalsPublisher } from './signals.publisher';

@Module({
	providers: [SignalsPublisher],
	exports: [SignalsPublisher],
})
export class RabbitmqPublisherModule {}
