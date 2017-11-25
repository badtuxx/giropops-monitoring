# Node_Exporter on Alpine 

## To run this image, execute:
```
# docker container run -d --name node-exporter -p 9100:9100 -v /proc:/usr/proc -v /sys:/usr/sys -v /:/rootfs linuxtips/node-exporter_alpine
```

Open http://your_ip:9100/metrics to access the metrics collected by Node-Exporter .

## To view the logs, execute:
```
# docker container logs -f <container_id>
```

## To create a swarm service, execute:
```
# docker service create --name node-exporter -p 9100:9100 \
   --mount type=bind,src=/proc,dst=/usr/proc \
   --mount type=bind,src=/sys,dst=/usr/sys \
   --mount type=bind,src=/,dst=/rootfs \
   linuxtips/node-exporter_alpine
```
