'use strict';
'require view';
'require form';
'require uci';

return view.extend({
    render: function () {
        var m, s, o, ro, as;

        m = new form.Map('chirpstack-udp-forwarder', _('ChirpStack UDP Forwarder'), _('ChirpStack UDP Forwarder forwards data received by the ChirpStack Concentratord to one or multiple UDP endpoints (Semtech UDP Packet Forwarder compatible).'));
        m.tabbed = true;

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