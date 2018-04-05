function remove(brickId) { // alias of destroy / delete crud / delete rest
    var indexOfBrick = this.bricks.indexOf(brickId);
    this.bricks.slice(indexOfBrick, 1);
}
