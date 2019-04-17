---
title: MongoDB Replica Set Member State is OTHER
date: 2019-07-17 20:12:31
layout: post
draft: true
category: docker
tags:
  - mongodb
---


```
singleNodeRepl:OTHER> rsconf = rs.conf()
singleNodeRepl:OTHER> rsconf.members = [{_id: 0, host: "localhost:27017"}]
[ { "_id" : 0, "host" : "localhost:27017" } ]
singleNodeRepl:OTHER> rs.reconfig(rsconf, {force: true})
{ "ok" : 1 }
singleNodeRepl:OTHER>
singleNodeRepl:SECONDARY>
singleNodeRepl:PRIMARY>
```
