// тук ще държим цялата информация за текущото състояние на нашата игра
function initState() { // тази функция сме я кръстили state
    let startX = Math.floor(Math.random() * 1000); // Това ни е start position-a всеки път wizard-aще е на различно място
    let startY = Math.floor(Math.random() * 500); // Това ни е start position-a всеки път wizard-aще е на различно място

    const state =  {
        player: 'Pesho',
        wizard: {
            width: 82,
            height: 100,
            posX: startX,
            posY: startY, //това са текущите позиции на wizard
        },
        keys: {}
    }
    return state;
}
