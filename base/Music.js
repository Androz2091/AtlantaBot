class Guild {
    constructor(text, voice) {
        this.text = text,
        this.voice = voice,
        this.connection = null,
        this.songs = [],
        this.volume = 100,
        this.playing = true
    }
}

class Song {
    constructor(discordUser, vde) {
        this.discordUser = discordUser,
        this.title = vde.title, // the video title
        this.raw = vde.raw, // the other informations of the video
        this.channel = vde.raw.snippet.channelTitle, // the channel of the video
        this.url = `https://www.youtube.com/watch?v=${vde.id}`, // the url of the video
        this.ms = ((vde.duration.hours*3600)+(vde.duration.minutes*60)+(vde.duration.seconds)) * 1000
    }
}

module.exports = {
    Guild:Guild,
    Song:Song
}