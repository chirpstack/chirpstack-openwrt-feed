include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-udp-forwarder-target-rpi
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/chirpstack-udp-forwarder-target-rpi
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack UDP Forwarder (RPi target)
	URL:=https://github.com/chirpstack/chirpstack-udp-forwarder
	DEPENDS:=+chirpstack-udp-forwarder
endef

define Package/chirpstack-udp-forwarder-target-rpi/description
	ChirpStack UDP Forwarder (RPi target)
endef

define Package/chirpstack-udp-forwarder-target-rpi/conffiles
	/etc/config/chirpstack-udp-forwarder
endef

define Package/chirpstack-udp-forwarder-target-rpi/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-udp-forwarder.config $(1)/etc/config/chirpstack-udp-forwarder

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-udp-forwarder.init $(1)/etc/init.d/chirpstack-udp-forwarder
endef

define Build/Compile
	# Nothing to do
endef

$(eval $(call BuildPackage,chirpstack-udp-forwarder-target-rpi))
