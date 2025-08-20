import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { config } from '../config/env';
import { OrmConfig } from '../config/orm.config';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { RabbitmqPublisherModule } from './rabbitmq-publisher/rabbitmq-publisher.module';
import { RabbitmqConsumerModule } from './rabbitmq-consumer/rabbitmq-consumer.module';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `${process.cwd()}/.env`,
			load: [config],
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useClass: OrmConfig,
			inject: [ConfigModule],
		}),
		RabbitmqModule,
		RabbitmqPublisherModule,
		RabbitmqConsumerModule,
		DatabaseModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
