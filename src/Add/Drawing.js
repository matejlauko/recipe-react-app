import React, { Component } from 'react';
import s from './Add.scss';

class Drawing extends Component {
  isDrawing = false;
  lastP = { x: 0, y: 0 };

  canvas = null;
  ctx = null;

  draw = e => {
    if (this.isDrawing) {
      this.ctx.strokeStyle = `#000`;
      this.ctx.beginPath();
      this.ctx.moveTo(this.lastP.x, this.lastP.y);
      this.ctx.lineTo(e.offsetX, e.offsetY);
      this.ctx.stroke();

      this.lastP = { y: e.offsetY, x: e.offsetX };
    }
  };

  clear = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  componentDidMount() {
    this.canvas = document.getElementById('recipe-drawing');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.addEventListener('mousemove', this.draw);
    this.canvas.addEventListener('mousedown', this.switchDrawing(true));
    this.canvas.addEventListener('mouseup', this.switchDrawing(false));
    this.canvas.addEventListener('mouseout', this.switchDrawing(false));

    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = '2';
  }

  switchDrawing = on => e => {
    this.isDrawing = on;
    if (on) {
      this.lastP = { x: e.offsetX, y: e.offsetY };
    } else {
      if (this.props.onChange) {
        this.props.onChange(this.canvas.toDataURL('image/png'));
      }
    }
  };

  render() {
    return <canvas className={s.canvas} id="recipe-drawing" width="500px" height="300px" />;
  }
}

export default Drawing;
