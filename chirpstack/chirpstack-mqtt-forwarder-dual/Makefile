include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-mqtt-forwarder-dual
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/chirpstack-mqtt-forwarder-dual
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack MQTT Forwarder (dual instance)
	URL:=https://github.com/chirpstack/chirpstack-mqtt-forwarder
	DEPENDS:=+chirpstack-mqtt-forwarder
endef

define Package/chirpstack-mqtt-forwarder-dual/description
	ChirpStack MQTT Forwarder (dual instance)
endef

define Package/chirpstack-mqtt-forwarder-dual/conffiles
	/etc/config/chirpstack-mqtt-forwarder-slot1
	/etc/config/chirpstack-mqtt-forwarder-slot2
endef

define Package/chirpstack-mqtt-forwarder-dual/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-mqtt-forwarder-slot1.config $(1)/etc/config/chirpstack-mqtt-forwarder-slot1
	$(INSTALL_CONF) ./files/chirpstack-mqtt-forwarder-slot2.config $(1)/etc/config/chirpstack-mqtt-forwarder-slot2

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-mqtt-forwarder-slot1.init $(1)/etc/init.d/chirpstack-mqtt-forwarder-slot1
	$(INSTALL_BIN) ./files/chirpstack-mqtt-forwarder-slot2.init $(1)/etc/init.d/chirpstack-mqtt-forwarder-slot2
endef

define Build/Compile
	# Nothing to do
endef

$(eval $(call BuildPackage,chirpstack-mqtt-forwarder-dual))
