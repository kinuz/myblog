---
title: Reset ufw
date: 2019-04-09 20:13:31
layout: post
draft: false
category: ubuntu
tags:
  - ubuntu
  - ufw
description: 
---


```
$ iptables -F 
$ iptables -P INPUT ACCEPT
$ iptables -P FORWARD ACCEPT
$ iptables -P OUTPUT ACCEPT
$ iptables --flush
$ iptables --delete-chain
$ iptables -t nat --flush
$ iptables -t mangle --flush
$ iptables -t nat -L -n
$ systemctl restart ufw
$ ufw allow to any port 22
$ ufw enable
```
