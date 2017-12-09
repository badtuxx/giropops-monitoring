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
# git clone git@github.com:badtuxx/giropops-monitoring.git
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


## Rocket.Chat

1) Login as admin user and go to: Administration => Integrations => New Integration => Incoming WebHook

2) Set "Enabled" and "Script Enabled" to "True"

3) Set all channel, icons, etc. as you need

3) Paste contents of [rocketchat/incoming-webhook.js](rocketchat/incoming-webhook.js) into Script field.

4) Create Integration. You;ll see some values apper. Copy WebHook URL and proceed to Alertmanager.

[Rocket.Chat Docs](https://rocket.chat/docs/administrator-guides/integrations/)



## Deploy Stack with Docker Swarm

First, run Docker Swarm:
```
$ docker swarm init # You can use make init too.
```

Execute deploy to create the stack of giropops-monitoring:
```
$ docker stack deploy -c docker-compose.yml giropops # You can use make start too.
```

Verify if services are ok:
```
$ docker service ls # You can use make service too.

ID                  NAME                     MODE                REPLICAS            IMAGE                                   PORTS
xypw5n1nri9a        giropops_alertmanager    replicated          1/1                 linuxtips/alertmanager_alpine:dev       *:9093->9093/tcp
udd7ulvf7dww        giropops_cadvisor        global              1/1                 google/cadvisor:latest                  *:8080->8080/tcp
vpo9j4pdnj36        giropops_grafana         replicated          1/1                 grafana/grafana:latest                  *:3000->3000/tcp
0sgbwny6gpbl        giropops_node-exporter   global              1/1                 linuxtips/node-exporter_alpine:latest   *:9100->9100/tcp
vpqw3md2lcbr        giropops_prometheus      replicated          1/1                 linuxtips/prometheus_alpine:dev         *:9090->9090/tcp

```

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

Get fun, access the dashboards! ;)

```
Get fun, access the dashboards! ;)

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
