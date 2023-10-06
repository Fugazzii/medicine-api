import { Entity as Model, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ClientEntity } from '../entities/client.entity';

@Model('clients')
export class ClientModel implements ClientEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 256, unique: true, nullable: false })
  public private_id: string;

  @Column({ type: 'varchar', length: 256, unique: true, nullable: false })
  public email: string;

  @Column({ type: 'integer', nullable: false })
  public age: number;

  @Column({ type: 'varchar', length: 256, nullable: false })
  public password: string;
}
