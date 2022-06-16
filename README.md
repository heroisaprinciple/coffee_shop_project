# The Black&White Production Coffee Shop.

The project made in 2022, May - June

## Technologies used:

1) Node.js + Express
2) JWT

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

3. (File Watcher Settings) In `Program` use `sass`, in Arguments `$FileName$:$FileNameWithoutExtension$.css`. Output
   path should be correct automatically.

##### AND BE VERY CAREFUL WITH `<link>` in .hbs files. You may need to change the link manually for each file.

## To debug:

1) You may need use console.log() everywhere in callbacks and requests. As you want.
2) In try/catch block in order to see an error or what is wrong, just delete try/catch statements. Then, in your browser
   you might see the error.
3) You may put breakpoints and start debugging in the IDE, then do some actions in the browser (like fill
   the form and click button to send data to server) and then do F7, F8 to go into/go over into next block in debugging.

## A huge difference between `sendStatus(status)` and just `send(status)`

`status()` sets a HTTP status on the response (as a Javascript object on the server side).

`sendStatus()` sets the status and sends it to the client.

This means that if you want to **both set a status and send a body you have to use `status()`**.

For example, you want to set an error status, and send a body with a JSON that explains why the error occured, you
first have to set the status (using status), and then send the JSON (using send). If you had already set the status
with sendStatus, it is no longer possible to send the JSON, because you already used a form of sent.

## PLEASE NEVER DECODE PASSWORDS AND COMPARE THEM TO THE PASSWORD IN `req.body.password` as this is extremely dangerous

and unsafe!!