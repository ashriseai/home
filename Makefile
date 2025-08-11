docker-build:
	docker build -t ashrise-home .

docker-run:
	docker run --rm -it -p 3000:3000 ashrise-home

docker-run-d:
	docker run -d --rm -it -p 3000:3000 ashrise-home