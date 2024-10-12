import type { Particle, SoftBody, Spring } from "./physics";

export enum Mode {
  SELECT,
  INSERT,
  MOVE,
  CONNECT,
  DELETE,
};

export type Color = string | CanvasGradient | CanvasPattern;

export type EventWithValue = Event & { target: { value: string } };

export type ParticleId = string;
export type SpringId = string;
export type SoftBodyId = string;

export type EngineData = {
  bodies: SoftBody[];
  springs: Spring[];
  particles: Particle[];
}

export type Elements = {
  bodyList: HTMLMenuElement;
  exportButton: HTMLButtonElement;
  newBodyButton: HTMLButtonElement;
  modeButtons: { mode: Mode, element: HTMLButtonElement }[];
}

