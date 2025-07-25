include $(TOPDIR)/rules.mk

PKG_NPM_NAME:=node-red
PKG_NAME:=$(PKG_NPM_NAME)
PKG_VERSION:=4.0.9
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NPM_NAME)-$(PKG_VERSION).tgz
PKG_SOURCE_URL:=https://registry.npmjs.org/$(PKG_NPM_NAME)/-/
PKG_HASH:=d8548204752c8ed7c1c5648e6fe2843342797ff5f0214647bdd1078366811cba

PKG_BUILD_DEPENDS:=node/host

PKG_MAINTAINER:=Orne Brocaar <info@brocaar.com>
PKG_LICENSE:=Apache License 2.0
PKG_LICENSE_FILES:=LICENSE

include $(INCLUDE_DIR)/package.mk

define Package/node-red
	SECTION:=chirpstack
	CATEGORY:=ChirpStack
	TITLE:=Node-RED
	URL:=https://nodered.org/
	DEPENDS:=+node +node-npm
endef

define Package/node-red/description
	Node-RED is a programming tool for wiring together hardware devices,
	APIs and online services in new and interesting ways.
endef

TAR_OPTIONS+= --strip-components 1
TAR_CMD=$(HOST_TAR) -C $(1) $(TAR_OPTIONS)

NODEJS_CPU:=$(subst powerpc,ppc,$(subst aarch64,arm64,$(subst x86_64,x64,$(subst i386,ia32,$(ARCH)))))
TMPNPM:=$(shell mktemp -u XXXXXXXXXX)

TARGET_CFLAGS+=$(FPIC)
TARGET_CPPFLAGS+=$(FPIC)

NPM_FLAGS:= \
	$(MAKE_VARS) \
	$(MAKE_FLAGS) \
	npm_config_arch=$(NODEJS_CPU) \
	npm_config_target_arch=$(NODEJS_CPU) \
	npm_config_build_from_source=true \
	npm_config_nodedir=$(STAGING_DIR)/usr/ \
	npm_config_prefix=$(PKG_INSTALL_DIR)/usr/ \
	npm_config_cache=$(TMP_DIR)/npm-cache-$(TMPNPM) \
	npm_config_tmp=$(TMP_DIR)/npm-tmp-$(TMPNPM)

define Build/Compile
	cd $(PKG_BUILD_DIR); \
	$(NPM_FLAGS) npm install --omit=dev --prefer-dedupe --no-optional
	rm -rf $(TMP_DIR)/npm-tmp-$(TMPNPM)
	rm -rf $(TMP_DIR)/npm-cache-$(TMPNPM)
endef


define Package/node-red/install
	$(INSTALL_DIR) $(1)/usr/lib/node/$(PKG_NPM_NAME)

	$(CP) $(PKG_BUILD_DIR)/{*.js,*.json,*.md} $(1)/usr/lib/node/$(PKG_NPM_NAME)/
	$(CP) $(PKG_BUILD_DIR)/{node_modules,lib} $(1)/usr/lib/node/$(PKG_NPM_NAME)/
	$(CP) $(PKG_BUILD_DIR)/{LICENSE,bin}      $(1)/usr/lib/node/$(PKG_NPM_NAME)/

	$(INSTALL_DIR) $(1)/etc/init.d
	$(INSTALL_BIN) ./files/node-red.init $(1)/etc/init.d/node-red

	$(INSTALL_DIR) $(1)/etc/nginx/conf.d
	$(INSTALL_DATA) ./files/node-red.nginx $(1)/etc/nginx/conf.d/node-red.locations
endef

$(eval $(call BuildPackage,node-red))
