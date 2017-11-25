# giropops-monitoring-BETA
Full stack tools for monitoring containers and other stuff. ;)
- Netdata
- Prometheus
- AlertManager
- Slack
- Docker
- cAdvisor
- Grafana
- Node_Exporter

# Howto
First of all, clone the giropopos-monitoring repo:
```
# git clone git@github.com:badtuxx/giropops-monitoring.git
```

Change the information about your Slack account and what room you will send the alerts:
```
# vim conf/alertmanager/config.yml

route:
    receiver: 'slack'

receivers:
    - name: 'slack'
      slack_configs:
          - send_resolved: true
            username: 'YOUR USERNAME'
            channel: '#YOURCHANNEL'
            api_url: 'INCOMING WEBHOOK'
```

Install Netdata:
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

Execute deploy to create the stack of giropops-monitoring:
```
# docker stack deploy -c docker-compose.yml giropops
```

Verify if services are ok:
```
# docker service ls

ID                  NAME                     MODE                REPLICAS            IMAGE                                   PORTS
xypw5n1nri9a        giropops_alertmanager    replicated          1/1                 linuxtips/alertmanager_alpine:dev       *:9093->9093/tcp
udd7ulvf7dww        giropops_cadvisor        global              1/1                 google/cadvisor:latest                  *:8080->8080/tcp
vpo9j4pdnj36        giropops_grafana         replicated          1/1                 grafana/grafana:latest                  *:3000->3000/tcp
0sgbwny6gpbl        giropops_node-exporter   global              1/1                 linuxtips/node-exporter_alpine:latest   *:9100->9100/tcp
vpqw3md2lcbr        giropops_prometheus      replicated          1/1                 linuxtips/prometheus_alpine:dev         *:9090->9090/tcp

```

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

Get fun, access the dashboards! ;)

```

To access Netdata interface on browser:
```
http://YOUR_IP:19999
```

To access Prometheus Node_exporter metrics on browser:
```
http://YOUR_IP:9100/metrics
```

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
