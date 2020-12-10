#!/usr/bin/env bash
set -Eeuo pipefail

for f in ./src/*_test.carp; do
  echo $f
  carp -x --log-memory $f
done

