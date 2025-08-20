import { ICors } from './cors.interface';
import { IDatabase } from './database.interface';
import { ISwaggerConfig } from './swagger-config.interface';
import { IApi } from './api.interface';
import { IRabbitConfig } from './rabbit-config.interface';

export interface IConfig {
	app_id: string;
	app_name: string;
	development: boolean;
	staging: boolean;
	production: boolean;
	host: string;
	api: IApi;
	ip: string;
	port: string;
	cors: ICors | undefined;
	swagger: ISwaggerConfig | undefined;
	rabbit: IRabbitConfig;
	database: IDatabase;
}
