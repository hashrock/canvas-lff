import * as request from "superagent";
import * as parser from "./lff/parser";
import { Line } from "./lff/parser";

class LffOption {
  lineRenderer: (ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, index: number) => void;
}
export function strokeScaledLine(ctx: CanvasRenderingContext2D, x: number, y: number, x1: number, y1: number, x2: number, y2: number, scale: number, index: number) {
  strokeLine(
    ctx,
    x1 * scale + x,
    (10 - y1) * scale + y,
    x2 * scale + x,
    (10 - y2) * scale + y,
    index
  );
}

export function strokeLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, index: number) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

export function strokeChar(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, fontdata: parser.Font[], str: string) {
  let font;
  for (let i = 0; i < fontdata.length; i++) {
    if (fontdata[i].letter === str) {
      font = fontdata[i];
      break;
    }
  }

  if (font) {
    ctx.lineWidth = 0.5;
    font.info.forEach((stroke: parser.Line, index: number) => {
      strokeScaledLine(
        ctx,
        x,
        y,
        stroke.x1,
        stroke.y1,
        stroke.x2,
        stroke.y2,
        size,
        index
      );
    });
  }
}

export function drawString(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, fontdata: parser.Font[], str: string) {
  const ratio = size / 10;
  let offset = 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    strokeChar(ctx, x + offset, y, ratio, fontdata, ch);
    if (str.match(/^(\w| |'|,|&)+$/)) {
      offset += ratio * 5;
    } else {
      offset += ratio * 10;
    }
  }
}

export function clear(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
}
