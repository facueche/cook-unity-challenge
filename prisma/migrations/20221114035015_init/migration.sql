-- CreateTable
CREATE TABLE "Users" (
    "uuid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Meals" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "chefId" TEXT NOT NULL,

    CONSTRAINT "Meals_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Rates" (
    "uuid" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "customerId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,

    CONSTRAINT "Rates_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Meals" ADD CONSTRAINT "Meals_chefId_fkey" FOREIGN KEY ("chefId") REFERENCES "Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rates" ADD CONSTRAINT "Rates_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rates" ADD CONSTRAINT "Rates_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meals"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
