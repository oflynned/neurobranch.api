import { createConnection } from 'typeorm';
import { connectionOptions } from './config';

(async () => {
  const connection = await createConnection({
    ...connectionOptions,
    logging: true,
  });

  try {
    await connection.undoLastMigration();
  } catch (e) {
    console.error(e);
  } finally {
    await connection.close();
  }
})();
