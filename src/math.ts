export class Vector2 {
  private vector: [number, number];

  constructor(x: number, y: number) {
    this.vector = [x, y];
  }

  get x() {
    return this.vector[0];
  }

  get y() {
    return this.vector[1];
  }

  set x(newX: number) {
    this.vector[0] = newX;
  }

  set y(newY: number) {
    this.vector[1] = newY;
  }

  get length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  set length(len) {
    throw new Error(
      `Tried to set ${len} as vector length, you cannot set vector length explicitly.`
    );
  }

  get unit() {
    if (this.length === 0) return new Vector2(0, 0);
    return new Vector2(this.x / this.length, this.y / this.length);
  }

  set unit(vector: Vector2) {
    throw new Error(
      `Tried to set ${vector} as a unit vector, you cannot set unit vector explicitly.`
    );
  }

  clone = (): Vector2 => {
    return new Vector2(this.x, this.y);
  }

  static isEqual = (v1: Vector2, v2: Vector2): boolean => {
    return v1.x === v2.x && v1.y === v2.y;
  };

  static crossProduct = (v1: Vector2, v2: Vector2): number => {
    return v1.x * v2.y - v1.y * v2.x;
  };

  static dotProduct = (v1: Vector2, v2: Vector2): number => {
    return v1.x * v2.x + v1.y * v2.y;
  };

  static add = (vector1: Vector2, vector2: Vector2) => {
    return new Vector2(vector1.x + vector2.x, vector1.y + vector2.y);
  };

  static subtract = (vector1: Vector2, vector2: Vector2) => {
    return new Vector2(vector1.x - vector2.x, vector1.y - vector2.y);
  };

  static scale = (vector: Vector2, scalar: number) => {
    return new Vector2(vector.x * scalar, vector.y * scalar);
  };

  draw = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    options?: { color: string }
  ) => {
    ctx.strokeStyle = options?.color ?? "red";
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + this.x, startY + this.y);
    ctx.stroke();
  };
}
