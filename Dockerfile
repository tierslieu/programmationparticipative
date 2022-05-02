# Dockerfile

# pull the official docker image
FROM python:3.9.4-slim

# install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

