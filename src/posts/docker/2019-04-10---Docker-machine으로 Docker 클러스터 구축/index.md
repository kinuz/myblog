---
title: Docker-machine으로 Docker 클러스터 구축
date: 2019-04-10 23:01:57
layout: post
draft: false
path: /posts/Docker-machine으로 Docker 클러스터 구축/
category: vagrant
tags:
  - docker
  - provisioning
description: Provisioning Docker machines
---

- eval "$(docker-machine env myvm1)"
- env | grep DOCKER
- eval "$(docker-machine env -u)"

```
$ docker-machine create --driver virtualbox myvm1
$ docker-machine create --driver virtualbox myvm2
$ docker-machine create --driver virtualbox myvm3


$ eval "$(docker-machine env myvm1)"
$ docker swarm init --advertise-addr 192.168.99.107

$ eval "$(docker-machine env myvm1)"
$ docker docker swarm join --token {token from master node}

$ eval "$(docker-machine env myvm1)"
$ docker docker swarm join --token {token from master node}

$ eval "$(docker-machine env myvm1)"
$ docker node ls 
```
