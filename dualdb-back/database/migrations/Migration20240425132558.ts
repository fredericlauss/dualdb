import { Migration } from '@mikro-orm/migrations';

export class Migration20240425132558 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "note" drop constraint "note_user_id_foreign";');

    this.addSql('create table "user_account" ("id" serial primary key, "username" varchar(255) not null, "password" varchar(255) not null);');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('alter table "note" rename column "user_id" to "user_account_id";');
    this.addSql('alter table "note" add constraint "note_user_account_id_foreign" foreign key ("user_account_id") references "user_account" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "note" drop constraint "note_user_account_id_foreign";');

    this.addSql('create table "user" ("id" serial primary key, "username" varchar(255) not null, "password" varchar(255) not null);');

    this.addSql('drop table if exists "user_account" cascade;');

    this.addSql('alter table "note" rename column "user_account_id" to "user_id";');
    this.addSql('alter table "note" add constraint "note_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

}
