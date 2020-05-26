# directory-paths

### Features
A node module to convert directory tree into javascript object with full path of a directory and your nested directories or the full path of each file at each nested directory.

### Installation
This is a [Node.js](https://nodejs.org/en/?target=_blank) module available through the npm registry.

Before installing, download and install [Node.js](https://nodejs.org/en/?target=_blank).
**Recommended** Use latest stable version of [Node.js](https://nodejs.org/en/?target=_blank).

Installation is done using the npm install command:
```
$ npm install @rarenode/directory-paths
```
### How to use

The following example attaches directory-paths to a simple node.js application.

**_Directory structure:_**

```
├── app/
│   ├── config /
│   ├── middlewares /
│   │   ├── nested-middleware-A/
│   │   │   ├── A1/
│   │   │   │   ├── empty.js
│   │   │   │   ├── config.json
│   │   │   ├── A2/
│   │   │   │   ├── A2.1/
│   │   │   │   │   ├── A2.1.1/
│   │   │   │   │   │   ├── empty.js
│   │   │   │   │   │   ├── example.js
│   │   ├── nested-middleware-B/
│   │   │   ├── B1/
│   │   │   │   ├── B1.1/
│   │   │   │   │   ├── empty.js
│   │   │   │   │   ├── empty.json
│   │   │   │   ├── empty.js
├── index.js
```
### Example 1 - Full path of directories & files in global object 
index.js
```js
global.appRoot = __dirname;
global.paths = {};
var defineDirectoryPathsGlobalObject = require('@rarenode/directory-paths')

defineDirectoryPathsGlobalObject(global.paths, global.appRoot);

console.log(globle.paths)
```
### Example 2 - Full path of directories & files in javascript object 
index.js
```js
var app = {};
app.appRoot = __dirname;
app.paths = {};
var defineDirectoryPathsObject = require('@rarenode/directory-paths')

defineDirectoryPathsObject(app.paths, app.appRoot);

console.log(app.paths)
```

Run the app:
```
node index.js
```
gives the following output
```js
{
  app: {
  _: '__dirname/app',
  config: { _: '__dirname/app/config' },
  middlewares: {
    _: '__dirname/app/middlewares',
    nestedMiddlewareA: {
      _: '__dirname/app/middlewares/nested-middleware-A',
      a1: {
        _: '__dirname/app/middlewares/nested-middleware-A/A1',
        'config.json': '__dirname/app/middlewares/nested-middleware-A/A1/config.json',
        'empty.js': '__dirname/app/middlewares/nested-middleware-A/A1/empty.js'
      },
      a2: {
        _: '__dirname/app/middlewares/nested-middleware-A/A2',
        a21: {
          _: '__dirname/app/middlewares/nested-middleware-A/A2/A2.1',
          a211: {
            _: '__dirname/app/middlewares/nested-middleware-A/A2/A2.1/A2.1.1',
            'empty.js': '__dirname/app/middlewares/nested-middleware-A/A2/A2.1/A2.1.1/empty.js',
            'example.js': '__dirname/app/middlewares/nested-middleware-A/A2/A2.1/A2.1.1/example.js'
          }
        }
      }
    },
    nestedMiddlewareB: {
      _: '__dirname/app/middlewares/nested-middleware-B',
      b1: {
        _: '__dirname/app/middlewares/nested-middleware-B/B1',
        b11: {
          _: '__dirname/app/middlewares/nested-middleware-B/B1/B1.1',
          'empty.js': '__dirname/app/middlewares/nested-middleware-B/B1/B1.1/empty.js',
          'empty.json': '__dirname/app/middlewares/nested-middleware-B/B1/B1.1/empty.json'
        },
        'empty.js': '__dirname/app/middlewares/nested-middleware-B/B1/empty.js'
      }
    }
  }
 }
}
```
Example with directory imports using via directory path.
```js
const { paths } = global;
const modules = require(paths.config._);

console.log(paths.config._) // "/Users/haiderkhan/development/paths/app/config"
```
Example with file imports via file path.
```js
const { paths } = global;
const modules = require(paths.app.middlewares.nestedMiddlewareB.b1['empty.js']);

console.log(paths.app.middlewares.nestedMiddlewareB.b1['empty.js']) // "/Users/haiderkhan/development/paths/app/middlewares/nested-middleware-B/B1/empty.js"
```
## Module for
* [Node.js](https://nodejs.org/en/?target=_blank) - Backend framework
* [Express.js](https://expressjs.com/?target=_blank) - Module for making apps

## Author
* **[Haider Khan](https://www.iamhaiderkhan.com)** - *Full Stack Javascript Developer* 
  - [Linkedin](https://www.linkedin.com/in/iamhaiderkhan)
  - [Github](https://github.com/iamhaiderkhan)

## Contributors
 Welcome contributing, Please use GitHub's Issues/PRs.