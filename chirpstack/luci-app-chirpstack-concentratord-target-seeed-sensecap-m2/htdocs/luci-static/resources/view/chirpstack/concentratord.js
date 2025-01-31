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
                            id: "seeed_wm1302",
                            name: "Seeed - WM1302",
                            supportedRegions: ["AS923", "AS923_2", "AS923_3", "AS923_4", "AU915", "EU868", "IN865", "KR920", "RU864", "US915"],
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
                    id: "AS923",
                    name: "AS923",
                    channelPlans: [
                        { id: "as923", name: "AS923 - Standard channels + 923.6, 923.8, ... 924.6" },
                    ],
                },
                {
                    id: "AS923_2",
                    name: "AS923-2",
                    channelPlans: [
                        { id: "as923_2", name: "AS923-2 - Standard channels + 921.8, 922.0, ... 922.8" },
                    ],
                },
                {
                    id: "AS923_3",
                    name: "AS923-3",
                    channelPlans: [
                        { id: "as923_3", name: "AS923-3 - Standard channels + 917.0, 917.2, ... 918.0" },
                    ],
                },
                {
                    id: "AS923_4",
                    name: "AS923-4",
                    channelPlans: [
                        { id: "as923_4", name: "AS923-4 - Standard channels + 917.7, 917.9, ... 918.7" },
                    ],
                },
                {
                    id: "AU915",
                    name: "AU915",
                    channelPlans: [
                        { id: "au915_0", name: "AU915 - Channels 0-7 + 64" },
                        { id: "au915_1", name: "AU915 - Channels 8-15 + 65" },
                        { id: "au915_2", name: "AU915 - Channels 16-23 + 66" },
                        { id: "au915_3", name: "AU915 - Channels 24-31 + 67" },
                        { id: "au915_4", name: "AU915 - Channels 32-39 + 68" },
                        { id: "au915_5", name: "AU915 - Channels 40-47 + 69" },
                        { id: "au915_6", name: "AU915 - Channels 48-55 + 70" },
                        { id: "au915_7", name: "AU915 - Channels 56-63 + 71" },
                    ],
                },
                {
                    id: "EU868",
                    name: "EU868",
                    channelPlans: [
                        { id: "eu868", name: "EU868 - Standard channels + 867.1, 867.3, ... 867.9" },
                    ]
                },
                {
                    id: "IN865",
                    name: "IN865",
                    channelPlans: [
                        { id: "in865", name: "IN865 - Standard channels" },
                    ],
                },
                {
                    id: "KR920",
                    name: "KR920",
                    channelPlans: [
                        { id: "kr920", name: "KR920 - Standard channels" },
                    ],
                },
                {
                    id: "RU864",
                    name: "RU864",
                    channelPlans: [
                        { id: "ru864", name: "RU864 - Standard channels" },
                    ],
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
