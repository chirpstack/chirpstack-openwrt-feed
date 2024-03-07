include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-gateway-relay
PKG_VERSION:=4.0.0-test.5
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://codeload.github.com/chirpstack/chirpstack-gateway-relay/tar.gz/v$(PKG_VERSION)?
PKG_HASH:=7b74141383f538548e6e6849847816f1f93cf5a9cb653cb69e72e9f0bb1178c8

PKG_MAINTAINER:=Orne Brocaar <info@brocaar.com>
PKG_LICENSE:=MIT
PKG_LICENSE_FILES:=LICENSE

PKG_BUILD_DEPENDS:=rust/host protobuf/host

include $(INCLUDE_DIR)/package.mk
include $(TOPDIR)/feeds/packages/lang/rust/rust-package.mk

export CXX:=$(TARGET_CXX_NOCACHE)

CARGO_VARS += \
	PROTOC=$(STAGING_DIR_HOSTPKG)/bin/protoc

define Package/chirpstack-gateway-relay
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack Gateway Relay
	URL:=https://github.com/chirpstack/chirpstack-gateway-relay
	DEPENDS:=+libstdcpp
endef

define Package/chirpstack-gateway-relay/description
	ChirpStack Gateway Relay
endef

define Package/chirpstack-gateway-relay/install
	$(INSTALL_DIR) $(1)/lib/functions
	$(INSTALL_BIN) ./files/chirpstack-gateway-relay.sh $(1)/lib/functions

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-gateway-relay.init $(1)/etc/init.d/chirpstack-gateway-relay

	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_INSTALL_DIR)/bin/* $(1)/usr/bin

	$(INSTALL_DIR) $(1)/etc/chirpstack-gateway-relay
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/configuration/region_*.toml $(1)/etc/chirpstack-gateway-relay

	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-gateway-relay.config $(1)/etc/config/chirpstack-gateway-relay
endef

define Build/Compile
	$(call Build/Compile/Cargo,.,--locked)
endef

$(eval $(call RustBinPackage,chirpstack-gateway-relay))
$(eval $(call BuildPackage,chirpstack-gateway-relay))
