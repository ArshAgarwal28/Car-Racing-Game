class Game {
    constructor() {

    }

    getState() {
        var gameRef = database.ref('gameState');
        gameRef.on("value", function(data) {
            gamestate = data.val()
        })
    }

    update(state) {
        database.ref('/').update({
            gameState: state
        })
    }

    start() {
        if (gamestate === 0) {
            player = new Player();
            player.getCount();

            form = new Form();
            form.display();

            car1 = createSprite(100, 200);
            car1.addImage("c1", car1Anim);
            car1.visible = false;

            car2 = createSprite(300, 200);
            car2.addImage("c2", car2Anim);
            car2.visible = false;

            car3 = createSprite(500, 200);
            car3.addImage("c3", car3Anim);
            car3.visible = false;

            car4 = createSprite(700, 200);
            car4.addImage("c4", car4Anim);
            car4.visible = false;
        }

        cars = [car1, car2, car3, car4]
    }

    play() {
        car1.visible = true;
        car2.visible = true;
        car3.visible = true;
        car4.visible = true;

        form.hide();
        textSize(30);
        text("Game Start", 120, 100);

        background("green");
        image(track, 0, -displayHeight * 4, displayWidth - 50, displayHeight * 5)

        //console.log(camera.x + " " + camera.y + " " + displayWidth + " " + displayHeight);

        Player.playerInfo();
        var index = 0, x = 200, y;
        if (allPlayers !== undefined) {
            var posY = 130;
            for (var plr in allPlayers) {
              //console.log(allPlayers)
                index += 1;
                x += 200;
                y = displayHeight - allPlayers[plr].distance;
                if (plr === "player" + player.index) {
                    fill("red");
                    ellipse(x, y, 60, 60);

                    cars[index - 1].shapeColor = "red";
                    camera.position.y = cars[index - 1].y;
                }
                cars[index - 1].x = x;
                cars[index - 1].y = y;
                posY += 20;
                textSize(15);
                text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120, posY);


            }
        }



        if (player.distance > 4000) {
            gamestate = 2;
        }

        if (player.distance < 4000) {
            player.time += 1;
            //player.update();

            if (keyIsDown(UP_ARROW) && player.index !== null) {
                player.distance += 15;
            }

            player.update();
        }
    }

    endState() {
        game.update(2);

        this.playersTime = [];
        for (var plr in allPlayers) {
          this.playersTime.push(allPlayers[plr].time)
        }

        for (var i = 0; i < 4; i++) {
          for (var j=0; j < 4 - i; j++) {
            if (this.playersTime[j] > this.playersTime[j + 1]) {
              var temp = this.playersTime[j];
              this.playersTime[j] = this.playersTime[j + 1];
              this.playersTime[j + 1] = temp;
            }
          }
        }


        for (var i=0; i < 4; i++) {
          if (player.time === this.playersTime[i]) {
            player.rank = i + 1;
            i = 3;
          }
        }

        //console.log(this.playersTime);

        console.log("Name: " + player.name + "\n" + "Time: " + player.time + "\n" + "Rank: " + player.rank);
    }
}
