var miio = require('miio');
var Service, Characteristic;

module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory('homebridge-xiaomi-power-strip', 'XiaoMiPowerStrip', XiaoMiPowerStrip);
}

function XiaoMiPowerStrip(log, config) {
    this.log = log;
    this.name = config.name || 'Power Strip';
    this.address = config.address;
    this.token = config.token;
    this.model = config.model;

    this.services = [];

    this.switchService = new Service.Switch(this.name);

    this.switchService
        .getCharacteristic(Characteristic.Active)
        .on('get', this.getPowerState.bind(this))
        .on('set', this.setPowerState.bind(this));


    this.services.push(this.switchService);

    this.serviceInfo = new Service.AccessoryInformation();

    this.serviceInfo
        .setCharacteristic(Characteristic.Manufacturer, 'Xiaomi')
        .setCharacteristic(Characteristic.Model, 'Power-Strip')
        .setCharacteristic(Characteristic.SerialNumber, '62810821');;

    this.services.push(this.serviceInfo);


    this.discover();
}

XiaoMiPowerStrip.prototype = {
    discover: function () {
        var accessory = this;

        const device = miio.createDevice({
            address: '192.168.1.23',
            token: '07642c5604a7ab99ebb33e5ec1e2f68f',
            model: "zimi.powerstrip.v2"
        });
        device.init();
        accessory.device = device;
    },

    getPowerState: function (callback) {
        var state = this.device.power
        if (state) {
            callback(null, Characteristic.Active.ACTIVE);
        } else {
            callback(null, Characteristic.Active.INACTIVE);
        }
        this.log.info('getPowerState:', state);
    },

    setPowerState: function (Power, callback) {
        this.log.info('setPowerState:', Power);
        this.device.setPower(state === Characteristic.Active.ACTIVE)
            .then((res) => {
                this.log.info('setPowerStateResponse:', res);
                callback();
            });
    },
    //
    // getCurrentAirPurifierState: function (callback) {
    //     var mode = {
    //         idle: Characteristic.CurrentAirPurifierState.INACTIVE,
    //         silent: Characteristic.CurrentAirPurifierState.IDLE,
    //         favorite: Characteristic.CurrentAirPurifierState.PURIFYING_AIR,
    //         auto: Characteristic.CurrentAirPurifierState.PURIFYING_AIR,
    //         low: Characteristic.CurrentAirPurifierState.IDLE,
    //         medium: Characteristic.CurrentAirPurifierState.PURIFYING_AIR,
    //         high: Characteristic.CurrentAirPurifierState.PURIFYING_AIR,
    //     };
    //     var state = mode[this.device.mode];
    //     this.log.info('CurrentAirPurifierState:', this.device.mode, state);
    //     callback(null, state);
    // },
    //
    // getTargetAirPurifierState: function (callback) {
    //     var mode = {
    //         idle: Characteristic.TargetAirPurifierState.MANUAL,
    //         silent: Characteristic.TargetAirPurifierState.MANUAL,
    //         favorite: Characteristic.TargetAirPurifierState.MANUAL,
    //         auto: Characteristic.TargetAirPurifierState.AUTO,
    //         low: Characteristic.TargetAirPurifierState.MANUAL,
    //         medium: Characteristic.TargetAirPurifierState.MANUAL,
    //         high: Characteristic.TargetAirPurifierState.MANUAL,
    //     };
    //     var state = mode[this.device.mode];
    //     this.log.info('TargetAirPurifierState:', this.device.mode, state);
    //     callback(null, state);
    // },
    //
    // setTargetAirPurifierState: function (state, callback) {
    //     if (state === Characteristic.TargetAirPurifierState.MANUAL) {
    //         this.device.setMode('favorite');
    //     } else if (state === Characteristic.TargetAirPurifierState.AUTO) {
    //         this.device.setMode('auto');
    //     }
    //     callback();
    // },


    identify: function (callback) {
        callback();
    },

    getServices: function () {
        return this.services;
    }
};
