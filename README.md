# Network

### Status on all network devices
ifconfig

### Useful background links
https://linuxcommando.blogspot.se/2013/10/how-to-connect-to-wpawpa2-wifi-network.html
https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md

### Edit wifi network settings
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf

### Turn Wifi on/off 
sudo ifdown wlan0
sudo ifup wlan0

### Wireless device up / down
ip link show wlan0

### Check the connection status
/sbin/iw wlan0 link
/sbin/iw wlan0 link | grep SSID | awk '{print $1}'
-> SSID:   
if wlan0 is up

### Set up with button
wpa_cli scan
wpa_cli scan_results
wpa_cli wps_pbc '70:8b:cd:e7:ac:d0'

### Check that you are all set
/sbin/iw wlan0 link
Connected to 70:8b:cd:e7:ac:d0 (on wlan0)
	SSID: ASUS-RT-N12-WAP-BUTTON
	freq: 2437
	RX: 901 bytes (7 packets)
	TX: 7680 bytes (40 packets)
	signal: -21 dBm
	tx bitrate: 24.0 MBit/s

	bss flags:	short-slot-time
	dtim period:	3
	beacon int:	100

/sbin/iw wlan0 link | grep SSID | awk '{print $2}'
-> ASUS-RT-N12-WAP-BUTTON

/sbin/iw wlan0 link | grep SSID | echo $?
0 (SSID finns, funkar), 1 ( funkar inte)

### Ping external through wlan0
ping -c 1 -I wlan0 www.kth.se
exitCode :0 om ok, annars 1 eller 2 eller något helt annat
