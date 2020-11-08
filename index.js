var miio = require('miio');
var Service, Characteristic;
var devices = [];

module.exports = function (homebridge) {

    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory('homebridge-mi-smart-power-plug', 'MiSmartPowerPlug', MiSmartPowerPlug);
}

function MiSmartPowerPlug(log, config) {
    this.log = log;
    this.name = config.name || 'Mi Smart Power Plug';

    this.services = [];

    this.switchService = new Service.Switch(this.name);

    this.switchService
       .getCharacteristic(Characteristic.On)
       .on('get',this.getPowerState.bind(this))
       .on('set',this.setPowerState.bind(this));

    this.services.push(this.switchService);

    this.serviceInfo = new Service.AccessoryInformation();

    this.serviceInfo
        .setCharacteristic(Characteristic.Manufacturer, 'Xiaomi')
        .setCharacteristic(Characteristic.Model, 'chuangmi.plug.hmi206')
        .setCharacteristic(Characteristic.SerialNumber, 'ZNCZ05CM');

    this.services.push(this.serviceInfo);

    if(miio.Device === undefined) {
        log.error('`MIIO` VERSION ON YOUR SYSTEM TOO HIGH. DOWNGRADE TO v0.14.1');
        return;
    }

    this.discover();
}

MiSmartPowerPlug.prototype = {
    discover: function () {
        var accessory = this;
        var log = this.log;

        log.debug('Discovering Mi Smart Power-Plug devices...');

        // Discover device in the network
        var browser = miio.browse();

        browser.on('available', function(reg){
            // Skip device without token
            if(!reg.token)
                return;

            miio.device(reg).then(function(device){

                if(device.type === undefined) {
                    log.error('`MIIO` VERSION ON YOUR SYSTEM TOO HIGH. DOWNGRADE TO v0.14.1');
                    return;
                }

                if(device.type != 'power-strip') 
                    return;
                
                devices[reg.id] = device;
                accessory.device = device;

                log.debug('Discovered "%s" (ID: %s) on %s:%s.', reg.token, device.id, device.address, device.port);
            });
        });

        browser.on('unavailable', function(reg){
            // Skip device without token
            if(!reg.token)
                return;

            var device = devices[reg.id];

            if(!device)
                return;

            device.destroy();
            delete devices[reg.id];
        });
    },

    getPowerState: function (callback) {

        if(!this.device){
            callback(null, false);
            return;
        }
        
        var channel = this.device.powerChannels && this.device.powerChannels.slice(-1)[0];

        this.log.info('powerChannel:', channel);
        this.log.info('channel[' + channel + '] getPowerState:', this.device.power(channel));

        callback(null, this.device.power(channel));
    },

    setPowerState: function (state, callback) {
        if(!this.device){
            callback(new Error('Not found Mi Smart Power-Plug.. :('));
            return;
        }

        this.device.setPower(state);
        callback();
    },

    getServices: function () {
        return this.services;
    }
};
