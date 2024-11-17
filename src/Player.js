import { Vector2D } from "./Vector2D";

export class Player {
    
    constructor(initial_position){
        this.initial_position = initial_position
        this.current_position = this.initial_position
    }

    check_if_cell_is_avaliable(maze, x_to_check, y_to_check){
        const lastMazeRow = maze.rows - 1;
        const lastMazeColumn = maze.columns - 1;

        const avaliable_cells = [1, 3] // open path and end point cells

        if (x_to_check <= lastMazeRow && y_to_check <= lastMazeColumn){ // check if row and column are inside the limits of the maze
            const cell_value = maze.maze_structure[x_to_check][y_to_check]
            if (avaliable_cells.includes(cell_value)){ // check if the cell is avaliable
                return true;
            }
        }
        return false;
    }

    update_position(new_x, new_y){
        this.current_position.x = new_x;
        this.current_position.y = new_y;
    }

    walk(direction, maze) {

        let x_to_check = 0;
        let y_to_check = 0;

        if (direction.x == 1 && direction.y == 0){ //going to the right
            //positions to check if is avaliable
            x_to_check = this.current_position.x;
            y_to_check = this.current_position.y + 1;
            console.log("going to the right")

        } else if (direction.x == -1 && direction.y == 0){ //going to the left
            //positions to check if is avaliable
            x_to_check = this.current_position.x;
            y_to_check = this.current_position.y - 1;

        } else if (direction.x == 0 && direction.y == 1) { //going down
            //positions to check if is avaliable
            x_to_check = this.current_position.x + 1;
            y_to_check = this.current_position.y;

        } else if (direction.x == 0 && direction.y == -1){ //going up
            //positions to check if is avaliable
            x_to_check = this.current_position.x - 1;
            y_to_check = this.current_position.y;
        }

        console.log(`checking if cell ${x_to_check} , ${y_to_check} is avaliable`);
        const cell_is_avaliable = this.check_if_cell_is_avaliable(maze, x_to_check, y_to_check);
        console.log(`cell is avaliable: ${cell_is_avaliable}`);

        if (cell_is_avaliable){
            const new_x = x_to_check; 
            const new_y = y_to_check;
            this.update_position(new_x, new_y)
        }
    }


    
}