# LiveCaidoReload [WIP]
 
This is a simple script that will look for changes in `JS_FILE_PATH` and `CSS_FILE_PATH` and reload the Caido with the new changes. It's a simple way to develop the Caido JS plugins without having to reload the page every time you make a change.

## How to use
1. Clone the repository
2. Modify the `JS_FILE_PATH` and `CSS_FILE_PATH` variables in the `livecaidoreload.js` file
3. Run the `livecaidoreload.js` script by using the command `npm start`
4. Install [EvenBetterAPI](https://github.com/bebiksior/EvenBetterAPI) to your JS plugin and add the following code to your plugin:
```javascript
EvenBetterAPI.hotReloading();
```
