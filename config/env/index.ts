import { IConfig } from './interfaces/config.interface';
import * as process from 'process';

export function config(): IConfig {
	return {
		app_id: process.env.APP_ID!,
		app_name: process.env.APP_NAME!,
		development: process.env.NODE_ENV === 'development',
		staging: process.env.NODE_ENV === 'staging',
		production: process.env.NODE_ENV === 'production',
		host: process.env.HOST!,
		api: {
			url: process.env.API_URL!,
		},
		ip:
			process.env.NODE_ENV === 'production'
				? process.env.PRODUCTION_IP!
				: process.env.DEVELOPMENT_IP!,
		port: process.env.PORT!,
		cors: {
			origin: process.env.CORS_ORIGIN === 'true',
			methods: process.env.CORS_METHODS!,
			credentials: process.env.CORS_CREDENTIALS === 'true',
		},
		swagger: {
			title: process.env.SWAGGER_TITLE!,
			description: process.env.SWAGGER_DESCRIPTION!,
			version: process.env.SWAGGER_VERSION!,
			route: process.env.SWAGGER_ROUTE!,
		},
		rabbit: {
			protocol: process.env.RABBIT_PROTOCOL!,
			hostname: process.env.RABBIT_HOSTNAME!,
			port: +process.env.RABBIT_PORT!,
			username: process.env.RABBIT_USERNAME!,
			password: process.env.RABBIT_PASSWORD!,
			vhost: process.env.RABBIT_VHOST!,
		},
		database: {
			host: process.env.DB_HOST!,
			port: +process.env.DB_PORT!,
			username: process.env.DB_USERNAME!,
			password: process.env.DB_PASSWORD!,
			database: process.env.DB_DATABASE!,
			synchronize: process.env.DB_SYNCHRONIZE === 'true',
			logging: process.env.DB_LOGGING === 'true',
			auto_load_entities: process.env.DB_AUTO_LOAD_ENTITIES === 'true',
			auth_source: process.env.DB_AUTH_SOURCE!,
			timeout_selection: +process.env.DB_TIMEOUT_SELECTION!,
			family: +process.env.DB_FAMILY!,
		},
	};
}
