import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as amqp from 'amqplib';
import { IRabbitConfig } from '../../config/env/interfaces/rabbit-config.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {
	private readonly RabbitConfig: IRabbitConfig;
	private connection: amqp.ChannelModel;
	private channel: amqp.Channel;

	constructor(private readonly _configService: ConfigService) {
		this.RabbitConfig = this._configService.get<IRabbitConfig>('rabbit')!;
	}

	async onModuleInit() {
		this.connection = await amqp.connect({
			protocol: this.RabbitConfig.protocol,
			hostname: this.RabbitConfig.hostname,
			port: this.RabbitConfig.port,
			username: this.RabbitConfig.username,
			password: this.RabbitConfig.password,
			vhost: this.RabbitConfig.vhost,
		});
		this.channel = await this.connection.createChannel();
		console.log('RabbitMQ Connected');
	}

	async sendToQueue(queue: string, message: any) {
		await this.channel.assertQueue(queue, { durable: true });
		this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
			persistent: true,
		});
		console.log(`Sent to [${queue}] ->`, message);
	}

	async consume(queue: string, onMessage: (msg: any) => void) {
		await this.channel.assertQueue(queue, { durable: true });

		await this.channel.consume(
			queue,
			(msg) => {
				if (msg !== null) {
					const content = JSON.parse(msg.content.toString());
					console.log(`Received from [${queue}] ->`, content);
					try {
						onMessage(content);
						this.channel.ack(msg);
					} catch (err) {
						console.error('Error processing message:', err);
						this.channel.nack(msg, false, false);
					}
				}
			},
			{ noAck: false },
		);
	}

	async onModuleDestroy() {
		await this.channel?.close();
		await this.connection?.close();
	}
}
