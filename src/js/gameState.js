// тук ще държим цялата информация за текущото състояние на нашата игра
function initState() { // тази функция сме я кръстили state
    let startX = Math.floor(Math.random() * 1000); // Това ни е start position-a всеки път wizard-aще е на различно място
    let startY = Math.floor(Math.random() * 500); // Това ни е start position-a всеки път wizard-aще е на различно място

    const state =  {
        player: 'Pesho',
        wizard: {
            width: 100,
            height: 100,
            posX: startX,
            posY: startY, //това са текущите позиции на wizard
            speed: 10,
        },

        bugStats: { 
            width: 50,
            height: 50,
            nextSpawnTimestamp: 0,
            maxSpawnInterval: 1500,
            speed: 8,
        },

        fireball: {
            width: 20,
            height: 20,
            speed: 12, 
            nextSpawnTimestamp: 0, 
            fireRate: 500,
        },

        keys: {
            KeyA: false, //false означава, че не е натиснат
            KeyS: false,
            KeyD: false,
            KeyW: false,
            Space: false,
        }
    }
    return state;
}
