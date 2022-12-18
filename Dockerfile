# syntax=docker/dockerfile:1

FROM node:16-bullseye-slim AS reactapp

# NPM INSTALLATION
WORKDIR /app
COPY frontend/ frontend/
COPY .env frontend/.env
WORKDIR /app/frontend
RUN npm install
RUN npm run build && echo "NPM BUILD SUCCESSFUL"

# Use Debian distro w/ Python 3.8 pre-installed
FROM python:3.8-slim-bullseye

# copy build from previous stage
WORKDIR /app
COPY --from=reactapp /app/frontend/build/ templates/
RUN ls && echo "TEMPLATES SUCCESSFULLY COPIED"

# update apt-get and install git and gcc
RUN apt-get update
RUN apt-get install -y git g++ && echo "APT-GET INSTALLS SUCCESSFUL"

# create app working dir, copy and install pip packages
COPY app.py deploy.sh requirements.txt ./
COPY api/ api/
RUN chmod a+x deploy.sh && ls && echo "CHMOD SUCCESSFUL"
RUN pip3 install -r requirements.txt
RUN echo "PIP INSTALLS SUCCESSFUL"

# copy and setup MUSS text simplification model
# RUN git clone https://github.com/facebookresearch/muss.git
# WORKDIR /app/muss/
# RUN pip install -e .
# RUN python -m spacy download en_core_web_md && echo "MUSS SETUP SUCCESSFUL"

# switch back to app root and run docker command script
WORKDIR /app
# RUN python api/utils.py && echo "MODEL SUCCESSFULLY DOWNLOADED AND TESTED"

CMD . ./deploy.sh