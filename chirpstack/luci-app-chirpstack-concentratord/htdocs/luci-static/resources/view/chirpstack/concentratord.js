'use strict';
'require view';
'require form';
'require uci';

return view.extend({
    render: function () {
        const options = {
            chipsets: [
                {
                    id: "sx1301",
                    name: "SX1301",
                    shields: [
                        {
                            id: "imst_ic880a",
                            name: "IMST - iC880A",
                            supportedRegions: ["EU868", "IN865", "RU864"],
                            defaultFlags: {
                                gnss: false,
                            },
                        },
                        {
                            id: "pi_supply_lora_gateway_hat",
                            name: "Pi Supply - LoRa Gateway HAT",
                            supportedRegions: ["AS923", "AS923_2", "AS923_3", "AS923_4", "AU915", "EU868", "IN865", "KR920", "RU864", "US915", "CN470", "EU433"],
                            defaultFlags: {
                                gnss: false,
                            },
                        },
                        {
                            id: "rak_2245",
                            name: "RAK - RAK2245",
                            supportedRegions: ["AS923", "AS923_2", "AS923_3", "AS923_4", "AU915", "EU868", "IN865", "KR920", "RU864", "US915", "CN470", "EU433"],
                            defaultFlags: {
                                gnss: true,
                            },
                        },
                        {
                            id: "rak_2246",
                            name: "RAK - RAK2246",
                            supportedRegions: ["AS923", "AS923_2", "AS923_3", "AS923_4", "AU915", "EU868", "IN865", "KR920", "RU864", "US915", "CN470", "EU433"],
                            defaultFlags: {
                                gnss: true,
                            },
                        },
                        {
                            id: "rak_2247",
                            name: "RAK - RAK2247",
                            supportedRegions: ["AS923", "AS923_2", "AS923_3", "AS923_4", "AU915", "EU868", "IN865", "KR920", "RU864", "US915", "CN470", "EU433"],
                            defaultFlags: {
                                gnss: true,
                            },
                        },
                        {
                            id: "risinghf_rhf0m301",
                            name: "RisingHF - RHF0M301",
                            supportedRegions: ["EU868", "US915"],
                            defaultFlags: {
                                gns: false,
                            },
                        },
                        {
                            id: "sandbox_lorago_port",
                            name: "Sandbox - LoRaGo PORT",
                            supportedRegions: ["AU915", "EU868", "US915"],
                            defaultFlags: {
                                gnss: false,
                            },
                        },
                    ]
                },
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
                        {
                            id: "rak_2287",
                            name: "RAK - RAK2287",
                            supportedRegions: ["AS923", "AS923_2", "AS923_3", "AS923_4", "AU915", "CN470", "EU433", "EU868", "IN865", "KR920", "RU864", "US915"],
                            defaultFlags: {
                                gnss: true,
                                usb: false,
                            },
                        },
                        {
                            id: "rak_5146",
                            name: "RAK - RAK5146",
                            supportedRegions: ["AS923", "AS923_2", "AS923_3", "AS923_4", "AU915", "CN470", "EU433", "EU868", "IN865", "KR920", "RU864", "US915"],
                            defaultFlags: {
                                gnss: true,
                                usb: false,
                            },
                        },
                        {
                            id: "seeed_wm1302",
                            name: "Seeed - WM1302",
                            supportedRegions: ["EU868", "US915"],
                            defaultFlags: {
                                gnss: true,
                                usb: false,
                            },
                        },
                        {
                            id: "semtech_sx1302c490gw1",
                            name: "Semtech - LoRa(R) CoreCell 490MHz (SX1302C490GW1)",
                            supportedRegions: ["CN470"],
                            defaultFlags: {
                                gnss: false,
                                usb: false,
                            },
                        },
                        {
                            id: "semtech_sx1302c868gw1",
                            name: "Semtech - LoRa(R) CoreCell 868MHz (SX1302C868GW1)",
                            supportedRegions: ["EU868"],
                            defaultFlags: {
                                gnss: false,
                                usb: false,
                            },
                        },
                        {
                            id: "semtech_sx1302c915gw1",
                            name: "Semtech - LoRa(R) CoreCell 915MHz (SX1302C915GW1)",
                            supportedRegions: ["US915"],
                            defaultFlags: {
                                gnss: false,
                                usb: false,
                            },
                        },
                        {
                            id: "semtech_sx1302css868gw1",
                            name: "Semtech - LoRa(R) CoreCell 868MHz (SX1302CSS868GW1)",
                            supportedRegions: ["EU868"],
                            defaultFlags: {
                                gnss: false,
                                usb: true,
                            },
                        },
                        {
                            id: "semtech_sx1302css915gw1",
                            name: "Semtech - LoRa(R) CoreCell 915MHz (SX1302CSS915GW1)",
                            supportedRegions: ["US915"],
                            defaultFlags: {
                                gnss: false,
                                usb: true,
                            },
                        },
                        {
                            id: "semtech_sx1302css923gw1",
                            name: "Semtech - LoRa(R) CoreCell 923MHz (SX1302CSS923GW1)",
                            supportedRegions: ["AS923", "AS923_2", "AS923_3", "AS923_4"],
                            defaultFlags: {
                                gnss: false,
                                usb: true,
                            },
                        },
                        {
                            id: "waveshare_sx1302_lorawan_gateway_hat",
                            name: "Waveshare - SX1302 LoRaWAN Gateway HAT",
                            supportedRegions: ["EU868"],
                            defaultFlags: {
                                gnss: false,
                                usb: false,
                            },
                        },
                    ]
                },
                {
                    id: "2g4",
                    name: "2.4GHz",
                    shields: [
                        {
                            id: "semtech_sx1280z3dsfgw1",
                            name: "Semtech - SX1280 LoRa Connect(TM) (2.4 GHz)",
                            defaultFlags: {},
                        }
                    ]
                }
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
                    id: "CN470",
                    name: "CN470",
                    channelPlans: [
                        { id: "cn470_0", name: "CN470 - Channels 0-7" },
                        { id: "cn470_1", name: "CN470 - Channels 8-15" },
                        { id: "cn470_2", name: "CN470 - Channels 16-23" },
                        { id: "cn470_3", name: "CN470 - Channels 24-31" },
                        { id: "cn470_4", name: "CN470 - Channels 32-39" },
                        { id: "cn470_5", name: "CN470 - Channels 40-47" },
                        { id: "cn470_6", name: "CN470 - Channels 48-55" },
                        { id: "cn470_7", name: "CN470 - Channels 56-63" },
                        { id: "cn470_8", name: "CN470 - Channels 64-71" },
                        { id: "cn470_9", name: "CN470 - Channels 72-79" },
                        { id: "cn470_10", name: "CN470 - Channels 80-87" },
                        { id: "cn470_11", name: "CN470 - Channels 88-95" },
                    ],
                },
                {
                    id: "EU433",
                    name: "EU433",
                    channelPlans: [
                        { id: "eu433", name: "EU433 - Standard channels" },
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
                    ]
                },
            ]
        };

        var m, s, o, ro, as;

        m = new form.Map('chirpstack-concentratord', _('ChirpStack Concentratord'),
            _('ChirpStack Concentratord provides an unified API interface to LoRa(R) concentrator hardware. Please refer to the <a target="_blank" href="https://www.chirpstack.io/docs/chirpstack-concentratord/hardware-support.html">ChirpStack Concentratord Hardware</a> page for supported hardware and configuration options.'));
        m.chain('chirpstack-mqtt-forwarder');
        m.chain('chirpstack');

        m.tabbed = true;
        s = m.section(form.TypedSection, 'global', _('Global configuration'));
        s.anonymous = true;

        // global options
        o = s.option(form.ListValue, 'chipset', _('Enabled chipset'), _('This value must match the chipset of your LoRa(R) shield. You must also configure the chipset specific options.'));
        for (const chipset of options.chipsets) {
            o.value(chipset.id, chipset.name);
        }

        // chipset options
        for (const chipset of options.chipsets) {
            s = m.section(form.TypedSection, chipset.id, chipset.name, _('Configure the fields below if you have selected the ' + chipset.name + ' chipset.'));
            s.anonymous = true;

            // shields
            o = s.option(form.ListValue, 'model', _('Shield model'));

            for (const shield of chipset.shields) {
                o.value(shield.id, shield.name);
            }

            o.onchange = function (target, section_id, value) {
                var flags;

                for (const chipset of options.chipsets) {
                    for (const shield of chipset.shields) {
                        if (shield.id === value) {
                            flags = shield.defaultFlags;
                        }
                    }
                }

                for (const [k, v] of Object.entries(flags)) {
                    var flag = m.lookupOption(k, section_id)[0].getUIElement(section_id).setValue(v);
                }
            }

            // channels
            if (chipset.id === "sx1301" || chipset.id === "sx1302") {
                o = s.option(form.ListValue, 'channel_plan', _('Channel-plan'), _('Select the channel-plan to use. This must be supported by the selected shield.'));
                o.forcewrite = true;

                for (const region of options.regions) {
                    for (const channelPlan of region.channelPlans) {
                        o.value(channelPlan.id, channelPlan.name);
                    }
                }

                o.validate = function (section_id, value) {
                    const shieldId = m.lookupOption('model', section_id)[0].formvalue(section_id);

                    var regionId;
                    for (const region of options.regions) {
                        for (const channelPlan of region.channelPlans) {
                            if (channelPlan.id === value) {
                                regionId = region.id;
                            }
                        }
                    }

                    for (const chipset of options.chipsets) {
                        for (const shield of chipset.shields) {
                            if (shield.id === shieldId && shield.supportedRegions.includes(regionId)) {
                                return true;
                            }
                        }
                    }

                    return "The selected channel-plan region is not supported by the selected shield\nor Concentratord has not yet implemented this region for this shield.\nIf you believe this region should be supported, then create a feature-request here:\nhttps://github.com/chirpstack/chirpstack-concentratord/issues";
                }

                o.write = function (section_id, formvalue) {
                    var regionId;
                    for (const region of options.regions) {
                        for (const channelPlan of region.channelPlans) {
                            if (channelPlan.id === formvalue) {
                                regionId = region.id;
                            }
                        }
                    }

                    uci.set('chirpstack-concentratord', section_id, 'channel_plan', formvalue);
                    uci.set('chirpstack-concentratord', section_id, 'region', regionId);

                    uci.set('chirpstack-mqtt-forwarder', '@mqtt[0]', 'topic_prefix', formvalue);
                    uci.set('chirpstack', '@network[0]', 'enabled_regions', [formvalue]);
                };
            }

            // gateway id
            if (chipset.id === "sx1301") {
                o = s.option(form.Value, 'gateway_id', _('Gateway ID'), _('Enter the ID of the gateway. Example: 0102030405060708'));
            }

            // flags
            if (chipset.id === 'sx1301' || chipset.id === 'sx1302') {
                s.option(form.Flag, 'gnss', _('GNSS'), _('Enable this in case the shield has a uBlox GNSS module.'));
            }

            if (chipset.id === 'sx1302') {
                s.option(form.Flag, 'usb', _('USB'), _('Enable this in case the shield is connected over USB rather than SPI.'));
            }
        }

        return m.render();
    },
});