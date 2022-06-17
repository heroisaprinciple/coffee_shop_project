# The Black&White Production Coffee Shop.

The project made in 2022, May - June

## The Golden Rule of Node: import YOUR OWN modules before importing NPM one

## Technologies used:

1) Node.js + Express
2) JWT

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

## PLEASE NEVER DECODE PASSWORDS AND COMPARE THEM TO THE PASSWORD IN `req.body.password` as this is extremely dangerous and unsafe! Compare the hash of passwords. 
