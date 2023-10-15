import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class NatsService {
  private client: ClientProxy;

  public constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        url: 'nats://nats:4222',
        servers: ["nats://nats:4222"]
      }
    });
  }

  public async connect() {
    this.client
      .connect()
      .then(() => console.log("==============================> Connected to NATS"))
      .catch((err) => console.error("==============================> Failed to connect to NATS", err));
  }

  public publish(topic: string, message: string) {
    return this.client.emit(topic, message);
  }


}
