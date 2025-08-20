import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SignalCreateBody } from './dto/bodies/signal-create.body';
import { SignalFilterQuery } from './dto/queries/signal-filter.query';
import { SignalUpdateBody } from './dto/bodies/signal-update.body';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Post('publish')
	async publish() {
		return await this.appService.publish();
	}

	@Post('xray')
	async create(@Body() dto: SignalCreateBody) {
		const created = await this.appService.createFromXray(dto);
		return {
			data: {
				id: created._id,
				created,
			},
		};
	}

	@Get('xray')
	async list(@Query() q: SignalFilterQuery) {
		const list = await this.appService.list(q);
		return {
			data: {
				list: list.items,
				total: list.total,
				page: list.page,
				limit: list.limit,
			},
		};
	}

	@Get('xray/:id')
	async getById(@Param('id') id: string) {
		const item = await this.appService.getById(id);
		return {
			data: item,
		};
	}

	@Patch('xray/:id')
	async update(@Param('id') id: string, @Body() dto: SignalUpdateBody) {
		const updated = await this.appService.updateById(id, dto);
		return {
			data: {
				id,
				updated,
			},
		};
	}

	@Delete('xray/:id')
	async delete(@Param('id') id: string) {
		const deleted = await this.appService.deleteById(id);
		return {
			data: {
				id,
				deleted,
			},
		};
	}
}
