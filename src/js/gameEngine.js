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
        wizard.posX -= speed; //за да се движи наляво трябва да изваждаме и по този нажин wizard-a отива към x-координатата, т.к сме си направили координатната система наобратно
    }

    if (state.keys.KeyS) { //за да се движи надолу, пишем плюс, т.к. wizad-a тръгва отгоре надолу
        wizard.posY += speed;
    }

    if (state.keys.KeyD) {
        wizard.posX += speed; // за надясно прибавяме
    }

    if (state.keys.KeyW) { // тук не пишем else if, а само if, защото по този начин нашия wizard може да с едвижи едновремнно нагоре и надясно, т.е. по диагонал
        wizard.posY -= speed; // тук пишем минус, защото като си представим диаграмамта x и y, нашия wizard тръгва от горе надолу, т.е ако прибавяме, той ще се движи нагоре, а като изваждаме, се движи надолу 
    }

    //Render
    wizardElement.style.left = wizard.posX + 'px'; // !!!Задължително трябва да пишем 'px', иначе не работи!!! Тук казваме, че искаме стила left на wizartElement-a да е равно на стойността, която вече имаме в state-a
    wizardElement.style.top = wizard.posY + 'px';

    window.requestAnimationFrame(gameLoop.bind(null, state, game)); //и тук тъй като фунцкията всеки път ще си го извиква този window.requestAnimationFrame(gameLoop), ще получим безкраен цикъл

}