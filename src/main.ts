import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './utils/interceptors/response.interceptor';
import { GlobalExceptionFilter } from './utils/filters/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ICors } from '../config/env/interfaces/cors.interface';
import { ISwaggerConfig } from '../config/env/interfaces/swagger-config.interface';
import {
	DocumentBuilder,
	SwaggerCustomOptions,
	SwaggerModule,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('/api');
	app.useGlobalInterceptors(new ResponseInterceptor());
	app.useGlobalFilters(new GlobalExceptionFilter());
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	const app_config = app.get<ConfigService>(ConfigService);
	const swagger_config = app_config.get<ISwaggerConfig>('swagger')!;
	const config = new DocumentBuilder()
		.setTitle(swagger_config.title ?? '')
		.setDescription(swagger_config.description ?? '')
		.setVersion(swagger_config.version ?? '')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(swagger_config.route, app, document, {
		swaggerOptions: { defaultModelsExpandDepth: -1 },
	} as SwaggerCustomOptions);

	const cors = app_config.get<ICors>('cors');
	app.enableCors(cors as CorsOptions);

	const app_name = app_config.get<string>('app_name')!;
	const app_host = app_config.get<string>('host')!;
	const app_port = app_config.get<string>('port')!;
	console.log(app_name, ' .::. ', `${app_host}:${app_port}`);
	await app.listen(+app_port, app_host);
}
bootstrap();
