// Тук ще създадем безкрайния цикъл, който трябва да се случва в играта
function start(state, game){
    game.createWizard(state.wizard); 

    window.requestAnimationFrame(gameLoop.bind(null, state, game)); //това върши ролята на безкраен цикъл. Браузъра сам определя кога да забързва или забавя скоростта на цикъла. Timestamp означава времевия отпечатък от стартирането на нашия animation frame
}

function gameLoop(state, game, timestamp) {
    const { wizard } = state; // wizard-a си го деконструираме от state-a и вместо навсякъде надолу да пишем state.wizard ще пишем само wizard, тъй като той ще се използва много пъти
    const { wizardElement } = game; //същото нещо правим и с wizardElement-a, за да не го вземаме всеки път от game-a с game.wizardElement
    
    modifyWizardPosition(state, game);

    if (state.keys.Space) { //ако Space-бутона е натиснат 
        game.wizardElement.style.backgroundImage = 'url("/src/images/wizard-fire.png")'

        game.createFireball(wizard, state.fireball);
    } else {
        game.wizardElement.style.backgroundImage = 'url("/src/images/wizard.png")'
    }

    // Spawn bugs
    if(timestamp > state.bugStats.nextSpawnTimestamp) {
        game.createBug(state.bugStats);
        state.bugStats.nextSpawnTimestamp = timestamp + Math.random() * state.bugStats.maxSpawnInterval; // вземаме текущия timestamp, към него добавяме random-a, който на практика е от 0 до 1 и го умножаваме по state.bugStats.maxSpawnInterval, което в случая е 3000. Това ще е някава random част от 3000ms. И дефакто когато следващия timestamp стане > nextSpawnTimestamp, тогава отк=ново ше spaw-не нов bug и тогава ще преизчисли
    }  
         
    // Render bugs
    let bugElements = document.querySelectorAll('.bug');
    bugElements.forEach(bug => {
        let posX = parseInt(bug.style.left); // Тук си вземаме стойността в момента. ParseInt парсва до там, докъдето има цифри и другото го игнорира
        
        if (posX > 0) {
            bug.style.left = posX - state.bugStats.speed + 'px'; // на текущия bug искам да му вземеш стила left и да му кажеш, че е равен на  posX - скоростта и задължително добавяме 'px' и това е за всеки един от бъговете. Това ще хване всичките бъгове и на всеки един фрейм ще ги премести с по 10px
        } else {
            bug.remove();
        }
    });

    // Render fireballs
    document.querySelectorAll('.fireball').forEach(fireball => {
        let posX = parseInt(fireball.style.left); // вземаме позицията Х на fireball-a

        // Detect collision
        bugElements.forEach(bug => {
            if(detectCollision(bug, fireball)) { //проверяваме дали между този конкретен bug и този конкретен fireball има collision
                bug.remove();
                fireball.remove();
            }
        });

        if (posX > game.gameScreen.offsetWidth) {
            fireball.remove(); // за да не продължава извън екрана
        } else {
            fireball.style.left = posX + state.fireball.speed + 'px'; // по този начин местим fireball-a надясно 
        }
    });



    //Render wizard
    wizardElement.style.left = wizard.posX + 'px'; // !!!Задължително трябва да пишем 'px', иначе не работи!!! Тук казваме, че искаме стила left на wizartElement-a да е равно на стойността, която вече имаме в state-a
    wizardElement.style.top = wizard.posY + 'px';



    window.requestAnimationFrame(gameLoop.bind(null, state, game)); //и тук тъй като фунцкията всеки път ще си го извиква този window.requestAnimationFrame(gameLoop), ще получим безкраен цикъл
}

function modifyWizardPosition(state, game) {
     const { wizard } = state;
      
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
}

function detectCollision(objectA, objectB) {
    let first = objectA.getBoundingClientRect();
    let second = objectB.getBoundingClientRect();

    let hasCollision = !(first.top > second.bottom || first.bottom < second.top || first.right < second.left || first.left > second.right); // ако всичките условия не са верни имаме сблъсък

    return hasCollision;
}