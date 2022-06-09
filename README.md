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

The full instruction: https://webdesign.tutsplus.com/tutorials/watch-and-compile-sass-in-five-quick-steps--cms-28275

2. To compile automatically, use a File Watcher (a great video instruction): 

    https://www.youtube.com/watch?v=u1GZVdQyeRc

##### AND BE VERY CAREFUL WITH `<link>` in .hbs files. You may change the link manually for each file.

## To debug:

1) You may need use console.log() everywhere in callbacks and requests. As you want.
2) In try/catch block in order to see an error or what is wrong, just delete try/catch statements. Then, in your browser you might see the error. 
