YARN ?= $(shell which yarn)
PKG_MANAGER ?= $(if $(YARN),$(YARN))

.SILENT:

setup:
	@${PKG_MANAGER} install

run:
	@${PKG_MANAGER} start

unit:
	@rm -rf coverage
	@${PKG_MANAGER} run -s test

lint:
	@${PKG_MANAGER} run --silent lint

test:
	@$(MAKE) lint
	@$(MAKE) unit

build:
	@${PKG_MANAGER} run --silent build

show-coverage:
	@open coverage/PhantomJS*/index.html

svg-converter:
	@bash scripts/convert_svgo.sh $(FILE)
