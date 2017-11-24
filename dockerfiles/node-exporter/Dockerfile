FROM golang AS building

RUN go get github.com/prometheus/node_exporter \
    && cd /go/src/github.com/prometheus/node_exporter/ \
    && make \
    && cp node_exporter /tmp/

FROM alpine

COPY --from=building /tmp/node_exporter /usr/local/bin/

ENTRYPOINT node_exporter --path.procfs=/usr/proc --path.sysfs=/usr/sys

EXPOSE 9100
