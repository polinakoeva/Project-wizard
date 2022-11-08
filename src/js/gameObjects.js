//Tук ще дефинираме всички DOM-обекти

function initGameObject() { // тази функция сме кръстили game
    const startScreen = document.querySelector('.start-screen');
    const gameScreen = document.querySelector('.game-screen');
    const scoreScreen = document.querySelector('.score');
    
    return {
        startScreen,
        gameScreen,
        scoreScreen,
        createWizard(initialState){
            let wizardElement = document.createElement('div'); // wizardElement е DOM-елемента, който е wizard, а само wizard e обекта с данните, свързани с wizard-а
            wizardElement.classList.add('wizard'); 

            wizardElement.style.width = initialState.width + 'px'; //по този начин сетваме големината на нашия DOM-елемент да е точно толкова, колкото сме я задали в initialState 
            wizardElement.style.height = initialState.height + 'px';

            wizardElement.style.left = initialState.posX + 'px'; //обяснението с координатната система top-left
            wizardElement.style.top = initialState.posY + 'px';

            // обработили сме си wizardElementa-a и го закрепваме към обекта return, в който се намираме 
            this.wizardElement = wizardElement; //така закрепяме wizardElement-a в обекта, в който се намираме, т.е горе след gameScreen
            gameScreen.appendChild(wizardElement); //закрепваме го за gameScreen-a

            return wizardElement;   
        },
        createFireball(wizard, fireball) {
            let fireballElement = document.createElement('div');
            fireballElement.classList.add('fireball');
            fireballElement.style.left = wizard.posX + wizard.width + 'px'; //wizard.width, за да наместим fireball-a до ръката на wizard-a, тъй като в момента е в горния ляв ъгъл и когато добавим широчината на wizard-a един път, fireball-a ще се изпести в дясно 
            fireballElement.style.top = wizard.posY + wizard.height / 2 + 'px'; // wizard.height / 2, защото не искаме да е в краката му, а по средата
            fireballElement.style.width = fireball.width + 'px';
            fireballElement.style.height = fireball.height + 'px';

            gameScreen.appendChild(fireballElement);
        }, 
        createBug(stats) {
            const bugElement = document.createElement('div');
            bugElement.classList.add('bug');
            bugElement.style.width = stats.width + 'px'; // това ще ни позволи да променяме бъговете, да ги правим по-малки или по-големи
            bugElement.style.height = stats.height + 'px';
            bugElement.style.left = gameScreen.offsetWidth - stats.width + 'px'; 
            bugElement.style.top = Math.floor(Math.random() * (gameScreen.offsetHeight - stats.height)) + 'px'; // всеки едни bug си е на random позиция, която се получава в следствие на този ред код и на екрана се появяват един след друг много бъгове на различни места без да спират. изваждаме stats.height, защото взема горната точка от картинката и иначе ще излезе извън екрана

            gameScreen.appendChild(bugElement);
        }

    };   
}
