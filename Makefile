setup:
	@npm install

run:
	@npm start

unit:
	@rm -rf coverage
	@npm test

lint:
	@npm run --silent lint

test:
	@$(MAKE) lint
	@$(MAKE) unit

show-coverage:
	@open coverage/PhantomJS*/index.html
