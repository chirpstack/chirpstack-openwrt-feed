#!/bin/sh

echo "Restore PostgreSQL database"
sudo -u postgres /usr/bin/pg_restore -h localhost -d chirpstack /srv/backup/chirpstack.pg
service chirpstack restart

echo "Restore Redis database"
service redis stop
cp /srv/backup/chirpstack.redis /srv/redis/dump.rdb
service redis start
