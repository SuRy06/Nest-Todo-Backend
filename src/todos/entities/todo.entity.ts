import {
  ObjectType,
  Field,
  ID,
  registerEnumType,
  GraphQLISODateTime,
} from '@nestjs/graphql';

export enum TodoStatus {
  UNDONE = 'UNDONE',
  STARTED = 'STARTED',
  DONE = 'DONE',
}

registerEnumType(TodoStatus, {
  name: 'TodoStatus',
  description: 'Current status of a todo item',
});

@ObjectType()
export class Todo {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => TodoStatus)
  status: TodoStatus;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
