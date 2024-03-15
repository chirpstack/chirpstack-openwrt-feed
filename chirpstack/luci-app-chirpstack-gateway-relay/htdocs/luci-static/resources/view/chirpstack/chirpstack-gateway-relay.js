'use strict';
'require view';
'require form';
'require uci';

return view.extend({
    render: function () {
        var m, s, o, ro, as;

        m = new form.Map('chirpstack-gateway-relay', _('ChirpStack Gateway Relay'), _('ChirpStack Gateway Relay turns a LoRa gateway into a Relay.'));
        m.tabbed = true;

        s = m.section(form.TypedSection, 'global', _('Global configuration'));
        s.anonymous = true;

        // Is enabled
        s.option(form.Flag, 'enabled', _('Enabled'), _('Enable ChirpStack Gateway Relay.'));

        // Region
        o = s.option(form.ListValue, 'region', _('Region'), _('This is the region used for the Relay Gateway to end-devices communication.'));
        o.value('eu868', 'EU868');
        o.value('us915', 'US915');

        s = m.section(form.TypedSection, 'relay', _('Relay configuration'));
        s.anonymous = true;

        // Region
        o = s.option(form.ListValue, 'region', _('Region'), _('This is the region used for Relay Gateway / Border Gateway communication. Changing this will update the Frequencies, Tx Power and Relay data-rate configuration to sane defaults. Please note that you might need to change the frequencies in case the region supports multiple sub-bands or if you have customized the channel configuration for that region.'));
        o.value('eu868', 'EU868');
        o.value('us915', 'US915');
        o.value('ism2400', 'ISM2400');

        o.onchange = function (target, section_id, value) {
            var frequencies = m.lookupOption('frequency', 'relay')[0].getUIElement('relay');
            var txPower = m.lookupOption('tx_power', 'relay')[0].getUIElement('relay');
            var modulation = m.lookupOption('modulation', 'relay_data_rate')[0].getUIElement('relay_data_rate');
            var spreadingFactor = m.lookupOption('spreading_factor', 'relay_data_rate')[0].getUIElement('relay_data_rate');
            var bandwidth = m.lookupOption('bandwidth', 'relay_data_rate')[0].getUIElement('relay_data_rate');
            var codeRate = m.lookupOption('code_rate', 'relay_data_rate')[0].getUIElement('relay_data_rate');

            if (value === 'eu868') {
                frequencies.setValue([
                    868100000,
                    868300000,
                    868500000,
                    867100000,
                    867300000,
                    867500000,
                    867900000,
                ]);
                txPower.setValue(16);
                modulation.setValue('LORA');
                spreadingFactor.setValue(10);
                bandwidth.setValue(125000);
                codeRate.setValue('4/5');
            } else if (value === 'us915') {
                frequencies.setValue([
                    902300000,
                    902500000,
                    902700000,
                    902900000,
                    903100000,
                    903300000,
                    903500000,
                    903700000,
                ]);
                txPower.setValue(21);
                modulation.setValue('LORA');
                spreadingFactor.setValue(10);
                bandwidth.setValue(125000);
                codeRate.setValue('4/5');
            } else if (value === 'ism2400') {
                frequencies.setValue([
                    2403000000,
                    2479000000,
                    2425000000,
                ]);
                txPower.setValue(10);
                modulation.setValue('LORA');
                spreadingFactor.setValue(12);
                bandwidth.setValue(812000);
                codeRate.setValue('4/8');
            }
        }

        // Is border gateway
        s.option(form.Flag, 'border_gateway', _('Border gateway'), _('A Border Gateway is connected to the internet and forwards received data to ChirpStack. In case this option is enabled, then the ChirpStack Gateway Relay will act as a proxy between the ChirpStack Concentratord and the ChirpStack MQTT Forwarder. In this case you must configure the ChirpStack MQTT Forwarder in the \'Relay\' tab.'));

        // Ignore direct uplinks
        s.option(form.Flag, 'border_gateway_ignore_direct_uplinks', _('Ignore direct uplinks'), _('Enable this to ignore direct uplinks. This is especially useful when testing the Gateway Relay and the end device is both close to the Relay and Border Gateway. Only applies to Border Gateways.'));

        // Frequencies
        o = s.option(form.DynamicList, 'frequency', _('Frequencies'), _('The ChirpStack Gateway Relay will randomly use one of the configured frequencies for Relay Gateway / Border Gateway communication.'));
        o.datatype = 'integer'

        // Tx Power
        o = s.option(form.Value, 'tx_power', _('Tx Power (EIRP)'), _('The Tx Power (EIRP) that will be used for Relay Gateway / Border Gateway communication.'));
        o.datatype = 'integer';

        s = m.section(form.TypedSection, 'relay_data_rate', _('Relay data-rate configuration'), _('These are the data-rate options that will be used for Relay Gateway / Border Gateway communication.'));
        s.anonymous = true;

        // Modulation
        o = s.option(form.ListValue, 'modulation', _('Modulation'));
        o.value('LORA', 'LoRa');
        o.value('FSK', 'FSK');

        // Spreading-factor
        o = s.option(form.Value, 'spreading_factor', _('Spreading-factor (LoRa)'));
        o.datatype = 'integer';

        // Bandwidth
        o = s.option(form.ListValue, 'bandwidth', _('Bandwidth'));
        o.value(125000, '125000 Hz (sub-GHz)');
        o.value(250000, '250000 Hz (sub-GHz)');
        o.value(500000, '500000 Hz (sub-GHz)');
        o.value(812000, '812000 Hz (2.4 GHz)');

        // Code-rate
        o = s.option(form.ListValue, 'code_rate', _('Code-rate (LoRa)'));
        o.value('4/5', '4/5 (sub-GHz)');
        o.value('4/8', '4/8 (2.4 GHz)');

        // Bitrate
        o = s.option(form.Value, 'bitrate', _('Bitrate (FSK)'));
        o.datatype = 'integer';

        s = m.section(form.TypedSection, 'backend_concentratord', _('Backend configuration'), _('This configures the slot that is used for communication with the end-devices.'));
        s.anonymous = true;

        // Event url + Command url
        o = s.option(form.ListValue, 'event_url', _('Slot'));
        o.value('ipc:///tmp/concentratord_event', 'Concentratord (single slot gateway)');
        o.value('ipc:///tmp/concentratord_slot1_event', 'Concentratord - Slot 1');
        o.value('ipc:///tmp/concentratord_slot2_event', 'Concentratord - Slot 2');

        o.onchange = function (target, section_id, value) {
            uci.set('chirpstack-gateway-relay', section_id, 'command_url', value.replace("_event", "_command"));
        }

        s = m.section(form.TypedSection, 'backend_relay_concentratord', _('Relay Backend configuration'), _('This configures the slot that is used for Relay Gateway and Border Gateway communication.'));
        s.anonymous = true;

        // Event url + Command url
        o = s.option(form.ListValue, 'event_url', _('Slot'));
        o.value('ipc:///tmp/concentratord_event', 'Concentratord (single slot gateway)');
        o.value('ipc:///tmp/concentratord_slot1_event', 'Concentratord - Slot 1');
        o.value('ipc:///tmp/concentratord_slot2_event', 'Concentratord - Slot 2');

        o.onchange = function (target, section_id, value) {
            uci.set('chirpstack-gateway-relay', section_id, 'command_url', value.replace("_event", "_command"));
        }


        return m.render();
    }
});