import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Signal, SignalDocument } from '../schemas/signal.schema';

@Injectable()
export class SignalRepository {
	constructor(
		@InjectModel(Signal.name)
		private readonly signalDocument: Model<SignalDocument>,
	) {}

	async create(signal: Partial<Signal>): Promise<Signal> {
		const created = new this.signalDocument(signal);
		return created.save();
	}

	async findById(id: string): Promise<Signal | null> {
		return this.signalDocument.findById(id).exec();
	}

	async updateById(
		id: string,
		update: Partial<Signal>,
	): Promise<Signal | null> {
		return this.signalDocument
			.findByIdAndUpdate(id, update, { new: true })
			.exec();
	}

	async deleteById(id: string): Promise<Signal | null> {
		return this.signalDocument.findByIdAndDelete(id).exec();
	}

	async findFiltered(
		filters: { deviceId?: string; timeFrom?: number; timeTo?: number },
		opts: {
			page: number;
			limit: number;
			sortBy: 'time' | 'createdAt';
			sortOrder: 'asc' | 'desc';
		},
	): Promise<{
		items: Signal[];
		total: number;
		page: number;
		limit: number;
	}> {
		const { deviceId, timeFrom, timeTo } = filters;
		const { page, limit, sortBy, sortOrder } = opts;

		const query: FilterQuery<SignalDocument> = {};
		if (deviceId) query.deviceId = deviceId;
		if (timeFrom != null || timeTo != null) {
			query.time = {};
			if (timeFrom != null) query.time.$gte = timeFrom;
			if (timeTo != null) query.time.$lte = timeTo;
		}

		const sort: Record<string, 1 | -1> = {
			[sortBy]: sortOrder === 'asc' ? 1 : -1,
		};

		const [items, total] = await Promise.all([
			this.signalDocument
				.find(query)
				.sort(sort)
				.skip((page - 1) * limit)
				.limit(limit)
				.exec(),
			this.signalDocument.countDocuments(query).exec(),
		]);
		return { items, total, page, limit };
	}
}
