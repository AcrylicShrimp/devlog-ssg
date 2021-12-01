# devlog-ssg

This project is my blog site generator. Here's my blog: https://blog.ashrimp.dev/

It has been built on the [Svelte](https://svelte.dev/) with the [Elder.js](https://github.com/Elderjs/elderjs).

## how to build

```bash
npm run build
```

The result artifacts will be built in the `dist-opt` directory.

## note

This project contains some patches to add `index.html` at every end of the urls in the generated sitemaps. This is required because some deployment environments (such as AWS Cloudfront with AWS S3) not support serving index page for sub-directories.
