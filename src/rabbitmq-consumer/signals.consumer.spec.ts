import { Test, TestingModule } from '@nestjs/testing';
import { SignalsConsumer } from './signals.consumer';

describe('RabbitmqConsumerService', () => {
	let service: SignalsConsumer;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SignalsConsumer],
		}).compile();

		service = module.get<SignalsConsumer>(SignalsConsumer);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
