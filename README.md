# homebridge-mi-smart-power-plug

This project is forked from [homebridge-xiaomi-power-strip](https://github.com/mininny/homebridge-xiaomi-power-strip) and referenced by [homebridge-mi-air-purifier2](https://www.npmjs.com/package/homebridge-mi-air-purifier2).

This is Xiaomi Mi Smart Power Plug plugin for [Homebridge](https://github.com/nfarina/homebridge).

### Dependency

* miio version less than 0.15.0 (^0.14.1)

### Features

* Switch on / off.

### Installation

1. Install required packages.

   ```
   npm install -g homebridge-mi-smart-power-strip miio@0.14.1
   ```


2. Add following accessory to the `config.json`.

   ```
     "accessories": [
       {
            "accessory": "MiSmartPowerPlug",
            "name": "Mi Smart Power Plug"
        }
     ]
   ```

3. Restart Homebridge, and your Mi Smart Power Plug will be discovered automatically.



### License

See the [LICENSE](https://github.com/zhmul/homebridge-mi-smart-power-plug-eu/blob/master/LICENSE.md) file for license rights and limitations (MIT).

