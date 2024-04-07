import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService, DatabaseService],
})
export class TodoModule {}
