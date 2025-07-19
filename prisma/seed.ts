import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Laptop X',
        description: 'Portátil con 16GB RAM',
        price: 1200.99,
        stock: 5,
      },
      {
        name: 'Auriculares Z',
        description: 'Bluetooth y cancelación de ruido',
        price: 89.99,
        stock: 10,
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
