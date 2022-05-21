-- AlterTable
ALTER TABLE "pokemons" ALTER COLUMN "imageURL" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0;
