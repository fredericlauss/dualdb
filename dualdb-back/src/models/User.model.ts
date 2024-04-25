import { Entity, PrimaryKey, Property, OneToMany, Collection, Unique } from '@mikro-orm/postgresql';
import { Note } from './Note.model';

@Entity()
export class UserAccount {
  @PrimaryKey({autoincrement: true})
  id!: number;

  @Unique()
  @Property()
  username!: string;

  @Property()
  password!: string;

  @OneToMany(() => Note, note => note.UserAccount)
  notes = new Collection<Note>(this);
}