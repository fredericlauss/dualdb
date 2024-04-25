import { Entity, PrimaryKey, Property, ManyToOne, Collection } from '@mikro-orm/postgresql';
import { User } from './User.model';

@Entity()
export class Note {
  @PrimaryKey({autoincrement: true})
  id!: number;

  @Property()
  title!: string;

  @Property()
  content!: string;

  @ManyToOne(() => User)
  user!: User;
}