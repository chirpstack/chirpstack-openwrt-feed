'use strict';
'require uci';
'require view';

return view.extend({
    handleSaveApply: null,
    handleSave: null,
    handleReset: null,
    render: function () {
        const apps = [
            {
                name: "ChirpStack",
                url: "/apps/chirpstack/",
                logo: "/luci-static/chirpstack/chirpstack.png",
            },
            {
                name: "Node-RED",
                url: "/apps/node-red/",
                logo: "/luci-static/chirpstack/node-red.png",
            },
        ];

        var body = E([
            E('h2', _('Applications')),
            E('div', { 'class': 'cbi-map-descr' }, _('You can open the web-interface of the below applications by clicking on the icon. If this is the first time you are using the ChirpStack Gateway OS, please do not forget to configure your shield first. You can do this under the ChirpStack > Concentratord menu item.')),
        ]);

        var appContainer = E('dev');

        for (const app of apps) {
            appContainer.appendChild(E('a', { 'href': app.url, 'target': '_blank' }, [E('img', { 'src': app.logo, 'style': "width: 320px; height: 135px; margin: 25px; background: white; box-shadow: 0 4px 8px rgba(0,0,0,0.03);" })]));
        }

        body.appendChild(appContainer);

        return body;
    }
});