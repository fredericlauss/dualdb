import { Migration } from '@mikro-orm/migrations';

export class Migration20240425142911 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user_account" add constraint "user_account_username_unique" unique ("username");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_account" drop constraint "user_account_username_unique";');
  }

}
