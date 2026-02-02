include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-mqtt-forwarder
PKG_VERSION:=4.5.1
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://codeload.github.com/chirpstack/chirpstack-mqtt-forwarder/tar.gz/v$(PKG_VERSION)?
PKG_HASH:=2e388f6f992fd12905f3a78628fee7541130e17987709ebdea2a5d54ea235437

PKG_MAINTAINER:=Orne Brocaar <info@brocaar.com>
PKG_LICENSE:=MIT
PKG_LICENSE_FILES:=LICENSE

PKG_BUILD_DEPENDS:=rust/host protobuf/host openssl

include $(INCLUDE_DIR)/package.mk
include $(TOPDIR)/feeds/packages/lang/rust/rust-package.mk

export CXX:=$(TARGET_CXX_NOCACHE)
export BINDGEN_EXTRA_CLANG_ARGS:=--sysroot=$(TOOLCHAIN_DIR)

CARGO_VARS += \
	PROTOC=$(STAGING_DIR_HOSTPKG)/bin/protoc

define Package/chirpstack-mqtt-forwarder
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack MQTT Forwarder
	URL:=https://github.com/chirpstack/chirpstack-mqtt-forwarder
	DEPENDS:=+libc +libstdcpp +libopenssl
endef

define Package/chirpstack-mqtt-forwarder/description
	ChirpStack MQTT Forwarder
endef

define Package/chirpstack-mqtt-forwarder/install
	$(INSTALL_DIR) $(1)/lib/functions
	$(INSTALL_BIN) ./files/chirpstack-mqtt-forwarder.sh $(1)/lib/functions

	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_INSTALL_DIR)/bin/* $(1)/usr/bin/
endef

define Build/Prepare
	$(PKG_UNPACK)
	(cd $(PKG_BUILD_DIR) && rm -rf .cargo)
	$(Build/Patch)
endef

define Build/Compile
	$(call Build/Compile/Cargo)
endef

$(eval $(call RustBinPackage,chirpstack-mqtt-forwarder))
$(eval $(call BuildPackage,chirpstack-mqtt-forwarder))
