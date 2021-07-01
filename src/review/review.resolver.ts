import { Inject, NotImplementedException } from '@nestjs/common';
import {
  Query,
  Field,
  ID,
  Mutation,
  ObjectType,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSubEngine } from 'apollo-server-express';

@ObjectType()
export class Review {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((_type) => ID)
  id: string;
  @Field()
  content: string;
}

@Resolver('Review')
export class ReviewResolver {
  constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) {}

  @Query((_) => Review)
  async getReview(): Promise<Review> {
    throw new NotImplementedException();
  }

  @Mutation((_) => Review)
  async review(): Promise<Review> {
    const review = {
      id: Date.now().toString(),
      content: Math.random().toString(36).substring(7),
    };
    await this.pubSub.publish('reviewCreated', JSON.stringify(review));
    return review;
  }

  @Subscription((_) => Review, {
    resolve(payload) {
      return JSON.parse(payload.value.toString());
    },
  })
  reviewCreated() {
    return this.pubSub.asyncIterator('reviewCreated');
  }
}
