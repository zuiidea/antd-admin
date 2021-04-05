# Deploy

After the development is completed and verified in the development environment, it needs to be deployed to our users.

![i18n](./_media/term_build.svg)

## Build

First execute the following command,

```bash
npm run build
```

After a few seconds, the output should look like this：

```bash
> antd-admin@5.0.0-beta build /Users/zuiidea/web/antd-admin
> umi build

[21:13:17] webpack compiled in 43s 868ms
 DONE  Compiled successfully in 43877ms          21:13:17

File sizes after gzip:

  1.3 MB     dist/vendors.async.js
  308.21 KB  dist/umi.js
  45.49 KB   dist/vendors.chunk.css
  36.08 KB   dist/p__chart__highCharts__index.async.js
  33.53 KB   dist/p__user__index.async.js
  22.36 KB   dist/p__chart__ECharts__index.async.js
  4.21 KB    dist/p__dashboard__index.async.js
  4.06 KB    dist/umi.css
  ...
```

The `build` command will package all resources, including JavaScript, CSS, web fonts, images, html, and more. You can find these files in the `dist/` directory.

> If you have requirements for using HashHistory , deploying html to non-root directories, statics, etc., check out [Umi Deployment] (https://umijs.org/en/guide/deploy.html).

## Local verification


Local verification can be done via `serve` before publishing.

```
$ yarn global add serve
$ serve ./dist

Serving!

- Local:            http://localhost:5000
- On Your Network:  http://{Your IP}:5000

Copied local address to clipboard!

```

Access [http://localhost:5000](http://localhost:5000), under normal circumstances, it should be consistent with `npm start` (The API may not get the correct data).


## Deploy

Next, we can upload the static file to the server. If you use Nginx as the Web server, you can configure it in `ngnix.conf`:
```
server
	{
		listen       80;
        # Specify an accessible domain name
		server_name antd-admin.zuiidea.com;
        # The directory where the compiled files are stored
		root  /home/www/antd-admin/dist;

        # Proxy server interface to avoid cross-domain
		location /api {
			 proxy_pass http://localhost:7000/api;
		}

         Because the front end uses BrowserHistory, it will route backback to index.html
		location / {
				index  index.html;
				try_files $uri $uri/ /index.html;
		}
	}
```

Restart the web server and access [http://antd-admin.zuiidea.com](http://antd-admin.zuiidea.com) , You will see the correct page.

```bash
nginx -s reload
```

Similarly, if you use Caddy as a web server, you can do this in `Caddyfile`:

```
antd-admin.zuiidea.com {
        gzip
        root /home/www/antd-admin/dist
        proxy /api http://localhost:7000

        rewrite {
                if {path} not_match ^/api
                to {path} {path}/ /
        }
}


antd-admin.zuiidea.com/public {
        gzip
        root  /home/www/antd-admin/dist/static/public
}

```
