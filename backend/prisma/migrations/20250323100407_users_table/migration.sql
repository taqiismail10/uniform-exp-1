-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullname" VARCHAR(255) NOT NULL,
    "regNumber" INTEGER NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_regNumber_key" ON "User"("regNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
