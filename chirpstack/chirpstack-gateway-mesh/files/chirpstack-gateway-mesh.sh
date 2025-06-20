. /lib/functions.sh

configure() {
	local config_name="$1"
	mkdir -p /var/etc/$config_name
	config_load "$config_name"

	config_foreach conf_rule_global "global" "$config_name"
	config_foreach conf_rule_mesh "mesh" "$config_name"
	config_foreach conf_rule_mesh_data_rate "mesh_data_rate" "$config_name"
	config_foreach conf_rule_backend_concentratord "backend_concentratord" "$config_name"
	config_foreach conf_rule_backend_mesh_concentratord "backend_mesh_concentratord" "$config_name"

	conf_rule_events_commands "$config_name"
	config_foreach conf_rule_events_set "events_sets" "$config_name"
	conf_rule_commands_commands "$config_name"
}

conf_rule_global() {
	local cfg="$1"
	local config_name="$2"
	local region

	config_get region $cfg region

	cp /etc/chirpstack-gateway-mesh/region_$region.toml /var/etc/$config_name/region.toml
  cat > /var/etc/$config_name/chirpstack-gateway-mesh.toml <<- EOF
		[logging]
			log_level="INFO"
			log_to_syslog=true
	EOF
}

conf_rule_mesh() {
	local cfg="$1"
	local config_name="$2"
	local border_gateway border_gateway_ignore_direct_uplinks tx_power max_hop_count root_key

	config_get_bool border_gateway $cfg border_gateway
	config_get_bool border_gateway_ignore_direct_uplinks $cfg border_gateway_ignore_direct_uplinks
	config_get tx_power $cfg tx_power
	config_get max_hop_count $cfg max_hop_count
  config_get root_key $cfg root_key

	if [ "$border_gateway" = "1" ]; then
		border_gateway="true"
	else
		border_gateway="false"
	fi

	if [ "$border_gateway_ignore_direct_uplinks" = "1" ]; then
		border_gateway_ignore_direct_uplinks="true"
	else
		border_gateway_ignore_direct_uplinks="false"
	fi

	cat >> /var/etc/$config_name/chirpstack-gateway-mesh.toml <<- EOF
		[mesh]
			root_key="$root_key"
			border_gateway=$border_gateway
			max_hop_count=$max_hop_count
			border_gateway_ignore_direct_uplinks=$border_gateway_ignore_direct_uplinks
			tx_power=$tx_power
			frequencies=[
	EOF

	config_list_foreach $cfg frequency conf_arg_int "$config_name"

	cat >> /var/etc/$config_name/chirpstack-gateway-mesh.toml <<- EOF
			]
	EOF
}

conf_rule_mesh_data_rate() {
	local cfg="$1"
	local config_name="$2"
	local modulation spreading_factor bandwidth code_rate bitrate

	config_get modulation $cfg modulation
	config_get spreading_factor $cfg spreading_factor
	config_get bandwidth $cfg bandwidth
	config_get code_rate $cfg code_rate
	config_get bitrate $cfg bitrate

	cat >> /var/etc/$config_name/chirpstack-gateway-mesh.toml <<- EOF
		[mesh.data_rate]
			modulation="$modulation"
			spreading_factor=$spreading_factor
			bandwidth=$bandwidth
			code_rate="$code_rate"
			bitrate=$bitrate
	EOF
}

conf_rule_backend_concentratord() {
	local cfg="$1"
	local config_name="$2"
	local event_url command_url

	config_get event_url $cfg event_url
	config_get command_url $cfg command_url

	cat >> /var/etc/$config_name/chirpstack-gateway-mesh.toml <<- EOF
		[backend.concentratord]
			event_url="$event_url"
			command_url="$command_url"
	EOF
}

conf_rule_backend_mesh_concentratord() {
	local cfg="$1"
	local config_name="$2"
	local event_url command_url

	config_get event_url $cfg event_url
	config_get command_url $cfg command_url

	cat >> /var/etc/$config_name/chirpstack-gateway-mesh.toml <<- EOF
		[backend.mesh_concentratord]
			event_url="$event_url"
			command_url="$command_url"
	EOF
}

conf_rule_events_commands() {
	echo "[events.commands]" >> /var/etc/chirpstack-gateway-mesh/chirpstack-gateway-mesh.toml
	config_foreach conf_rule_events_commands_command "events_commands" $config_name
}

conf_rule_events_commands_command() {
	local cfg="$1"
	local config_name="$2"
	local len

	# Get number of command arguments.
	config_get len $cfg command_LENGTH
  [ -z "$len" ] && return 0

  echo -n "$cfg=[" >> /var/etc/chirpstack-gateway-mesh/chirpstack-gateway-mesh.toml
	config_list_foreach $cfg command conf_arg_str "$config_name"
  echo "]" >> /var/etc/chirpstack-gateway-mesh/chirpstack-gateway-mesh.toml
}

conf_rule_events_set() {
	local cfg="$1"
	local config_name="$2"
	local len
	local interval_sec

	# Get number of events in the set.
	config_get len $cfg event_LENGTH
  [ -z "$len" ] && return 0

	config_get interval_sec $cfg interval_sec

	cat >> /var/etc/chirpstack-gateway-mesh/chirpstack-gateway-mesh.toml <<- EOF
		[[events.sets]]
			interval="${interval_sec}s"
			events=[
	EOF

	config_list_foreach $cfg event conf_arg_int "$config_name"

	echo "]" >> /var/etc/chirpstack-gateway-mesh/chirpstack-gateway-mesh.toml
}

conf_rule_commands_commands() {
	echo "[commands.commands]" >> /var/etc/chirpstack-gateway-mesh/chirpstack-gateway-mesh.toml
	config_foreach conf_rule_commands_commands_command "commands_commands" $config_name
}

conf_rule_commands_commands_command() {
	local cfg="$1"
	local config_name="$2"
	local len

	# Get number of command args.
	config_get len $cfg command_LENGTH
  [ -z "$len" ] && return 0

  echo -n "$cfg=[" >> /var/etc/chirpstack-gateway-mesh/chirpstack-gateway-mesh.toml
	config_list_foreach $cfg command conf_arg_str "$config_name"
  echo "]" >> /var/etc/chirpstack-gateway-mesh/chirpstack-gateway-mesh.toml
}

conf_arg_str() {
  echo -n "\"$1\"", >>/var/etc/chirpstack-gateway-mesh/chirpstack-gateway-mesh.toml
}

conf_arg_int() {
  echo -n "$1", >>/var/etc/chirpstack-gateway-mesh/chirpstack-gateway-mesh.toml
}
