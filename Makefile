setup:
	@npm install

run:
	@npm start

unit:
	@rm -rf coverage
	@npm run -s test

lint:
	@npm run --silent lint

test:
	@$(MAKE) lint
	@$(MAKE) unit

build:
	@npm run --silent build

show-coverage:
	@open coverage/PhantomJS*/index.html
