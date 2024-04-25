import { Migration } from '@mikro-orm/migrations';

export class Migration20240425123424 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" rename column "user" to "username";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" rename column "username" to "user";');
  }

}
