# Device Activation Method

1. User need to have a physical gateway. Gateway models should be defined by Device team, there are 3 types
   1. Arduino type
   2. Raspberry type
   3. STM type
2. User download the firmware for device type from EoH website
3. User use dashboard to create new gateway
   1. EoH generate new IMEI and code
   2. User copy this code to the IDE before compiling firmware to gateway
4. The user connect **sensor** to **gateway** physically
5. Users use dashboard to configure the gateway
   1. Monitor configuration
      1. Where the data should be read, **pin / modbus / zigbee**
      2. Data type
      3. Interval
   2. Control configuration
      1. What should be control **pin / modbus / zigbee**
      2. Control parameter
6. Users use mobile to configure display
   1. Action templates
   2. Display template
7. User use website to configurate dashboard
   1. Display format
8. Done

In order to become active in EOH Cloud and available for use, each device should have a unique AuthToken. AuthToken is the main identifier of the device in the EoH Cloud. Depending on the hardware, connectivity, and the IoT use-case you are working on, a way of getting AuthTokens for your device can vary.

\
