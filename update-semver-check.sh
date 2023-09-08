#!/bin/bash
# Update the semver-check build. Expecting the react app to be in a sibilig folder 

cd ../semver-check
echo "Building semver-check"
npm run build
cd ../ivanvaccari.github.io

echo "Copy semver-check"
rm -rf ./semver-check/*
cp -r ../semver-check/build/* ./semver-check


git add .
git commit -m "Updated semver-check"
git push