/**
 * Find the invisible Caio
 *
 * by Windsdon
 */

function Caio(){
    this.margin = 50;
    this.triggerDistance = 20;

    this.levels = [this.triggerDistance, 40, 100, 250, 500, 600];
    this.sounds = $(".sound");

    this.image = $(".caio");
    this.container = $(".container");
    this.newGameButton = $("#newGameButton");
    this.newGameDialog = $(".newGame");
    this.endGameDialog = $(".endGame");
    this.endGameButton = $("#endGameButton");

    this.imageW = this.image.width();
    this.imageH = this.image.height();

    this.endGameDialog.hide();

    this.playing = false;

    this.image.hide();

    this.finishGame = function(x, y){
        this.playing = false;

        console.log("Ended");

        this.image.css({left: x, top: y});
        this.image.width(0);
        this.image.height(0);
        this.image.show();

        param = {top: this.container.height()/2, left: this.container.width()/2, width: this.imageW, height: this.imageH};

        console.log(param);

        this.image.animate(param, 1000);

        setTimeout(this.image.hide, 2000);

        setTimeout(this.endGameDialog.show, 2000);
    };

    this.newGameButton.data("game", this).click(function(){
        var game = $(this).data("game");
        game.playing = true;
        game.newGameDialog.hide();
        game.reposition();
    });

    this.endGameButton.data("game", this).click(function(){
        var game = $(this).data("game");
        game.playing = true;
        game.endGameDialog.hide();
        game.reposition();
    });

    this.container.data("game", this).mousemove(function(e){
        var game = $(this).data("game");
        var x = e.clientX;
        var y = e.clientY;
        var distance = Math.sqrt(Math.pow(game.x - x, 2) + Math.pow(game.y - y, 2));

        game.updateSound(distance);
    });

    this.container.click(function(e){
        var game = $(this).data("game");
        var x = e.clientX;
        var y = e.clientY;
        var distance = Math.sqrt(Math.pow(game.x - x, 2) + Math.pow(game.y - y, 2));

        if(distance <= game.triggerDistance){
            game.finishGame(x, y);
        }else{
            console.log("Failed, " + distance);
        }
    });

    this.reposition = function(){
        var width = this.container.width();
        var height = this.container.height();

        this.x = Math.floor((width - 2*this.margin)*Math.random()) - this.margin;
        this.y = Math.floor((height - 2*this.margin)*Math.random()) + this.margin;

        this.updateSound(-1);
    };

    this.updateSound = function(distance){
        var level;
        distance = Math.floor(distance);

        if(distance < 0) {
            level = this.levels.length - 1;
        }else{
            for(var i = 0; i < this.levels.length; i++){
                if(this.levels[i] <= distance){
                    level = i;
                }
            }
        }

        for(var i = 0; i < this.sounds.length; i++){
            var elem = this.sounds[i];
            if(i == level && this.playing){
                elem.play();
            }else{
                elem.currentTime = 0;
                elem.pause();
            }
        }

    }
}

$(document).ready(function(){
    var game = new Caio();
})
