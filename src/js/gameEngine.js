// Тук ще създадем безкрайния цикъл, който трябва да се случва в играта
function start(state, game){
    game.createWizard(state.wizard); 

    window.requestAnimationFrame(gameLoop.bind(null, state, game)); //това върши ролята на безкраен цикъл. Браузъра сам определя кога да забързва или забавя скоростта на цикъла
}

function gameLoop(state, game) {
    console.log(state.keys);

    window.requestAnimationFrame(gameLoop.bind(null, state, game)); //и тук тъй като фунцкията всеки път ще си го извиква този window.requestAnimationFrame(gameLoop), ще получим безкраен цикъл

}