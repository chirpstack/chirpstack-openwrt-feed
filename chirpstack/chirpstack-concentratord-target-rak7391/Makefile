include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-concentratord-target-rak7391
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/chirpstack-concentratord-target-rak7391
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack Concentratord (RAK7391)
	URL:=https://github.com/chirpstack/chirpstack-concentratord
	DEPENDS:=+chirpstack-concentratord-sx1302 +chirpstack-concentratord-2g4
endef

define Package/chirpstack-concentratord-target-rak7391/description
	ChirpStack Concentratord (RAK7391)
endef

define Package/chirpstack-concentratord-target-rak7391/conffiles
	/etc/config/chirpstack-concentratord-slot1
	/etc/config/chirpstack-concentratord-slot2
endef

define Package/chirpstack-concentratord-target-rak7391/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-concentratord-slot1.config $(1)/etc/config/chirpstack-concentratord-slot1
	$(INSTALL_CONF) ./files/chirpstack-concentratord-slot2.config $(1)/etc/config/chirpstack-concentratord-slot2

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-concentratord-slot1.init $(1)/etc/init.d/chirpstack-concentratord-slot1
	$(INSTALL_BIN) ./files/chirpstack-concentratord-slot2.init $(1)/etc/init.d/chirpstack-concentratord-slot2
endef

define Build/Compile
	# Nothing to do
endef

$(eval $(call BuildPackage,chirpstack-concentratord-target-rak7391))
