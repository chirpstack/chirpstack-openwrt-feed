include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-concentratord-target-rpi
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/chirpstack-concentratord-target-rpi
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack Concentratord (RPi target)
	URL:=https://github.com/chirpstack/chirpstack-concentratord
	DEPENDS:=+chirpstack-concentratord-2g4 +chirpstack-concentratord-sx1301 +chirpstack-concentratord-sx1302
endef

define Package/chirpstack-concentratord-target-rpi/description
	ChirpStack Concentratord (RPi target)
endef

define Package/chirpstack-concentratord-target-rpi/conffiles
	/etc/config/chirpstack-concentratord
endef

define Package/chirpstack-concentratord-target-rpi/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-concentratord.config $(1)/etc/config/chirpstack-concentratord

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-concentratord.init $(1)/etc/init.d/chirpstack-concentratord
endef

define Build/Compile
	# Nothing to do
endef

$(eval $(call BuildPackage,chirpstack-concentratord-target-rpi))
