. /lib/functions.sh

configure() {
  local config_name="$1"

  mkdir -p /var/etc/$config_name
  echo "" >/var/etc/$config_name/chirpstack-mqtt-forwarder.toml

  cat >>/var/etc/$config_name/chirpstack-mqtt-forwarder.toml <<-EOF
		[logging]
			log_to_syslog=true
		
		[backend]
			enabled="concentratord"
	EOF

  config_load "$config_name"
  config_foreach conf_rule_concentratord "concentratord" "$config_name"
  config_foreach conf_rule_mqtt "mqtt" "$config_name"
  config_foreach conf_rule_filters "filters" "$config_name"

  conf_rule_commands "$config_name"
  conf_rule_metadata "$config_name"
}

conf_rule_concentratord() {
  local cfg="$1"
  local config_name="$2"
  local event_url command_url

  config_get event_url $cfg event_url
  config_get command_url $cfg command_url

  cat >>/var/etc/$config_name/chirpstack-mqtt-forwarder.toml <<-EOF
		[backend.concentratord]
	EOF

  if [ "$event_url" != "" ]; then
    echo "event_url=\"$event_url\"" >>/var/etc/$config_name/chirpstack-mqtt-forwarder.toml
  fi

  if [ "$command_url" != "" ]; then
    echo "command_url=\"$command_url\"" >>/var/etc/$config_name/chirpstack-mqtt-forwarder.toml
  fi
}

conf_rule_mqtt() {
  local cfg="$1"
  local config_name="$2"
  local topic_prefix json server username password qos clean_session client_id ca_cert tls_cert tls_key

  config_get topic_prefix $cfg topic_prefix
  config_get json $cfg json
  config_get server $cfg server
  config_get username $cfg username
  config_get password $cfg password
  config_get qos $cfg qos
  config_get_bool clean_session $cfg clean_session
  config_get client_id $cfg client_id
  config_get ca_cert $cfg ca_cert
  config_get tls_cert $cfg tls_cert
  config_get tls_key $cfg tls_key

  if [ "$json" = "1" ]; then
    json="true"
  else
    json="false"
  fi

  if [ "$clean_session" = "1" ]; then
    clean_session="true"
  else
    clean_session="false"
  fi

  if [ "$ca_cert" != "" ]; then
    echo "$ca_cert" >/var/etc/$config_name/ca.pem
    ca_cert="/var/etc/$config_name/ca.pem"
  fi

  if [ "$tls_cert" != "" ]; then
    echo "$tls_cert" >/var/etc/$config_name/cert.pem
    tls_cert="/var/etc/$config_name/cert.pem"
  fi

  if [ "$tls_key" != "" ]; then
    echo "$tls_key" >/var/etc/$config_name/key.pem
    tls_key="/var/etc/$config_name/key.pem"
  fi

  cat >>/var/etc/$config_name/chirpstack-mqtt-forwarder.toml <<-EOF
		[mqtt]
			topic_prefix="$topic_prefix"
			json=$json
			server="$server"
			username="$username"
			password="$password"
			qos=$qos
			clean_session=$clean_session
			client_id="$client_id"
			ca_cert="$ca_cert"
			tls_cert="$tls_cert"
			tls_key="$tls_key"
	EOF
}

conf_rule_filters() {
  local cfg="$1"
  local config_name="$2"

  cat >>/var/etc/$config_name/chirpstack-mqtt-forwarder.toml <<-EOF
		[backend.filters]
			dev_addr_prefixes=[
	EOF

  config_list_foreach $cfg dev_addr_prefix conf_rule_dev_addr_prefix "$config_name"

  cat >>/var/etc/$config_name/chirpstack-mqtt-forwarder.toml <<-EOF
		]
	EOF

  cat >>/var/etc/$config_name/chirpstack-mqtt-forwarder.toml <<-EOF
			join_eui_prefixes=[
	EOF

  config_list_foreach $cfg join_eui_prefix conf_rule_join_eui_prefix "$config_name"

  cat >>/var/etc/$config_name/chirpstack-mqtt-forwarder.toml <<-EOF
		]
	EOF
}

conf_rule_dev_addr_prefix() {
  local config_name="$2"
  cat >>/var/etc/$config_name/chirpstack-mqtt-forwarder.toml <<-EOF
		"$1",
	EOF
}

conf_rule_join_eui_prefix() {
  local config_name="$2"
  cat >>/var/etc/$config_name/chirpstack-mqtt-forwarder.toml <<-EOF
		"$1",
	EOF
}

# Convert uci config metadata to chirpstack-mqtt-forwarder.toml
# config metadata 'datetime'
#		 option command 'datetime=["date", "-R"]'
#
# config metadata 'serial_number'
#		 option static '1234'
conf_rule_metadata() {
  local config_name="$1"

  cat >>/var/etc/$config_name/chirpstack-mqtt-forwarder.toml <<-EOF
		[metadata.static]
	EOF

  config_foreach conf_metadata_static "metadata" "$config_name"

  cat >>/var/etc/$config_name/chirpstack-mqtt-forwarder.toml <<-EOF
		[metadata.commands]
	EOF

  config_foreach conf_command "metadata" "$config_name"

}

# Foreach config 'type' 'key'
# Find option static and generate key=value
conf_metadata_static() {
  local cfg="$1"
  local config_name="$2"

  local static

  config_get static $cfg static

  if [ "$static" != "" ]; then
    echo "$cfg=\"$static\"" >>/var/etc/$config_name/chirpstack-mqtt-forwarder.toml
  fi
}

# Convert uci config commands to chirpstack-mqtt-forwarder.toml
# config commands 'reboot'
#		 option command '["/usr/bin/reboot"]'
#
# config commands 'shutdown'
#		 option command '["/usr/bin/shutdown"]'
conf_rule_commands() {
  local config_name="$1"

  cat >>/var/etc/$config_name/chirpstack-mqtt-forwarder.toml <<-EOF
		[commands]
	EOF

  config_foreach conf_command "commands" "$config_name"
}

# Foreach config 'type' 'key'
# Find option command and generate key=array
# example datetime=["date", "-R"]
# Foreach config 'type' 'key'
# Find option command and generate key=array
# example datetime=["date", "-R"]
conf_command() {
  local cfg="$1"
  local config_name="$2"

  local len

  # return number of option 'command' in $cfg if option is empty return nothing
  config_get len $cfg command_LENGTH

  [ -z "$len" ] && return 0

  echo -n "$cfg=[" >>/var/etc/$config_name/chirpstack-mqtt-forwarder.toml

  # foreach list command 'value'
  config_list_foreach $cfg command conf_command_arg "$config_name"

  echo "]" >>/var/etc/$config_name/chirpstack-mqtt-forwarder.toml
}

conf_command_arg() {
  local config_name="$2"

  echo -n "\"$1\"", >>/var/etc/$config_name/chirpstack-mqtt-forwarder.toml
}
