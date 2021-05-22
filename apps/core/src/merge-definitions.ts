import { join } from 'path';
import { loadFiles } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { print } from 'graphql';
import { writeFileSync } from 'fs';

(async () => {
  try {
    const typesArray = await loadFiles([
      join(__dirname, './app/**/*.graphql'),
      join(__dirname, '../../../libs/**/*.graphql'),
    ]);
    const typeDefs = mergeTypeDefs(typesArray);
    const printedTypeDefs = print(typeDefs);
    writeFileSync(join(__dirname, './assets/schema.graphql'), printedTypeDefs);
  } catch (e) {
    console.log(e);
  }
})();
