import { Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { PrismaService } from '../prisma.service';

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
        // id: 123, // Example ID generation
        name,
        status: 'UNDONE', // Default status
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } catch (error) {
      console.error('Error creating todo:', error);
      throw new Error('Internal Server Error. Please try again later.');
    }
  }

  findAll() {
    return `This action returns all todos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoInput: UpdateTodoInput) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
