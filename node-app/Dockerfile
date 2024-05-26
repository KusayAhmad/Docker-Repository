# Use the official Node.js version 14 image as the base for the container
FROM node:16

# Set the working directory inside the container to /app
WORKDIR /app 

# Copy only the package.json file from the host machine to the /app directory in the container
# "." means copy it in the source conainer
COPY package.json .

# Define the NODE_ENV build argument, which specifies the environment (e.g., development or production).
ARG NODE_ENV 

# Conditionally install npm dependencies based on the NODE_ENV value.
# If NODE_ENV is set to "production", install only the production dependencies.
RUN if ["$NODE_ENV" = "production" ]; \
    then npm install --only=production; \
# Otherwise, install all dependencies (both production and development).
    else npm install; \
    fi
# Copy all files from the host machine to the /app directory in the container
COPY . .

# Expose port 4000 to document that the application inside the container will use this port
EXPOSE 4000

# Specify the default command to run when the container starts (npm run start-dev)
# because of the IF condation in line 16 to 20 , this command will overwrite!
CMD ["npm","run","dev-wds"]

# Commands needed #
# docker build -t express-node-app .
# docker image ls
# docker ps
# docker stop express-node-app-container
# docker rm express-node-app-container -f

# this used to run an interactive shell (bash in this case) within a running Docker container named express-node-app-container.
# docker exec -it express-node-app-container bash



# ~~ Docker Practical Course in Arabic | #07 - Docker Hot Reload ~~ #

# docker run --name express-node-app-container -v E:\2020Organization\Learning\Docker\node-app:/app -d -p 4000:4000 express-node-app
# docker run --name=express-node-app-container -v $(pwd):/app -w=/app -d -p 4000:4000  --rm node bash -c "npm install && npm run dev"
# Windows:${PWD} .. linux:$(pwd)
# المشكلة هنا بأن حذف مجلد في الكونتينر سيتم حذفه من اللوكال والعكس صحيح!
 

# docker run --name express-node-app-container -d -p 4000:4000  express-node-app
# -p: portforwording -- 9000:4000 = if someone call port 9000, forword him to the port 4000 (which is in my app)
# -d: detached mode - separate terminals (so you can for ex. press ctrl+c without stop your container) - This option runs the container in detached mode, meaning it runs in the background, and you get your terminal prompt back.
# -d: تستخدم لفصل تيرمينال الدوكر عن التطبيق
# ربط الملفات المحلية بالملفات في الكونتينبر .. بحيث لو قمت بأي تغير محليات يتم نقله للكونتينر وهذا مايسمى Bind Mount
# -v: E:\node-app:/app: This option is used for volume mounting. It maps the local directory E:\node-app on your host machine to the /app directory inside the container. This is a way to provide your application code to the container.
#https://docs.docker.com/get-started/06_bind_mounts/
# docker run --name express-node-app-container -v E:\2020Organization\Learning\Docker\node-app:/app -d -p 4000:4000 express-node-app
#XX docker run -it --mount "type=bind,src=$pwd,target=/app" bash
#XX docker run --name express-node-app-container -it --mount "type=bind,src=$pwd,target=/app" -d -p 4000:4000 express-node-app bash

# ~~ Docker Practical Course in Arabic |  #08 - Docker Volumes | ~~ #

#how to make one direct change أي أنه يتم التغيير فقط في الكونتينر وليس العكس
#عبر إضافة ro= ReadOnly
# docker run --name express-node-app-container -v E:\2020Organization\Learning\Docker\node-app:/app:ro -d -p 4000:4000 express-node-app
# docker run --name express-node-app-container -v ${PWD}:/app:ro -d -p 4000:4000 express-node-app
# المشكلة في هذه الطريقة, هي بأني في حال حذفت مجلد في اللوكال سيتم حذفه من الكونتينر وسوف ينهار .. لذا الحل عبر استخدام
# Anonymous Volums
# لتأمين بعض المجلدات/الملفات في الكونتينر (مثلا ملفات مهمة حتى لا ينهار ) 
# بهذه الحالة تم إضافة حماية مجلد المودولز في الكونتينر .. ففي حالة مسح شي من اللوكال لن يتم التأثير على الكونتينر 
# docker run --name express-node-app-container -v ${PWD}:/app:ro -v /app/node_modules -d -p 4000:4000 express-node-app
# بهذا الربط, في كل مرة أقوم بتشغيل الكونتينر سينسخ مجلد المودولز إلى اللوكال في حال لم يكن موجودا
# الحل ؟؟ 
# أن تقوم بربط مجلد السورس فقط
# docker run --name express-node-app-container -v ${PWD}/src:/app/src:ro -d -p 4000:4000 express-node-app
# شرح الكود
# -v /app/node_modules: This is another volume mount option. It maps the /app/node_modules directory inside the container.
# This is often done to avoid overwriting the node_modules directory from the host with a potential different set of dependencies inside the container.
# https://docs.docker.com/storage/volumes/#remove-anonymous-volumes
#https://docs.docker.com/storage/

#معلومة: يتم حفظ ملفات الكونتينر في 3 أماكن
#Volumes are stored in a part of the host filesystem which is managed by Docker (/var/lib/docker/volumes/ on Linux). Non-Docker processes should not modify this part of the filesystem. Volumes are the best way to persist data in Docker.
#Bind mounts may be stored anywhere on the host system. They may even be important system files or directories. Non-Docker processes on the Docker host or a Docker container can modify them at any time.
#tmpfs mounts are stored in the host system's memory only, and are never written to the host system's filesystem.

# ~~ Docker Practical Course in Arabic | #09 - Docker Compose ~~ #

# ~~ Docker Practical Course in Arabic | #10 - Environment Variables ~~ #
# Environment Variables in Docker
# Purpose: Pass configuration data to containers at runtime to make applications more flexible and dynamic.

# Methods to Set Environment Variables

# 1.Dockerfile:

#   1.Use ENV instruction
# FROM alpine:latest
# ENV MY_VAR=my_value
# CMD ["sh", "-c", "echo $MY_VAR"]

# 2.docker run:

#   1. Use -e flag.
# docker run --rm -e MY_VAR=my_value alpine:latest sh -c 'echo $MY_VAR'
# 
#   2.Use --env-file to specify a file.
# docker run --rm --env-file .env alpine:latest sh -c 'echo $MY_VAR $ANOTHER_VAR'
# 

# 3.Docker Compose:

#   Define in docker-compose.yml using environment key.
# version: '3.8'
# services:
#   app:
#     image: alpine:latest
#     environment:
#       - MY_VAR=my_value
#     command: sh -c 'echo $MY_VAR'
#
#   OR
# version: '3.8'
# services:
#     app:
#       image: alpine:latest
#       env_file:
#         - .env
#       command: sh -c 'echo $MY_VAR $ANOTHER_VAR'
#   Reference local environment variables.
# version: '3.8'
# services:
#   app:
#     image: alpine:latest
#     environment:
#       - MY_VAR
#     command: sh -c 'echo $MY_VAR'
# 
# Accessing Environment Variables Inside Containers
#
# VS Terminal: printenv
#
# * Python:

# import os
# my_var = os.getenv('MY_VAR')
# print(f'MY_VAR is {my_var}')
# 
# *Node.js:

# console.log(`MY_VAR is ${process.env.MY_VAR}`);
# 
# Best Practices
# Security: Avoid exposing sensitive information directly in Dockerfiles or Compose files. Use environment files or Docker secrets.
# Portability: Use environment variables for different environments (development, testing, production).
# Consistency: Maintain a consistent naming convention for environment variables.
# This summary captures the key points on how to set and use environment variables in Docker.


# ~~ Docker Practical Course in Arabic | #11 - Docker Environments (Dev, Prod, ...) ~~ #

# docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
# docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
# To rebuild the image and run the container
# docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build


