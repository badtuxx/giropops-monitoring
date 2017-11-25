FROM golang AS building

LABEL maintainer="jeferson@linuxtips.com.br"
LABEL version="1.0"

ENV exporter_version 0.15.1

RUN curl -LO https://github.com/prometheus/node_exporter/releases/download/v${exporter_version}/node_exporter-${exporter_version}.linux-amd64.tar.gz \
    && tar -xvzf node_exporter-${exporter_version}.linux-amd64.tar.gz  \
    && cp node_exporter-${exporter_version}.linux-amd64/node_exporter /tmp/

FROM alpine

COPY --from=building /tmp/node_exporter /usr/local/bin/

ENTRYPOINT node_exporter --path.procfs=/usr/proc --path.sysfs=/usr/sys \
            --collector.filesystem.ignored-mount-points="^(/rootfs|/host|)/(sys|proc|dev|host|etc)($$|/)" \ 
            --collector.filesystem.ignored-fs-types="^(sys|proc|auto|cgroup|devpts|ns|au|fuse\.lxc|mqueue)(fs|)$$"

EXPOSE 9100

