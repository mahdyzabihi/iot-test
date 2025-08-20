import { Injectable } from '@nestjs/common';
import { BasePublisher } from '../rabbitmq/base.publisher';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class SignalsPublisher extends BasePublisher {
	constructor(rabbitmq: RabbitmqService) {
		super(rabbitmq);
	}
}
