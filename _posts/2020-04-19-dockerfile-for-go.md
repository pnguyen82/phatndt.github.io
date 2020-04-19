---
title: Dockerfile for Go
description: Dockerfile for Go
---

Dockerfile for Go  
Uncomment or comment out the line you need
<!--more-->

```dockerfile
FROM golang:1.13.4 AS builder
# If you need to setup ssh keys for private repo
# ARG security: https://bit.ly/2oY3pCn
# ARG SSH_PRIVATE_KEY
# export SSH_PRIVATE_KEY="$(cat ~/.ssh/id_rsa)"
# RUN mkdir -p ~/.ssh && umask 0077 && echo "${SSH_PRIVATE_KEY}" > ~/.ssh/id_rsa \
#	&& git config --global url."git@github.com:".insteadOf https://github.com/ \
#	&& ssh-keyscan github.com >> ~/.ssh/known_hosts

# If you need Dep
# Download and install the latest release of dep
# ADD https://github.com/golang/dep/releases/download/v0.4.1/dep-linux-amd64 /usr/bin/dep
# RUN chmod +x /usr/bin/dep
# Get dependancies - will also be cached if we won't change Gopkg.toml Gopkg.lock
# COPY Gopkg.toml Gopkg.lock ./
# RUN dep ensure --vendor-only

# optional
ENV GOSUMDB of

# copy go.mo go.sum
COPY go.mod go.sum ./
# Get dependancies - will also be cached if we won't change mod/sum
RUN go mod download

# copy source code to WORKDIR
COPY . .
# Build your app
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /app .

# Alternative is FROM scratch
FROM alpine:latest
# WORKDIR /something
COPY --from=builder /app ./
ENTRYPOINT ["./app"]
```
