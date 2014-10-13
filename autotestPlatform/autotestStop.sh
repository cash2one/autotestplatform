#!/bin/sh
ps -ef | grep autotestPlatform.py | grep -v grep | awk -F' '  '{ print $2 }' | xargs kill -9
ps -ef | grep autotestMonitor.py | grep -v grep | awk -F' '  '{ print $2 }' | xargs kill -9
