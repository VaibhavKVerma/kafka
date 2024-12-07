# Used docker image of kafka 

```
docker run -d --name zookeeper \
    -p 2181:2181 \
    -e ALLOW_ANONYMOUS_LOGIN=yes \
    bitnami/zookeeper:latest
docker run -d --name kafka \
    --link zookeeper:zookeeper \
    -p 9092:9092 \
    -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
    -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
    -e KAFKA_BROKER_ID=1 \
    bitnami/kafka:latest
```
