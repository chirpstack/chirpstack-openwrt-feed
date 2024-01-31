'use strict';
'require view';
'require chirpstack-udp-forwarder as udpForwarder';

return view.extend({
    render: function () {
        return udpForwarder.renderForm('chirpstack-udp-forwarder');
    }
});
