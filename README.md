# text-to-qr
A simple REST based api that generates QR-codes in different formats for the provided texts. 

## Demo
See the **[Live Demo](http://text2qr.herokuapp.com/png/500x500/hello%20world)** deployed on heroku server.

## Details
The api can take the url with _format_, _image size_ and _text_.
For example:
```
http://text2qr.herokuapp.com/png/500x500/hello%20world
```
or can also be written as:
```
http://text2qr.herokuapp.com/getqr?type=png&size=500x500&text=Hello%20world
```
will give a 500 x 500 png image of QR Code containing text "hello world".

### Url parameters

Three parameters are required to generate a QR Code.
* Format/type
* size
* text

##### Format
Supported formats are `png`, `jpeg`, `bmp`, `svg` and `pdf`.

For Example:
```
http://text2qr.herokuapp.com/svg/500x500/hello%20world
```
will generate a QR Code containing text "hello world" in SVG format.

**Please Note:** The size is not supported in `svg` and `pdf` formats.

##### Size
Size parameter can be a string of dimensions `widthxheight`.

For Example: `600x400`

##### Text
Text that you wish to encode in a QR Code.

## Development
### How to Run locally
* First clone or download the project.
* Run `npm install` in the project root folder to download dependencies.
* then call `npm run start`.
The node server will be running on port 8080 or otherwise you can set the node environment variable to change the default port.
`process.env.PORT=3000`