include $(TOPDIR)/rules.mk

PKG_NAME:=libloragw-2g4
PKG_VERSION:=1.1.0
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION)-$(PKG_RELEASE).tar.gz
PKG_SOURCE_URL:=https://codeload.github.com/Lora-net/gateway_2g4_hal/tar.gz/V$(PKG_VERSION)?
PKG_HASH:=905a7d5e6e503c9aca49350a3fcebf94d797bd7cab8c7803d4f77549cb886013

PKG_MAINTAINER:=Orne Brocaar <info@brocaar.com>
PKG_LICENSE:=BSD
PKG_LICENSE_FILES:=LICENSE

include $(INCLUDE_DIR)/package.mk

TAR_OPTIONS+= --strip-components 1
TAR_CMD=$(HOST_TAR) -C $(1) $(TAR_OPTIONS)
TARGET_CFLAGS:=-g -O0 -Wall -Wextra -std=c99 -Iinc -I. -I ../libtools/inc -fPIC

define Package/libloragw-2g4
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=libloragw-2g4
	URL:=https://github.com/Lora-net/gateway_2g4_hal
endef

define Package/libloragw-2g4-utils
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=libloragw-2g4-utils
	URL:=https://github.com/Lora-net/gateway_2g4_hal
endef

define Package/libloragw-2g4/description
	Semtech 2G4 HAL
endef

define Package/libloragw-2g4-utils/description
	Semtech 2G4 HAL utils
endef

define Build/InstallDev
	$(INSTALL_DIR) $(STAGING_DIR)/usr/lib
	$(INSTALL_DIR) $(STAGING_DIR)/usr/include/libloragw-2g4

	$(INSTALL_DATA) $(PKG_BUILD_DIR)/libloragw/libloragw.a $(STAGING_DIR)/usr/lib/libloragw-2g4.a
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/libloragw/inc/* $(STAGING_DIR)/usr/include/libloragw-2g4
endef

define Package/libloragw-2g4/install
	$(INSTALL_DIR) $(1)/usr/lib
	$(INSTALL_DIR) $(1)/usr/include/libloragw-2g4

	$(INSTALL_DATA) $(PKG_BUILD_DIR)/libloragw/libloragw.a $(1)/usr/lib/libloragw-2g4.a
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/libloragw/inc/* $(1)/usr/include/libloragw-2g4
endef

define Package/libloragw-2g4-utils/install
	$(INSTALL_DIR) $(1)/opt/libloragw-2g4/utils
	$(INSTALL_DIR) $(1)/opt/libloragw-2g4/mcu_bin

	$(INSTALL_BIN) ./files/upgrade_fw.sh $(1)/opt/libloragw-2g4/upgrade_fw.sh
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/util_boot/boot $(1)/opt/libloragw-2g4/utils
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/mcu_bin/rlz_fwm_gtw_2g4_01.00.01.bin $(1)/opt/libloragw-2g4/mcu_bin
endef

$(eval $(call BuildPackage,libloragw-2g4))
$(eval $(call BuildPackage,libloragw-2g4-utils))
