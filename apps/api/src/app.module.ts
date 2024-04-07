import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { join } from 'path';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService,
  ],
})
export class AppModule { }


