include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-mqtt-forwarder-slot1
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/chirpstack-mqtt-forwarder-slot1
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack MQTT Forwarder (slot1)
	URL:=https://github.com/chirpstack/chirpstack-mqtt-forwarder
	DEPENDS:=+chirpstack-mqtt-forwarder
endef

define Package/chirpstack-mqtt-forwarder-slot1/description
	ChirpStack MQTT Forwarder (slot1)
endef

define Package/chirpstack-mqtt-forwarder-slot1/conffiles
	/etc/config/chirpstack-mqtt-forwarder-slot1
endef

define Package/chirpstack-mqtt-forwarder-slot1/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-mqtt-forwarder-slot1.config $(1)/etc/config/chirpstack-mqtt-forwarder-slot1

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-mqtt-forwarder-slot1.init $(1)/etc/init.d/chirpstack-mqtt-forwarder-slot1
endef

define Build/Compile
	# Nothing to do
endef

$(eval $(call BuildPackage,chirpstack-mqtt-forwarder-slot1))
