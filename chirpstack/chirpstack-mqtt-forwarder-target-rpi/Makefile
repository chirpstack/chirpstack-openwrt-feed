include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-mqtt-forwarder-target-rpi
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/chirpstack-mqtt-forwarder-target-rpi
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack MQTT Forwarder (RPi target)
	URL:=https://github.com/chirpstack/chirpstack-mqtt-forwarder
	DEPENDS:=+chirpstack-mqtt-forwarder
endef

define Package/chirpstack-mqtt-forwarder-target-rpi/description
	ChirpStack MQTT Forwarder (RPi target)
endef

define Package/chirpstack-mqtt-forwarder-target-rpi/conffiles
	/etc/config/chirpstack-mqtt-forwarder
endef

define Package/chirpstack-mqtt-forwarder-target-rpi/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-mqtt-forwarder.config $(1)/etc/config/chirpstack-mqtt-forwarder

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-mqtt-forwarder.init $(1)/etc/init.d/chirpstack-mqtt-forwarder
endef

define Build/Compile
	# Nothing to do
endef

$(eval $(call BuildPackage,chirpstack-mqtt-forwarder-target-rpi))
