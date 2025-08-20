import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class SignalFilterQuery {
	@IsOptional()
	@IsString()
	deviceId?: string;

	@IsOptional()
	@Type(() => Number)
	timeFrom?: number;

	@IsOptional()
	@Type(() => Number)
	timeTo?: number;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	page?: number = 1;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	limit?: number = 20;

	@IsOptional()
	@IsEnum(['time', 'createdAt'])
	sortBy?: 'time' | 'createdAt' = 'time';

	@IsOptional()
	@IsEnum(['asc', 'desc'])
	sortOrder?: 'asc' | 'desc' = 'desc';
}
