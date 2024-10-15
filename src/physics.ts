import { Vector2 } from "./math";
import type { ParticleId, SoftBodyId, SpringId } from "./types";

const ids = {
  softBodyId: 0,
  particleId: 0,
  springId: 0,
}

export class SoftBody {
  id: SoftBodyId;
  particles: ParticleId[];
  springs: SpringId[];
  constructor(particles?: ParticleId[], springs?: SpringId[]) {
    this.id = `${++ids.softBodyId}`;
    this.particles = particles ?? [];
    this.springs = springs ?? [];
  }
}

export class Particle {
  id: ParticleId;
  position: Vector2;
  springIds: SpringId[];
  bodyIds: SoftBodyId[];
  constructor(position: Vector2) {
    this.id = `${++ids.particleId}`;
    this.position = position;
    this.springIds = [];
    this.bodyIds = [];
  }
}

export class Spring {
  id: SpringId;
  particles: [Particle, Particle];
  particleIds: [ParticleId, ParticleId];
  bodyIds: SoftBodyId[];
  constructor(particles: [Particle, Particle]) {
    this.id = `${++ids.springId}`;
    this.particles = particles;
    this.particleIds = [particles[0].id, particles[1].id];
    this.bodyIds = [];
  }
}
