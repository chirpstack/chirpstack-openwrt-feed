include $(TOPDIR)/rules.mk

PKG_NAME:=chirpstack-device-profiles
PKG_RELEASE:=1
PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL:=https://github.com/chirpstack/chirpstack-device-profiles.git
PKG_SOURCE_VERSION:=101c9abbcef99287cd6f0f3acb453c38c008cb5b
PKG_SOURCE_DATE:=2026-08-07

PKG_MAINTAINER:=Orne Brocaar <info@brocaar.com>
PKG_LICENSE:=MIT
PKG_LICENSE_FILES:=LICENSE

include $(INCLUDE_DIR)/package.mk

define Package/chirpstack-device-profiles
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=ChirpStack Device Profiles
	URL:=https://github.com/chirpstack/chirpstack-device-profiles
endef

define Package/chirpstack-device-profiles/description
	ChirpStack Device Profiles
endef

define Package/chirpstack-device-profiles/conffiles
endef

define Package/chirpstack-device-profiles/install
	$(INSTALL_DIR) $(1)/opt/chirpstack-device-profiles
	$(INSTALL_DIR) $(1)/opt/chirpstack-device-profiles/vendors

	$(CP) $(PKG_BUILD_DIR)/vendors/* $(1)/opt/chirpstack-device-profiles/vendors

	echo "" > $(1)/opt/chirpstack-device-profiles/SRCREV.lastimport
	echo "$(PKG_SOURCE_VERSION)" > $(1)/opt/chirpstack-device-profiles/SRCREV

	# The zzz prefix is intentional to make sure it is the last service that gets started.
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/chirpstack-device-profiles.init $(1)/etc/init.d/zzz-chirpstack-device-profiles
endef

define Build/Compile
	# Nothing to do
endef

$(eval $(call BuildPackage,chirpstack-device-profiles))
