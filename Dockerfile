# This directory is for Docker-enabled testing modules
# Each mini module is to be mounted off of this Dockerfile
# Currently, would like things to be
#### Node-enabled
#### Debian-based
#### Mongodb Accessible (Not yet through docker-compose, must be done manually)
FROM node:4.5

RUN apt-get update

# Setup for specific application dependencies, etc.

# Necessary for IMAGE PROCESSING / CONVERSION
RUN apt-get install -y imagemagick ghostscript poppler-utils

RUN npm install -g nodemon

# Exposes the container port 3000 to be available to connect with the host machine
EXPOSE 3000

############################## TYPICAL SETUP / RUN COMMANDS

# $ docker build -t <image name> .
# $ run -itd -p 8080:3000 --name <container name> <image name> (-P maps exposed ports to available ports)
# $ docker logs -f <container_name>
# $ docker-machine ip (gives you the docker-machine ip to look for on your dev computer)
# -v <absolute_path_on_local_directory>:/src/app/<name_of_app>
# docker exec -it <container name> /bin/bash

# -v 