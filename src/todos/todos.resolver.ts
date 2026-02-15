import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo, TodoStatus } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { TodoPage } from './dto/todo-page.object';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Mutation(() => Todo)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todosService.create(createTodoInput);
  }

  @Query(() => TodoPage, { name: 'todos' })
  findAll(
    @Args('skip', { type: () => Int, defaultValue: 0 })
    skip?: number,
    @Args('take', { type: () => Int, defaultValue: 10 })
    take?: number,
    @Args('statuses', { type: () => [TodoStatus], nullable: true })
    statuses?: TodoStatus[],
  ) {
    return this.todosService.findAll({ skip, take, statuses });
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
