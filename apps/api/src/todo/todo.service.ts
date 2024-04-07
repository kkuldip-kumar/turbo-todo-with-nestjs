import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TodoService {
  constructor(private db: DatabaseService) { }
  async create(createTodoDto: CreateTodoDto): Promise<String> {
    try {
      const formValues = {
        title: createTodoDto.title,
        content: createTodoDto.content,
        status: createTodoDto.status,
      }
      const data = await this.db.todo.create({
        data: formValues
      })
      if (!data) throw new BadRequestException('unable to create record')
      console.log('data')
      return 'item created successfully'
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  async findAll() {
    try {
      const data = await this.db.todo.findMany()
      if (!data) throw new NotFoundException()
      return data
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'This is a custom message',
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.db.todo.findFirst({
        where: { id: id },
      })
      if (!data) throw new NotFoundException('No record found')
      return data
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id, updateTodoDto: UpdateTodoDto) {
    try {
      const data = await this.db.todo.update({
        where: { id: id },
        data: updateTodoDto
      })
      if (!data) throw new BadRequestException('unable to update rec')
      return 'item updated successfully'
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error,
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    }
  }

  async remove(id) {
    try {
      const data = await this.db.todo.delete({
        where: { id: id },
      })
      if (!data) throw new BadRequestException('unable to create item')
      return 'item deleted successfully'
    } catch (error) {
      console.log('err', error)
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }
}
