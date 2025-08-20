import { OnModuleInit } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { QUEUE_NAME } from './queue.decorator';

export abstract class BaseConsumer implements OnModuleInit {
	protected abstract handleMessage(data: any): Promise<void>;

	protected constructor(protected readonly rabbitmq: RabbitmqService) {}

	async onModuleInit() {
		const target = this.constructor as any;
		const queueName =
			Reflect.getMetadata(QUEUE_NAME, target) ||
			'xray_' +
				target.name.replace('Consumer', '').toLowerCase() +
				'_queue';

		console.log(`[${target.name}] bound to queue: ${queueName}`);

		await this.rabbitmq.consume(queueName, async (data: object) => {
			await this.handleMessage(data);
		});
	}
}
