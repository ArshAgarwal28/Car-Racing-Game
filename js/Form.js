class Form {
    constructor() {
        this.input = createInput("Name: ");
        this.button = createButton('Play');
        this.greetings = createElement('h3');

        this.reset = createButton('RESET');
    }

    hide() {
        this.input.hide();
        this.button.hide();
        this.greetings.hide();
    }

    display() {
        var title = createElement('h2');
        title.html("Car Racing Game");
        title.position(displayWidth / 2 - 125, 0);

        this.input.position(displayWidth / 2 - 100, displayHeight / 6);

        this.button.position(displayWidth / 2 - 50, displayHeight / 4);

        this.reset.position(displayWidth - 125, displayHeight / 38);

        this.button.mousePressed(() => {
            this.input.hide();
            this.button.hide();

            player.name = this.input.value();
            
            playercount += 1;

            player.index = playercount;


            player.update();
            player.updateCount(player.index);
            
            this.greetings.html("Hello " + player.name);
            this.greetings.position(displayWidth /2 - 125, displayHeight / 6);
        })

        this.reset.mousePressed(() => {
            var playersNode = database.ref('players');
            playersNode.remove();

            game.update(0);

            player.updateCount(0);
            gamestate = 0;

            game.start();

            car1.visible = false;
            car2.visible = false;
            car3.visible = false;
            car4.visible = false;
        })
    }
}