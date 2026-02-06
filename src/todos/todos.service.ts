import { Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { PrismaService } from '../prisma.service';
import { TodoStatus } from 'generated/prisma/enums';
import { throwError } from 'rxjs';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTodoInput: CreateTodoInput) {
    try {
      const { name } = createTodoInput;
      // Here you would typically interact with your database to create the todo item
      const newTodo = await this.prisma.todo.create({
        data: {
          name,
        },
      });

      return {
        id: newTodo.id, // Example ID generation
        name,
        status: TodoStatus.UNDONE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      console.error('Error creating todo:', error);
      throw new Error('Internal Server Error. Please try again later.');
    }
  }

  async findAll() {
    try {
      const todos = await this.prisma.todo.findMany();
      return todos;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw new Error('Could not fetch todos');
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} todo`;
  }

  async update(id: string, updateTodoInput: UpdateTodoInput) {
    try {
      const updatedTodo = await this.prisma.todo.update({
        where: { id },
        data: { ...updateTodoInput },
      });

      return updatedTodo;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw new Error('Could not update the todo');
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.todo.delete({
        where: { id },
      });
      return `Deleted Successfully`;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw new Error('Could not delete the todo');
    }
  }
}
