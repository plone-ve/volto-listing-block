# volto-listing-block
[![Releases](https://img.shields.io/github/v/release/eea/volto-listing-block)](https://github.com/eea/volto-listing-block/releases)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-listing-block%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-listing-block/job/master/display/redirect)
[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-listing-block%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-listing-block/job/develop/display/redirect)

[Volto](https://github.com/plone/volto) add-on

## Features

Demo GIF

## Getting started

### Try volto-listing-block with Docker

1. Get the latest Docker images

   ```
   docker pull plone
   docker pull plone/volto
   ```

1. Start Plone backend
   ```
   docker run -d --name plone -p 8080:8080 -e SITE=Plone -e PROFILES="profile-plone.restapi:blocks" plone
   ```

1. Start Volto frontend

   ```
   docker run -it --rm -p 3000:3000 --link plone -e ADDONS="@eeacms/volto-listing-block" plone/volto
   ```

1. Go to http://localhost:3000

### Add volto-listing-block to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-listing-block"
   ],

   "dependencies": {
       "@eeacms/volto-listing-block": "^1.0.0"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --addon @eeacms/volto-listing-block
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-listing-block/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-listing-block/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
eea.europa.eu)
