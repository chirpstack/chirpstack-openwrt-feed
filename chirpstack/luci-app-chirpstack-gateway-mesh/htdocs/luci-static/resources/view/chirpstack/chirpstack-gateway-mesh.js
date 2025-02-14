'use strict';
'require view';
'require form';
'require uci';

return view.extend({
  render: function() {
    var m, s, o, ro, as;

    m = new form.Map('chirpstack-gateway-mesh', _('ChirpStack Gateway Mesh'), _('ChirpStack Gateway Mesh turns a LoRa gateway into a Border or Relay Gateway.'));
    m.tabbed = true;

    s = m.section(form.TypedSection, 'global', _('Global configuration'));
    s.anonymous = true;

    // Is enabled
    s.option(form.Flag, 'enabled', _('Enabled'), _('Enable ChirpStack Gateway Mesh.'));

    // Region
    o = s.option(form.ListValue, 'region', _('Region'), _('This is the region used for the Relay Gateway to end-devices communication.'));
    o.value('as923', 'AS923');
    o.value('as923_2', 'AS923-2');
    o.value('as923_3', 'AS923-3');
    o.value('as923_4', 'AS923-4');
    o.value('eu868', 'EU868');
    o.value('in865', 'IN865');
    o.value('us915', 'US915');

    s = m.section(form.TypedSection, 'mesh', _('Mesh configuration'));
    s.anonymous = true;

    // Region
    o = s.option(form.ListValue, 'region', _('Region'), _('This is the region used for Relay Gateway / Border Gateway communication. Changing this will update the Frequencies, Tx Power and Mesh data-rate configuration to sane defaults. Please note that you might need to change the frequencies in case the region supports multiple sub-bands or if you have customized the channel configuration for that region.'));
    o.value('as923', 'AS923');
    o.value('as923_2', 'AS923-2');
    o.value('as923_3', 'AS923-3');
    o.value('as923_4', 'AS923-4');
    o.value('eu868', 'EU868');
    o.value('in865', 'IN865');
    o.value('us915', 'US915');
    o.value('ism2400', 'ISM2400');

    o.onchange = function(target, section_id, value) {
      var frequencies = m.lookupOption('frequency', 'mesh')[0].getUIElement('mesh');
      var txPower = m.lookupOption('tx_power', 'mesh')[0].getUIElement('mesh');
      var modulation = m.lookupOption('modulation', 'mesh_data_rate')[0].getUIElement('mesh_data_rate');
      var spreadingFactor = m.lookupOption('spreading_factor', 'mesh_data_rate')[0].getUIElement('mesh_data_rate');
      var bandwidth = m.lookupOption('bandwidth', 'mesh_data_rate')[0].getUIElement('mesh_data_rate');
      var codeRate = m.lookupOption('code_rate', 'mesh_data_rate')[0].getUIElement('mesh_data_rate');

      const presets = {
        'as923': {
          frequencies: [
            923200000,
            923400000,
          ],
          txPower: 16,
          modulation: 'LORA',
          spreadingFactor: 10,
          bandwidth: 125000,
          codeRate: '4/5',
        },
        'as923_2': {
          frequencies: [
            921400000,
            921600000,
          ],
          txPower: 16,
          modulation: 'LORA',
          spreadingFactor: 10,
          bandwidth: 125000,
          codeRate: '4/5',
        },
        'as923_3': {
          frequencies: [
            916600000,
            916800000,
          ],
          txPower: 16,
          modulation: 'LORA',
          spreadingFactor: 10,
          bandwidth: 125000,
          codeRate: '4/5',
        },
        'as923_4': {
          frequencies: [
            917300000,
            917500000,
          ],
          txPower: 16,
          modulation: 'LORA',
          spreadingFactor: 10,
          bandwidth: 125000,
          codeRate: '4/5',
        },
        'eu868': {
          frequencies: [
            868100000,
            868300000,
            868500000,
            867100000,
            867300000,
            867500000,
            867900000,
          ],
          txPower: 16,
          modulation: 'LORA',
          spreadingFactor: 10,
          bandwidth: 125000,
          codeRate: '4/5',
        },
        'in865': {
          frequencies: [
            865062500,
            865402500,
            865985000,
          ],
          txPower: 30,
          modulation: 'LORA',
          spreadingFactor: 10,
          bandwidth: 125000,
          codeRate: '4/5',
        },
        'us915': {
          frequencies: [
            902300000,
            902500000,
            902700000,
            902900000,
            903100000,
            903300000,
            903500000,
            903700000,
          ],
          txPower: 21,
          modulation: 'LORA',
          spreadingFactor: 10,
          bandwidth: 125000,
          codeRate: '4/5',
        },
        'ism2400': {
          frequencies: [
            2403000000,
            2479000000,
            2425000000,
          ],
          txPower: 10,
          modulation: 'LORA',
          spreadingFactor: 12,
          bandwidth: 812000,
          codeRate: '4/8',
        },
      };

      frequencies.setValue(presets[value].frequencies);
      txPower.setValue(presets[value].txPower);
      modulation.setValue(presets[value].modulation);
      spreadingFactor.setValue(presets[value].spreadingFactor);
      bandwidth.setValue(presets[value].bandwidth);
      codeRate.setValue(presets[value].codeRate);
    }

    // Signing key
    o = s.option(form.Value, 'signing_key', _('Signing key'), _('Signing key used to sign and validate mesh payloads. The same key must be configured for all Border / Relay Gateways. The format of the key is an 128 bit HEX string (e.g. 00000000000000000000000000000000).'));
    o.password = true;
    o.validate = function(section_id, value) {
      if (value.match(/[0-9a-fA-F]{32}/g)) {
        return true;
      } else {
        return "A 128 bit HEX string is expected, e.g. 00000000000000000000000000000000";
      }
    }

    // Is border gateway
    s.option(form.Flag, 'border_gateway', _('Border gateway'), _('A Border Gateway is connected to the internet and forwards received data to ChirpStack. In case this option is enabled, then the ChirpStack Gateway Mesh will act as a proxy between the ChirpStack Concentratord and the ChirpStack MQTT Forwarder. In this case you must configure the ChirpStack MQTT Forwarder in the \'Mesh\' tab.'));

    // Ignore direct uplinks
    s.option(form.Flag, 'border_gateway_ignore_direct_uplinks', _('Ignore direct uplinks'), _('Enable this to ignore direct uplinks. This is especially useful when testing the Gateway Mesh and the end device is both close to the Relay and Border Gateway. Only applies to Border Gateways.'));

    // Max hop count
    o = s.option(form.Value, 'max_hop_count', _('Max. hop count'), _('The maximum number of times a frame will be repeated (valid options: 1 - 8)'));
    o.datatype = 'integer';

    // Frequencies
    o = s.option(form.DynamicList, 'frequency', _('Frequencies'), _('The ChirpStack Gateway Mesh will randomly use one of the configured frequencies for Relay Gateway / Border Gateway communication.'));
    o.datatype = 'integer'

    // Tx Power
    o = s.option(form.Value, 'tx_power', _('Tx Power (EIRP)'), _('The Tx Power (EIRP) that will be used for Relay Gateway / Border Gateway communication.'));
    o.datatype = 'integer';

    s = m.section(form.TypedSection, 'mesh_data_rate', _('Mesh data-rate configuration'), _('These are the data-rate options that will be used for Relay Gateway / Border Gateway communication.'));
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

    o.onchange = function(target, section_id, value) {
      uci.set('chirpstack-gateway-mesh', section_id, 'command_url', value.replace("_event", "_command"));
    }

    s = m.section(form.TypedSection, 'backend_mesh_concentratord', _('Mesh Backend configuration'), _('This configures the slot that is used for Relay Gateway and Border Gateway communication.'));
    s.anonymous = true;

    // Event url + Command url
    o = s.option(form.ListValue, 'event_url', _('Slot'));
    o.value('ipc:///tmp/concentratord_event', 'Concentratord (single slot gateway)');
    o.value('ipc:///tmp/concentratord_slot1_event', 'Concentratord - Slot 1');
    o.value('ipc:///tmp/concentratord_slot2_event', 'Concentratord - Slot 2');

    o.onchange = function(target, section_id, value) {
      uci.set('chirpstack-gateway-mesh', section_id, 'command_url', value.replace("_event", "_command"));
    }


    return m.render();
  }
});
