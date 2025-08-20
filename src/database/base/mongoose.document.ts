import { Types } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

export class MongooseDocument {
	@Prop()
	_id: Types.ObjectId;

	@Prop()
	__v?: number;
}
