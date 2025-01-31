include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-concentratord-target-seeed-sensecap-m2
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/chirpstack-concentratord-target-seeed-sensecap-m2
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack Concentratord (Seeed SenseCAP M2)
	URL:=https://github.com/chirpstack/chirpstack-concentratord
	DEPENDS:=+chirpstack-concentratord-sx1302
endef

define Package/chirpstack-concentratord-target-seeed-sensecap-m2/description
	ChirpStack Concentratord (seeed-sensecap-m2)
endef

define Package/chirpstack-concentratord-target-seeed-sensecap-m2/conffiles
	/etc/config/chirpstack-concentratord
endef

define Package/chirpstack-concentratord-target-seeed-sensecap-m2/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-concentratord.config $(1)/etc/config/chirpstack-concentratord

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-concentratord.init $(1)/etc/init.d/chirpstack-concentratord
endef

define Build/Compile
	# Nothing to do
endef

$(eval $(call BuildPackage,chirpstack-concentratord-target-seeed-sensecap-m2))
