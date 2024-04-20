# LiveCaidoReload
 
`LiveCaidoReload` is a simple script that allows you to quickly reload your Caido JS plugins without having to update custom CSS or JS every time you make a change. This script is intended to be used with the [EvenBetterAPI](https://github.com/bebiksior/EvenBetterAPI)

## How to use
1. Clone the repository
2. Run `npm install -g` to install the script globally
3. Install [EvenBetterAPI](https://github.com/bebiksior/EvenBetterAPI) to your JS plugin and add the following code to your plugin:
```javascript
EvenBetterAPI.hotReloading();
```
4. Run `livecaidoreload` in the directory where your Caido plugins JS/CSS files are located.
You can also run `livecaidoreload <jspath> <csspath>` to specify the paths to your JS and CSS files.
5. Run your Caido plugin, if everything went well, you should see "Connected to Caido Hot Reloading Server" toast message.

## Contributing
Feel free to contribute to the project by creating a pull request. If you have any issues or feature requests, please create an issue.