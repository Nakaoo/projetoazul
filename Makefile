serve:
	REACT_APP_URL_API=http://api.dkawasaka.vfs:8074 yarn start

clean:
	rm -fR build
	rm -fR node_modules
	
build:
	yarn build

update: clean
	yarn install
	
install:
	yarn install