import { Test, TestingModule } from '@nestjs/testing';
import { SignalsPublisher } from './signals.publisher';

describe('SignalsPublisher', () => {
	let service: SignalsPublisher;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [SignalsPublisher],
		}).compile();

		service = module.get<SignalsPublisher>(SignalsPublisher);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
