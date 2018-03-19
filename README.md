# homebridge-mi-smart-power-strip

This project is forked from [homebridge-xiaomi-power-strip](https://github.com/mininny/homebridge-xiaomi-power-strip).


This is Xiaomi Mi Smart Power Strip plugin for [Homebridge](https://github.com/nfarina/homebridge). Since Apple Homekit is not supporting air purifier device yet, this plugin will add just turn 'On' / 'Off' switch.

이 플러그인은 일명 샤오미 스마트 멀티탭이라고 부리우는 Wi-Fi가 장착된 멀티탭을 iOS 홈킷에 추가하기 위한 홈브릿지 플러그인 입니다. (사실 이 멀티탭이 각 구 마다 컨트롤이 가능한줄 알았더니 그게 아니라, 전부다 껐다/켜는 기능밖에 없군요..) 홈킷에 해당 멀티탭을 껐다/켰다 할 수 있게 추가됩니다.
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
            "accessory": "MiSmartPowerStrip",
            "name": "Mi Smart Power Strip"
        }
     ]
   ```

   ​**Notes:** No more need IP(Address) / token


3. Restart Homebridge, and your Mi Smart Power-strip will be discovered automatically.



### License

See the [LICENSE](https://github.com/mininny/homebridge-xiaomi-power-strip/blob/master/LICENSE.md) file for license rights and limitations (MIT).
