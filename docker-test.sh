#!/bin/sh

docker-compose up -d --force-recreate --build\
&& docker exec cook-unity-api npx prisma migrate dev --name init\
&& docker exec cook-unity-api npm run database:reset\
&& docker exec cook-unity-api npm run jest\
&& docker exec cook-unity-api npm run database:reset\
&& docker-compose down