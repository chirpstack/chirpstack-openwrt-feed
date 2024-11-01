#!/bin/sh

echo "SQLite database"
service chirpstack stop
cp /srv/chirpstack/chirpstack.sqlite /srv/backup/chirpstack.sqlite
service chirpstack start

echo "Backup Redis database"
service redis stop
cp /srv/redis/dump.rdb /srv/backup/chirpstack.redis
service redis start
