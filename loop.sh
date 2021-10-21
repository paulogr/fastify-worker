#!/bin/bash
for i in $(seq 1 100); do
  http localhost:3000/queue ola=$i
done