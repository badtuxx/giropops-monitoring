.PHONY init start

init:
	docker swarm init

start:
	docker stack deploy -c docker-compose.yml giropops

service:
	docker service ls
