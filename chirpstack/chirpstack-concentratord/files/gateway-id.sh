#!/bin/sh

SLOTS="|slot1|slot2"
OUTPUT=""

oldIFS=$IFS
IFS="|"

for SLOT in $SLOTS; do
    
    URL="/tmp/concentratord_command"
    if [ "$SLOT" != "" ]; then
        URL="/tmp/concentratord_${SLOT}_command"
    fi

    if [ -e "$URL" ]; then
        GATEWAY_ID=$( /usr/bin/gateway-id -c "ipc://$URL" )
        if [ $? -eq 0 ]; then
            [ "$OUTPUT" != "" ] && OUTPUT="$OUTPUT / "
            OUTPUT="${OUTPUT}${GATEWAY_ID}"
            [ "$SLOT" != "" ] && OUTPUT="${OUTPUT} ($SLOT)"
        fi
    fi

done

IFS=$oldIFS

[ "$OUTPUT" = "" ] && OUTPUT="Could not read Gateway ID"

echo "$OUTPUT"