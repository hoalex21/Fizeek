-- CreateTable
CREATE TABLE "Height" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "centimeters" DECIMAL,
    CONSTRAINT "Height_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Weight" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "kilograms" DECIMAL,
    CONSTRAINT "Weight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Height_userId_key" ON "Height"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Weight_userId_key" ON "Weight"("userId");
