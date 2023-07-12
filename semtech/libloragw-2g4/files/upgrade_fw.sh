#!/bin/sh

/opt/libloragw-2g4/utils/boot -d /dev/ttyACM0
sleep 1
dfu-util -a 0 -s 0x08000000:leave -t 0 -D /opt/libloragw-2g4/mcu_bin/rlz_fwm_gtw_2g4_01.00.01.bin
