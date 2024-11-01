#!/bin/sh

echo "Restore SQLite database"
service chirpstack stop
cp /srv/backup/chirpstack.sqlite /srv/chirpstack/chirpstack.sqlite
service chirpstack start

echo "Restore Redis database"
service redis stop
cp /srv/backup/chirpstack.redis /srv/redis/dump.rdb
service redis start
