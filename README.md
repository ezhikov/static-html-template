# Static HTML Temlplate

This is documentation about github template. Replace it with documentation for your project.

## Quick start

Create new repo by clicking green button <code>Use this template</code> in github interface or with this link: https://github.com/ezhikov/static-html-template/generate. That's it.

## What's inside

- [Nunjucks](https://github.com/mozilla/nunjucks) for templates
- [sass](https://sass-lang.com/) for styles

All build handled by webpack with autoprefixer and babel. Templates are fully extensible, thanks to my [shiny-nunjucks-loader](https://github.com/ezhikov/njk-loader), and all partials are resolved relatively to each other. On the other hand, images are still resolved relatively to page itself. More on this in [File structure](#file-structure).

## Predefined npm scripts are `start` and `build`.

Use `start` to get dev-server running

```sh
npm run start

# or

yarn start
```

Use `build` to, well, build production version.

```sh
npm run build

# or

yarn build
```

## File structure

There are some exemplar files that you can keep or discard. Basic rule is to keep every njk template on same level, so every template part will have exactly same path to your assets folder. This way you can use relative path to images and other assets in templates, so [html-loader](https://github.com/webpack-contrib/html-loader) will be able to pick it up and compile.

## Why does this exists

There is lots of things today that will make you a static page, but I wanted something that would be easy to use, doesn't generate any excessive javascript, being still modular in nature, and allowing me to maintain some resemblance to component system.

My tools of choise: Nunjucks for templates and SASS for styles.

As for the build tool, I wanted to use parcel, but it has some side effects that I want to avoid, like file hashes and little extensibillity. Probably I will switch back to it when version 2 will be stable enough.
