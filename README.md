# LiveCaidoReload
 
`LiveCaidoReload` is a simple script that allows you to quickly reload your Caido plugins without having to remove them and install every time you make a change. This script is intended to be used with the [LiveCaidoReloadPlugin](https://github.com/bebiksior/LiveCaidoReloadPlugin)

## How to use
1. Clone this repository:
```bash
git clone https://github.com/bebiksior/LiveCaidoReload.git
```
2. Run `npm install -g` to install the script globally
3. Run `livecaidoreload` in the directory where your `plugin.zip` file is located.
   You can also run `livecaidoreload <pluginzippath>` to specify the paths to your `plugin.zip` file
   
   <img width="743" alt="Screenshot 2024-06-02 at 20 56 38" src="https://github.com/bebiksior/LiveCaidoReload/assets/71410238/65e41420-5b2f-4653-b43f-0ab0e0770941">

5. Install [LiveCaidoReloadPlugin](https://github.com/bebiksior/LiveCaidoReloadPlugin) to your Caido instance
6. You should see a toast message in your Caido instance saying that we are connected to the LiveCaidoReload script

   ![Screenshot 2024-06-02 at 20 57 43](https://github.com/bebiksior/LiveCaidoReload/assets/71410238/6e3f4a3b-a268-4d16-9756-b4a7eed0e06e)

 7. Build your plugin, Caido instance should reload with the new plugin version installed :D

## Contributing
Feel free to contribute to the project by creating a pull request. If you have any issues or feature requests, please create an issue.
