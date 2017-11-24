FROM alpine
LABEL maintainer="jeferson@linuxtips.com.br"
LABEL version="1.0"

RUN adduser -s /bin/false -D -H prometheus \
    && adduser -s /bin/false -D -H node_exporter \
    && apk update \
    && apk --no-cache add curl \
    && curl -LO https://github.com/prometheus/prometheus/releases/download/v2.0.0/prometheus-2.0.0.linux-amd64.tar.gz \
    && tar -xvzf prometheus-2.0.0.linux-amd64.tar.gz \
    && mkdir -p /etc/prometheus /var/lib/prometheus \
    && cp prometheus-2.0.0.linux-amd64/promtool /usr/local/bin/ \
    && cp prometheus-2.0.0.linux-amd64/prometheus /usr/local/bin/ \
    && cp -R prometheus-2.0.0.linux-amd64/console_libraries/ /etc/prometheus/ \
    && cp -R prometheus-2.0.0.linux-amd64/consoles/ /etc/prometheus/ \
    && rm -rf prometheus-2.0.0.linux-amd64* \
    && chown prometheus:prometheus /usr/local/bin/prometheus \
    && chown prometheus:prometheus /usr/local/bin/promtool \
    && chown -R prometheus:prometheus /etc/prometheus \
    && chown prometheus:prometheus /var/lib/prometheus \
    && apk del curl

VOLUME /etc/prometheus

VOLUME /var/lib/prometheus

ADD conf/prometheus.yml /etc/prometheus/
ADD conf/alert.rules /etc/prometheus/

USER prometheus

ENTRYPOINT /usr/local/bin/prometheus \ 
            --config.file /etc/prometheus/prometheus.yml \ 
            --storage.tsdb.path /var/lib/prometheus/ \
            --web.console.libraries=/usr/share/prometheus/console_libraries \
            --web.console.templates=/usr/share/prometheus/consoles

EXPOSE 9090
