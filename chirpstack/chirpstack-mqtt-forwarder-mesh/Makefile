include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-mqtt-forwarder-mesh
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/chirpstack-mqtt-forwarder-mesh
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack MQTT Forwarder (mesh)
	URL:=https://github.com/chirpstack/chirpstack-mqtt-forwarder
	DEPENDS:=+chirpstack-mqtt-forwarder
endef

define Package/chirpstack-mqtt-forwarder-mesh/description
	ChirpStack MQTT Forwarder (mesh)
endef

define Package/chirpstack-mqtt-forwarder-mesh/conffiles
	/etc/config/chirpstack-mqtt-forwarder-mesh
endef

define Package/chirpstack-mqtt-forwarder-mesh/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-mqtt-forwarder-mesh.config $(1)/etc/config/chirpstack-mqtt-forwarder-mesh

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-mqtt-forwarder-mesh.init $(1)/etc/init.d/chirpstack-mqtt-forwarder-mesh
endef

define Build/Compile
	# Nothing to do
endef

$(eval $(call BuildPackage,chirpstack-mqtt-forwarder-mesh))
