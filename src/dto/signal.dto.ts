import { IsNumber, IsArray, ValidateNested } from 'class-validator';
import { XrayPoint } from './types/xray-point.type';

export class DeviceModel {
	[key: string]: SignalModel;
}
export class SignalModel {
	@IsNumber()
	time: number;

	@IsArray()
	@ValidateNested({ each: true })
	data: Array<XrayPoint>;
}
