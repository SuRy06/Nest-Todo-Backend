import { CreateTodoInput } from './create-todo.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { TodoStatus } from '../entities/todo.entity';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => TodoStatus, { nullable: true })
  status?: TodoStatus;
}
