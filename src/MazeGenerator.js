export class MazeGeneratorDrawer{
    /**
     * Generates and draws a Maze in the Grid using Recursive Division Algorithm.
     * @param {Grid} grid - Grid where the maze will be drawn.
     * @param ctx - grid context
     * @param {number} cols - The number of columns in the grid.
     * @param {number} rows - The number of rows in the grid.
     * @example
     * const grid = new Grid('gameCanvas', 20, 20);
     */
    constructor(grid){
        this.grid = grid;
    }

    choose_orientation(height, width){
        const orientation = ["horizontal", "vertical"];
        if (width < height){
            return orientation[0];
        } else if (height > width){
            return orientation[1];
        } else {
            random_index = Math.random() < 0.5 ? 0: 1
            return orientation[random_index]
        }
    }

    /*
    generateMaze() {
        let maze = []
        for (let row=0; row < this.grid.num_rows; row++){
            let new_row = []
            for(let col=0; col < this.grid.num_cols; col++){
                new_row.push('0')
            }
            maze.push(new_row)
        }
        console.log(maze)
    }
    */

    divide(grid, x, y, width, height){
        
    }

    generateMaze() {
        initial_x, initial_y = 0, 0
        initial_width, initial_height = this.grid.num_cols - initial_x, this.grid.num_rows - initial_y

        this.divide(this.grid, initial_x, initial_y, initial_width, initial_height)
    }

    








}