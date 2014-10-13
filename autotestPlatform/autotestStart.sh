#!/bin/sh
nohup  python autotestPlatform.py > /dev/null 2>&1 &
nohup python autotestMonitor.py >/dev/null 2>&1 &
