import {
	Catch,
	ExceptionFilter,
	ArgumentsHost,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(GlobalExceptionFilter.name);

	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();
		let status = HttpStatus.INTERNAL_SERVER_ERROR;
		let message: string | object = 'Internal server error';

		this.logger.error(`${request.method} ${request.url}`, exception.stack);

		if (exception instanceof HttpException) {
			status = exception.getStatus();
			const exceptionResponse = exception.getResponse();

			if (typeof exceptionResponse === 'string') {
				message = exceptionResponse;
			} else if (
				typeof exceptionResponse === 'object' &&
				exceptionResponse !== null
			) {
				message = (exceptionResponse as any).message || message;

				if (status === HttpStatus.NOT_FOUND) {
					message = 'Resource not found';
				} else if (status === HttpStatus.UNAUTHORIZED) {
					message = 'Unauthorized access';
				} else if (status === HttpStatus.FORBIDDEN) {
					message = 'Access forbidden';
				} else if (status === HttpStatus.BAD_REQUEST) {
					message =
						(exceptionResponse as any).message || 'Bad request';
				} else if (status === HttpStatus.CONFLICT) {
					message = 'Conflict detected';
				} else if (status === HttpStatus.PAYLOAD_TOO_LARGE) {
					message = 'Payload too large';
				}
			}
		}

		response.status(status).json({
			statusCode: status,
			message,
			timestamp: new Date().toISOString(),
			path: request.url,
		});
	}
}
