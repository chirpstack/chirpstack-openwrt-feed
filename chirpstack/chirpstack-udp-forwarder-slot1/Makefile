include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-udp-forwarder-slot1
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/chirpstack-udp-forwarder-slot1
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack UDP Forwarder (slot1)
	URL:=https://github.com/chirpstack/chirpstack-udp-forwarder
	DEPENDS:=+chirpstack-udp-forwarder
endef

define Package/chirpstack-udp-forwarder-slot1/description
	ChirpStack UDP Forwarder (slot1)
endef

define Package/chirpstack-udp-forwarder-slot1/conffiles
	/etc/config/chirpstack-udp-forwarder
endef

define Package/chirpstack-udp-forwarder-slot1/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-udp-forwarder-slot1.config $(1)/etc/config/chirpstack-udp-forwarder-slot1

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-udp-forwarder-slot1.init $(1)/etc/init.d/chirpstack-udp-forwarder-slot1
endef

define Build/Compile
	# Nothing to do
endef

$(eval $(call BuildPackage,chirpstack-udp-forwarder-slot1))
