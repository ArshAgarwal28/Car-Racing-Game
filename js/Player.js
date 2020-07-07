class Player {
    constructor() {
        this.index = null;
        this.distance = 0;
        this.time = 0;
        this.rank = 0;
        this.name = null;
    }

    getCount() {
        var playerRef = database.ref('playerCount');
        playerRef.on("value", (data) => { 
            playercount = data.val();
        })
    }

    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        })
    }

    update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            name: this.name, 
            distance: this.distance,
            time: this.time,
            rank: this.rank
        })
    }
    
    static playerInfo(){
        var playersNode = database.ref('players');
        playersNode.on("value", (data) => {
            allPlayers = data.val()
        })
    }
}