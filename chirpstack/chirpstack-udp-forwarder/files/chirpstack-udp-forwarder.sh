. /lib/functions.sh

configure() {
    local config_name="$1"

    mkdir -p /var/etc/$config_name
    echo "" > /var/etc/$config_name/chirpstack-udp-forwarder.toml

	cat >> /var/etc/$config_name/chirpstack-udp-forwarder.toml <<- EOF
		[udp_server]
		log_to_syslog=true
	EOF

	config_load "$config_name"
	config_foreach conf_rule_concentratord "concentratord" "$config_name"
	config_foreach conf_rule_server "server" "$config_name"
}

conf_rule_concentratord() {
	local cfg="$1"
	local config_name="$2"
	local event_url command_url

	config_get event_url $cfg event_url
	config_get command_url $cfg command_url

	cat >> /var/etc/$config_name/chirpstack-udp-forwarder.toml <<- EOF
		[concentratord]
	EOF

	if [ "$event_url" != "" ]; then
		echo "event_url=\"$event_url\"" >> /var/etc/$config_name/chirpstack-udp-forwarder.toml
	fi

	if [ "$command_url" != "" ]; then
		echo "command_url=\"$command_url\"" >> /var/etc/$config_name/chirpstack-udp-forwarder.toml
	fi
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
