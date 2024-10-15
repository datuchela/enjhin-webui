import { refreshButtons, refreshListView } from "./dom";
import { Mode } from "./types";
import { Vector2 } from "./math";
import { Editor } from "./state";
import { SoftBody, Particle } from "./physics";
import { PARTICLE_GRAB_RADIUS } from "./constants";

export function handleMouseDown(_: MouseEvent, state: Editor) {
  state.mouse.isMouseDown = true;
  state.updateClosestParticle();

  switch (state.mode) {
    case Mode.SELECT:
      break;
    case Mode.INSERT:
      if (state.currentBodyId === null) break;
      const newParticle = new Particle(state.mouse.position.clone());
      state.addParticle(newParticle, state.currentBodyId);
      break;
    case Mode.MOVE:
      break;
    case Mode.CONNECT:
      const { particle, distance } = getClosestParticle(state.mouse.position, state.data.particles);
      if (!particle || distance > PARTICLE_GRAB_RADIUS) break;
      state.mouse.savedParticle = particle;
      break;
    case Mode.DELETE:
      if (!state.mouse.closestParticle) break;
      state.removeParticleById(state.mouse.closestParticle.id);
      break;
  }
}

export function handleMouseMove(e: MouseEvent, state: Editor) {
  const rect = state.canvasElement.getBoundingClientRect();
  state.mouse.position.x = e.clientX - rect.left;
  state.mouse.position.y = e.clientY - rect.top;
  state.updateClosestParticle();

  switch (state.mode) {
    case Mode.SELECT:
      break;
    case Mode.INSERT:
      break;
    case Mode.MOVE:
      if (!state.mouse.isMouseDown || !state.mouse.closestParticle) break;
      move(state.mouse.position, state.mouse.closestParticle);
      break;
    case Mode.CONNECT:
      break;
  }
}

export function handleMouseUp(_: MouseEvent, state: Editor) {
  state.mouse.isMouseDown = false;

  switch (state.mode) {
    case Mode.CONNECT:
      const { particle, distance } = getClosestParticle(state.mouse.position, state.data.particles);

      if ((!state.currentBodyId || !particle || distance > PARTICLE_GRAB_RADIUS || !state.mouse.savedParticle)
        || state.mouse.savedParticle.id === particle.id
      ) break;

      const spring = state.connectParticles([state.mouse.savedParticle, particle]);
      state.addSpring(spring, state.currentBodyId);
      break;
    default:
      state.mouse.closestParticle = null;
      state.mouse.savedParticle = null;
      break;
  }
}

export function handleNewBodyClick(state: Editor) {
  const newBody = new SoftBody();
  state.addBody(newBody);
  state.setCurrentBodyId(newBody.id);
  refreshListView(state);
}

export function handleDeleteBodyClick(state: Editor) {
  if (!state.currentBodyId) return;
  state.removeBodyById(state.currentBodyId);
  if (state.data.bodies.length > 0) {
    state.setCurrentBodyId(state.data.bodies[state.data.bodies.length - 1].id);
  } else {
    state.setCurrentBodyId(null);
  }
  refreshListView(state);
}

export function handleModeClick(mode: Mode, state: Editor) {
  state.setMode(mode);
  refreshButtons(state);
}

export function handleExportClick(_: MouseEvent, state: Editor) {
  const exportData = {
    particles: state.data.particles.map(p => {
      return {
        id: p.id,
        x: p.position.x,
        y: p.position.y,
      };
    }),
    springs: state.data.springs.map(s => {
      return {
        p1: s.particleIds[0],
        p2: s.particleIds[1],
      };
    }),
  }
  console.log(JSON.stringify(exportData));
}

export type ClosestParticle = {
  particle: Particle | null;
  distance: number;
}

export function getClosestParticle(mousePos: Vector2, particles: Particle[]): ClosestParticle {
  let closestDistance: number = Number.MAX_SAFE_INTEGER;
  let closestParticle: Particle | null = null;

  particles.forEach((particle) => {
    const currDistance = Vector2.subtract(mousePos, particle.position).length;
    if (currDistance < closestDistance) {
      closestParticle = particle;
      closestDistance = currDistance;
    }
  });

  return { particle: closestParticle, distance: closestDistance };
}

function move(mousePos: Vector2, particle: Particle) {
  // NOTE: Right now the program doesn't take into account where exactly on the particle 
  // mouse has been pressed, it just moves the center of the particle towards mouse position.
  // TODO: Move particles based on where the mouse has been pressed on them.
  particle.position = mousePos.clone();
}
