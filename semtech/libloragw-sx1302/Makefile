include $(TOPDIR)/rules.mk

PKG_NAME:=libloragw-sx1302
PKG_VERSION:=2.1.0
PKG_RELEASE:=9

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION)-$(PKG_RELEASE).tar.gz
PKG_SOURCE_URL:=https://codeload.github.com/brocaar/sx1302_hal/tar.gz/V$(PKG_VERSION)r$(PKG_RELEASE)?
PKG_HASH:=48d9599255cf3f9530c4ca3e83eecae100f0a61afa567158c136a06c16c365d3

PKG_MAINTAINER:=Orne Brocaar <info@brocaar.com>
PKG_LICENSE:=BSD
PKG_LICENSE_FILES:=LICENSE

# This must be defined before package.mk import!
PATCH_DIR:=./patches-$(CONFIG_TARGET_BOARD)

include $(INCLUDE_DIR)/package.mk

TAR_OPTIONS+= --strip-components 1
TAR_CMD=$(HOST_TAR) -C $(1) $(TAR_OPTIONS)
TARGET_CFLAGS:=-O2 -Wall -Wextra -std=c99 -Iinc -I. -I../libtools/inc -fPIC

define Package/libloragw-sx1302
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=libloragw-sx1302
	URL:=https://github.com/brocaar/sx1302_hal
endef

define Package/libloragw-sx1302-utils
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=libloragw-sx1302-utils
	URL:=https://github.com/brocaar/sx1302_hal
endef

define Package/libloragw-sx1302/description
	Semtech SX1302 HAL
endef

define Package/libloragw-sx1302-utils/description
	Semtech SX1302 HAL utils
endef

define Build/InstallDev
	$(INSTALL_DIR) $(STAGING_DIR)/usr/lib
	$(INSTALL_DIR) $(STAGING_DIR)/usr/include/libloragw-sx1302

	$(INSTALL_DATA) $(PKG_BUILD_DIR)/libtools/*.a $(STAGING_DIR)/usr/lib
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/libtools/inc/* $(STAGING_DIR)/usr/include

	$(INSTALL_DATA) $(PKG_BUILD_DIR)/libloragw/libloragw.a $(STAGING_DIR)/usr/lib/libloragw-sx1302.a
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/libloragw/inc/* $(STAGING_DIR)/usr/include/libloragw-sx1302
endef

define Package/libloragw-sx1302/install
	$(INSTALL_DIR) $(1)/usr/lib
	$(INSTALL_DIR) $(1)/usr/include/libloragw-sx1302

	$(INSTALL_DATA) $(PKG_BUILD_DIR)/libtools/*.a $(1)/usr/lib
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/libtools/inc/* $(1)/usr/include

	$(INSTALL_DATA) $(PKG_BUILD_DIR)/libloragw/libloragw.a $(1)/usr/lib/libloragw-sx1302.a
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/libloragw/inc/* $(1)/usr/include/libloragw-sx1302
endef

define Package/libloragw-sx1302-utils/install
	$(INSTALL_DIR) $(1)/opt/libloragw-sx1302/utils
	$(INSTALL_DIR) $(1)/opt/libloragw-sx1302/mcu_bin

	$(INSTALL_BIN) ./files/upgrade_fw.sh $(1)/opt/libloragw-sx1302/upgrade_fw.sh
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/util_boot/boot $(1)/opt/libloragw-sx1302/utils
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/mcu_bin/rlz_010000_CoreCell_USB.bin $(1)/opt/libloragw-sx1302/mcu_bin
endef

$(eval $(call BuildPackage,libloragw-sx1302))
$(eval $(call BuildPackage,libloragw-sx1302-utils))
