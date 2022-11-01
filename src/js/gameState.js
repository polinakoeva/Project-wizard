// тук ще държим цялата информация за текущото състояние на нашата игра
function initState() {
    const state =  {
        player: 'Pesho',
        wizard: {
            width: 82,
            height: 100,
            startX: Math.floor(Math.random() * 1000), //всеки път wizard-aще е на различно място
            startY: Math.floor(Math.random() * 500), //всеки път wizard-aще е на различно място
        }
    }
    return state;
}
