include $(TOPDIR)/rules.mk

PKG_NAME:=rak-cellular-utilities
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

PKG_MAINTAINER:=Alexis DEVLEESCHAUWER <alexis@devleeschauwer.fr>

include $(INCLUDE_DIR)/package.mk

define Package/rak-cellular-utilities
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=RAK Cellular Utilities.
	DEPENDS:=+socat +kmod-usb-serial +kmod-usb-serial-option +kmod-usb-serial-wwan
endef

define Package/rak-cellular-utilities/description
	Package containing non-offcial cellular modem utilities and tools for RAK.
endef

define Build/Compile
    # No build, but section required
endef

define Package/rak-cellular-utilities/install
	# BIN
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) ./files/bin/atinyout $(1)/usr/bin
	$(INSTALL_BIN) ./files/bin/rak_cellular-info $(1)/usr/bin
endef

$(eval $(call BuildPackage,rak-cellular-utilities))
