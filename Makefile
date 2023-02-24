serve:
	REACT_APP_URL_API=http://api.dkawasaka.vfs:8074 BROWSER=none yarn start
	# REACT_APP_URL_API=http://192.168.0.5:8074 yarn start

clean:
	rm -fR build
	rm -fR node_modules
	
bd:
	yarn build

update: clean
	yarn install
	
install:
	yarn install