'use strict';
'require baseclass';
'require form';
'require uci';

return baseclass.extend({
    /*
        This renders the ChirpStack Concentratord configuration form using
        the provided options.
    */
    renderForm: function (concentratordConfig, mqttForwarderConfig, options) {
        var m, s, o, ro, as;

        function isVisible(fieldName) {
            return (options.hideFields === undefined) || (options.hideFields[fieldName] === undefined) || (!options.hideFields[fieldName]);
        };

        m = new form.Map(concentratordConfig, _('ChirpStack Concentratord'),
            _('ChirpStack Concentratord provides an unified API interface to LoRa(R) concentrator hardware. Please refer to the <a target="_blank" href="https://www.chirpstack.io/docs/chirpstack-concentratord/hardware-support.html">ChirpStack Concentratord Hardware</a> page for supported hardware and configuration options.'));
        m.chain(mqttForwarderConfig);
        m.chain('chirpstack');

        m.tabbed = true;
        s = m.section(form.TypedSection, 'global', _('Global configuration'));
        s.anonymous = true;

        // global options
        s.option(form.Flag, 'enabled', _('Enabled'), _('Enable ChirpStack Concentratord'));

        o = s.option(form.ListValue, 'chipset', _('Enabled chipset'), _('This value must match the chipset of your LoRa(R) shield. You must also configure the chipset specific options.'));
        for (const chipset of options.chipsets) {
            o.value(chipset.id, chipset.name);
        }

        // chipset options
        for (const chipset of options.chipsets) {
            s = m.section(form.TypedSection, chipset.id, chipset.name, _('Configure the fields below if you have selected the ' + chipset.name + ' chipset.'));
            s.anonymous = true;

            // antenna gain
            o = s.option(form.Value, 'antenna_gain', _('Antenna gain (dBi)'));
            o.datatype = 'uinteger';

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
            o = s.option(form.ListValue, 'channel_plan', _('Channel-plan'), _('Select the channel-plan to use. This must be supported by the selected shield.'));
            o.forcewrite = true;

            for (const region of options.regions) {
                if (chipset.id !== "2g4" || region.id === "ISM2400") {
                    for (const channelPlan of region.channelPlans) {
                        o.value(channelPlan.id, channelPlan.name);
                    }
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

                uci.set(concentratordConfig, section_id, 'channel_plan', formvalue);
                uci.set(concentratordConfig, section_id, 'region', regionId);

                const chipset = uci.get(concentratordConfig, '@global[0]', 'chipset');
                const region = uci.get(concentratordConfig, `@${chipset}[0]`, 'channel_plan');

                uci.set(mqttForwarderConfig, '@mqtt[0]', 'topic_prefix', region);
                uci.set('chirpstack', '@network[0]', 'enabled_regions', [region]);
            };

            // gateway id
            if (chipset.id === "sx1301") {
                o = s.option(form.Value, 'gateway_id', _('Gateway ID'), _('Enter the ID of the gateway. Example: 0102030405060708'));
                o.validate = function (section_id, value) {
                    if (!value.match(/[0-9a-fA-F]{16}/)) {
                        return "Gateway ID is not valid, example value: 0102030405060708";
                    }

                    return true;
                }
            }

            // flags
            if (isVisible('gnss')) {
                if (chipset.id === 'sx1301' || chipset.id === 'sx1302') {
                    s.option(form.Flag, 'gnss', _('GNSS'), _('Enable this in case the shield has a uBlox GNSS module.'));
                }
            }
            if (isVisible('usb')) {
                if (chipset.id === 'sx1302') {
                    s.option(form.Flag, 'usb', _('USB'), _('Enable this in case the shield is connected over USB rather than SPI.'));
                }
            }

            if (chipset.com_dev_paths !== undefined) {
                o = s.option(form.ListValue, 'com_dev_path', _('Comm. device path'), _('Select the communication device path of the device'));
                for (const com_dev_path of chipset.com_dev_paths) {
                    o.value(com_dev_path.path, com_dev_path.name);
                }

                o.validate = function (section_id, value) {
                    if (chipset.id === 'sx1302') {
                        const usb = m.lookupOption('usb', section_id)[0].formvalue(section_id) === '1';

                        for (const com_dev_path of chipset.com_dev_paths) {
                            if (com_dev_path.path == value) {
                                if (com_dev_path.usb !== usb) {
                                    if (usb) {
                                        return "The device path is not supported for USB";
                                    } else {
                                        return "The device path is not supported for SPI";
                                    }
                                }
                            }
                        }
                    }

                    return true;
                }
            }

            if (chipset.i2c_dev_paths !== undefined) {
                o = s.option(form.ListValue, 'i2c_dev_path', _('I2C device path'), _('Select the I2C device path of the device'));
                for (const i2c_dev_path of chipset.i2c_dev_paths) {
                    o.value(i2c_dev_path.path, i2c_dev_path.name);
                }

                o.validate = function (section_id, value) {
                    const usb = m.lookupOption('usb', section_id)[0].formvalue(section_id) === '1';

                    for (const i2c_dev_path of chipset.i2c_dev_paths) {
                        if (i2c_dev_path.path == value) {
                            if (i2c_dev_path.usb !== usb) {
                                if (usb) {
                                    return "The device path is not supported for USB";
                                } else {
                                    return "The device path is not supported for SPI";
                                }
                            }
                        }
                    }

                    return true;
                }
            }
        }

        return m.render();
    },
});
