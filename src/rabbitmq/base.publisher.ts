import { RabbitmqService } from './rabbitmq.service';
import { QUEUE_NAME } from './queue.decorator';

export abstract class BasePublisher {
	private readonly queueName: string;

	protected constructor(protected readonly rabbitmq: RabbitmqService) {
		const target = this.constructor as any;
		this.queueName =
			Reflect.getMetadata(QUEUE_NAME, target) ||
			'xray_' +
				target.name.replace('Publisher', '').toLowerCase() +
				'_queue';
	}

	async publish<T>(data: T) {
		await this.rabbitmq.sendToQueue(this.queueName, data);
		console.log(
			`[${this.constructor.name}] published to ${this.queueName}`,
			data,
		);
	}
}
