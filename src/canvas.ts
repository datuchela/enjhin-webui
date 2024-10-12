import { CANVAS_BACKGROUND, CANVAS_HEIGHT, PARTICLE_COLOR, PARTICLE_GRAB_RADIUS, PARTICLE_RADIUS, SPRING_COLOR } from "./constants";
import { Mode, type Color } from "./types";
import { Vector2 } from "./math";
import type { Editor } from "./state";
import type { Particle, Spring } from "./physics";

export class Canvas {
  element: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  _mouseCoords: Vector2 = new Vector2(16, CANVAS_HEIGHT - 20);
  _mouseCoordsColor: Color = "white";

  constructor(element: HTMLCanvasElement) {
    this.element = element;
    const ctx = element.getContext("2d");
    if (ctx === null) throw new Error("Unable to get 2d context from canvas");
    this.ctx = ctx;
  }

  redraw = (state: Editor, _timeStamp?: number) => {
    this.clearBackground(CANVAS_BACKGROUND);
    this.drawSprings(state.data.springs);
    if (state.mode === Mode.CONNECT && state.mouse.isMouseDown && state.mouse.savedParticle) {
      drawLine(state.ctx, state.mouse.savedParticle.position, state.mouse.position, "white", 1);
    }
    this.drawParticles(state.data.particles, state.mouse.closestParticle);
    this.drawCoordinates(state.mouse.position, this._mouseCoords, this._mouseCoordsColor);
  }

  clearBackground = (color: Color) => {
    clearBackground(this.ctx, color);
  };

  drawParticles = (particles: Particle[], closestParticle: Particle | null) => {
    particles.forEach((particle) => {
      if (closestParticle && (closestParticle.id === particle.id)) {
        drawCircleStroke(this.ctx, particle.position, PARTICLE_GRAB_RADIUS, "white");
      }
      drawCircle(this.ctx, particle.position, PARTICLE_RADIUS, PARTICLE_COLOR);
    });
  }

  drawSprings = (springs: Spring[]) => {
    springs.forEach((spring) => {
      drawLine(this.ctx, spring.particles[0].position, spring.particles[1].position, SPRING_COLOR, 2);
    });
  }

  drawCoordinates(mousePosition: Vector2, drawPosition: Vector2, color: Color) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.fillText(`x: ${mousePosition.x}  y: ${mousePosition.y}`, drawPosition.x, drawPosition.y);
    this.ctx.restore();

  }
}

export function drawCircle(ctx: CanvasRenderingContext2D, center: Vector2, radius: number, color: Color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = "blue";
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
}

export function drawCircleStroke(ctx: CanvasRenderingContext2D, center: Vector2, radius: number, color: Color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.restore();
}

export function drawLine(ctx: CanvasRenderingContext2D, start: Vector2, end: Vector2, color: Color, lineWidth?: number) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth ?? 1;
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.restore();
}

export function clearBackground(ctx: CanvasRenderingContext2D, color: Color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
}
