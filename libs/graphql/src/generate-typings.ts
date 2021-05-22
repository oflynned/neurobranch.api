import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

(async () => {
  const definitionsFactory = new GraphQLDefinitionsFactory();

  try {
    await definitionsFactory.generate({
      typePaths: [
        join(process.cwd(), './apps/**/*.graphql'),
        join(process.cwd(), './libs/**/*.graphql'),
      ],
      path: join(__dirname, './types.ts'),
      outputAs: 'class',
    });
  } catch (e) {
    console.log(e);
    console.log('ooops');
  }
})();
