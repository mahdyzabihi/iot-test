import 'reflect-metadata';

export const QUEUE_NAME = Symbol('QUEUE_NAME');

export function Queue(name: string) {
	return (target: any) => {
		Reflect.defineMetadata(QUEUE_NAME, name, target);
	};
}
