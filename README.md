# About this project

This is a base template that has Gulp working with Browsersync, Nodemon, Sass, Icon Fonts, and JS compiling.


# Developing in this project

1. Make sure you have installed Node v0.12.*

2. Install Gulp globally on your machine

    ```
    $ npm install -g gulp
    ```

3. Install project dependencies

    ```
    $ npm install 
    ```

2. Start development server

    ```
    $ gulp
    ```
    
    Leave gulp running while you code.  [Gulp](http://gulpjs.com/) makes the development workflow much more automated.

    Whenever you make a change to SCSS, front-end and back-end JS, SVG icons, or Jade files, the Gulpfile.js will automatically refresh the browser with new changes and automatically compile SCSS, JS scripts, and icons into output files.


## File structure

High level project structure

```
public/
| - css/            # Output styles
| - dist/           # Output js
| - fonts/          # Output Icon Fonts
| - img/
| - | - icons/      # Source SVG Icons
| - js/             # Source js
| - scss/           # Source styles
```

The SCSS file organization is based off of http://thesassway.com/beginner/how-to-structure-a-sass-project.