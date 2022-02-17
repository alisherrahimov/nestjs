import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1',
  database: 'bookstore',
  synchronize: true,
  entities: ['dist/src/entities/*.entity.{js,ts}'],
};
export default config;
