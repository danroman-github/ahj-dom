import goblin from '../img/goblin.png';

const GRID_SIZE = 4;

function createBoard(size) {
    const board = [];
    const container = document.createElement('div');
    container.className = 'game';

    for (let r = 0; r < size; r += 1) {
        for (let c = 0; c < size; c += 1) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = r;
            cell.dataset.col = c;
            container.appendChild(cell);
            board.push(cell);
        }
    }

    const legend = document.createElement('div');
    legend.className = 'legend';
    legend.textContent = 'Перемещение гоблина по сетке 4x4 каждые 1.5 секунды';

    const root = document.querySelector('.game-field');
    root.appendChild(legend);
    root.appendChild(container);

    return { container, board };
}

function getIndexFromRC(r, c, size) {
    return r * size + c;
}

function pickRandomIndex(excludeIndex, size = GRID_SIZE) {
    let idx;
    const maxAttempts = 20;
    for (let i = 0; i < maxAttempts; i += 1) {
        const r = Math.floor(Math.random() * size);
        const c = Math.floor(Math.random() * size);
        idx = getIndexFromRC(r, c, size);
        if (idx !== excludeIndex) return idx;
    }
    for (let i = 0; i < size * size; i += 1) {
        if (i !== excludeIndex) return i;
    }
    return excludeIndex;
}

function placeGoblinAt(board, index) {
    const cell = board[index];
    const img = new Image();
    img.src = goblin;
    img.alt = 'Goblin';
    img.className = 'goblin';
    cell.appendChild(img);
    return img;
}

export default function App() {
    const { container, board } = createBoard(GRID_SIZE);
    let currentIndex = Math.floor(Math.random() * board.length);
    const goblinImg = placeGoblinAt(board, currentIndex);

    const INTERVAL_MS = 1500;

    setInterval(() => {
        const nextIndex = pickRandomIndex(currentIndex, GRID_SIZE);

        // Перемещаем гоблина путём изменения родителя
        const targetCell = board[nextIndex];
        targetCell.appendChild(goblinImg);

        currentIndex = nextIndex;
    }, INTERVAL_MS);
}
