import { Canvas } from "./canvas";
import { PARTICLE_GRAB_RADIUS } from "./constants";
import { getClosestParticle } from "./handlers";
import { Vector2 } from "./math";
import { Particle, SoftBody, Spring } from "./physics";
import {
  type ParticleId,
  type SoftBodyId,
  type SpringId,
  type EngineData,
  type Elements,
  Mode,
} from "./types";

type InitialState = {
  data?: EngineData;
  elements: Elements;
}

export class Editor {
  canvas: Canvas;
  canvasElement: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  elements: Elements;
  data: EngineData;
  mode: Mode;
  currentBodyId: SoftBodyId | null;
  mouse: {
    isMouseDown: boolean,
    position: Vector2,
    closestParticle: Particle | null,
    savedParticle: Particle | null,
  };

  constructor(canvasElement: HTMLCanvasElement, initialState: InitialState) {
    this.canvas = new Canvas(canvasElement);
    this.canvasElement = this.canvas.element;
    this.ctx = this.canvas.ctx;
    this.elements = initialState.elements;

    this.data = initialState.data ?? {
      bodies: [],
      springs: [],
      particles: [],
    };

    this.mouse = {
      position: new Vector2(0, 0),
      isMouseDown: false,
      closestParticle: null,
      savedParticle: null,
    };

    this.mode = Mode.INSERT;
    this.currentBodyId = null;
  }

  getBodyById = (id: SoftBodyId) => {
    const body = this.data.bodies.find((body) => body.id === id);
    if (!body) throw new Error(`Couldn't find body with id ${id}`);
    return body;
  }

  getParticleById = (id: ParticleId) => {
    const particle = this.data.particles.find((particle) => particle.id === id);
    if (!particle) throw new Error(`Couldn't find particle with id ${id}`);
    return particle;
  }

  getSpringById = (id: SpringId) => {
    const spring = this.data.springs.find((spring) => spring.id === id);
    if (!spring) throw new Error(`Couldn't find spring with id ${id}`);
    return spring;
  }

  addBody = (body: SoftBody) => {
    this.data.bodies.push(body);
  }

  addSpring = (spring: Spring, bodyId: SoftBodyId) => {
    const body = this.getBodyById(bodyId);
    spring.bodyIds.push(bodyId);
    this.data.springs.push(spring);
    body.springs.push(spring.id);
  }

  addParticle = (particle: Particle, bodyId: SoftBodyId) => {
    const body = this.getBodyById(bodyId);
    particle.bodyIds.push(bodyId);
    this.data.particles.push(particle);
    body.particles.push(particle.id);
  }

  connectParticles = (particles: [Particle, Particle]) => {
    const spring = new Spring(particles);
    particles.forEach(p => p.springIds.push(spring.id))
    return spring;
  }

  setCurrentBodyId = (id: SoftBodyId | null) => {
    this.currentBodyId = id;
  }

  setMode = (mode: Mode) => {
    this.mode = mode;
  }

  updateClosestParticle = () => {
    const { particle, distance } = getClosestParticle(this.mouse.position, this.data.particles);
    if (!particle || distance > PARTICLE_GRAB_RADIUS) {
      this.mouse.closestParticle = null;
    } else {
      this.mouse.closestParticle = particle;
    }
  }

  removeParticleById = (id: ParticleId) => {
    const particle = this.getParticleById(id);
    particle.bodyIds.forEach(bodyId => {
      const body = this.getBodyById(bodyId);
      body.particles = body.particles.filter(pId => pId !== id);
    });
    particle.springIds.forEach(springId => this.removeSpringById(springId));
    this.data.particles = this.data.particles.filter(p => p.id !== id);
  }

  removeSpringById = (id: SpringId) => {
    const spring = this.getSpringById(id);
    spring.bodyIds.forEach(bodyId => {
      const body = this.getBodyById(bodyId);
      body.springs = body.springs.filter(sId => sId !== id);
    });
    spring.particles.forEach(p => p.springIds = p.springIds.filter(sId => sId !== id));
    this.data.springs = this.data.springs.filter(s => s.id !== id);
  }

  removeBodyById = (id: SoftBodyId) => {
    const body = this.getBodyById(id);
    body.particles.forEach(pId => {
      this.removeParticleById(pId);
    });
    body.springs.forEach(sId => {
      console.log("removingSprings from bodyRemove");
      this.removeSpringById(sId);
    });
    this.data.bodies = this.data.bodies.filter(b => b.id !== id);
  }

}
