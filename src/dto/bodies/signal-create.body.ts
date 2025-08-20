import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { XrayPoint } from '../types/xray-point.type';

export class SignalCreateBody {
	@IsString()
	@IsNotEmpty()
	deviceId: string;

	@IsNumber()
	@IsNotEmpty()
	time: number;

	@IsArray()
	@IsNotEmpty()
	data: XrayPoint[];
}