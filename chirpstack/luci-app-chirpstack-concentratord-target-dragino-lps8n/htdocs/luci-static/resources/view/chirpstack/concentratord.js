'use strict';
'require view';
'require chirpstack-concentratord as concentratord';

return view.extend({
    render: function () {
        const options = {
            hideFields: {
                usb: true,
                gnss: true
            },
            chipsets: [
                {
                    id: "sx1302",
                    name: "SX1302 / SX1303",
                    shields: [
                        {
                            id: "dragino_pg1302",
                            name: "Dragino - PG1302",
                            supportedRegions: ["EU868", "US915"],
                            defaultFlags: {
                                gnss: false,
                                usb: false,
                            },
                        },
                    ]
                },
            ],
            regions: [
                {
                    id: "EU868",
                    name: "EU868",
                    channelPlans: [
                        { id: "eu868", name: "EU868 - Standard channels + 867.1, 867.3, ... 867.9" },
                    ]
                },
                {
                    id: "US915",
                    name: "US915",
                    channelPlans: [
                        { id: "us915_0", name: "US915 - Channels 0-7 + 64" },
                        { id: "us915_1", name: "US915 - Channels 8-15 + 65" },
                        { id: "us915_2", name: "US915 - Channels 16-23 + 66" },
                        { id: "us915_3", name: "US915 - Channels 24-31 + 67" },
                        { id: "us915_4", name: "US915 - Channels 32-39 + 68" },
                        { id: "us915_5", name: "US915 - Channels 40-47 + 69" },
                        { id: "us915_6", name: "US915 - Channels 48-55 + 70" },
                        { id: "us915_7", name: "US915 - Channels 56-63 + 71" },
                    ],
                },
            ],
        };

        return concentratord.renderForm('chirpstack-concentratord', 'chirpstack-mqtt-forwarder', options);
    },
});
