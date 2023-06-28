include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-mqtt-forwarder
PKG_VERSION:=4.1.0
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://codeload.github.com/chirpstack/chirpstack-mqtt-forwarder/tar.gz/v$(PKG_VERSION)?
PKG_HASH:=5b323bf0c1d2a81fcfff270eaaa267a41bf90bbd5105f0f3130379562736ba7c

PKG_MAINTAINER:=Orne Brocaar <info@brocaar.com>
PKG_LICENSE:=MIT
PKG_LICENSE_FILES:=LICENSE

PKG_BUILD_DEPENDS:=rust/host protobuf/host openssl

include $(INCLUDE_DIR)/package.mk
include $(TOPDIR)/feeds/packages/lang/rust/rust-package.mk

export CXX:=$(TARGET_CXX_NOCACHE)

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

define Package/chirpstack-mqtt-forwarder/conffiles
	/etc/config/chirpstack-mqtt-forwarder
endef

define Package/chirpstack-mqtt-forwarder/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack-mqtt-forwarder.config $(1)/etc/config/chirpstack-mqtt-forwarder

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-mqtt-forwarder.init $(1)/etc/init.d/chirpstack-mqtt-forwarder

	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_INSTALL_DIR)/bin/* $(1)/usr/bin/
endef

define Build/Prepare
	$(PKG_UNPACK)
	(cd $(PKG_BUILD_DIR) && rm -rf .cargo)
	$(Build/Patch)
endef

$(eval $(call RustBinPackage,chirpstack-mqtt-forwarder))
$(eval $(call BuildPackage,chirpstack-mqtt-forwarder))