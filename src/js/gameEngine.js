// Тук ще създадем безкрайния цикъл, който трябва да се случва в играта
function start(state, game){
    game.createWizard(state.wizard); 

    window.requestAnimationFrame(gameLoop.bind(null, state, game)); //това върши ролята на безкраен цикъл. Браузъра сам определя кога да забързва или забавя скоростта на цикъла
}

function gameLoop(state, game) {
    const { wizard } = state; // wizard-a си го деконструираме от state-a и вместо навсякъде надолу да пишем state.wizard ще пишем само wizard, тък като ще се използва супер много
    const { wizardElement } = game; //същото нещо правим и с wizardElement-a, за да не го вземаме всеки път от game-a с game.wizardElement
    
    // Move wizard
    if (state.keys.KeyA) {
        wizard.posX = Math.max(wizard.posX - wizard.speed, 0); 
    }

    if (state.keys.KeyS) {
        wizard.posY = Math.min(wizard.posY + wizard.speed, game.gameScreen.offsetHeight - wizard.height); // с game.gameScreen.offsetHeight вземаме максималната стойност на екрана, като тук position-a се увеличава и затова е плюс и накрая изваждаме самата височина на wizard-a, защото иначе ще се скрие точно с толкова, колкото е неговата височина, т.к. взема точката от горния ляв ъгъл на wizard-a
    }

    if (state.keys.KeyD) {
        wizard.posX = Math.min(wizard.posX + wizard.speed, game.gameScreen.offsetWidth - wizard.width);
    }
    
    if (state.keys.KeyW) { // тук не пишем else if, а само if, защото по този начин нашия wizard може да с едвижи едновремнно нагоре и надясно, т.е. по диагонал
        wizard.posY = Math.max(wizard.posY - wizard.speed, 0); // Правим го с Math.max, за да вземем по-високата стойност или 0 и по този начин шапката му няма да отива по-нагоре и да излиза извън полето.  
    }

    //Render
    wizardElement.style.left = wizard.posX + 'px'; // !!!Задължително трябва да пишем 'px', иначе не работи!!! Тук казваме, че искаме стила left на wizartElement-a да е равно на стойността, която вече имаме в state-a
    wizardElement.style.top = wizard.posY + 'px';

    window.requestAnimationFrame(gameLoop.bind(null, state, game)); //и тук тъй като фунцкията всеки път ще си го извиква този window.requestAnimationFrame(gameLoop), ще получим безкраен цикъл

}