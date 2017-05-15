# Nodejs Contact

Seed contact microservice using nodejs. Made by Jenius.

## APIs

This project exposes some APIs.

| Method | Endpoint | Demonstrates | 
|---|---|---| 
| GET | /healthcheck | Fetching server status |
| - | - | - |
| GET | /contacts | Get list of contacts |

## Usage

To run this contact service as an interactive docker container

```bash
docker run -it -p 3000:3000 interview_jenius
```

To run it in a detached mode use the `-d` flag

```bash
docker run -d -p 3000:3000 interview_jenius
```

- Runs the app server on `http://localhost:3000`
- Swagger UI runs on `http://localhost:3000/docs`
- Swagger spec runs on `http://localhost:3000/swagger.yml`

## Commands

The following commands are useful when working with this repo:

| Command | Usage |
|---------|-------|
| `make build` | Builds `interview_jenius:latest`, also created an image with the current short git SHA. |
| `make pull` | Pull repository and make build. |
| `make run` | Runs `interview_jenius`. |
| `make deploy_local` | Runs `interview_jenius` at port 80. |
| - | - |
| `yarn` | Install dependencies. |
| `yarn start` | Start the server in prodution mode. |
| `yarn run dev` | Start the server in development mode, watching for changes. |
| `yarn run debug` | Start the server with a debugger attached. |
| `yarn test` | Run all specs matching the pattern `*.spec.js`. |
| `yarn test:debug` | Run the specs, initially paused in the debugger. |
| `yarn run cov` | Generate code coverage reports to the screen and to the `./artifacts/coverage` directory. |
| `yarn lint` | Check code style (using Airbnb style). |
| `yarn lint:fix` | Lint code style (using Airbnb style). |

## Setup

Install:

- [NVM](https://github.com/creationix/nvm)
- [Yarn](https://yarnpkg.com/en/docs/install):

Use Node LTS, which is currently 6:

```bash
nvm install --lts
nvm use --lts
```

## Developing

Install dependencies:

```bash
yarn install
```

Run in development mode with:

```bash
yarn dev
yarn run windev  (for Windows)
```

This will monitor the source code, reload on changes and run tests when any files are saved.

## Capabilities and Frameworks

|Capability|Module|
|------------------|-----------|
|Server framework|[`hapi`](https://hapijs.com/) as a web server with [`inert`](https://github.com/hapijs/inert) for static content, [`vision`](https://github.com/hapijs/vision) for templating, [`joi`](https://github.com/hapijs/joi) for validation and [`boom`](https://github.com/hapijs/boom) for errors.|
|API documentation|[`hapi-swagger`](https://github.com/glennjones/hapi-swagger) automatically builds swagger specs from code annotations|
|Clients|[`request`](https://github.com/request/request) for standard HTTP client, [`soap`](https://github.com/vpulim/node-soap) for SOAP clients, `xyz` for MQ client|
|Logging|[`winston`](https://github.com/winstonjs/winston) to provide logging formats (timestamp, etc.) and log levels|
|Hot reload|[`nodemon`](https://github.com/remy/nodemon) |
|Static Checking|[`flow`](https://flowtype.org) |
|Coding standards|[`eslint`](http://eslint.org/) with the popular [`eslint-config-standard`](http://standardjs.com/) standard |
|Test framework|[`mocha`](https://mochajs.org/) as a rest runner, [`chai`](http://chaijs.com/) for assertations, [`sinon`](http://sinonjs.org/) as the mocking library|
|Code coverage|[`nyc`](https://github.com/istanbuljs/nyc) for test coverage reporting|

## Coding Guidelines

- **Coding Style**: Run `yarn lint` to check the code.
- **Pull Requests**: Any pull requests which drop code coverage are likely to be rejected, test your code! (NOTE: completely ignored this for catching deadline. This note is only for 1.0 development, not for 2.0)
- **Error Handling**: Handlers should catch exceptions and use `boom`. Normal functions should throw exceptions or use error callbacks if they are async.
- **Business Logic**: If writing a fair amount of business logic that should be unit tested, you should write the code in a modular way that can easily be unit tested.

## Testing

### Unit Tests
The unit tests are all **kept adjacent** to the files which they test.

Tests will run automatically when the project is run with `npm run dev`. To manually run the in-proc unit tests, run:

```bash
yarn test
```

This will run `mocha`, executing tests in any file which matches the pattern `*.spec.js`.

### Debugging Tests

The easiest way to debug tests is to first make sure that only the test in question is running, use the [`only`](https://mochajs.org/#exclusive-tests) trick and add a 'debugger' statement:

```js
describe('Some fixture', () => {
  it.only('should do something' => {
    //  Only this test'll run....
  });
});
```

Now quickly spin up a debugger:

```
$ npm run test:debug
Debugger listening on port 9229.
Warning: This is an experimental feature and could change at any time.
To start debugging, open the following URL in Chrome:
    chrome-devtools://devtools/remote/serve_file/@60cd6e859b9f557d2312f5bf532f6aec5f284980/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/249e5c8e-a3aa-4200-8a93-b499da24d9be
Debugger attached.
```

Your test files will not all be shown till the mocha function runs, so you might need to continue in the debugger till your hit your `debugger` statement.

### Integration Tests

Integration tests are in the `test-client` folder, these tests will test this service and it's mocked dependencies end to end. Integration tests can be run with:

```bash
docker-compose -f docker-compose.yml -f docker-compose.test.yml
```

This spins up the server, mock backend and test client in the `test-client/` folder and runs integration tests against the system.

### Code Coverage


Code coverage reports can be generated with:

```bash
npm run cov
```

Reports are written to the screen and to the `artifacts/coverage` directory.

## Healthchecks

This service exposes a basic healthcheck at `/healthcheck`:

```

GET /healthcheck/ HTTP/1.1
host: localhost

HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Length: 33

{"status":"ok","version":"0.0.1"}
```


## Owner

Jenius, PT. BTPN (c) 2017
1. Rheza Satria
2. Gregory Sukanto
