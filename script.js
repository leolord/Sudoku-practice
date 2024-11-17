class Sudoku {
    constructor() {
        this.board = Array(9).fill().map(() => Array(9).fill(0));
        this.solution = Array(9).fill().map(() => Array(9).fill(0));
        this.template = [
            [5,3,4,6,7,8,9,1,2],
            [6,7,2,1,9,5,3,4,8],
            [1,9,8,3,4,2,5,6,7],
            [8,5,9,7,6,1,4,2,3],
            [4,2,6,8,5,3,7,9,1],
            [7,1,3,9,2,4,8,5,6],
            [9,6,1,5,3,7,2,8,4],
            [2,8,7,4,1,9,6,3,5],
            [3,4,5,2,8,6,1,7,9]
        ];
    }

    shuffleBoard() {
        // 复制模板
        this.solution = this.template.map(row => [...row]);
        
        // 随机交换同一个块内的行
        for (let block = 0; block < 3; block++) {
            for (let i = 0; i < 3; i++) {
                const row1 = block * 3 + Math.floor(Math.random() * 3);
                const row2 = block * 3 + Math.floor(Math.random() * 3);
                [this.solution[row1], this.solution[row2]] = 
                [this.solution[row2], this.solution[row1]];
            }
        }

        // 复制解决方案到游戏板
        this.board = this.solution.map(row => [...row]);
    }

    generate(cellsToRemove) {
        // 生成新的数独布局
        this.shuffleBoard();
        
        // 创建要移除的单元格列表
        let positions = [];
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 9; j++) {
                positions.push([i, j]);
            }
        }

        // 随机移除指定数量的数字
        for(let i = 0; i < cellsToRemove; i++) {
            if(positions.length === 0) break;
            const index = Math.floor(Math.random() * positions.length);
            const [row, col] = positions.splice(index, 1)[0];
            this.board[row][col] = 0;
        }
    }
}

class GameController {
    constructor() {
        this.sudoku = new Sudoku();
        this.difficulty = 'easy';
        this.difficultySettings = {
            easy: 30,
            medium: 40,
            hard: 50
        };
        this.totalCells = 0;    // 需要填写的总格子数
        this.completedCells = 0; // 已正确填写的格子数
        this.initializeGame();
        this.bindEvents();
    }

    initializeGame() {
        this.sudoku.generate(this.difficultySettings[this.difficulty]);
        this.renderBoard();
        this.updateDifficultyButtons();
        this.calculateTotalCells();
        this.completedCells = 0;
        this.updateProgress();
    }

    calculateTotalCells() {
        this.totalCells = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.sudoku.board[i][j] === 0) {
                    this.totalCells++;
                }
            }
        }
    }

    updateProgress() {
        const progress = this.totalCells === 0 ? 0 : 
            Math.round((this.completedCells / this.totalCells) * 100);
        document.getElementById('progressText').textContent = `${progress}%`;
    }

    renderBoard() {
        const board = document.getElementById('board');
        board.innerHTML = '';
        
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = i;
                cell.dataset.col = j;
                
                const value = this.sudoku.board[i][j];
                if (value !== 0) {
                    cell.textContent = value;
                    cell.classList.add('fixed');
                }
                
                board.appendChild(cell);
            }
        }
    }

    bindEvents() {
        document.getElementById('board').addEventListener('click', (e) => {
            if (e.target.classList.contains('cell') && !e.target.classList.contains('fixed')) {
                const row = parseInt(e.target.dataset.row);
                const col = parseInt(e.target.dataset.col);
                const input = prompt('请输入数字(1-9)：');
                
                if (input && /^[1-9]$/.test(input)) {
                    const num = parseInt(input);
                    if (num === this.sudoku.solution[row][col]) {
                        if (!e.target.classList.contains('correct')) {
                            this.completedCells++;
                            this.updateProgress();
                        }
                        e.target.textContent = num;
                        e.target.classList.add('correct');
                        this.checkWin();
                    } else {
                        e.target.classList.add('wrong');
                        setTimeout(() => {
                            e.target.classList.remove('wrong');
                        }, 1000);
                    }
                }
            }
        });

        document.getElementById('newGame').addEventListener('click', () => {
            this.initializeGame();
        });

        document.getElementById('giveUp').addEventListener('click', () => {
            this.showSolution();
        });

        ['easy', 'medium', 'hard'].forEach(diff => {
            document.getElementById(diff).addEventListener('click', () => {
                this.difficulty = diff;
                this.initializeGame();
            });
        });

        // 添加提示按钮事件
        document.getElementById('hint').addEventListener('click', () => {
            this.showHint();
        });
    }

    updateDifficultyButtons() {
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.getElementById(this.difficulty).classList.add('active');
    }

    checkWin() {
        if (this.completedCells === this.totalCells) {
            alert('恭喜你完成数独！');
        }
    }

    showSolution() {
        const cells = document.getElementsByClassName('cell');
        for (let i = 0; i < cells.length; i++) {
            const row = parseInt(cells[i].dataset.row);
            const col = parseInt(cells[i].dataset.col);
            cells[i].textContent = this.sudoku.solution[row][col];
        }
        this.completedCells = this.totalCells;
        this.updateProgress();
    }

    // 添加提示方法
    showHint() {
        // 获取所有未填写的格子
        const emptyCells = [];
        const cells = document.getElementsByClassName('cell');
        
        for (let cell of cells) {
            if (!cell.classList.contains('fixed') && !cell.classList.contains('correct')) {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                emptyCells.push({cell, row, col});
            }
        }

        // 如果还有未填写的格子
        if (emptyCells.length > 0) {
            // 随机选择一个空格子
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const {cell, row, col} = emptyCells[randomIndex];
            
            // 填入正确答案
            const correctValue = this.sudoku.solution[row][col];
            cell.textContent = correctValue;
            cell.classList.add('correct');
            cell.classList.add('hint'); // 添加提示标记
            
            // 更新完成度
            this.completedCells++;
            this.updateProgress();
            
            // 检查是否完成
            this.checkWin();
        } else {
            alert('没有可提示的格子了！');
        }
    }
}

// 启动游戏
new GameController();

