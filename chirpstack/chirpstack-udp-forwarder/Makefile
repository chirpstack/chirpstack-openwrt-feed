include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-udp-forwarder
PKG_VERSION:=4.1.10
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://codeload.github.com/chirpstack/chirpstack-udp-forwarder/tar.gz/v$(PKG_VERSION)?
PKG_HASH:=f5b0f4357c2972790ce49ba0443578fa4c46b89a806c43743b866c2076044620

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
	$(call Build/Compile/Cargo,.,--locked)
endef

$(eval $(call RustBinPackage,chirpstack-udp-forwarder))
$(eval $(call BuildPackage,chirpstack-udp-forwarder))
