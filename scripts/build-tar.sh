#!/bin/bash

echo {\"gitBranch\": \"$(git rev-parse --abbrev-ref HEAD)\", \
              \"gitHash\": \"$(git rev-parse --verify HEAD)\", \
              \"timestamp\": \"$(date -u)\"}

touch atomic-react.tar.gz
tar --exclude=atomic-react.tar.gz -czf atomic-react.tar.gz .
