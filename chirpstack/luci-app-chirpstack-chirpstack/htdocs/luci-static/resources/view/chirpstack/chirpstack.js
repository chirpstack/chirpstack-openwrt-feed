'use strict';
'require view';
'require form';
'require uci';

return view.extend({
    render: function () {
        var m, s, o, ro, as;

        m = new form.Map('chirpstack', _('ChirpStack'), _('ChirpStack is an open-source LoRaWAN(R) Network Server.'));
        m.tabbed = true;

        s = m.section(form.TypedSection, 'network', _('Network'));
        s.anonymous = true;

        // net_id
        o = s.option(form.Value, 'net_id', _('NetID'), _('NetID to use (000000 and 000001 can be freely used for testing and private networks)'));
        o.validate = function (section_id, value) {
            if (value.match(/^[a-fA-F0-9]{6}$/)) {
                return true;
            }

            return "Enter a valid NetID";
        };

        // enabled regions
        o = s.option(form.DynamicList, 'enabled_regions', _('Enabled regions'), _('The entered values must match the regions as configured in the ChirpStack configuration files.'));
        o.validate = function (section_id, value) {
            if (value.match(/^[\w\_\-]*$/)) {
                return true;
            }

            return "Enter a valid region identifier.";
        };

        return m.render();
    }
});