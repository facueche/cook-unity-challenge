# Cook Unity Challenge

You can see the challenge [here](docs/Challenge.pdf)

## Dependencies

```
- NodeJS >= 16
- NPM >= 8
```

## Prepare app

```bash
# create environment variables
cp env.example .env
```

This projects uses Postgres as database engine and [Prisma](https://www.prisma.io/docs/concepts/database-connectors/postgresql) as ORM, so you have to define the database url on the .env file
```bash
# example
DATABASE_URL=postgresql://postgres:postgres@0.0.0.0:5432/cookunitydb
```

## Running the app
### Natively

```bash
# install dependencies
npm install

# run in dev mode on port 3000
npm run dev
```

### With Docker

Rise up the app and Postgres
```bash
docker-compose up
```

## Testing

```bash
# create test environment variable files like previous step
cp env.example .env.test
```
### Natively

In this case, you have to have Postgres installed on your PC
```bash
npm test
```

### With Docker
```bash
# set Postgres URL on .env.test file
DATABASE_URL=postgresql://postgres:postgres@cook-unity-db-test:5432/cookunitydbtest
```

```bash
# rise the containers
docker-compose --env-file .env.test up

# run the test
docker exec cook-unity-api npm test
```

## Documentation

* [API Docs](docs/api_docs.md)
