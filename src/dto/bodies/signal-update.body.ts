import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { XrayPoint } from '../types/xray-point.type';

export class SignalUpdateBody {
	@IsOptional()
	@IsString()
	deviceId?: string;

	@IsOptional()
	@IsNumber()
	time?: number;

	@IsOptional()
	@IsArray()
	rawData?: XrayPoint[];
}