prd-start:
	docker compose -f docker-compose.prod.yml up -d

prd-stop:
	docker compose -f docker-compose.prod.yml down -v

prd-build:
	docker compose -f docker-compose.prod.yml build

prd-deploy: prd-build prd-stop prd-start