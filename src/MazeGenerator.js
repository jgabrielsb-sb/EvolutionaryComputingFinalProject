export class MazeGenerator {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.maze = Array.from({ length: rows }, () => Array(cols).fill(0));
        this.directions = [
            { x: 0, y: -1 }, // Up
            { x: 1, y: 0 },  // Right
            { x: 0, y: 1 },  // Down
            { x: -1, y: 0 }, // Left
        ];
    }

    generate() {
        this.carvePath(0, 0);
        return this.maze;
    }

    carvePath(row, col) {
        this.maze[row][col] = 1; // Mark the cell as a path

        // Shuffle directions to randomize path carving
        const shuffledDirections = this.directions.sort(() => Math.random() - 0.5);

        for (const { x, y } of shuffledDirections) {
            const newRow = row + y * 2;
            const newCol = col + x * 2;

            // Check if the new position is within bounds and is a wall
            if (
                newRow >= 0 && newRow < this.rows &&
                newCol >= 0 && newCol < this.cols &&
                this.maze[newRow][newCol] === 0
            ) {
                // Carve a path between the current cell and the new cell
                this.maze[row + y][col + x] = 1;
                this.carvePath(newRow, newCol); // Recursively carve the new cell
            }
        }
    }

    addStartAndEnd() {
        // Find a random path cell for the start point
        this.start = this.findRandomPathCell();
        this.maze[this.start.row][this.start.col] = 2; // Start point

        // Find a random path cell for the end point
        do {
            this.end = this.findRandomPathCell();
        } while (this.start.row === this.end.row && this.start.col === this.end.col); // Ensure start != end

        this.maze[this.end.row][this.end.col] = 3; // End point
    }

    findRandomPathCell() {
        let row, col;
        do {
            row = Math.floor(Math.random() * this.rows);
            col = Math.floor(Math.random() * this.cols);
        } while (this.maze[row][col] !== 1); // Keep searching until a path cell is found
        return { row, col };
    }

    printMaze() {
        console.log(this.maze.map(row => row.join(" ")).join("\n"));
    }
}

