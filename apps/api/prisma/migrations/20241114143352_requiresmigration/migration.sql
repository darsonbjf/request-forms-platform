-- AddForeignKey
ALTER TABLE "requisicoes" ADD CONSTRAINT "requisicoes_anexo2ID_fkey" FOREIGN KEY ("anexo2ID") REFERENCES "Anexo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
