import * as request from "superagent";
import * as parser from "./lff/parser";
import { Line } from "./lff/parser";

class LffOption {
  lineRenderer: (ctx: CanvasRenderingContext2D, round: number, count: number, x0: number, y0: number, x1: number, y1: number, index: number) => void;
}
export function strokeScaledLine(ctx: CanvasRenderingContext2D, round: number, count: number, x: number, y: number, x1: number, y1: number, x2: number, y2: number, scale: number, option: LffOption, index: number) {
  strokeLine(
    ctx,
    round,
    count,
    x1 * scale + x,
    (10 - y1) * scale + y,
    x2 * scale + x,
    (10 - y2) * scale + y,
    option,
    index
  );
}

export function strokeLine(ctx: CanvasRenderingContext2D, round: number, count: number, x1: number, y1: number, x2: number, y2: number, option: LffOption, index: number) {
  if (option.lineRenderer) {
    option.lineRenderer(ctx, round, count, x1, y1, x2, y2, index);
  } else {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}

export function strokeChar(ctx: CanvasRenderingContext2D, round:number, count:number, x: number, y: number, size: number, fontdata: parser.Font[], str: string, option: LffOption) {
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
        round,
        count,
        x,
        y,
        stroke.x1,
        stroke.y1,
        stroke.x2,
        stroke.y2,
        size,
        option,
        index
      );
    });
  }
}

export function drawString(ctx: CanvasRenderingContext2D, round: number, count: number, x: number, y: number, size: number, fontdata: parser.Font[], str: string, option: LffOption) {
  const ratio = size / 10;

  option = option ? option : { lineRenderer: () => { } };

  let offset = 0;
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    strokeChar(ctx, round, count, x + offset, y, ratio, fontdata, ch, option);
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
