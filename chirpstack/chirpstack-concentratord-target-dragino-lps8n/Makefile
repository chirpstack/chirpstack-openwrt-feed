include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-concentratord-target-dragino-lps8n
PKG_RELEASE:=1

include $(INCLUDE_DIR)/package.mk

define Package/chirpstack-concentratord-target-dragino-lps8n
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack Concentratord (Dragino LPS8N)
	URL:=https://github.com/chirpstack/chirpstack-concentratord
	DEPENDS:=+chirpstack-concentratord-sx1302
endef

define Package/chirpstack-concentratord-target-dragino-lps8n/description
	ChirpStack Concentratord (Dragino LPS8N)
endef

define Package/chirpstack-concentratord-target-dragino-lps8n/conffiles
	/etc/config/chirpstack-concentratord
endef

define Package/chirpstack-concentratord-target-dragino-lps8n/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-concentratord.config $(1)/etc/config/chirpstack-concentratord

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-concentratord.init $(1)/etc/init.d/chirpstack-concentratord
endef

define Build/Compile
	# Nothing to do
endef

$(eval $(call BuildPackage,chirpstack-concentratord-target-dragino-lps8n))
