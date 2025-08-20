import { MongooseDocument } from '../base/mongoose.document';

export interface Signal extends MongooseDocument {
	deviceId: string;
	time: number;
	dataLength: number;
	dataVolume: number;
	data: Array<[number, [number, number, number]]>;
}