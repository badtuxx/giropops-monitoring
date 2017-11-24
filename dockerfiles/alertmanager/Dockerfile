FROM golang AS building

WORKDIR /go/src/github.com/prometheus

RUN git clone https://github.com/prometheus/alertmanager.git \
    && cd alertmanager \
    && make build \
    && cp alertmanager /tmp


FROM alpine

COPY --from=building /tmp/alertmanager /usr/local/bin/

VOLUME /alertmanager
VOLUME /etc/alertmanager
ADD conf/config.yml /etc/alertmanager/
ENTRYPOINT alertmanager -config.file=/etc/alertmanager/config.yml -storage.path=/alertmanager
EXPOSE 9093


