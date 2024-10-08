include $(TOPDIR)/rules.mk

PKG_NAME:=libloragw-sx1301
PKG_VERSION:=5.0.1
PKG_RELEASE:=3

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://codeload.github.com/brocaar/lora_gateway/tar.gz/v$(PKG_VERSION)r$(PKG_RELEASE)?
PKG_HASH:=a9db52b26715dfbccfb564e62967df1b489f0dd274acc38411b7ae0a6693b5bd

PKG_MAINTAINER:=Orne Brocaar <info@brocaar.com>
PKG_LICENSE:=BSD
PKG_LICENSE_FILES:=LICENSE

include $(INCLUDE_DIR)/package.mk

TAR_OPTIONS+= --strip-components 1
TAR_CMD=$(HOST_TAR) -C $(1) $(TAR_OPTIONS)
TARGET_CFLAGS:=-O2 -Wall -Wextra -std=c99 -Iinc -I. -fPIC

define Package/libloragw-sx1301
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=libloragw-sx1301
	URL:=https://github.com/brocaar/lora_gateway
endef

define Package/libloragw-sx1301-utils
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=libloragw-sx1301-utils
	URL:=https://github.com/brocaar/lora_gateway
endef

define Package/libloragw-sx1301/description
	Semtech SX1301 HAL
endef

define Package/libloragw-sx1301-utils/description
	Semtech SX1301 HAL utils
endef

define Build/InstallDev
	$(INSTALL_DIR) $(STAGING_DIR)/usr/lib
	$(INSTALL_DIR) $(STAGING_DIR)/usr/include/libloragw-sx1301

	$(INSTALL_DATA) $(PKG_BUILD_DIR)/libloragw/libloragw.a $(STAGING_DIR)/usr/lib/libloragw-sx1301.a
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/libloragw/inc/* $(STAGING_DIR)/usr/include/libloragw-sx1301
endef

define Package/libloragw-sx1301/install
	$(INSTALL_DIR) $(1)/usr/lib
	$(INSTALL_DIR) $(1)/usr/include/libloragw-sx1301

	$(INSTALL_DATA) $(PKG_BUILD_DIR)/libloragw/libloragw.a $(1)/usr/lib/libloragw-sx1301.a
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/libloragw/inc/* $(1)/usr/include/libloragw-sx1301
endef

define Package/libloragw-sx1301-utils/install
	$(INSTALL_DIR) $(1)/opt/libloragw-sx1301/utils

	$(INSTALL_BIN) $(PKG_BUILD_DIR)/libloragw/test_* $(1)/opt/libloragw-sx1301/utils
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/util_pkt_logger/util_pkt_logger $(1)/opt/libloragw-sx1301/utils
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/util_spectral_scan/util_spectral_scan $(1)/opt/libloragw-sx1301/utils
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/util_spi_stress/util_spi_stress $(1)/opt/libloragw-sx1301/utils
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/util_tx_test/util_tx_test $(1)/opt/libloragw-sx1301/utils
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/util_tx_continuous/util_tx_continuous $(1)/opt/libloragw-sx1301/utils
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/util_lbt_test/util_lbt_test $(1)/opt/libloragw-sx1301/utils
endef

$(eval $(call BuildPackage,libloragw-sx1301))
$(eval $(call BuildPackage,libloragw-sx1301-utils))
