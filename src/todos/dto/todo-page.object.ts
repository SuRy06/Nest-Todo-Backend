import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Todo } from '../entities/todo.entity';

@ObjectType()
export class TodoPage {
  @Field(() => [Todo])
  items: Todo[];

  @Field(() => Int)
  totalCount: number;
}
