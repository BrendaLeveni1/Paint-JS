class lapiz {
    constructor(posX, posY, color, tamanioSel, context) {
        this.antX = posX;
        this.antY = posY;
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.grosor = grosor;
        this.ctx = context;
    };

    draw() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color;
        ctx.lineWidth = grosor;
        this.ctx.moveTo(this.antX, this.antY);
        this.ctx.lineTo(this.posX, this.posY);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    moveTo(posX, posY) {
        this.antX = this.posX;
        this.antY = this.posY;
        this.posX = posX;
        this.posY = posY
    }
}