.DEFAULT_GOAL := dev

.PHONY: dev

dev:
	npm install
	npm run dev

install:
	npm install express mssql dotenv
	npm install --save-dev typescript @types/node @types/express
	npm install --save-dev @types/mssql
	npm install --save-dev ts-node typescript

test-db:
	npx ts-node src/test-db.ts
