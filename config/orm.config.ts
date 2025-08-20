import {
	MongooseModuleOptions,
	MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDatabase } from './env/interfaces/database.interface';
import mongoose from 'mongoose';

@Injectable()
export class OrmConfig implements MongooseOptionsFactory {
	private readonly DatabaseConfig: IDatabase;

	constructor(private _configService: ConfigService) {
		this.DatabaseConfig = this._configService.get<IDatabase>('database')!;
	}

	createMongooseOptions(): MongooseModuleOptions {
		if (this.DatabaseConfig.logging) {
			mongoose.set('debug', true);
		}

		return {
			uri:
				`mongodb://${this.DatabaseConfig.username}:${this.DatabaseConfig.password}` +
				`@${this.DatabaseConfig.host}:${this.DatabaseConfig.port}/${this.DatabaseConfig.database}`,
			dbName: this.DatabaseConfig.database,
			authSource: this.DatabaseConfig.auth_source,

			autoCreate: this.DatabaseConfig.synchronize,
			autoIndex: this.DatabaseConfig.auto_load_entities,

			serverSelectionTimeoutMS: this.DatabaseConfig.timeout_selection,
			family: this.DatabaseConfig.family,
		};
	}
}
