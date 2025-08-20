export interface IDatabase {
	host: string;
	port: number;
	username: string;
	password: string;
	database: string;
	synchronize: boolean;
	logging: boolean;
	auto_load_entities: boolean;
	auth_source: string;
	timeout_selection: number;
	family: number;
}
