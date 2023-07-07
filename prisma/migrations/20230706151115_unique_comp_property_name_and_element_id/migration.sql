/*
  Warnings:

  - A unique constraint covering the columns `[name,elementId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Property_name_elementId_key" ON "Property"("name", "elementId");
