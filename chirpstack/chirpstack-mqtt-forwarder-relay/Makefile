include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-mqtt-forwarder-relay
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/chirpstack-mqtt-forwarder-relay
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack MQTT Forwarder (relay)
	URL:=https://github.com/chirpstack/chirpstack-mqtt-forwarder
	DEPENDS:=+chirpstack-mqtt-forwarder
endef

define Package/chirpstack-mqtt-forwarder-relay/description
	ChirpStack MQTT Forwarder (relay)
endef

define Package/chirpstack-mqtt-forwarder-relay/conffiles
	/etc/config/chirpstack-mqtt-forwarder-relay
endef

define Package/chirpstack-mqtt-forwarder-relay/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-mqtt-forwarder-relay.config $(1)/etc/config/chirpstack-mqtt-forwarder-relay

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-mqtt-forwarder-relay.init $(1)/etc/init.d/chirpstack-mqtt-forwarder-relay
endef

define Build/Compile
	# Nothing to do
endef

$(eval $(call BuildPackage,chirpstack-mqtt-forwarder-relay))
