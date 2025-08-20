import {
	Injectable,
	NotAcceptableException,
	NotFoundException,
} from '@nestjs/common';
import { SignalsPublisher } from './rabbitmq-publisher/signals.publisher';
import { SignalRepository } from './database/repositories/signal.repository';
import { DeviceModel } from './dto/signal.dto';
import { Signal } from './database/schemas/signal.schema';
import { SignalCreateBody } from './dto/bodies/signal-create.body';
import { SignalFilterQuery } from './dto/queries/signal-filter.query';
import { SignalUpdateBody } from './dto/bodies/signal-update.body';

@Injectable()
export class AppService {
	constructor(
		private readonly publisher: SignalsPublisher,
		private readonly signalRepository: SignalRepository,
	) {}

	async publish() {
		const model: DeviceModel = {
			'66bb584d4ae73e488c30a072': {
				data: [
					[762, [51.339764, 12.339223833333334, 1.2038000000000002]],
					[1766, [51.33977733333333, 12.339211833333334, 1.531604]],
					[2763, [51.339782, 12.339196166666667, 2.13906]],
				],
				time: 1735683480000,
			},
		};
		await this.publisher.publish<DeviceModel>(model);
		return {
			message: 'Publish To Queue !',
		};
	}

	private computeDataLength(data: any[]): number {
		return Array.isArray(data) ? data.length : 0;
	}
	private computeDataVolume(data: any[]): number {
		try {
			return Buffer.byteLength(JSON.stringify(data ?? []), 'utf8');
		} catch {
			return 0;
		}
	}

	async createFromXray(dto: SignalCreateBody): Promise<Signal> {
		const dataLength = this.computeDataLength(dto.data);
		const dataVolume = this.computeDataVolume(dto.data);

		return this.signalRepository.create({
			deviceId: dto.deviceId,
			time: dto.time,
			dataLength,
			dataVolume,
			rawData: dto.data,
		});
	}

	async list(q: SignalFilterQuery) {
		return this.signalRepository.findFiltered(
			{
				deviceId: q.deviceId,
				timeFrom: q.timeFrom,
				timeTo: q.timeTo,
			},
			{
				page: q.page ?? 1,
				limit: q.limit ?? 20,
				sortBy: q.sortBy ?? 'time',
				sortOrder: q.sortOrder ?? 'desc',
			},
		);
	}

	async getById(id: string): Promise<Signal> {
		const item = await this.signalRepository.findById(id);
		if (item == null) throw new NotFoundException('Data Not Found !');
		return item;
	}

	async updateById(id: string, dto: SignalUpdateBody): Promise<Signal> {
		const update: Partial<Signal> = {};

		if (dto.deviceId !== undefined) update.deviceId = dto.deviceId;
		if (dto.time !== undefined) update.time = dto.time;

		if (dto.rawData !== undefined) {
			update.rawData = dto.rawData;
			update.dataLength = this.computeDataLength(dto.rawData);
			update.dataVolume = this.computeDataVolume(dto.rawData);
		}

		const result = await this.signalRepository.updateById(id, update);
		if (result == null)
			throw new NotAcceptableException('Update failed. !');
		return result;
	}

	async deleteById(id: string): Promise<Signal> {
		const result = await this.signalRepository.deleteById(id);
		if (result == null)
			throw new NotAcceptableException('Delete failed. !');
		return result;
	}
}
