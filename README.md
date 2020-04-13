install docker-compose

```
sudo curl -L https://github.com/docker/compose/releases/download/1.24.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
```

set appropriate permission

```
sudo chmod +x /usr/local/bin/docker-compose
```

installing docker
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
apt-cache policy docker-ce
sudo apt-get install -y docker-ce
sudo systemctl status docker

<!-- flush changes by executing: -->
df -h
sudo systemctl daemon-reload
<!-- disk space used by docker -->
sudo docker system df
<!-- delete space -->
<!-- Delete unused images with  -->
docker system prune -a
docker container prune
docker image prune

```
