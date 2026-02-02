include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-udp-forwarder
PKG_VERSION:=4.3.0
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://codeload.github.com/chirpstack/chirpstack-udp-forwarder/tar.gz/v$(PKG_VERSION)?
PKG_HASH:=754867064c7b99113628faaf4c7b15e044ceb564a7e3cc31ec605238a7d5cbb4

PKG_MAINTAINER:=Orne Brocaar <info@brocaar.com>
PKG_LICENSE:=MIT
PKG_LICENSE_FILES:=LICENSE

PKG_BUILD_DEPENDS:=rust/host protobuf/host

include $(INCLUDE_DIR)/package.mk
include $(TOPDIR)/feeds/packages/lang/rust/rust-package.mk

export CXX:=$(TARGET_CXX_NOCACHE)

CARGO_VARS += \
	PROTOC=$(STAGING_DIR_HOSTPKG)/bin/protoc

define Package/chirpstack-udp-forwarder
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack UDP forwarder
	URL:=https://github.com/chirpstack/chirpstack-udp-forwarder
	DEPENDS:=+libstdcpp
endef

define Package/chirpstack-udp-forwarder/description
	ChirpStack UDP Forwarder
endef

define Package/chirpstack-udp-forwarder/install
	$(INSTALL_DIR) $(1)/lib/functions
	$(INSTALL_BIN) ./files/chirpstack-udp-forwarder.sh $(1)/lib/functions

	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_INSTALL_DIR)/bin/* $(1)/usr/bin
endef

define Build/Compile
	$(call Build/Compile/Cargo)
endef

$(eval $(call RustBinPackage,chirpstack-udp-forwarder))
$(eval $(call BuildPackage,chirpstack-udp-forwarder))
