import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelamodelos.ts1783951937235 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS marcas(
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                nome VARCHAR(150) NOT NULL UNIQUE,
                marca_id UUID NOT NULL,
                CONSTRANINT fk_marca_modelo FOREIGN KEY (marac_id) REFERENCES
                    marcas(id) ON UPDATE NO ACTION OON DELETE CASCADE
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
