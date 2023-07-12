#!/bin/sh

/opt/libloragw-sx1302/utils/boot -d /dev/ttyACM0
sleep 1
dfu-util -a 0 -s 0x08000000:leave -t 0 -D /opt/libloragw-sx1302/mcu_bin/rlz_010000_CoreCell_USB.bin
