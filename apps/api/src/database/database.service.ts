import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
// export class DatabaseService extends PrismaClient implements OnModuleInit,OnModuleDestroy {
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  // async onModuleDestroy() {
  //   await this.$disconnect();
  // }
  // async cleanDatabase() {
  //   if (process.env.NODE_ENV === 'production') return;

  //   // teardown logic
  //   return Promise.all([this.user.deleteMany()]);
  // }
}