require('dotenv/config');

import { ConnectionOptions } from 'typeorm';
import * as path from 'path';

export const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  migrationsTableName: 'migrations',
  logging: true,
  entities: [path.join(__dirname, '../../../libs/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, './migrations/*{.ts,.js}')],
  url: process.env.DATABASE_URL,
  synchronize: false,
  cli: {
    migrationsDir: './migrations',
  },
};
