import { ReviewResolver } from './review.resolver';
import { Module } from '@nestjs/common';
import { PubSub } from 'apollo-server-express';
import { KafkaPubSub } from 'graphql-kafkajs-subscriptions';
import { Kafka } from 'kafkajs';

@Module({
  imports: [],
  providers: [
    ReviewResolver,
    {
      provide: 'PUB_SUB',
      useFactory: () => {
        return KafkaPubSub.create({
          topic: 'event-created',
          kafka: new Kafka({
            brokers: ['localhost:9092'],
          }),
          groupIdPrefix: 'my-group-id-prefix', // used for kafka pub/sub,
          producerConfig: {}, // optional kafkajs producer configuration
          consumerConfig: {}, // optional kafkajs consumer configuration
        });
      },
    },
  ],
  exports: [],
})
export class ReviewModule {}

/* const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka1:9092', 'kafka2:9092']
  }) */
