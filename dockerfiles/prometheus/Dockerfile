FROM alpine

LABEL maintainer="jeferson@linuxtips.com.br"
LABEL version="1.0"

ARG PROMETHEUS_VERSION=2.0.0

RUN set -xe && \
    adduser -s /bin/false -D -H prometheus && \
    adduser -s /bin/false -D -H node_exporter && \
    wget https://github.com/prometheus/prometheus/releases/download/v${PROMETHEUS_VERSION}/prometheus-${PROMETHEUS_VERSION}.linux-amd64.tar.gz && \
    wget https://github.com/prometheus/prometheus/releases/download/v${PROMETHEUS_VERSION}/sha256sums.txt && \
    grep prometheus-${PROMETHEUS_VERSION}.linux-amd64.tar.gz sha256sums.txt | sha256sum -c -- && \
    tar -xvzf prometheus-${PROMETHEUS_VERSION}.linux-amd64.tar.gz && \
    mkdir -p /etc/prometheus /var/lib/prometheus && \
    cp prometheus-${PROMETHEUS_VERSION}.linux-amd64/promtool /usr/local/bin/ && \
    cp prometheus-${PROMETHEUS_VERSION}.linux-amd64/prometheus /usr/local/bin/ && \
    cp -R prometheus-${PROMETHEUS_VERSION}.linux-amd64/console_libraries/ /etc/prometheus/ && \
    cp -R prometheus-${PROMETHEUS_VERSION}.linux-amd64/consoles/ /etc/prometheus/ && \
    rm -rf prometheus-${PROMETHEUS_VERSION}.linux-amd64* sha256sums.txt && \
    chown prometheus:prometheus /usr/local/bin/prometheus && \
    chown prometheus:prometheus /usr/local/bin/promtool && \
    chown -R prometheus:prometheus /etc/prometheus && \
    chown prometheus:prometheus /var/lib/prometheus

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
