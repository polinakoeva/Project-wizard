//Tук ще дефинираме всички DOM-обекти

function initGameObject() { // тази функция сме кръстили game
    const startScreen = document.querySelector('.start-screen');
    const gameScreen = document.querySelector('.game-screen');
    
    return {
        startScreen,
        gameScreen,
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

            
        }
    };   
}
