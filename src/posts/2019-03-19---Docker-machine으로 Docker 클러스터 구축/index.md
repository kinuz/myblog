---
title: Docker-machine으로 Docker 클러스터 구축
date: 2019-03-19 23:01:57
layout: post
draft: false
category: vagrant
tags:
  - docker
  - provisioning
description: Provisioning Docker machines
related:
  - https://www.virtualbox.org/
---

```
$ docker-machine create --driver virtualbox myvm1
$ docker-machine create --driver virtualbox myvm2
$ docker-machine create --driver virtualbox myvm3

$ docker-machine ls

$ eval "$(docker-machine env myvm1)"
$ env | grep DOCKER
$ docker swarm init --advertise-addr 192.168.99.107

$ eval "$(docker-machine env myvm1)"
$ env | grep DOCKER
$ docker docker swarm join --token {token from master node}

$ eval "$(docker-machine env myvm1)"
$ env | grep DOCKER
$ docker docker swarm join --token {token from master node}

$ eval "$(docker-machine env myvm1)"
$ docker node ls

$ eval "$(docker-machine env -u)" 
```

[![asciicast](https://asciinema.org/a/zFdnQo7fGRtvVYMUWm60dRBsO.svg)](https://asciinema.org/a/zFdnQo7fGRtvVYMUWm60dRBsO)