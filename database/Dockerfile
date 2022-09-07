FROM mysql:5.7

EXPOSE 3306

COPY ./init.sql /docker-entrypoint-initdb.d/init.sql
COPY ./data.sql /docker-entrypoint-initdb.d/zdata.sql
