
from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
CREATE TABLE IF NOT EXISTS "recorded_programs" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "recorded_video_id" INT NOT NULL REFERENCES "recorded_videos" ("id") ON DELETE CASCADE,
    "channel_id" VARCHAR(255) REFERENCES "channels" ("id") ON DELETE CASCADE,
    "network_id" INT,
    "service_id" INT,
    "event_id" INT,
    "series_id" INT REFERENCES "series" ("id") ON DELETE CASCADE,
    "series_broadcast_period_id" INT REFERENCES "series_broadcast_periods" ("id") ON DELETE CASCADE,
    "title" TEXT NOT NULL,
    "episode_number" VARCHAR(255),
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "detail" JSON NOT NULL,
    "start_time" TIMESTAMP NOT NULL,
    "end_time" TIMESTAMP NOT NULL,
    "duration" REAL NOT NULL,
    "is_free" INT NOT NULL,
    "genres" JSON NOT NULL,
    "primary_audio_type" TEXT NOT NULL,
    "primary_audio_language" TEXT NOT NULL,
    "secondary_audio_type" TEXT,
    "secondary_audio_language" TEXT
);
CREATE TABLE IF NOT EXISTS "recorded_videos" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "file_path" TEXT NOT NULL,
    "file_hash" TEXT NOT NULL,
    "recording_start_time" TIMESTAMP,
    "recording_end_time" TIMESTAMP,
    "duration" REAL NOT NULL,
    "container_format" VARCHAR(255) NOT NULL,
    "video_codec" VARCHAR(255) NOT NULL,
    "video_resolution_width" INT NOT NULL,
    "video_resolution_height" INT NOT NULL,
    "primary_audio_codec" VARCHAR(255) NOT NULL,
    "primary_audio_channel" VARCHAR(255) NOT NULL,
    "primary_audio_sampling_rate" INT NOT NULL,
    "secondary_audio_codec" VARCHAR(255),
    "secondary_audio_channel" VARCHAR(255),
    "secondary_audio_sampling_rate" INT,
    "cm_intervals" JSON NOT NULL
);
CREATE TABLE IF NOT EXISTS "series" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "genres" JSON NOT NULL,
    "updated_at" TIMESTAMP NOT NULL  DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "series_broadcast_periods" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "series_id" INT NOT NULL REFERENCES "series" ("id") ON DELETE CASCADE,
    "channel_id" VARCHAR(255) NOT NULL REFERENCES "channels" ("id") ON DELETE CASCADE,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL
);
"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
DROP TABLE IF EXISTS "recorded_programs";
DROP TABLE IF EXISTS "recorded_videos";
DROP TABLE IF EXISTS "series";
DROP TABLE IF EXISTS "series_broadcast_periods";
"""
