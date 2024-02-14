include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-udp-forwarder-dual
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/chirpstack-udp-forwarder-dual
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack UDP Forwarder (dual instance)
	URL:=https://github.com/chirpstack/chirpstack-udp-forwarder
	DEPENDS:=+chirpstack-udp-forwarder
endef

define Package/chirpstack-udp-forwarder-dual/description
	ChirpStack UDP Forwarder (dual instance)
endef

define Package/chirpstack-udp-forwarder-dual/conffiles
	/etc/config/chirpstack-udp-forwarder
endef

define Package/chirpstack-udp-forwarder-dual/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-udp-forwarder-slot1.config $(1)/etc/config/chirpstack-udp-forwarder-slot1
	$(INSTALL_CONF) ./files/chirpstack-udp-forwarder-slot2.config $(1)/etc/config/chirpstack-udp-forwarder-slot2

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-udp-forwarder-slot1.init $(1)/etc/init.d/chirpstack-udp-forwarder-slot1
	$(INSTALL_BIN) ./files/chirpstack-udp-forwarder-slot2.init $(1)/etc/init.d/chirpstack-udp-forwarder-slot2
endef

define Build/Compile
	# Nothing to do
endef

$(eval $(call BuildPackage,chirpstack-udp-forwarder-dual))
