---
title:  Gitlab Kubernetes CI/CD with Okteto
---
kubectl get secrets default-token-f2wc6 -o json | jq -r  '.data."ca.crt"' | base64 -D
kubectl get secrets default-token-f2wc6 -o json | jq -r  '.data."token"' | base64 --decode
