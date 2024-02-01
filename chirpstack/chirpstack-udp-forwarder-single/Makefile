include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-udp-forwarder-single
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/chirpstack-udp-forwarder-single
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack UDP Forwarder (single instance)
	URL:=https://github.com/chirpstack/chirpstack-udp-forwarder
	DEPENDS:=+chirpstack-udp-forwarder
endef

define Package/chirpstack-udp-forwarder-single/description
	ChirpStack UDP Forwarder (single instance)
endef

define Package/chirpstack-udp-forwarder-single/conffiles
	/etc/config/chirpstack-udp-forwarder
endef

define Package/chirpstack-udp-forwarder-single/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-udp-forwarder.config $(1)/etc/config/chirpstack-udp-forwarder

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-udp-forwarder.init $(1)/etc/init.d/chirpstack-udp-forwarder
endef

define Build/Compile
	# Nothing to do
endef

$(eval $(call BuildPackage,chirpstack-udp-forwarder-single))
