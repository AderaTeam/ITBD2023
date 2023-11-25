import { join } from 'path';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Result } from './process/entities/result.entity';
import { Tag } from './process/entities/tag.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        entities: [User, Result, Tag],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'RESULT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Result),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'TAG_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tag),
    inject: ['DATA_SOURCE'],
  },
];
