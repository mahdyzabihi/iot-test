import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { SignalRepository } from './repositories/signal.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Signal, SignalSchema } from './schemas/signal.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Signal.name, schema: SignalSchema },
		]),
	],
	providers: [DatabaseService, SignalRepository],
	exports: [DatabaseService, SignalRepository],
})
export class DatabaseModule {}
