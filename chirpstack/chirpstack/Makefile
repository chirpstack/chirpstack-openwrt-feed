include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack
PKG_VERSION:=4.4.0
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://codeload.github.com/chirpstack/chirpstack/tar.gz/v$(PKG_VERSION)?
PKG_HASH:=d6425c2a90d0a92910dbef8a173853081a03d865f67c07b2b49e28ba2b9199fd

PKG_MAINTAINER:=Orne Brocaar <info@brocaar.com>
PKG_LICENSE:=MIT
PKG_LICENSE_FILES:=LICENSE

PKG_BUILD_DEPENDS:=rust/host protobuf/host node-yarn/host postgresql openssl

include $(INCLUDE_DIR)/package.mk
include $(TOPDIR)/feeds/packages/lang/rust/rust-package.mk

export CXX:=$(TARGET_CXX_NOCACHE)

CARGO_VARS += \
	PROTOC=$(STAGING_DIR_HOSTPKG)/bin/protoc

define Package/chirpstack
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack
	URL:=https://github.com/chirpstack/chirpstack
	DEPENDS:=+libopenssl +libpq
endef

define Package/chirpstack/description
	ChirpStack
endef

define Package/chirpstack/conffiles
	/etc/config/chirpstack
endef

define Package/chirpstack/install
	$(INSTALL_DIR) $(1)/etc/config
	$(INSTALL_CONF) ./files/chirpstack.config $(1)/etc/config/chirpstack

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack.init $(1)/etc/init.d/chirpstack

	$(INSTALL_DIR) $(1)/etc/chirpstack
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/chirpstack/configuration/region_*.toml $(1)/etc/chirpstack

	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_INSTALL_DIR)/bin/* $(1)/usr/bin

	$(INSTALL_DIR) $(1)/etc/nginx/conf.d
	$(INSTALL_DATA) ./files/chirpstack.nginx $(1)/etc/nginx/conf.d/chirpstack.locations
endef

define Build/Prepare
	$(call Build/Prepare/Default)
	mkdir -p $(PKG_BUILD_DIR)/.cargo
	cp ./files/cargo.config.toml $(PKG_BUILD_DIR)/.cargo/config
endef

define Build/Compile
	(cd $(PKG_BUILD_DIR)/ui && \
		make build \
	)
	$(call Build/Compile/Cargo,chirpstack)
endef

$(eval $(call RustBinPackage,chirpstack))
$(eval $(call BuildPackage,chirpstack))
