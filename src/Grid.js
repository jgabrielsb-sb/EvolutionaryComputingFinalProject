export class Grid {
    /**
     * Creates a grid on a canvas element.
     * @param {string} canvasId - The ID of the canvas element where the grid will be drawn.
     * @param {number} cols - The number of columns in the grid.
     * @param {number} rows - The number of rows in the grid.
     * @example
     * const grid = new Grid('gameCanvas', 20, 20);
     */
    constructor(canvas_id, num_rows, num_cols){
        this.canvas = document.getElementById(canvas_id);
        this.ctx = this.canvas.getContext("2d");

        this.num_rows = num_rows;
        this.num_cols = num_cols;

        this.resizeCanvas()

    }

    resizeCanvas(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.cellSize = Math.min(
            this.canvas.width / this.num_cols,
            this.canvas.height / this.num_rows
        );

        // Adjust canvas height to fit square cells
        this.canvas.width = this.cellSize * this.num_cols;
        this.canvas.height = this.cellSize * this.num_rows;
    }

    drawGrid(){

        for(let row=0; row < this.num_rows; row++){
            for(let col=0; col < this.num_cols; col++){
                console.log(row,col)
                
                this.ctx.strokeStyle = '#ccc';
                this.ctx.strokeRect(this.cellSize * col, this.cellSize * row, this.cellSize, this.cellSize);

                this.ctx.fillStyle = 'white';
                this.ctx.fillRect(this.cellSize * col, this.cellSize * row, this.cellSize, this.cellSize);
                
                
            }
        }
    }

    fillCell(row, col){
        const x = col * this.cellSize;
        const y = row * this.cellSize;
        const cellSize = this.cellSize
        let opacity = 0;

        const animate = () => {
            if (opacity < 1){
                this.ctx.clearRect(x, y, cellSize, cellSize);
                this.ctx.fillStyle = `rgba(0,0,0, ${opacity})`;
                this.ctx.fillRect(x, y, cellSize, cellSize);

                this.ctx.strokeStyle = '#ccc';
                this.ctx.strokeRect(x, y, cellSize, cellSize);

                opacity += 0.05
                requestAnimationFrame(animate)
            }else{
                this.ctx.fillStyle = 'rgb(0,0,0)'
                this.ctx.fillRect(x, y, cellSize, cellSize)
            }
        }

        animate();
    }

    fillSequenceOfCells(cells_array) {
        cells_array.forEach((cell, index) => {
            const [x, y] = cell;
    
            setTimeout(() => {
                this.fillCell(x, y); // Call `fillCell` after the delay
            }, index * 100); // Delay each cell by 2 seconds multiplied by its position
        });
    }

    

    
}