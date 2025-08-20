import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MongooseDocument } from '../base/mongoose.document';

export type SignalDocument = Signal & Document;
@Schema({ timestamps: true, collection: 'xray_signals' })
export class Signal implements MongooseDocument {
	_id: any;
	__v?: number;

	@Prop({ required: true })
	deviceId: string;

	@Prop({ required: true })
	time: number;

	@Prop({ required: true })
	dataLength: number;

	@Prop({ required: true })
	dataVolume: number;

	@Prop({ type: Object })
	rawData: any;
}

export const SignalSchema = SchemaFactory.createForClass(Signal);
SignalSchema.index({ deviceId: 1, time: -1 });