#!/bin/sh

echo "Backup PostgreSQL database"
mkdir -p /srv/backup
chmod 777 /srv/backup
sudo -u postgres /usr/bin/pg_dump -h localhost -d chirpstack -F c -f /srv/backup/chirpstack.pg

echo "Backup Redis database"
service redis stop
cp /srv/redis/dump.rdb /srv/backup/chirpstack.redis
service redis start
