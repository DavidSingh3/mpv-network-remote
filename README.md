# mpv-network-remote
A simple way to control a device's MPV media player from your mobile phone.
The server will run on whatever system you want to remote-control.
The client app (remote controller) will be served by the server, and can be visited on any device in the same LAN as the server.

## Dependencies
You will need:
- `nodejs / npm` to build both the server and the client -- and to run the server
- `mpv` MPV should be discoverable in your system's PATH variable
- `yt-dlp` Used instead of `youtube-dl` for performance reasons -- should also be discoverable in your system's PATH variable
