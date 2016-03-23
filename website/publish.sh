#!/bin/bash

cd "$(dirname "$0")"
cd ..
npm run site
mv website website_new
git fetch origin gh-pages
git checkout gh-pages
rm -rf website
rm index.html
mv website_new website
mv website/index.html index.html
git add -A .
git commit -m "Update github pages"
