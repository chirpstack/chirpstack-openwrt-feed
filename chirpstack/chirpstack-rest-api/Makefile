include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-rest-api
PKG_VERSION:=4.16.1
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://codeload.github.com/chirpstack/chirpstack-rest-api/tar.gz/v$(PKG_VERSION)?
PKG_HASH:=73d79e169c75ddb4bf939d93ef7319407621de2a4dd49e12a382fb4190691053

PKG_MAINTAINER:=Orne Brocaar <info@brocaar.com>
PKG_LICENSE:=MIT
PKG_LICENSE_FILES:=LICENSE

PKG_BUILD_DEPENDS:=golang/host protobuf/host

GO_PKG:=github.com/chirpstack/chirpstack-rest-api

include $(INCLUDE_DIR)/package.mk
include $(TOPDIR)/feeds/packages/lang/golang/golang-package.mk

define Package/chirpstack-rest-api
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack REST API
	URL:=https://github.com/chirpstack/chirpstack-rest-api
	DEPENDS:=$(GO_ARCH_DEPENDS) 
endef

define Package/chirpstack-rest-api/description
	ChirpStack REST API
endef

define Package/chirpstack-rest-api/install

	$(call GoPackage/Package/Install/Bin,$(1))
	
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-rest-api.init $(1)/etc/init.d/chirpstack-rest-api

	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-rest-api.config $(1)/etc/config/chirpstack-rest-api

	$(INSTALL_DIR) $(1)/etc/nginx/conf.d
	$(INSTALL_DATA) ./files/chirpstack-rest-api.nginx $(1)/etc/nginx/conf.d/chirpstack-rest-api.locations

endef 

$(eval $(call GoBinPackage,chirpstack-rest-api))
$(eval $(call BuildPackage,chirpstack-rest-api))
