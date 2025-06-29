-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "assignToUser" TEXT;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assignToUser_fkey" FOREIGN KEY ("assignToUser") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
