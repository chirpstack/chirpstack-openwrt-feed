. /lib/functions.sh

configure() {
    local config_name="$1"

    mkdir -p /var/etc/$config_name
    echo "" > /var/etc/$config_name/chirpstack-udp-forwarder.toml

	cat >> /var/etc/$config_name/chirpstack-udp-forwarder.toml <<- EOF
		[concentratord]
		event_url="ipc:///tmp/concentratord_event"
		command_url="ipc:///tmp/concentratord_command"

		[udp_server]
		log_to_syslog=true
	EOF

	config_load "$config_name"
	config_foreach conf_rule_server "server" "$config_name"
}

conf_rule_server() {
	local cfg="$1"
    local config_name="$2"
	local server

	config_get server $cfg server

	cat >> /var/etc/$config_name/chirpstack-udp-forwarder.toml <<- EOF
		[[udp_forwarder.servers]]
		server="$server"
	EOF
}
