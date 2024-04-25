import { Migration } from '@mikro-orm/migrations';

export class Migration20240425101259 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "user" varchar(255) not null, "password" varchar(255) not null);');

    this.addSql('create table "note" ("id" serial primary key, "title" varchar(255) not null, "content" varchar(255) not null, "user_id" int not null);');

    this.addSql('alter table "note" add constraint "note_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

}
