-- CreateTable
CREATE TABLE "User" (
    "user_id" UUID NOT NULL,
    "goal" VARCHAR(20) NOT NULL,
    "experience" VARCHAR(20) NOT NULL,
    "day_per_week" INTEGER NOT NULL,
    "session_length" INTEGER NOT NULL,
    "equipment" VARCHAR(20) NOT NULL,
    "injuries" TEXT,
    "preferred_split" VARCHAR(20) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);
