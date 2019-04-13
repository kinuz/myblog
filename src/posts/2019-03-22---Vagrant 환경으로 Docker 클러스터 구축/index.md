---
title: Vagrant 환경으로 Docker 클러스터 구축
date: 2019-03-22 20:13:31
layout: post
draft: false
category: vagrant
tags:
  - vagrant
  - provisioning
description: Provisioning Vagrant multi-machines with Ansible
---


    https://github.com/kinuz/provisioning-with-vagrant.git

### ansible.cfg
```
[defaults]
inventory      = hosts
host_key_checking = False
remote_user = vagrant
command_warnings = False
```

### hosts
```
[local]

localhost ansible_connection=local


[vagrant]
192.168.10.101
192.168.10.102
192.168.10.103
```

### Create provisioning file for ansible

- vagrant-provisioning.yml

```
# vatrant provisioning 
---
- name: Server Provisioning
  hosts: localhost
  become: true
  tasks:
    - name: update repository
      replace:
        path: /etc/apt/sources.list
        regexp: "{{ item }}"
        replace: 'mirror.kakao.com'
      with_items:
        - 'kr.archive.ubuntu.com'
        - 'archive.ubuntu.com'
        - 'security.ubuntu.com'
    
    - name: apt-get update
      apt:
        update-cache: yes
      changed_when: 0
      ignore_errors: yes
    
    - name: Upgrading all packages (Ubuntu/Debian)
      apt:
        upgrade: dist
        force: yes
    
    - name: Install prerequisites
      apt:
        name:
          - curl
          - vim
          - htop
          - build-essential
          - python3-pip
        force: yes
        state: present
    
    - name: Add Docker apt key.
      apt_key:
        url: https://download.docker.com/linux/ubuntu/gpg
        id: 9DC858229FC7DD38854AE2D88D81803C0EBFCD88
        state: present
      register: docker_apt_key_added
    
    - name: Add Docker repository.
      shell: add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
     
    - name: update apt cache
      apt:
        update-cache: yes
      ignore_errors: yes
    
    - name: Install Docker
      apt:
        name:
          - docker-ce
          - docker-ce-cli
          - containerd.io
        force: yes
        state: present
    
    - name: Restart docker
      service:
        name: docker
        state: restarted
      ignore_errors: yes
    
    - name: add group
      user:
        name: vagrant
        groups: docker
        append: yes
    
    - name: pip docker
      pip:
        name:
          - docker
          - docker-compose
    
    - name: create docker-daemon.json
      copy:
        dest: /etc/docker/daemon.json
        content: |
          {
            "userland-proxy": false
          }
    
    - name: optimize
      command: "{{ item }}"
      with_items:
        - apt-get clean
        - rm -rf /var/lib/apt/lists/*
        - dd if=/dev/zero of=/EMPTY bs=1M
        - rm -f /EMPTY
        - cat /dev/null > ~/.bash_history
      ignore_errors: yes
```

### Create a file for vagrant

- Vagrantfile

```
Vagrant.require_version ">= 1.7.0"

Vagrant.configure("2") do |config|
  
  config.vm.define "bs" do |s|
    
    s.vm.box = "ubuntu/xenial64"
    s.vm.network "private_network", ip: "192.168.10.101"
     
    config.vm.provision "ansible" do |ansible|
      ansible.verbose = "v"
      ansible.playbook = "vagrant-provisioning.yml"
      ansible.extra_vars = { ansible_python_interpreter: "/usr/bin/python3" }
    end
     
    s.vm.provider :virtualbox do |vb|
      vb.name = "Build Server"
      vb.customize ["modifyvm", :id, "--memory", 1024]
      vb.customize ["modifyvm", :id, "--cpus", "1"]
      vb.customize ["modifyvm", :id, "--ioapic", "on"]
      vb.customize ["modifyvm", :id, "--nictype1", "virtio" ]
      vb.customize ["modifyvm", :id, "--nictype2", "virtio" ]
      vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
      vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
    end
  end
end
```


### Install ansible

```
$ pipenv install ansible
$ pipenv shell
```

```
$ vagrant up
```

```
$ vagrant package --output my.box
$ vagrant box add mybox my.box
$ vagrant box list
```



- Vagrantfile

```
Vagrant.require_version ">= 1.7.0"

Vagrant.configure("2") do |config|
  
  config.vm.define "s1" do |s|
    
    s.vm.box = "my.box"
    s.vm.hostname = "s1"
    s.vm.network "private_network", ip: "192.168.10.101"
     
    s.vm.provider :virtualbox do |vb|
      vb.name = "Server 1"
      vb.customize ["modifyvm", :id, "--memory", 1024]
      vb.customize ["modifyvm", :id, "--cpus", "1"]
      vb.customize ["modifyvm", :id, "--ioapic", "on"]
      vb.customize ["modifyvm", :id, "--nictype1", "virtio" ]
      vb.customize ["modifyvm", :id, "--nictype2", "virtio" ]
      vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
      vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
    end
  end

  config.vm.define "s2" do |s|
      
    s.vm.box = "my.box"
    s.vm.hostname = "s2"
    s.vm.network "private_network", ip: "192.168.10.102"
     
    s.vm.provider :virtualbox do |vb|
      vb.name = "Server 2"
      vb.customize ["modifyvm", :id, "--memory", 1024]
      vb.customize ["modifyvm", :id, "--cpus", "1"]
      vb.customize ["modifyvm", :id, "--ioapic", "on"]
      vb.customize ["modifyvm", :id, "--nictype1", "virtio" ]
      vb.customize ["modifyvm", :id, "--nictype2", "virtio" ]
      vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
      vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
    end
  end

  config.vm.define "s3" do |s|
      
    s.vm.box = "my.box"
    s.vm.hostname = "s3"
    s.vm.network "private_network", ip: "192.168.10.103"
     
    s.vm.provider :virtualbox do |vb|
      vb.name = "Server 3"
      vb.customize ["modifyvm", :id, "--memory", 1024]
      vb.customize ["modifyvm", :id, "--cpus", "1"]
      vb.customize ["modifyvm", :id, "--ioapic", "on"]
      vb.customize ["modifyvm", :id, "--nictype1", "virtio" ]
      vb.customize ["modifyvm", :id, "--nictype2", "virtio" ]
      vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
      vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
    end
  end
  
end
```

```
$ vagrant destroy
$ vagrant up
$ vagrant status
```


## Setting Docker cluster

### connect to master 

```
$ vagrant ssh s1
vagrant@s1 $ docker swarm init --advertise-addr=192.168.10.101

Swarm initialized: current node (z8f6q1qa378s362znnm4x28sx) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-314kermev0stgifkvmf8ycwxjv6xct3c279pka3tuc7ouondxi-ecu8v8944cenhh10dk4hz228q 192.168.10.101:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions
```
### connect to slaves 

```
$ vagrant ssh s2
vagrant@s2 $ docker swarm join --token SWMTKN-1-314kermev0stgifkvmf8ycwxjv6xct3c279pka3tuc7ouondxi-ecu8v8944cenhh10dk4hz228q 192.168.10.101:2377
---
$ vagrant ssh s3
vagrant@s3 $ docker swarm join --token SWMTKN-1-314kermev0stgifkvmf8ycwxjv6xct3c279pka3tuc7ouondxi-ecu8v8944cenhh10dk4hz228q 192.168.10.101:2377
```

### connect to master 

```
$ vagrant ssh s1
vagrant@s1 $ docker node ls
```

[![asciicast](https://asciinema.org/a/KXsnoZGeBOpDOYl4qh8AdleOE.svg)](https://asciinema.org/a/KXsnoZGeBOpDOYl4qh8AdleOE)
