import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersConfigurationTables1774325368148 implements MigrationInterface {
    name = 'CreateUsersConfigurationTables1774325368148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userRFC" character varying NOT NULL, "empNumber" character varying NOT NULL, "name" character varying NOT NULL, "firstLastName" character varying NOT NULL, "secondLastName" character varying NOT NULL, "email" character varying NOT NULL, "hireDate" TIMESTAMP NOT NULL, "termDate" TIMESTAMP, "status" character varying NOT NULL, "shiftType" character varying NOT NULL, "jobRole" character varying NOT NULL, "firstTimeLoad" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, "empPriv" character varying NOT NULL DEFAULT 'usuario', "vacationBalance" integer NOT NULL DEFAULT '0', "balanceDateTime" TIMESTAMP, CONSTRAINT "UQ_8be01cc2a2dd7cdbb6fb1799980" UNIQUE ("userRFC"), CONSTRAINT "UQ_2b4c50bca5f8f00c04ad6d84138" UNIQUE ("empNumber"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "configuration" ("config_id" integer NOT NULL, "RH1_name" character varying, "RH1_email" character varying, "RH2_name" character varying, "RH2_email" character varying, "RH3_name" character varying, "RH3_email" character varying, "RH4_name" character varying, "RH4_email" character varying, "RH5_name" character varying, "RH5_email" character varying, "RH6_name" character varying, "RH6_email" character varying, "nameCo" character varying DEFAULT '', "rfcCo" character varying DEFAULT '', "urlCo" character varying DEFAULT '', "portNumber" character varying DEFAULT '', "token" character varying DEFAULT '', CONSTRAINT "UQ_1bfecb9c4cc4746e6dd2660dcdf" UNIQUE ("RH1_name"), CONSTRAINT "UQ_55976348608c82717bd6b3ff55a" UNIQUE ("RH1_email"), CONSTRAINT "UQ_7a4adf8cc2623fa4a5a14e57e12" UNIQUE ("RH2_name"), CONSTRAINT "UQ_8d49fe0e16370d4e7ce531f576a" UNIQUE ("RH2_email"), CONSTRAINT "UQ_47af08902e6a8a77b13ac2a9cd9" UNIQUE ("RH3_name"), CONSTRAINT "UQ_0f5b6159e4b6b42685fa09eba57" UNIQUE ("RH3_email"), CONSTRAINT "UQ_1d1cd343878a941ef2246961e56" UNIQUE ("RH4_name"), CONSTRAINT "UQ_a8e3ecacd670195d432c82b8426" UNIQUE ("RH4_email"), CONSTRAINT "UQ_e3b0a015c9f16d8b28e23613ff1" UNIQUE ("RH5_name"), CONSTRAINT "UQ_ea54ac612c6afc50a1c8ccbff63" UNIQUE ("RH5_email"), CONSTRAINT "UQ_a58b91ae7ef2dbb06954abe2f34" UNIQUE ("RH6_name"), CONSTRAINT "UQ_9aeea13ce70ba7c85f87c54b925" UNIQUE ("RH6_email"), CONSTRAINT "PK_bfecc86452256847d8bbb4c1b3c" PRIMARY KEY ("config_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "configuration"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
