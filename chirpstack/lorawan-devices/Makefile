include $(TOPDIR)/rules.mk

PKG_NAME:=lorawan-devices
PKG_RELEASE:=1
PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL:=https://github.com/brocaar/lorawan-devices.git
PKG_SOURCE_VERSION:=277e69a79347ceba2593e1da08117d0e3329ecda
PKG_SOURCE_DATE:=2022-10-31

PKG_MAINTAINER:=Orne Brocaar <info@brocaar.com>
PKG_LICENSE:=Apache 2.0
PKG_LICENSE_FILES:=LICENSE

include $(INCLUDE_DIR)/package.mk

define Package/lorawan-devices
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=LoRaWAN Devices Repo
	URL:=https://github.com/brocaar/lorawan-devices
endef

define Package/lorawan-devices/description
	LoRaWAN Devices Repo
endef

define Package/lorawan-devices/conffiles
endef

define Package/lorawan-devices/install
	$(INSTALL_DIR) $(1)/opt/lorawan-devices
	cd $(PKG_BUILD_DIR) && find ./vendor -type d -exec $(INSTALL_DIR) $(1)/opt/lorawan-devices/{} \;
	cd $(PKG_BUILD_DIR) && find ./vendor -regex ".*\.\(yaml\|js\)" -exec $(INSTALL_DATA) {} $(1)/opt/lorawan-devices/{} \;

	echo "" > $(1)/opt/lorawan-devices/SRCREV.lastimport
	echo "$(PKG_SOURCE_VERSION)" > $(1)/opt/lorawan-devices/SRCREV

	# The zzz prefix is intentional to make sure it is the last service that gets started.
	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/lorawan-devices.init $(1)/etc/init.d/zzz-lorawan-devices.init
endef

define Build/Compile
	# Nothing to do
endef

$(eval $(call BuildPackage,lorawan-devices))
