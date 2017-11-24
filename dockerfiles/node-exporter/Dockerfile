FROM golang AS building
LABEL maintainer="jeferson@linuxtips.com.br"
LABEL version="1.0"

ENV exporter_version node_exporter-0.15.1.linux-amd64

RUN curl -LO https://github.com/prometheus/node_exporter/releases/download/v0.15.1/${exporter_version}.tar.gz \
    && tar -xvzf ${exporter_version}.tar.gz  \
    && cp ${exporter_version}/node_exporter /tmp/

FROM alpine

COPY --from=building /tmp/node_exporter /usr/local/bin/

ENTRYPOINT node_exporter --path.procfs=/usr/proc --path.sysfs=/usr/sys

EXPOSE 9100
