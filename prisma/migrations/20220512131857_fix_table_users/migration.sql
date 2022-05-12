/*
  Warnings:

  - You are about to drop the column `imagemURL` on the `users` table. All the data in the column will be lost.
  - Added the required column `imageURL` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "imagemURL",
ADD COLUMN     "imageURL" TEXT NOT NULL;
