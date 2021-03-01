# Project Setup Guide. Webpack, ESLint and Prettier.

---

Download and configuration instructions for my basic project setup, plus notes for using webpack.

## ESLint / Prettier

### Downloads

- Start by installing the ESLint and Prettier vscode extensions.
- Set vscode settings `format on save` to true and `default formatter` to `prettier`. This will allow prettier to auto-format your code on each save.
- Open new project folder.
- Install npm packages.

```
npm init -y
```

```
npm i -D eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-node eslint-config-node
```

- Install Airbnb style guide config.

  If the first command does not work, try the second for mac/linux or the third for windows.

```
npx install-peerdeps --dev eslint-config-airbnb
```

```
(
  export PKG=eslint-config-airbnb;
  npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
)
```

```
npm install -g install-peerdeps
install-peerdeps --dev eslint-config-airbnb
```

### Configuration

- Create a .prettierrc file in root project folder. More options available on [prettier website.](https://prettier.io/docs/en/options.html)

```js
// .prettierrc

{
  "singleQuote": true
}
```

- Create a .eslintrc.json file in root project folder. Add / remove individual rules to suit personal preference. Rules can be found on the [ESLint website](https://eslint.org/docs/rules/) or in the problems tab when they are encounted in your code.

```js
// .eslintrc.json

{
  "extends": ["airbnb", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "warn",
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "object-shorthand": "off",
    "class-methods-use-this": "off",
    "no-plusplus": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": ["**/webpack.*.js"]
      }
    ]
  },
  "env": {
    "browser": true,
    "node": true
  }
}
```

- Create a new file in the project root called `.eslintignore` and inside it simply write `dist/`. This will prevent ESLint from examining the code that webpack produces for us.
- Basic ESLint and Prettier setup is now complete!

## Webpack

This is a summary of Colt Steele's ["Learn Webpack - Full Tutorial for Beginners"](https://www.youtube.com/watch?v=MpGLUVbqoYQ) with some added notes of my own.

### What Even Is Webpack?

[Video Tutorial.](https://www.youtube.com/watch?v=3On5Z0gjf4U&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8)

Put simply, webpack bundles together all of your development files into fewer files that can be minified/optimized. Webpack manages all of your dependencies for you, so you don't have to worry about making sure to load different scripts in the correct order. Webpack can also set up a development server for you project, that updates your page with every save. You may have used something like the Live Server extension to do this. Webpack can also complile sass / optimize images and much, much more.

### Installing and Running Webpack and Webpack-CLI

[Video Tutorial.](https://www.youtube.com/watch?v=5XrYSbUbS9o&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=2)

- If you havn't already, set up package.json

```
npm init -y
```

- Install Webpack.

```
npm install --save-dev webpack webpack-cli
```

- Add "start" script to package.json. Calling `npm start` will run webpack. Later on we will define a seperate development and build script.

```js
"scripts": {
    "start": "webpack"
  }
```

- At this point, webpack will look to bundle a file named `index.js` inside of `/src`, and will output `main.js` to `/dist`. These file and folder names is the default configuration and will be changed later. Make sure to reference `main.js` in your html.
- This is the most basic webpack setup and could be all you need for a very simple project. Inside of index.js you would have all the imports to your other scripts / modules and whatever logic to make your app run. Webpack will combine all the scripts / modules into main.js, which you will link to in your html. At the moment, you will need to run `npm start` every time you change a file. If this simple webpack setup is all you need, then you can run `npx webpack --watch` and it will automatically run webpack everytime you save a changed file. Otherwise, we will continue setting up a more complicated webpack configuration.

### Imports, Exports, & Webpack Modules

[Video Tutorial.](https://www.youtube.com/watch?v=8QYt1_17nk8&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=3)

- This video just goes over ES6 modules with respect to webpack. If you are unsure how to split your script up and use imports / exports then watch this and the previous video tutorial.

### Configuring Webpack

[Video Tutorial.](https://www.youtube.com/watch?v=ZwWiDZoPMB0&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=4)

- Create a new file in the project root and call it `webpack.config.js`. Inside of here is where we will write all our webpack configurations.

```js
// webpack.config.js

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

- So far all we have done is explicitly tell webpack the default options. That is, to look for a file called `index.js` located in `/src` and to then output a file called `main.js` into `/dist`. We will soon add a lot more options.
- To tell webpack to use this particular config, we need to change the `start` script inside of `package.json`.

```js
"scripts": {
    "start": "webpack --config webpack.config.js"
  }
```

- At the moment, webpack is minifying our code. This is great for production but while we are developing, it would be nicer to have some code that is easier to read. By default, webpack minifies `main.js`. We can override this by adding `mode: 'development'` to `module.exports` inside of `webpack.config.js`. Our configuration file will now look like the following.

```js
// webpack.config.js

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

### Loaders, CSS, & SASS

[Video Tutorial.](https://www.youtube.com/watch?v=rrMGUnBmjwQ&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=5)

Loaders are packages that dictate how certain files should be pre-processed as you import them or as they are loaded. We will start with handling css files.

- Create `main.css` inside of `/src`

```css
/* main.css */

.img2 .img-container {
  height: 200px;
  background-image: url('../assets/cat2.jpeg');
  background-repeat: no-repeat;
}
```

- In this case we are defining a background image to the `img2` div. `img1` has an image embedded in html and `img3` has an image injected with javascript. The purpose of this is to configure webpack to handle each kind of image. Do not link to the css file within the html, webpack will handle this for us.
- At the moment, webpack doesn't know how to handle the background image and the bundling will fail. Later we will address this. If you want, for now you can use a background colour instead of a background image and it will work fine.
- We will need to use two different loaders. `style-loader` and `css-loader`.
- If using sass, also download `sass-loader` and its dependancy `node-sass`.

```
npm install --save-dev style-loader css-loader sass-loader node-sass
```

- To use these loaders, we need to update `webpack.config.js`. In `webpack.config.js`, add the following to `module.exports`. This will apply the loaders to any files ending with `.scss`. If you are not using sass, then use `test: /\.css$/` and remove `sass-loader` from the `use` array in this and all the following code examples.

```js
module: {
  rules: [
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
  ],
}
```

- `sass-loader` first converts the scss into css, then `css-loader` converts the css into javascript then `style-loader` injects it into the DOM. The `use` array works back to front.
- We now need to tell webpack about this file. Add the following to `index.js`.

```js
import './main.scss';
```

At this point, webpack can now compile sass and inject it into the DOM. Notice there is no css file being linked into the html. Later on we will get webpack to create a css file that can be linked.

### Cache Busting and Plugins

[Video Tutorial.](https://www.youtube.com/watch?v=qXRGKiHmtF8&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=6)

Cache busting prevents browsers from caching our assets when we don't want them to. If a browser has cached our css file for example and we then update it, a user may still be using the cached file instead of the new one. To force the browser to download the new file, you can save it under a new name. This can cause problems in our html where we are linking these files as we will need to update the html on each save to reflect the new file names. Webpack can automate all of this for us. We will also clean up old files during each bundle.

- To automatically save our bundled javascript under a new name each time, edit the output file name in `webpack.config.js` to contain `[contenthash]`.

```js
filename: 'main.[contenthash].js';
```

- To automate the updating of the file links in our html, we will download `html-webpack-plugin`. This will create a new html file for us during each bundle step. We will supply a template html file for it to base itself on.

```
npm install --save-dev html-webpack-plugin
```

- Create a new file called `template.html` inside of `/src`. Copy in the contents of `index.html` except for the script tag, as webpack will generate this.
- We must now update `webpack.config.js` to use this plugin by requiring `html-webpack-plugin` at the top of the file and adding a plugins option to `module.exports`

```js
// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
```

Webpack will now generate a new filename for `main.js` on each save (assuming the content has been updated). This new filename causes a problem with our html since it is linking to the old filename. By using an html template, webpack can generate a new html file for us each time, which references the new script.

### Splitting Dev & Production

[Video Tutorial.](https://www.youtube.com/watch?v=VR5y93CNzeA&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=7)

So far we have one webpack config we use every time we build. This works great but it is useful to have different functionality for development and production. We will split our config into three files. A config for common options, one for development specific options, and one for production specific options. We also have to run `npm start` after every change, but we can configure this to happen automatically whenever a file changes with a live updating server.

- Rename `webpack.config.js` to `webpack.common.js` and create two new files, `webpack.dev.js` and `webpack.prod.js`.
- To extend `webpack.common.js` into `webpack.dev.js` and `webpack.prod.js`, we need to download `webpack-merge`.

```
npm install --save-dev webpack-merge
```

- Update `webpack.common.js`, `webpack.dev.js` and `webpack.prod.js` to the following.

```js
// webpack.common.js

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};

// webpack.dev.js

const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
});

// webpack.prod.js

const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
});
```

- To create our live server, we need to download `webpack-dev-server`.

```
npm install --save-dev webpack-dev-server
```

- To use these different configurations, we need to update `scripts` in `package.json`

```js
"scripts": {
    "start": "webpack serve --config webpack.dev.js --open 'google-chrome'",
    "build": "webpack --config webpack.prod.js"
  }
```

`--open 'google-chrome'` will automatically open the browser and display the page when `npm start` is run. The browser application name is platform dependent. For example, 'Chrome' is 'Google Chrome' on macOS, 'google-chrome' on Linux and 'chrome' on Windows. I am using Linux so I'm using `--open 'google-chrome'`.

To run the build script you must type `npm run build` and not just `npm build` like you can with `npm start`. This is because `npm start` is an in-built alias for `npm run start`.

### Html-loader, File-loader, & Clean-webpack

[Video Tutorial.](https://www.youtube.com/watch?v=mnS_1lolc44&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=8)

After `index.html` has been built in `/dist`, the image paths no longer work. We would also like a copy of all relevent assets inside of `/dist` rather than linking outside. Webpack can generate the correct image paths in `index.html` as well as any images referenced in css or javascript and copy assets into `/dist`.

- Move assets folder into `/src` and correct any image paths inside of `template.html`.
- Install `html-loader` & `file-loader`.

```
npm install --save-dev html-loader file-loader
```

- Update `rules` inside of `module.exports` in `webpack.common.js` to include these new loaders.

```js
rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            esModule: false,
            name: '[name].[hash].[ext]',
            outputPath: 'imgs',
          },
        },
      },
    ],
```

- Install `clean-webpack-plugin`

```
npm install --save clean-webpack-plugin
```

- Update `webpack.prod.js` to the following.

```js
// webpack.prod.js

const path = require('path');
const { merge } = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new CleanWebpackPlugin()],
});
```

### Multiple Entrypoints & Vendor.js

[Video Tutorial.](https://www.youtube.com/watch?v=PT0znBWIVnU&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=9)

If you need to seperately bundle vendor code such as bootstrap or jQuery, you can set up webpack to produce multiple files. The video is short and explains this nicely.

### Extract CSS & Minify HTML/CSS/JS

[Video Tutorial.](https://www.youtube.com/watch?v=JlBDfj75T3Y&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8&index=10)

Right now, all of our css is being loaded through javascript, and being injected into the DOM through a style tag. When you reload the page, there is a slight delay before the styles are loaded and for a brief moment you see the unstyled page. For production, it is nice to extract this css into its own file. In development mode this is not necessary as it will compile every time which can be slow.

- Install css extraction plugin.

```
npm install --save-dev mini-css-extract-plugin
```

- Update `webpack.prod.js` to the following.

```js
// webpack.prod.js

const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css',
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['dist'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
});
```

A new css file is now produced on build, and is linked to inside of `index.html`.
The rest of the video tutorial covers minifiying the js, css and html files. However this is now done automatically for the production build. If you are not using sass and `sass-loader` you may need to minify the css manually, since `sass-loader` is what performs the css minification. If this is the case, follow the rest of the video. The steps are very easy.

Webpack should now be bundling your scripts, compiling your sass (if you are using sass), creating a live development server, saving your bundled files under new names to avoid cache problems, copying assets to `/dist` and fixing all image urls to account for this, seperating your vendor code (if you are using any and want to split it) and minifying your files. Everything you need to run your site/app is nicely bundled inside of `/dist`.

If you havn't already, I highly recommend watching Colt Steele's ["Learn Webpack - Full Tutorial for Beginners"](https://www.youtube.com/watch?v=MpGLUVbqoYQ). This readme is only meant to be a quick reference for setting up your projects.
