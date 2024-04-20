# LiveCaidoReload
 
`LiveCaidoReload` is a simple script that allows you to quickly reload your Caido JS plugins without having to update custom CSS or JS every time you make a change. This script is intended to be used with the [EvenBetterAPI](https://github.com/bebiksior/EvenBetterAPI)

## How to use
1. Clone this repository:
```bash
git clone https://github.com/bebiksior/LiveCaidoReload.git
```
2. Run `npm install -g` to install the script globally
3. Run `livecaidoreload` in the directory where your Caido plugins JS/CSS files are located.
You can also run `livecaidoreload <jspath> <csspath>` to specify the paths to your JS and CSS files.

![Screenshot 2024-04-20 at 13 29 54](https://github.com/bebiksior/LiveCaidoReload/assets/71410238/e5b025ba-6b7f-4efb-8600-1b70229b3eff)

4. Install [EvenBetterAPI](https://github.com/bebiksior/EvenBetterAPI) to your JS plugin and add the following code to the main file:
```javascript
EvenBetterAPI.hotReloading();
```
5. Run your Caido plugin, if everything goes well, you should see the "Connected to Caido Hot Reloading Server" toast message.

![Screenshot 2024-04-20 at 13 30 58](https://github.com/bebiksior/LiveCaidoReload/assets/71410238/d82e25d0-ff0f-41a9-8a38-b22cad3da1e2)

## Contributing
Feel free to contribute to the project by creating a pull request. If you have any issues or feature requests, please create an issue.
