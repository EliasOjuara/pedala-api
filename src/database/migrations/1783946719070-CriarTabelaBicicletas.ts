import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaBicicletas1783946719070 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS marcas(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                nome VARCHAR(150) NOT NULL UNIQUE,
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
