'use strict';
'require view';
'require chirpstack-mqtt-forwarder as mqttForwarder';

return view.extend({
  render: function() {
    return mqttForwarder.renderForm('chirpstack-mqtt-forwarder-mesh');
  }
});
