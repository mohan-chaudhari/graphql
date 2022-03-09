import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { StudentModule } from './student/student.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'school',
      useNewUrlParser: true,
      autoLoadEntities: true,
      synchronize: true,
      useUnifiedTopology: true,
      entities: [join(__dirname, '**/**.entity{.ts,js}')],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    LessonModule,
    StudentModule,
  ],
})
export class AppModule {}
