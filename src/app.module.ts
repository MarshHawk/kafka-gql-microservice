import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    ReviewModule,
  ]
})
export class AppModule {}
