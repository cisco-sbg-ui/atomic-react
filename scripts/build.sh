#!/bin/bash

echo "***build.sh started***"

echo "branch: ${TRAVIS_BRANCH}"
echo "build number: ${TRAVIS_BUILD_NUMBER}"
echo "pull request: ${TRAVIS_PULL_REQUEST}"
echo "commit: ${TRAVIS_COMMIT}"
echo "tag: ${TRAVIS_TAG}"

function build-and-publish-package {
  PKG_TYPE=$1

  echo "Building new $PKG_TYPE package"
  BUILD_NAME="1-${PKG_TYPE}-${TRAVIS_BUILD_NUMBER}-${TRAVIS_COMMIT:0:8}"
  echo $BUILD_NAME
  echo "Version: $BUILD_NAME"

  # Upload the tar.gz directly to the artifacts S3 bucket
  S3_ARTIFACT_FOLDER="atomic-react"
  if [ "${PKG_TYPE}" == "int" ]; then
    ARTIFACTS_BUCKET="372070498991-us-east-1-int-saltstack"
  elif [ "${PKG_TYPE}" == "rel" ]; then
    ARTIFACTS_BUCKET="372070498991-us-east-1-test-saltstack"
  fi

  ARTIFACT_NAME="${TRAVIS_BUILD_NUMBER}-${TRAVIS_COMMIT:0:8}.tar.gz"
  pip install --upgrade --user awscli
  export PATH=$PATH:$HOME/.local/bin
  aws s3 cp ./atomic-react.tar.gz s3://${ARTIFACTS_BUCKET}/artifacts/${S3_ARTIFACT_FOLDER}/${ARTIFACT_NAME} --sse aws:kms --sse-kms-key-id alias/kms-s3

  # Run Vulnerability Scan in the artifact using ZeroNorth - INT only
  if [ "${PKG_TYPE}" == "int" ]; then
    echo "$DOCKERHUB_PASSWORD" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin
    docker pull zeronorth/owasp-5-job-runner
    docker run -v /home/travis/build/threatgrid/atomic-react:/code/ -e CYBRIC_API_KEY="${CYBRIC_API_KEY}" -e POLICY_ID=finNBo6IR1i-vB196ADgwA -e WORKSPACE=/home/travis/build/threatgrid/atomic-react -v /var/run/docker.sock:/var/run/docker.sock --name zeronorth zeronorth/integration:latest python cybric.py
    echo "Waiting the ZeroNorth Vulnerability Scanner to finish..."
    while [[ ! -z $(docker ps -a --format "{{.ID}}" -f status=running -f ancestor=zeronorth/owasp-5-job-runner) ]]; do sleep 5; done
  fi
}

if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
  if [[ ${TRAVIS_BRANCH} == "refs/heads/master" ]]; then
    # non-pr builds on the master branch yield INT packages
    echo "OK: master branch detected"
    build-and-publish-package "int"

  else
    echo "Not on master branch. Not building a package."
  fi
else
  echo "Build is for a pull request.  Not building a package."
fi
