include $(TOPDIR)/rules.mk

PKG_NAME:=rak-led-utilities
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

PKG_MAINTAINER:=Alexis DEVLEESCHAUWER <alexis@devleeschauwer.fr>

include $(INCLUDE_DIR)/package.mk

define Package/rak-led-utilities
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=RAK LED utilities.
	DEPENDS:=+i2c-tools
endef

define Package/rak-led-utilities/description
	Package containing non-offcial led tools for RAK.
endef

define Build/Compile
    # No build, but section required
endef

define Package/rak-led-utilities/install
	# BIN
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) ./files/bin/aw2013 $(1)/usr/bin
endef

$(eval $(call BuildPackage,rak-led-utilities))
