'use strict';
'require view';
'require form';
'require uci';

return view.extend({
    render: function () {
        var m, s, o, ro, as;

        m = new form.Map('chirpstack-rest-api', _('ChirpStack REST API'), _('ChirpStack REST API allows access to ChirpStack configuration via REST.'));

        s = m.section(form.TypedSection, 'global', _('Global settings'));
        s.anonymous = true;

        s.option(form.Flag, 'enabled', _('Enabled'), _('Enable ChirpStack REST API'));

        return m.render();
    }
});