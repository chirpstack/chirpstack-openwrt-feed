include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-concentratord
PKG_VERSION:=4.3.0
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://codeload.github.com/chirpstack/chirpstack-concentratord/tar.gz/v$(PKG_VERSION)?
PKG_HASH:=c83a5e8f83aa89719fd6fa5545c7a694ae8d4848e448517abbe8263eb4f3552c

PKG_MAINTAINER:=Orne Brocaar <info@brocaar.com>
PKG_LICENSE:=MIT
PKG_LICENSE_FILES:=LICENSE

PKG_BUILD_DEPENDS:=rust/host protobuf/host libloragw-sx1301 libloragw-sx1302 libloragw-2g4

include $(INCLUDE_DIR)/package.mk
include $(TOPDIR)/feeds/packages/lang/rust/rust-package.mk

export CXX:=$(TARGET_CXX_NOCACHE)
export BINDGEN_EXTRA_CLANG_ARGS:=--sysroot=$(TOOLCHAIN_DIR) -I$(STAGING_DIR)/usr/include

CARGO_VARS += \
	PROTOC=$(STAGING_DIR_HOSTPKG)/bin/protoc

define Package/chirpstack-concentratord
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack Concentratord
	URL:=https://github.com/chirpstack/chirpstack-concentratord
	DEPENDS:=+libstdcpp
endef

define Package/chirpstack-concentratord/description
	ChirpStack Concentratord
endef

define Package/chirpstack-concentratord/conffiles
	/etc/config/chirpstack-concentratord
endef

define Package/chirpstack-concentratord/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-concentratord.config $(1)/etc/config/chirpstack-concentratord

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-concentratord.init $(1)/etc/init.d/chirpstack-concentratord

	$(INSTALL_DIR) $(1)/usr/bin/
	$(INSTALL_DIR) $(1)/etc/chirpstack-concentratord/sx1301/examples
	$(INSTALL_DIR) $(1)/etc/chirpstack-concentratord/sx1302/examples
	$(INSTALL_DIR) $(1)/etc/chirpstack-concentratord/2g4/examples

	$(INSTALL_BIN) $(PKG_INSTALL_DIR)/bin/* $(1)/usr/bin/
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/chirpstack-concentratord-sx1301/config/*.toml $(1)/etc/chirpstack-concentratord/sx1301/examples
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/chirpstack-concentratord-sx1302/config/*.toml $(1)/etc/chirpstack-concentratord/sx1302/examples
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/chirpstack-concentratord-2g4/config/*.toml $(1)/etc/chirpstack-concentratord/2g4/examples
endef

define Build/Prepare
	$(PKG_UNPACK)
	(cd $(PKG_BUILD_DIR) && \
		rm -rf .cargo && \
		rm chirpstack-concentratord-sx1301/build.rs && \
		rm chirpstack-concentratord-sx1302/build.rs && \
		rm chirpstack-concentratord-2g4/build.rs \
	)
	$(Build/Patch)
endef

define Build/Compile
	$(call Build/Compile/Cargo,chirpstack-concentratord-sx1301,--locked)
	$(call Build/Compile/Cargo,chirpstack-concentratord-sx1302,--locked)
	$(call Build/Compile/Cargo,chirpstack-concentratord-2g4,--locked)
	$(call Build/Compile/Cargo,gateway-id,--locked)
endef

$(eval $(call RustBinPackage,chirpstack-concentratord))
$(eval $(call BuildPackage,chirpstack-concentratord))
