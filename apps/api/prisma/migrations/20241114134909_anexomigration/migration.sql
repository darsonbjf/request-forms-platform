-- AlterTable
ALTER TABLE "Anexo" ADD COLUMN     "anexo2" TEXT,
ADD COLUMN     "filename2" VARCHAR(500),
ADD COLUMN     "mimetype2" VARCHAR(500),
ADD COLUMN     "size2" INTEGER;

-- AlterTable
ALTER TABLE "requisicoes" ADD COLUMN     "anexo2ID" INTEGER;
