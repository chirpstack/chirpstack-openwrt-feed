. /lib/functions.sh

configure() {
	local config_name="$1"
	mkdir -p /var/etc/$config_name
	config_load "$config_name"
	config_foreach conf_rule_global "global" "$config_name"
}

conf_rule_global() {
	local cfg="$1"
	local config_name="$2"
	local chipset

	config_get chipset $cfg chipset
	CHIPSET="$chipset"

	if [ "$chipset" = "sx1301" ]; then
		config_foreach conf_rule_sx1301 "sx1301" "$config_name"
	fi

	if [ "$chipset" = "sx1302" ]; then
		config_foreach conf_rule_sx1302 "sx1302" "$config_name"
	fi

	if [ "$chipset" = "2g4" ]; then
		config_foreach conf_rule_2g4 "2g4" "$config_name"
	fi
}

conf_rule_sx1301() {
	local cfg="$1"
	local config_name="$2"
	local model region channel_plan gnss gateway_id
	local model_flags antenna_gain
	local sx1301_reset_pin

	config_get model $cfg model
	config_get region $cfg region
	config_get channel_plan $cfg channel_plan
	config_get gnss $cfg gnss
	config_get gateway_id $cfg gateway_id
	config_get antenna_gain $cfg antenna_gain "0"

	config_get sx1301_reset_pin $cfg sx1301_reset_pin

	local region_config=$(echo "$region" | awk '{print tolower($0)}')

	if [ "$gnss" = 1 ]; then
		model_flags="$model_flags\"GNSS\","
	fi

	cat > /var/etc/$config_name/concentratord.toml <<- EOF
		[concentratord]
			log_level="INFO"
			log_to_syslog=true
			stats_interval="30s"
			disable_crc_filter=false

		[concentratord.api]
			event_bind="ipc:///tmp/concentratord_event"
			command_bind="ipc:///tmp/concentratord_command"

		[gateway]
			lorawan_public=true
			model="$model"
			region="$region"
			gateway_id="$gateway_id"
			model_flags=[$model_flags]
			antenna_gain=$antenna_gain
	EOF

	if [ "$sx1301_reset_pin" != "" ]; then
		echo "sx1301_reset_pin=$sx1301_reset_pin" >> /var/etc/$config_name/concentratord.toml
	fi

	# Copy channel config
	cp /etc/chirpstack-concentratord/sx1301/examples/channels_$channel_plan.toml /var/etc/$config_name/channels.toml
	cp /etc/chirpstack-concentratord/sx1301/examples/region_$region_config.toml /var/etc/$config_name/region.toml
}

conf_rule_sx1302() {
	local cfg="$1"
	local config_name="$2"
	local model region channel_plan gnss usb gateway_id
	local model_flags antenna_gain
	local sx1302_reset_pin com_dev_path i2c_dev_path
	local event_bind command_bind
	local gnss_dev_path

	config_get model $cfg model
	config_get region $cfg region
	config_get channel_plan $cfg channel_plan
	config_get gnss $cfg gnss
	config_get usb $cfg usb
	config_get gateway_id $cfg gateway_id

	config_get event_bind $cfg event_bind
	config_get command_bind $cfg command_bind

	config_get sx1302_reset_pin $cfg sx1302_reset_pin
	config_get sx1302_power_en_pin $cfg sx1302_power_en_pin
	config_get sx1261_reset_pin $cfg sx1261_reset_pin
	config_get com_dev_path $cfg com_dev_path
	config_get i2c_dev_path $cfg i2c_dev_path
	config_get gnss_dev_path $cfg gnss_dev_path
	config_get antenna_gain $cfg antenna_gain "0"

	local region_config=$(echo "$region" | awk '{print tolower($0)}')

	if [ "$usb" = 1 ]; then
		model_flags="$model_flags\"USB\","
	fi

	if [ "$gnss" = 1 ]; then
		model_flags="$model_flags\"GNSS\","
	fi

	cat > /var/etc/$config_name/concentratord.toml <<- EOF
		[concentratord]
			log_level="INFO"
			log_to_syslog=true
			stats_interval="30s"
			disable_crc_filter=false

		[concentratord.api]
	EOF

	if [ "$event_bind" != "" ]; then
		echo "event_bind=\"$event_bind\"" >> /var/etc/$config_name/concentratord.toml
	fi

	if [ "$command_bind" != "" ]; then
		echo "command_bind=\"$command_bind\"" >> /var/etc/$config_name/concentratord.toml
	fi

	cat >> /var/etc/$config_name/concentratord.toml <<-EOF
		[gateway]
			lorawan_public=true
			model="$model"
			region="$region"
			model_flags=[$model_flags]
			antenna_gain=$antenna_gain
	EOF

	if [ "$gateway_id" != "" ]; then
	   	echo "gateway_id=\"$gateway_id\"" >> /var/etc/$config_name/concentratord.toml
	fi

	if [ "$sx1302_reset_pin" != "" ]; then
		echo "sx1302_reset_pin=$sx1302_reset_pin" >> /var/etc/$config_name/concentratord.toml
	fi

	if [ "$sx1302_power_en_pin" != "" ]; then
		echo "sx1302_power_en_pin=$sx1302_power_en_pin" >> /var/etc/$config_name/concentratord.toml
	fi

	if [ "$sx1261_reset_pin" != "" ]; then
		echo "sx1261_reset_pin=$sx1261_reset_pin" >> /var/etc/$config_name/concentratord.toml
	fi

	if [ "$com_dev_path" != "" ]; then
		echo "com_dev_path=\"$com_dev_path\"" >> /var/etc/$config_name/concentratord.toml
	fi

	if [ "$i2c_dev_path" != "" ]; then
		echo "i2c_dev_path=\"$i2c_dev_path\"" >> /var/etc/$config_name/concentratord.toml
	fi

	if [ "$gnss_dev_path" != "" ]; then
		echo "gnss_dev_path=\"$gnss_dev_path\"" >> /var/etc/$config_name/concentratord.toml
	fi

	# Copy channel config
	cp /etc/chirpstack-concentratord/sx1302/examples/channels_$channel_plan.toml /var/etc/$config_name/channels.toml
	cp /etc/chirpstack-concentratord/sx1302/examples/region_$region_config.toml /var/etc/$config_name/region.toml
}

conf_rule_2g4() {
	local cfg="$1"
	local config_name="$2"
	local model channel_plan antenna_gain
	local event_bind command_bind
	local com_dev_path

	config_get model $cfg model
	config_get region $cfg region
	config_get channel_plan $cfg channel_plan
	config_get antenna_gain $cfg antenna_gain "0"
	config_get event_bind $cfg event_bind
	config_get command_bind $cfg command_bind
	config_get com_dev_path $cfg com_dev_path

	local region_config=$(echo "$region" | awk '{print tolower($0)}')

	cat > /var/etc/$config_name/concentratord.toml <<- EOF
		[concentratord]
			log_level="INFO"
			log_to_syslog=true
			stats_interval="30s"
			disable_crc_filter=false

		[concentratord.api]
	EOF

	if [ "$event_bind" != "" ]; then
		echo "event_bind=\"$event_bind\"" >> /var/etc/$config_name/concentratord.toml
	fi

	if [ "$command_bind" != "" ]; then
		echo "command_bind=\"$command_bind\"" >> /var/etc/$config_name/concentratord.toml
	fi

	cat >> /var/etc/$config_name/concentratord.toml <<- EOF
		[gateway]
			lorawan_public=true
			model="$model"
			antenna_gain=$antenna_gain
	EOF

	if [ "$com_dev_path" != "" ]; then
		echo "com_dev_path=\"$com_dev_path\"" >> /var/etc/$config_name/concentratord.toml
	fi

	# Copy channel config
	cp /etc/chirpstack-concentratord/2g4/examples/channels_$channel_plan.toml /var/etc/$config_name/channels.toml
	cp /etc/chirpstack-concentratord/2g4/examples/region_$region_config.toml /var/etc/$config_name/region.toml
}
