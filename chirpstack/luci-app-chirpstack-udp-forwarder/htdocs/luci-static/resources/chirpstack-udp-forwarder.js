'use strict';
'require baseclass';
'require form';
'require uci';

return baseclass.extend({
    /*
        This renders the Chirpstack UDP Forwarder configuration form
        using the provided options.
    */
    renderForm: function (udpForwarderConfig) {
        var m, s, o, ro, as;

        m = new form.Map(udpForwarderConfig, _('ChirpStack UDP Forwarder'), _('ChirpStack UDP Forwarder forwards data received by the ChirpStack Concentratord to one or multiple UDP endpoints (Semtech UDP Packet Forwarder compatible).'));
        m.tabbed = true;

        s = m.section(form.TypedSection, 'global', _('Global configuration'));
        s.anonymous = true;

        // Is enabled
        s.option(form.Flag, 'enabled', _('Enabled'), _('Enable ChirpStack UDP Forwarder'));

        s = m.section(form.TypedSection, 'server', _('Servers'));
        s.anonymous = true;
        s.addremove = true;
        s.tabbed = true;

        // server
        o = s.option(form.Value, 'server', _('Server'), _('Server handling UDP data, example: localhost:1700'));
        o.validate = function (section_id, value) {
            if (value.length > 0) {
                return true;
            }

            return 'Please enter a hostname:port';
        }

        return m.render();
    }
});