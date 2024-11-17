import { Vector2D } from "./Vector2D";

export class Maze {

    /**
     *  Maze structure must be a 2D array, where:
     *       0 -> Closed spaces (walls)
     *       1 -> Open spaces (paths)
     *       2 -> Maze Start Point (entry)
     *       3 -> Maze End Point (goal)
     *       x -> Player position
     *   Example of maze structure: 
     *       maze = [[2,0,0,0,0,0,0],
     *               [1,1,1,0,0,0,0],
     *               [0,0,1,0,0,0,0],,
     *               [0,0,3,0,0,0,0]]
     *
     *   @param {maze_structure[][]} matrix
     *   @param {canvasId} str
     */

    constructor(maze_structure, canvasId){
        this.maze_structure = maze_structure;
        this.current_maze_structure = JSON.parse(JSON.stringify(maze_structure));

        this.rows = this.maze_structure.length;
        this.columns = this.maze_structure[0].length;

        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            throw new Error("Canvas element not found");
        }
        this.ctx = this.canvas.getContext("2d");
        this.cellSize = Math.min(this.canvas.width /  this.columns, this.canvas.height / this.rows)

        this.entryPoint = this.getEntryPoint()
        this.endPoint = this.getEndPoint()
    }

    getEntryPoint() {
        for (let row=0; row < this.rows; row++){
            for(let column=0; column < this.columns; column++){
                if (this.maze_structure[row][column] == 2){
                    return new Vector2D(row, column)
                }
            }
        }
    }

    getEndPoint() {
        for (let row=0; row < this.rows; row++){
            for(let column=0; column < this.columns; column++){
                if (this.maze_structure[row][column] == 3){
                    return new Vector2D(row, column)
                }
            }
        }
    }

    drawCell(row, col) {
        const value = this.current_maze_structure[row][col];
        const x = col * this.cellSize;
        const y = row * this.cellSize;

        switch (value){
            case 0:
                this.ctx.fillStyle = 'black';
                break;
            case 1:
                this.ctx.fillStyle = 'white';
                break;
            case 2:
                this.ctx.fillStyle = 'green';
                break;
            case 3:
                this.ctx.fillStyle = 'red';
                break;
            case 'x':
                this.ctx.fillStyle = 'blue';
                break
        }

        this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
        this.ctx.strokeStyle = "gray";
        this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
    }

    drawMaze(){
        for(let row=0; row < this.rows; row++){
            for(let column=0; column < this.columns; column++){
                this.drawCell(row, column);
            }
        }
    }

    setPlayerPosition(new_position){
        this.current_maze_structure = JSON.parse(JSON.stringify(this.maze_structure));
        this.current_maze_structure[new_position.x][new_position.y] = 'x';
    }

    checkIfPlayerAchievedEndPoint(player_position){
        console.log(`player pos: ${player_position.x} and  ${player_position.y}`)
        console.log(`end pos: ${this.endPoint.x} and  ${this.endPoint.y}`)
        if (player_position.x == this.endPoint.x && player_position.y == this.endPoint.y){
            return true;
        }

        return false;
    }
}
