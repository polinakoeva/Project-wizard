let state = initState();
let game = initGameObject();

const availableKeys = [
    'KeyA',
    'KeyS',
    'KeyD',
    'KeyW',
];

document.addEventListener('keydown', (e) => { //keydown използваме, коагто искаме да натиснем и задържим, за да се мести героя ни постоянно
    if (availableKeys.includes(e.code)) {
        state.keys[e.code] = true;
    }
});
document.addEventListener('keyup', (e) => { //keyup - когато си вдигнем пръста от бутона
    state.keys[e.code] = false; // за съответния key, който е бил натиснат
});

game.startScreen.addEventListener('click', (e) => {
    game.startScreen.classList.add('hidden');
    game.gameScreen.classList.remove('hidden');

    // Start game
    start(state, game);
});

