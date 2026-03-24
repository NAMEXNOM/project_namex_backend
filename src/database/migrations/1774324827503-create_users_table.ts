import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1774324827503 implements MigrationInterface {
    name = 'CreateUsersTable1774324827503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userRFC" character varying NOT NULL, "empNumber" character varying NOT NULL, "name" character varying NOT NULL, "firstLastName" character varying NOT NULL, "secondLastName" character varying NOT NULL, "email" character varying NOT NULL, "hireDate" TIMESTAMP NOT NULL, "termDate" TIMESTAMP, "status" character varying NOT NULL, "shiftType" character varying NOT NULL, "jobRole" character varying NOT NULL, "firstTimeLoad" boolean NOT NULL DEFAULT true, "password" character varying NOT NULL, "empPriv" character varying NOT NULL DEFAULT 'usuario', "vacationBalance" integer NOT NULL DEFAULT '0', "balanceDateTime" TIMESTAMP, CONSTRAINT "UQ_8be01cc2a2dd7cdbb6fb1799980" UNIQUE ("userRFC"), CONSTRAINT "UQ_2b4c50bca5f8f00c04ad6d84138" UNIQUE ("empNumber"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
