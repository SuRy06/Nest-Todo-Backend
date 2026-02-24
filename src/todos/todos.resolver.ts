import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo, TodoStatus } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { TodoPage } from './dto/todo-page.object';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver(() => Todo)
@UseGuards(GqlAuthGuard)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Mutation(() => Todo)
  createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoInput,
    @CurrentUser() user: User,
  ) {
    return this.todosService.create(createTodoInput, user.id);
  }

  @Query(() => TodoPage, { name: 'todos' })
  findAll(
    @Args('skip', { type: () => Int, defaultValue: 0 })
    skip?: number,
    @Args('take', { type: () => Int, defaultValue: 10 })
    take?: number,
    @Args('statuses', { type: () => [TodoStatus], nullable: true })
    statuses?: TodoStatus[],
    @CurrentUser() user?: User,
  ) {
    return this.todosService.findAll({
      skip,
      take,
      statuses,
      userId: user?.id,
    });
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.todosService.findOne(id);
  }

  @Mutation(() => Todo)
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todosService.update(updateTodoInput.id, updateTodoInput);
  }

  @Mutation(() => String)
  removeTodo(@Args('id', { type: () => String }) id: string) {
    return this.todosService.remove(id);
  }
}
