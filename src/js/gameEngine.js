// Тук ще създадем безкрайния цикъл, който трябва да се случва в играта
function start(state, game){
    game.createWizard(state.wizard); 

    window.requestAnimationFrame(gameLoop.bind(null, state, game)); //това върши ролята на безкраен цикъл. Браузъра сам определя кога да забързва или забавя скоростта на цикъла
}

function gameLoop(state, game) {
    const { wizard } = state; // wizard-a си го деконструираме от state-a и вместо навсякъде надолу да пишем state.wizard ще пишем само wizard, тък като ще се използва супер много
    const { wizardElement } = game //същото нещо правим и с wizardElement-a, за да не го вземаме всеки път от game-a с game.wizardElement
    // Move wizard
    if (state.keys.KeyD) {
        wizard.posX += 2;
    }

    //Render
    wizardElement.style.left = wizard.posX + 'px'; // !!!Задължително трябва да пишем 'px', иначе не работи!!! Тук казваме, че искаме стила left на wizartElement-a да е равно на стойността, която вече имаме в state-a

    window.requestAnimationFrame(gameLoop.bind(null, state, game)); //и тук тъй като фунцкията всеки път ще си го извиква този window.requestAnimationFrame(gameLoop), ще получим безкраен цикъл

}