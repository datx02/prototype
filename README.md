# Rymd: Shuttle

<img src="http://f.cl.ly/items/1c3y3U0o3j1r0X2G0x1N/Shuttle_logotype.png" width="200" height="200" />

Shuttle is a proof-of-concept prototype for peer-to-peer file transfers using the [Rymd](http://github.com/rymdjs/rymd) library, for WebRTC transfers, WebCrypto encryption and IndexedDB file storage.

## Get started

	npm install
	open index.html

## Develop

	npm install
	gulp watch

A concatenated `bundle.js` will be generated in the `build` directory. See `gulpfile.js` for all tasks.

## Browser requirements

Due to the use of cutting edge HTML5 technologies, **Chrome Canary 34+** is a hard requirement in order to run Shuttle.
