import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start manual migration...');

    try {
        // 1. Create table
        console.log('Creating project_case_studies table...');
        await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS \`project_case_studies\` (
        \`id\` INTEGER NOT NULL AUTO_INCREMENT,
        \`project_id\` INTEGER NOT NULL,
        \`problem\` LONGTEXT NULL,
        \`solution\` LONGTEXT NULL,
        \`result\` LONGTEXT NULL,
        \`created_at\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        \`updated_at\` DATETIME(3) NOT NULL,
    
        UNIQUE INDEX \`project_case_studies_project_id_key\`(\`project_id\`),
        PRIMARY KEY (\`id\`)
      ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    `);

        // 2. Migrate data
        console.log('Migrating data from projects to project_case_studies...');
        await prisma.$executeRawUnsafe(`
      INSERT INTO \`project_case_studies\` (project_id, problem, solution, result, updated_at)
      SELECT id, problem, solution, result, updated_at FROM \`projects\` 
      WHERE (problem IS NOT NULL OR solution IS NOT NULL OR result IS NOT NULL)
      AND id NOT IN (SELECT project_id FROM \`project_case_studies\`);
    `);

        // 3. Add Foreign Key (Optional, as Prisma db push will enforce it, but good to have)
        // We skip this as db push might complain if it already exists or if naming differs. We let db push handle constraints if possible, 
        // BUT db push fails if table structure assumes FK.
        // Let's add it to be safe, if it fails we catch it.
        try {
            await prisma.$executeRawUnsafe(`
          ALTER TABLE \`project_case_studies\` ADD CONSTRAINT \`project_case_studies_project_id_fkey\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE;
        `);
        } catch (e) {
            console.log('FK might already exist or failed:', e.message);
        }

        console.log('Migration completed successfully.');
    } catch (e) {
        console.error('Migration failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
