import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Researcher {
  @Field(() => String)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  deletedAt: Date;

  @Field(() => Date)
  verifiedAt: Date;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;
}
