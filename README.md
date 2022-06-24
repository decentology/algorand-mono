<a href="https://www.hyperverse.dev/#gh-dark-mode-only">
	<img src="https://drive.google.com/uc?export=view&id=1UFpBzZRnOBIZhIcaAWui1FIe9OSfJTKx" height="70" alt="Hyperverse logo" />
</a>


## Getting Started

```sh
npm i
```

Developing.

```sh
npm run start
```

Compiling for production.

```sh
npm run build
```

## Lessons Learned

### #1

`algosdk` doesn't play nice with `create-react-app` because `react-scripts v5.0.0` uses Webpack 5 which doesn't polyfill `crypto` and other Node packages.

Change your `react-scripts` dependency to `4.0.3`.

```json
"dependencies": {
  "react-scripts": "4.0.3"
}
```

This unfortunately breaks your hot-reload and you need to add the following dev dependency to override the broken one.

```json
"devDependencies": {
  "react-error-overlay": "6.0.9"
}
```

After changing your `package.json` delete `node_modules` and `package-lock.json` and reinstall everything.

```sh
npm install
```

[source][1]
[source][3]

### #2

While in development (localhost) WalletConnect won't work without a **https** connection.

You can either fix this by using [ngrok](https://ngrok.com/) as a reverse proxy.

```sh
ngrok http -region eu 3000
```

Or you can generate your own certificate.

1. Install `mkcert` on your operating system – [instructions](https://github.com/FiloSottile/mkcert#installation).
2. `$ mkcert -install` – generate a local certificate authority.
3. `$ mkcert localhost` – generate a certificate (if you want local network access, use host IP within local network, I.e. `192.168.X.X`).
4. `$ mkdir certificates` – create folder to store certificate files (not part of code repository).
5. `$ mv localhost* certificates/` – move them there.

Then add two environment variables to start using your certificates locally.

```sh
HTTPS=true
SSL_CRT_FILE=certificates/192.168.X.X.pem
SSL_KEY_FILE=certificates/192.168.X.X-key.pem
```

You can add environment variables to your `package.json` by modifying your `start` script to `"start": "HTTPS=true ...`.

[source][2]

[1]: https://github.com/facebook/create-react-app/issues/11756#issuecomment-1083271257
[2]: https://create-react-app.dev/docs/using-https-in-development/
[3]: https://stackoverflow.com/questions/70368760/react-uncaught-referenceerror-process-is-not-defined