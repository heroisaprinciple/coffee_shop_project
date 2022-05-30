# The Black&White Production Coffee Shop.
The project made in 2022, May - ...

## Technologies used:

1) Node.js + Express
2) HTML/CSS, Preprocessors (SCSS)
3) Handlebars
4) Stripe (Accepting Payments)
5) JWT

## To compile from SASS to CSS:

1) You need to install some sass packages. 
Add to package.json:

`"scripts" : {`

`"scss": "node-sass --watch scss -o css"`

`}`

Run `npm run`

2. To compile automatically, use a File Watcher (a great video instruction): 

    https://www.youtube.com/watch?v=u1GZVdQyeRc

##### AND BE VERY CAREFUL WITH `<link>` in .hbs files. You may change the linkmanually for each file.
