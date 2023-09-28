'use strict';
'require view';
'require form';
'require uci';

return view.extend({
    render: function () {
        const options = {
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
                    ],
                },
            ],
        };

        var m, s, o, ro, as;

        m = new form.Map('chirpstack-concentratord', _('ChirpStack Concentratord'),
            _('ChirpStack Concentratord provides an unified API interface to LoRa(R) concentrator hardware. Please refer to the <a target="_blank" href="https://www.chirpstack.io/docs/chirpstack-concentratord/hardware-support.html">ChirpStack Concentratord Hardware</a> page for supported hardware and configuration options.'));
        m.chain('chirpstack-mqtt-forwarder');

        s = m.section(form.TypedSection, 'sx1302', _('Configuration'));
        s.anonymous = true;

        // channels
        o = s.option(form.ListValue, 'channel_plan', _('Channel-plan'), _('Select the channel-plan to use. The selected channel-plan must be supported by your gateway.'));
        o.forcewrite = true;

        for (const region of options.regions) {
            for (const channelPlan of region.channelPlans) {
                o.value(channelPlan.id, channelPlan.name);
            }
        }

        o.write = function (section_id, formValue) {
            var regionId;
            for (const region of options.regions) {
                for (const channelPlan of region.channelPlans) {
                    if (channelPlan.id === formValue) {
                        regionId = region.id;
                    }
                }
            }

            uci.set('chirpstack-concentratord', section_id, 'channel_plan', formValue);
            uci.set('chirpstack-concentratord', section_id, 'region', regionId);
            uci.set('chirpstack-mqtt-forwarder', '@mqtt[0]', 'topic_prefix', formValue);
        }

        return m.render();
    },
});