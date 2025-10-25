include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-gateway-mesh
PKG_VERSION:=4.1.1
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://codeload.github.com/chirpstack/chirpstack-gateway-mesh/tar.gz/v$(PKG_VERSION)?
PKG_HASH:=f885d29c2338159df438d7cea285e6682c3bad4dd1b75eebe1d1c9965a7f645c

PKG_MAINTAINER:=Orne Brocaar <info@brocaar.com>
PKG_LICENSE:=MIT
PKG_LICENSE_FILES:=LICENSE

PKG_BUILD_DEPENDS:=rust/host protobuf/host

include $(INCLUDE_DIR)/package.mk
include $(TOPDIR)/feeds/packages/lang/rust/rust-package.mk

export CXX:=$(TARGET_CXX_NOCACHE)

CARGO_VARS += \
	PROTOC=$(STAGING_DIR_HOSTPKG)/bin/protoc

define Package/chirpstack-gateway-mesh
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack Gateway Mesh
	URL:=https://github.com/chirpstack/chirpstack-gateway-mesh
	DEPENDS:=+libstdcpp
endef

define Package/chirpstack-gateway-mesh/description
	ChirpStack Gateway Mesh
endef

define Package/chirpstack-gateway-mesh/install
	$(INSTALL_DIR) $(1)/lib/functions
	$(INSTALL_BIN) ./files/chirpstack-gateway-mesh.sh $(1)/lib/functions

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-gateway-mesh.init $(1)/etc/init.d/chirpstack-gateway-mesh

	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_INSTALL_DIR)/bin/* $(1)/usr/bin

	$(INSTALL_DIR) $(1)/etc/chirpstack-gateway-mesh
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/configuration/region_*.toml $(1)/etc/chirpstack-gateway-mesh

	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-gateway-mesh.config $(1)/etc/config/chirpstack-gateway-mesh

	$(INSTALL_DIR) $(1)/etc/uci-defaults
	$(INSTALL_DATA) ./files/uci-defaults/90_add_mesh_filters $(1)/etc/uci-defaults/90_add_mesh_filters
endef

define Build/Compile
	$(call Build/Compile/Cargo)
endef

$(eval $(call RustBinPackage,chirpstack-gateway-mesh))
$(eval $(call BuildPackage,chirpstack-gateway-mesh))
