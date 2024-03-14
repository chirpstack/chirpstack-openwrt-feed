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
        s.option(form.Flag, 'enabled', _('Enabled'), _('Enable ChirpStack Gateway Relay'));

        // Region
        o = s.option(form.ListValue, 'region', _('Region'));
        o.value('eu868', 'EU868');
        o.value('us915', 'US915');

        s = m.section(form.TypedSection, 'relay', _('Relay configuration'));
        s.anonymous = true;

        // Is border gateway
        s.option(form.Flag, 'border_gateway', _('Border gateway'), _('A Border Gateway is connected to the internet and forwards received data to ChirpStack'));

        // Ignore direct uplinks
        s.option(form.Flag, 'border_gateway_ignore_direct_uplinks', _('Ignore direct uplinks'), _('Enable this to ignore direct uplinks. This is especially useful when testing the Gateway Relay and the end device is both close to the Relay and Border Gateway. Only applies to Border Gateways.'));

        // Frequencies
        o = s.option(form.DynamicList, 'frequency', _('Frequency'), _('The ChirpStack Gateway Relay will randomly use one of the configured frequencies'));
        o.datatype = 'integer'

        // Tx Power
        o = s.option(form.Value, 'tx_power', _('Tx Power (EIRP)'));
        o.datatype = 'integer';

        s = m.section(form.TypedSection, 'relay_data_rate', _('Relay data-rate configuration'));
        s.anonymous = true;

        // Modulation
        o = s.option(form.ListValue, 'modulation', _('Modulation'));
        o.value('LORA', 'LoRa');
        o.value('FSK', 'FSK');

        // Spreading-factor
        o = s.option(form.Value, 'spreading_factor', _('Spreading-factor (LoRa)'));
        o.datatype = 'integer';

        // Bandwidth
        o = s.option(form.Value, 'bandwidth', _('Bandwidth'));
        o.datatype = 'integer';

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