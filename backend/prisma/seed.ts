import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash('Paul@0815', 10);

    const user = await prisma.user.upsert({
        where: { email: 'dossoumaxime888@gmail.com' },
        update: {
            password: password,
        },
        create: {
            email: 'dossoumaxime888@gmail.com',
            name: 'Paul Maxime',
            password: password,
        },
    });

    console.log({ user });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
