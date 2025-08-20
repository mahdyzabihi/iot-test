import { Injectable } from '@nestjs/common';
import { BaseConsumer } from '../rabbitmq/base.consumer';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { DeviceModel } from '../dto/signal.dto';
import { SignalRepository } from '../database/repositories/signal.repository';

@Injectable()
export class SignalsConsumer extends BaseConsumer {
	constructor(
		rabbitmq: RabbitmqService,
		private readonly signalRepository: SignalRepository,
	) {
		super(rabbitmq);
	}

	protected async handleMessage(device: DeviceModel) {
		console.log('Processing Xray Signal:', device);

		const deviceId = Object.keys(device)[0];
		const info = device[deviceId];
		const time = info.time;
		const rawData = info.data;

		const dataLength = rawData.length;
		const dataVolume = JSON.stringify(rawData).length;

		await this.signalRepository.create({
			deviceId,
			time,
			dataLength,
			dataVolume,
			rawData: rawData,
		});
	}
}
