export function custom1(ctx: CanvasRenderingContext2D, round: number, count: number, x0: number, y0: number, x1: number, y1: number, index: number) {
  var scale = 5;
  var rad = index / 10;
  var rad2 = (index + 1) / 10;

  var PIPI = 2 * 3.14;

  ctx.strokeStyle = "#999999";
  ctx.fillStyle = "#FFFFFF";

  ctx.beginPath();
  var diff = Math.cos((rad + round) * PIPI) * scale;
  var diff2 = Math.cos((rad2 + round) * PIPI) * scale;
  ctx.moveTo(x0, y0 + diff);
  ctx.lineTo(x1, y1 + diff2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x0, y0 + diff, (diff + 5) / 4, 0, Math.PI * 2, true);
  ctx.fill();
}

export function custom2(ctx: CanvasRenderingContext2D, round: number, count: number,  x0: number, y0: number, x1: number, y1: number, index: number) {
  if (count % 3 === 0) {
    ctx.strokeStyle = "#FFF";
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  }
};