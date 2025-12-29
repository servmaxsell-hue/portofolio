
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "mysql://u262725529_portfolio:Paul%400815@srv2024.hstgr.io:3306/u262725529_portfolio"
        }
    }
});

async function main() {
    const hashedPassword = await bcrypt.hash('Paul@0815', 10);

    const user = await prisma.user.upsert({
        where: { email: 'contact@paulmaximedossou.com' },
        update: {
            password: hashedPassword,
            name: 'Maxime Dossou'
        },
        create: {
            email: 'contact@paulmaximedossou.com',
            password: hashedPassword,
            name: 'Maxime Dossou'
        },
    });

    console.log('✅ Compte Admin Hostinger créé avec succès :', user.email);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
