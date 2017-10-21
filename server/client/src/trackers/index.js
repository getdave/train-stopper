var Sonos = require('node-sonos').Sonos

Sonos.search(function (sonos) {
console.log("Found Sonos '%s'", sonos.host)
sonos.currentTrack(function (err, track) {
if (err) throw err
console.log(track || 'Nothing Playing')
})
