---
title: Open port CentOS
categories: devops
---
## How to open a port CentOS
```
firewall-cmd --zone=public --add-port=8080/tcp --permanent
firewall-cmd --reload
```
