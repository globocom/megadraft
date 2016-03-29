setup:
	@npm install

run:
	@npm start

test:
	@rm -rf coverage
	@npm test

lint:
	@npm run --silent lint

show-coverage:
	@open coverage/PhantomJS*/index.html
