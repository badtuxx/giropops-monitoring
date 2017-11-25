# Prometheus-Alpine

## To run this image, execute:
```
# docker container run -d --name prometheus -p 9090:9090 linuxtips/prometheus_alpine
```

Open http://your_ip:9090 to access the interface of Prometheus.

## To view the logs, execute:
```
# docker container logs -f <container_id>
```

## To create a swarm service, execute:
```
# docker service create --name prometheus -p 9090:9090 linuxtips/prometheus_alpine
```
