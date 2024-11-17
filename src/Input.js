
export class Input {
    constructor(){
        this.direction = null;
        this.keyMap = {
            'w' : {x:  0, y: -1}, // up
            's' : {x:  0, y:  1}, //down
            'a' : {x:  -1, y:  0}, //right
            'd' : {x: 1, y:  0}, //left
        }

        this.addEventLinesters();
    }

    addEventLinesters() {
        document.addEventListener("keydown", (event) => this.handleKeyDown(event));
        document.addEventListener("keyup", (event) => this.handleKeyUp(event));
    }

    handleKeyDown(event){
        const key = event.key.toLowerCase();
        if (this.keyMap[key]) {
            this.direction = this.keyMap[key]
        }
    }

    handleKeyUp(event){
        this.direction = null;
    }

    getDirection(){
        console.log(this.direction)
        return this.direction;
    }
}