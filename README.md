# giropops-monitoring
Full stack tools for monitoring containers and other stuff. ;)
- Netdata
- Prometheus
- AlertManager
- Rocket.Chat
- Docker
- cAdvisor
- Grafana
- Node_Exporter


# Install Demonstration

[![demo](https://asciinema.org/a/P1LJ9GYTVamd9AwjJmVWLErqD.png)](https://asciinema.org/a/P1LJ9GYTVamd9AwjJmVWLErqD?speed=2&autoplay=1)


# Howto
First of all, clone the giropopos-monitoring repo:
```
# git clone https://github.com/badtuxx/giropops-monitoring.git
```

## Install Docker and create Swarm cluster
```
# curl -fsSL https://get.docker.com | sh
# docker swarm init
```

## Install Netdata:
```
# bash <(curl -Ss https://my-netdata.io/kickstart.sh)
```

Setting Netdata Exporter configuration in Prometheus:
```
# vim conf/prometheus/prometheus.yml
...
- job_name: 'netdata'
    metrics_path: '/api/v1/allmetrics'
    params:
      format: [prometheus]
    honor_labels: true
    scrape_interval: 5s
    static_configs:
         - targets: ['YOUR_IP:19999']
```


## Get Rocket.Chat Incoming WebHook 

1) Deploy giropops stack, only to get the WebHook

```
# docker stack deploy -c docker-compose.yml giropops
```

2) Access YOUR_IP:3080 and create your account

3) Login with your user and go to: Administration => Integrations => New Integration => Incoming WebHook

4) Set "Enabled" and "Script Enabled" to "True"

5) Set all channels, icons, etc. as you need

6) Paste contents of [rocketchat/incoming-webhook.js](conf/rocketchat/incoming-webhook.js) into Script field.

7) Create Integration. You will see some values appear. Copy WebHook URL and proceed to "Integration between Rocket.Chat and AlertManager" section.

8) Remove giropops stack
```
# docker stack rm giropops
```
[Rocket.Chat Docs](https://rocket.chat/docs/administrator-guides/integrations/)


## Integration between Rocket.Chat and AlertManager

```
# vim conf/alertmanager/config.yml

route:
    repeat_interval: 30m
    group_interval: 30m
    receiver: 'rocketchat'

receivers:
    - name: 'rocketchat'
      webhook_configs:
          - send_resolved: false
            # copy below the WEBHOOK that you create before
            url: '${WEBHOOK_URL}'
```


## Deploy Stack with Docker Swarm

Execute deploy to create the stack of giropops-monitoring:
```
# docker stack deploy -c docker-compose.yml giropops

Creating network giropops_backend
Creating network giropops_frontend
Creating network giropops_default
Creating service giropops_prometheus
Creating service giropops_node-exporter
Creating service giropops_alertmanager
Creating service giropops_cadvisor
Creating service giropops_grafana
Creating service giropops_rocketchat
Creating service giropops_mongo
Creating service giropops_mongo-init-replica
```

Verify if services are ok:
```
# docker service ls

ID              NAME                          MODE         REPLICAS  IMAGE                                  PORTS
2j5vievon95j    giropops_alertmanager         replicated   1/1       linuxtips/alertmanager_alpine:latest   *:9093->9093/tcp
y1kinszpqzpg    giropops_cadvisor             global       1/1       google/cadvisor:latest                 *:8080->8080/tcp
jol20u8pahlp    giropops_grafana              replicated   1/1       grafana/grafana:latest                 *:3000->3000/tcp
t3635s4xh5cp    giropops_mongo                replicated   1/1       mongo:3.2
t8vnb7xuyfa8    giropops_mongo-init-replica   replicated   0/1       mongo:3.2
usr0jy4jquns    giropops_node-exporter        global       1/1       linuxtips/node-exporter_alpine:latest  *:9100->9100/tcp
zc3qza0bxys7    giropops_prometheus           replicated   1/1       linuxtips/prometheus_alpine:latest     *:9090->9090/tcp
7bgnm0poxbwj    giropops_rocketchat           replicated   1/1       rocketchat/rocket.chat:latest          *:3080->3080/tcp
```
PS: Don't worry why giropops_mongo-init-replica service is down, it only executes one time to initialize the replica set. It will not stay running.


## Access Services in Browser

To access Prometheus interface on browser:
```
http://YOUR_IP:9090
```

To access AlertManager interface on browser:
```
http://YOUR_IP:9093
```

To access Grafana interface on browser:
```
http://YOUR_IP:3000
user: admin
passwd: giropops

To add plugs edit file giropops-monitoring/grafana.config
GF_INSTALL_PLUGINS=plug1,plug2
Current plugs grafana-clock-panel,grafana-piechart-panel,camptocamp-prometheus-alertmanager-datasource,vonage-status-panel
```
Have fun, access the dashboards! ;)

To access Netdata interface on browser:
```
http://YOUR_IP:19999
```

To access Prometheus Node_exporter metrics on browser:
```
http://YOUR_IP:9100/metrics
```

To access RocketChat interface on browser:  
```
http://YOUR_IP:3080
> First to register becomes admin
```
Remember that RocketChat endpoints and payloads are identical to Slack's, so if you wanna set Grafana alerts, just select a slack alert and give it a RocketChat incoming webhook URL, with no script needed.


Test if your alerts are ok:
```
# docker service rm giropops_node-exporter

Wait some seconds and you will see the integration works fine! Prometheus alerting the AlertManager that alert the Slack that shows it to you! It's so easy and that simple! :D
```


Of course, create new alerts on Prometheus:
```
# vim conf/prometheus/alert.rules
```


# Ahhhh, Help us to improve it!
# Thanks! #VAIIII
