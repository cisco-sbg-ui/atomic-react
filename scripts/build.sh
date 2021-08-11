#!/bin/bash

echo "$DOCKERHUB_PASSWORD" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
docker pull zeronorth/owasp-5-job-runner
docker run -v "${GITHUB_WORKSPACE}" -e CYBRIC_API_KEY="${CYBRIC_API_KEY}" -e POLICY_ID=finNBo6IR1i-vB196ADgwA -e WORKSPACE=/home/travis/build/cisco-sbg-ui/atomic-react -v /var/run/docker.sock:/var/run/docker.sock --name zeronorth zeronorth/integration:latest python cybric.py
echo "Waiting the ZeroNorth Vulnerability Scanner to finish..."
while [[ ! -z $(docker ps -a --format "{{.ID}}" -f status=running -f ancestor=zeronorth/owasp-5-job-runner) ]]; do sleep 5; done
