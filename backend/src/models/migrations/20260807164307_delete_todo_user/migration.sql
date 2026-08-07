/*
  Warnings:

  - You are about to drop the column `todoUserId` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the `TodoUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_todoUserId_fkey";

-- DropForeignKey
ALTER TABLE "TodoUser" DROP CONSTRAINT "TodoUser_userId_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "todoUserId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "TodoUser";

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
