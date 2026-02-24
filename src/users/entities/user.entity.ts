import { ObjectType, Field, ID, HideField } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @HideField()
  password: string;

  @Field({ nullable: true })
  fullName?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
