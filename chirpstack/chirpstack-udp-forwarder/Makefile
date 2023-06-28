include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-udp-forwarder
PKG_VERSION:=4.1.2
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://codeload.github.com/chirpstack/chirpstack-udp-forwarder/tar.gz/v$(PKG_VERSION)?
PKG_HASH:=dd91dcbb0febb361e5a7838f9ca39d0679e117e9064c9cb2eeef3fca013df762

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

define Package/chirpstack-udp-forwarder/conffiles
	/etc/config/chirpstack-udp-forwarder
endef

define Package/chirpstack-udp-forwarder/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-udp-forwarder.config $(1)/etc/config/chirpstack-udp-forwarder

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-udp-forwarder.init $(1)/etc/init.d/chirpstack-udp-forwarder

	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_INSTALL_DIR)/bin/* $(1)/usr/bin
endef

$(eval $(call RustBinPackage,chirpstack-udp-forwarder))
$(eval $(call BuildPackage,chirpstack-udp-forwarder))