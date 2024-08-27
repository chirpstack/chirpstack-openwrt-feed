include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-concentratord-target-rak7267
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/chirpstack-concentratord-target-rak7267
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack Concentratord (RAK7267)
	URL:=https://github.com/chirpstack/chirpstack-concentratord
	DEPENDS:=+chirpstack-concentratord-sx1302
endef

define Package/chirpstack-concentratord-target-rak7267/description
	ChirpStack Concentratord (RAK7267)
endef

define Package/chirpstack-concentratord-target-rak7267/conffiles
	/etc/config/chirpstack-concentratord
endef

define Package/chirpstack-concentratord-target-rak7267/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-concentratord.config $(1)/etc/config/chirpstack-concentratord

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-concentratord.init $(1)/etc/init.d/chirpstack-concentratord
endef

define Build/Compile
	# Nothing to do
endef

$(eval $(call BuildPackage,chirpstack-concentratord-target-rak7267))
