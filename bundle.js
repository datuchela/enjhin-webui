/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/canvas.ts":
/*!***********************!*\
  !*** ./src/canvas.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Canvas: () => (/* binding */ Canvas),
/* harmony export */   clearBackground: () => (/* binding */ clearBackground),
/* harmony export */   drawCircle: () => (/* binding */ drawCircle),
/* harmony export */   drawCircleStroke: () => (/* binding */ drawCircleStroke),
/* harmony export */   drawLine: () => (/* binding */ drawLine)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/types.ts");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math */ "./src/math.ts");



class Canvas {
    element;
    ctx;
    _mouseCoords = new _math__WEBPACK_IMPORTED_MODULE_2__.Vector2(16, _constants__WEBPACK_IMPORTED_MODULE_0__.CANVAS_HEIGHT - 20);
    _mouseCoordsColor = "white";
    constructor(element) {
        this.element = element;
        const ctx = element.getContext("2d");
        if (ctx === null)
            throw new Error("Unable to get 2d context from canvas");
        this.ctx = ctx;
    }
    redraw = (state, _timeStamp) => {
        this.clearBackground(_constants__WEBPACK_IMPORTED_MODULE_0__.CANVAS_BACKGROUND);
        this.drawSprings(state.data.springs);
        if (state.mode === _types__WEBPACK_IMPORTED_MODULE_1__.Mode.CONNECT && state.mouse.isMouseDown && state.mouse.savedParticle) {
            drawLine(state.ctx, state.mouse.savedParticle.position, state.mouse.position, "white", 1);
        }
        this.drawParticles(state.data.particles, state.mouse.closestParticle);
        this.drawCoordinates(state.mouse.position, this._mouseCoords, this._mouseCoordsColor);
    };
    clearBackground = (color) => {
        clearBackground(this.ctx, color);
    };
    drawParticles = (particles, closestParticle) => {
        particles.forEach((particle) => {
            if (closestParticle && (closestParticle.id === particle.id)) {
                drawCircleStroke(this.ctx, particle.position, _constants__WEBPACK_IMPORTED_MODULE_0__.PARTICLE_GRAB_RADIUS, "white");
            }
            drawCircle(this.ctx, particle.position, _constants__WEBPACK_IMPORTED_MODULE_0__.PARTICLE_RADIUS, _constants__WEBPACK_IMPORTED_MODULE_0__.PARTICLE_COLOR);
        });
    };
    drawSprings = (springs) => {
        springs.forEach((spring) => {
            drawLine(this.ctx, spring.particles[0].position, spring.particles[1].position, _constants__WEBPACK_IMPORTED_MODULE_0__.SPRING_COLOR, 2);
        });
    };
    drawCoordinates(mousePosition, drawPosition, color) {
        this.ctx.save();
        this.ctx.fillStyle = color;
        this.ctx.fillText(`x: ${mousePosition.x}  y: ${mousePosition.y}`, drawPosition.x, drawPosition.y);
        this.ctx.restore();
    }
}
function drawCircle(ctx, center, radius, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}
function drawCircleStroke(ctx, center, radius, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
}
function drawLine(ctx, start, end, color, lineWidth) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth ?? 1;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.restore();
}
function clearBackground(ctx, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
}


/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CANVAS_BACKGROUND: () => (/* binding */ CANVAS_BACKGROUND),
/* harmony export */   CANVAS_HEIGHT: () => (/* binding */ CANVAS_HEIGHT),
/* harmony export */   CANVAS_WIDTH: () => (/* binding */ CANVAS_WIDTH),
/* harmony export */   PARTICLE_COLOR: () => (/* binding */ PARTICLE_COLOR),
/* harmony export */   PARTICLE_COLOR_FOCUS: () => (/* binding */ PARTICLE_COLOR_FOCUS),
/* harmony export */   PARTICLE_GRAB_RADIUS: () => (/* binding */ PARTICLE_GRAB_RADIUS),
/* harmony export */   PARTICLE_RADIUS: () => (/* binding */ PARTICLE_RADIUS),
/* harmony export */   SPRING_COLOR: () => (/* binding */ SPRING_COLOR)
/* harmony export */ });
const CANVAS_WIDTH = 1366;
const CANVAS_HEIGHT = 800;
const CANVAS_BACKGROUND = "black";
const PARTICLE_RADIUS = 5;
const PARTICLE_GRAB_RADIUS = PARTICLE_RADIUS + 3;
const PARTICLE_COLOR = "#FCE93D";
const PARTICLE_COLOR_FOCUS = "#D9CB40";
const SPRING_COLOR = "#FFFFFF";


/***/ }),

/***/ "./src/dom.ts":
/*!********************!*\
  !*** ./src/dom.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   refreshButtons: () => (/* binding */ refreshButtons),
/* harmony export */   refreshListView: () => (/* binding */ refreshListView)
/* harmony export */ });
function refreshListView(state) {
    const { elements: { bodyList }, data: { bodies } } = state;
    bodyList.innerHTML = "";
    bodies.forEach((body) => {
        const listItem = document.createElement("li");
        const itemRadio = document.createElement("input");
        const itemLabel = document.createElement("label");
        listItem.classList.add("flex", "gap-2", "p-3");
        itemRadio.type = "radio";
        itemRadio.id = body.id;
        itemRadio.name = "body";
        itemRadio.value = body.id;
        itemRadio.onchange = (e) => {
            state.setCurrentBodyId(e.target.value);
            console.log(state.currentBodyId);
        };
        itemRadio.checked = state.currentBodyId === body.id;
        itemLabel.htmlFor = body.id;
        itemLabel.innerText = `Body ${body.id}`;
        listItem.appendChild(itemRadio);
        listItem.appendChild(itemLabel);
        bodyList.appendChild(listItem);
    });
}
function refreshButtons(state) {
    state.elements.modeButtons.forEach((btn) => {
        btn.element.disabled = false;
        if (btn.mode !== state.mode)
            return;
        btn.element.disabled = true;
    });
}


/***/ }),

/***/ "./src/handlers.ts":
/*!*************************!*\
  !*** ./src/handlers.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getClosestParticle: () => (/* binding */ getClosestParticle),
/* harmony export */   handleDeleteBodyClick: () => (/* binding */ handleDeleteBodyClick),
/* harmony export */   handleExportClick: () => (/* binding */ handleExportClick),
/* harmony export */   handleModeClick: () => (/* binding */ handleModeClick),
/* harmony export */   handleMouseDown: () => (/* binding */ handleMouseDown),
/* harmony export */   handleMouseMove: () => (/* binding */ handleMouseMove),
/* harmony export */   handleMouseUp: () => (/* binding */ handleMouseUp),
/* harmony export */   handleNewBodyClick: () => (/* binding */ handleNewBodyClick)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/types.ts");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math */ "./src/math.ts");
/* harmony import */ var _physics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./physics */ "./src/physics.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");





function handleMouseDown(_, state) {
    state.mouse.isMouseDown = true;
    state.updateClosestParticle();
    switch (state.mode) {
        case _types__WEBPACK_IMPORTED_MODULE_1__.Mode.SELECT:
            break;
        case _types__WEBPACK_IMPORTED_MODULE_1__.Mode.INSERT:
            if (state.currentBodyId === null)
                break;
            const newParticle = new _physics__WEBPACK_IMPORTED_MODULE_3__.Particle(state.mouse.position.clone());
            state.addParticle(newParticle, state.currentBodyId);
            break;
        case _types__WEBPACK_IMPORTED_MODULE_1__.Mode.MOVE:
            break;
        case _types__WEBPACK_IMPORTED_MODULE_1__.Mode.CONNECT:
            const { particle, distance } = getClosestParticle(state.mouse.position, state.data.particles);
            if (!particle || distance > _constants__WEBPACK_IMPORTED_MODULE_4__.PARTICLE_GRAB_RADIUS)
                break;
            state.mouse.savedParticle = particle;
            break;
        case _types__WEBPACK_IMPORTED_MODULE_1__.Mode.DELETE:
            if (!state.mouse.closestParticle)
                break;
            state.removeParticleById(state.mouse.closestParticle.id);
            break;
    }
}
function handleMouseMove(e, state) {
    const rect = state.canvasElement.getBoundingClientRect();
    state.mouse.position.x = e.clientX - rect.left;
    state.mouse.position.y = e.clientY - rect.top;
    state.updateClosestParticle();
    switch (state.mode) {
        case _types__WEBPACK_IMPORTED_MODULE_1__.Mode.SELECT:
            break;
        case _types__WEBPACK_IMPORTED_MODULE_1__.Mode.INSERT:
            break;
        case _types__WEBPACK_IMPORTED_MODULE_1__.Mode.MOVE:
            if (!state.mouse.isMouseDown || !state.mouse.closestParticle)
                break;
            move(state.mouse.position, state.mouse.closestParticle);
            break;
        case _types__WEBPACK_IMPORTED_MODULE_1__.Mode.CONNECT:
            break;
    }
}
function handleMouseUp(_, state) {
    state.mouse.isMouseDown = false;
    switch (state.mode) {
        case _types__WEBPACK_IMPORTED_MODULE_1__.Mode.CONNECT:
            const { particle, distance } = getClosestParticle(state.mouse.position, state.data.particles);
            if ((!state.currentBodyId || !particle || distance > _constants__WEBPACK_IMPORTED_MODULE_4__.PARTICLE_GRAB_RADIUS || !state.mouse.savedParticle)
                || state.mouse.savedParticle.id === particle.id)
                break;
            const spring = state.connectParticles([state.mouse.savedParticle, particle]);
            state.addSpring(spring, state.currentBodyId);
            break;
        default:
            state.mouse.closestParticle = null;
            state.mouse.savedParticle = null;
            break;
    }
}
function handleNewBodyClick(state) {
    const newBody = new _physics__WEBPACK_IMPORTED_MODULE_3__.SoftBody();
    state.addBody(newBody);
    state.setCurrentBodyId(newBody.id);
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.refreshListView)(state);
}
function handleDeleteBodyClick(state) {
    if (!state.currentBodyId)
        return;
    state.removeBodyById(state.currentBodyId);
    if (state.data.bodies.length > 0) {
        state.setCurrentBodyId(state.data.bodies[state.data.bodies.length - 1].id);
    }
    else {
        state.setCurrentBodyId(null);
    }
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.refreshListView)(state);
}
function handleModeClick(mode, state) {
    state.setMode(mode);
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.refreshButtons)(state);
}
function handleExportClick(_, state) {
    const exportData = {
        particles: state.data.particles.map(p => {
            const { bodyIds, springIds, ...rest } = p;
            return rest;
        }),
        springs: state.data.springs.map(s => {
            const { bodyIds, ...rest } = s;
            return rest;
        }),
    };
    console.log(JSON.stringify(exportData));
}
function getClosestParticle(mousePos, particles) {
    let closestDistance = Number.MAX_SAFE_INTEGER;
    let closestParticle = null;
    particles.forEach((particle) => {
        const currDistance = _math__WEBPACK_IMPORTED_MODULE_2__.Vector2.subtract(mousePos, particle.position).length;
        if (currDistance < closestDistance) {
            closestParticle = particle;
            closestDistance = currDistance;
        }
    });
    return { particle: closestParticle, distance: closestDistance };
}
function move(mousePos, particle) {
    // NOTE: Right now the program doesn't take into account where exactly on the particle 
    // mouse has been pressed, it just moves the center of the particle towards mouse position.
    // TODO: Move particles based on where the mouse has been pressed on them.
    particle.position = mousePos.clone();
}


/***/ }),

/***/ "./src/math.ts":
/*!*********************!*\
  !*** ./src/math.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Vector2: () => (/* binding */ Vector2)
/* harmony export */ });
class Vector2 {
    vector;
    constructor(x, y) {
        this.vector = [x, y];
    }
    get x() {
        return this.vector[0];
    }
    get y() {
        return this.vector[1];
    }
    set x(newX) {
        this.vector[0] = newX;
    }
    set y(newY) {
        this.vector[1] = newY;
    }
    get length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    set length(len) {
        throw new Error(`Tried to set ${len} as vector length, you cannot set vector length explicitly.`);
    }
    get unit() {
        if (this.length === 0)
            return new Vector2(0, 0);
        return new Vector2(this.x / this.length, this.y / this.length);
    }
    set unit(vector) {
        throw new Error(`Tried to set ${vector} as a unit vector, you cannot set unit vector explicitly.`);
    }
    clone = () => {
        return new Vector2(this.x, this.y);
    };
    static isEqual = (v1, v2) => {
        return v1.x === v2.x && v1.y === v2.y;
    };
    static crossProduct = (v1, v2) => {
        return v1.x * v2.y - v1.y * v2.x;
    };
    static dotProduct = (v1, v2) => {
        return v1.x * v2.x + v1.y * v2.y;
    };
    static add = (vector1, vector2) => {
        return new Vector2(vector1.x + vector2.x, vector1.y + vector2.y);
    };
    static subtract = (vector1, vector2) => {
        return new Vector2(vector1.x - vector2.x, vector1.y - vector2.y);
    };
    static scale = (vector, scalar) => {
        return new Vector2(vector.x * scalar, vector.y * scalar);
    };
    draw = (ctx, startX, startY, options) => {
        ctx.strokeStyle = options?.color ?? "red";
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + this.x, startY + this.y);
        ctx.stroke();
    };
}


/***/ }),

/***/ "./src/physics.ts":
/*!************************!*\
  !*** ./src/physics.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Particle: () => (/* binding */ Particle),
/* harmony export */   SoftBody: () => (/* binding */ SoftBody),
/* harmony export */   Spring: () => (/* binding */ Spring)
/* harmony export */ });
const ids = {
    softBodyId: 0,
    particleId: 0,
    springId: 0,
};
class SoftBody {
    id;
    particles;
    springs;
    constructor(particles, springs) {
        this.id = `${++ids.softBodyId}`;
        this.particles = particles ?? [];
        this.springs = springs ?? [];
    }
}
class Particle {
    id;
    position;
    springIds;
    bodyIds;
    constructor(position) {
        this.id = `${++ids.particleId}`;
        this.position = position;
        this.springIds = [];
        this.bodyIds = [];
    }
}
class Spring {
    id;
    particles;
    bodyIds;
    constructor(particles) {
        this.id = `${++ids.springId}`;
        this.particles = particles;
        this.bodyIds = [];
    }
}


/***/ }),

/***/ "./src/state.ts":
/*!**********************!*\
  !*** ./src/state.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Editor: () => (/* binding */ Editor)
/* harmony export */ });
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ "./src/canvas.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handlers */ "./src/handlers.ts");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./math */ "./src/math.ts");
/* harmony import */ var _physics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./physics */ "./src/physics.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types */ "./src/types.ts");






class Editor {
    canvas;
    canvasElement;
    ctx;
    elements;
    data;
    mode;
    currentBodyId;
    mouse;
    constructor(canvasElement, initialState) {
        this.canvas = new _canvas__WEBPACK_IMPORTED_MODULE_0__.Canvas(canvasElement);
        this.canvasElement = this.canvas.element;
        this.ctx = this.canvas.ctx;
        this.elements = initialState.elements;
        this.data = initialState.data ?? {
            bodies: [],
            springs: [],
            particles: [],
        };
        this.mouse = {
            position: new _math__WEBPACK_IMPORTED_MODULE_3__.Vector2(0, 0),
            isMouseDown: false,
            closestParticle: null,
            savedParticle: null,
        };
        this.mode = _types__WEBPACK_IMPORTED_MODULE_5__.Mode.INSERT;
        this.currentBodyId = null;
    }
    getBodyById = (id) => {
        const body = this.data.bodies.find((body) => body.id === id);
        if (!body)
            throw new Error(`Couldn't find body with id ${id}`);
        return body;
    };
    getParticleById = (id) => {
        const particle = this.data.particles.find((particle) => particle.id === id);
        if (!particle)
            throw new Error(`Couldn't find particle with id ${id}`);
        return particle;
    };
    getSpringById = (id) => {
        const spring = this.data.springs.find((spring) => spring.id === id);
        if (!spring)
            throw new Error(`Couldn't find spring with id ${id}`);
        return spring;
    };
    addBody = (body) => {
        this.data.bodies.push(body);
    };
    addSpring = (spring, bodyId) => {
        const body = this.getBodyById(bodyId);
        spring.bodyIds.push(bodyId);
        this.data.springs.push(spring);
        body.springs.push(spring.id);
    };
    addParticle = (particle, bodyId) => {
        const body = this.getBodyById(bodyId);
        particle.bodyIds.push(bodyId);
        this.data.particles.push(particle);
        body.particles.push(particle.id);
    };
    connectParticles = (particles) => {
        const spring = new _physics__WEBPACK_IMPORTED_MODULE_4__.Spring(particles);
        particles.forEach(p => p.springIds.push(spring.id));
        return spring;
    };
    setCurrentBodyId = (id) => {
        this.currentBodyId = id;
    };
    setMode = (mode) => {
        this.mode = mode;
    };
    updateClosestParticle = () => {
        const { particle, distance } = (0,_handlers__WEBPACK_IMPORTED_MODULE_2__.getClosestParticle)(this.mouse.position, this.data.particles);
        if (!particle || distance > _constants__WEBPACK_IMPORTED_MODULE_1__.PARTICLE_GRAB_RADIUS) {
            this.mouse.closestParticle = null;
        }
        else {
            this.mouse.closestParticle = particle;
        }
    };
    removeParticleById = (id) => {
        const particle = this.getParticleById(id);
        particle.bodyIds.forEach(bodyId => {
            const body = this.getBodyById(bodyId);
            body.particles = body.particles.filter(pId => pId !== id);
        });
        particle.springIds.forEach(springId => this.removeSpringById(springId));
        this.data.particles = this.data.particles.filter(p => p.id !== id);
    };
    removeSpringById = (id) => {
        const spring = this.getSpringById(id);
        spring.bodyIds.forEach(bodyId => {
            const body = this.getBodyById(bodyId);
            body.springs = body.springs.filter(sId => sId !== id);
        });
        spring.particles.forEach(p => p.springIds = p.springIds.filter(sId => sId !== id));
        this.data.springs = this.data.springs.filter(s => s.id !== id);
    };
    removeBodyById = (id) => {
        const body = this.getBodyById(id);
        body.particles.forEach(pId => {
            this.removeParticleById(pId);
        });
        body.springs.forEach(sId => {
            console.log("removingSprings from bodyRemove");
            this.removeSpringById(sId);
        });
        this.data.bodies = this.data.bodies.filter(b => b.id !== id);
    };
}


/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mode: () => (/* binding */ Mode)
/* harmony export */ });
var Mode;
(function (Mode) {
    Mode[Mode["SELECT"] = 0] = "SELECT";
    Mode[Mode["INSERT"] = 1] = "INSERT";
    Mode[Mode["MOVE"] = 2] = "MOVE";
    Mode[Mode["CONNECT"] = 3] = "CONNECT";
    Mode[Mode["DELETE"] = 4] = "DELETE";
})(Mode || (Mode = {}));
;


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   redrawAll: () => (/* binding */ redrawAll)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.ts");

function redrawAll(state) {
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.refreshButtons)(state);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/types.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handlers */ "./src/handlers.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./state */ "./src/state.ts");





var state;
(() => {
    const canvas = document.getElementById("enjhin-editor");
    const bodyList = document.getElementById("list-view");
    // Buttons
    const selectModeBtn = document.getElementById("mode-select");
    const insertModeBtn = document.getElementById("mode-insert");
    const moveModeBtn = document.getElementById("mode-move");
    const connectModeBtn = document.getElementById("mode-connect");
    const deleteModeBtn = document.getElementById("mode-delete");
    const exportBtn = document.getElementById("export");
    const newBodyBtn = document.getElementById("new-body");
    const deleteBodyBtn = document.getElementById("delete-body");
    if (!canvas)
        throw new Error("Couldn't get canvas");
    if (!bodyList)
        throw new Error("Couldn't get bodyList");
    if (!selectModeBtn)
        throw new Error("Couldn't get selectModeBtn");
    if (!insertModeBtn)
        throw new Error("Couldn't get insertModeBtn");
    if (!moveModeBtn)
        throw new Error("Couldn't get moveModeBtn");
    if (!connectModeBtn)
        throw new Error("Couldn't get connectModeBtn");
    if (!deleteModeBtn)
        throw new Error("Couldn't get deleteModeBtn");
    if (!exportBtn)
        throw new Error("Couldn't get exportBtn");
    if (!newBodyBtn)
        throw new Error("Couldn't get newBodyBtn");
    if (!deleteBodyBtn)
        throw new Error("Couldn't get deleteBodyBtn");
    canvas.width = _constants__WEBPACK_IMPORTED_MODULE_1__.CANVAS_WIDTH;
    canvas.height = _constants__WEBPACK_IMPORTED_MODULE_1__.CANVAS_HEIGHT;
    state = new _state__WEBPACK_IMPORTED_MODULE_4__.Editor(canvas, {
        elements: {
            exportButton: exportBtn,
            newBodyButton: newBodyBtn,
            bodyList: bodyList,
            modeButtons: [
                { mode: _types__WEBPACK_IMPORTED_MODULE_0__.Mode.SELECT, element: selectModeBtn },
                { mode: _types__WEBPACK_IMPORTED_MODULE_0__.Mode.INSERT, element: insertModeBtn },
                { mode: _types__WEBPACK_IMPORTED_MODULE_0__.Mode.MOVE, element: moveModeBtn },
                { mode: _types__WEBPACK_IMPORTED_MODULE_0__.Mode.CONNECT, element: connectModeBtn },
                { mode: _types__WEBPACK_IMPORTED_MODULE_0__.Mode.DELETE, element: deleteModeBtn },
            ],
        }
    });
    exportBtn.addEventListener("click", (e) => (0,_handlers__WEBPACK_IMPORTED_MODULE_2__.handleExportClick)(e, state));
    newBodyBtn.addEventListener("click", () => (0,_handlers__WEBPACK_IMPORTED_MODULE_2__.handleNewBodyClick)(state));
    deleteBodyBtn.addEventListener("click", () => (0,_handlers__WEBPACK_IMPORTED_MODULE_2__.handleDeleteBodyClick)(state));
    state.canvasElement.addEventListener("mousedown", (e) => (0,_handlers__WEBPACK_IMPORTED_MODULE_2__.handleMouseDown)(e, state));
    state.canvasElement.addEventListener("mousemove", (e) => (0,_handlers__WEBPACK_IMPORTED_MODULE_2__.handleMouseMove)(e, state));
    state.canvasElement.addEventListener("mouseup", (e) => (0,_handlers__WEBPACK_IMPORTED_MODULE_2__.handleMouseUp)(e, state));
    state.elements.modeButtons.forEach((btn) => {
        btn.element.addEventListener("click", () => (0,_handlers__WEBPACK_IMPORTED_MODULE_2__.handleModeClick)(btn.mode, state));
    });
    (0,_utils__WEBPACK_IMPORTED_MODULE_3__.redrawAll)(state);
    function frame(_timeStamp) {
        state.canvas.redraw(state);
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
})();
/*
 {
    "bodies": [
        {
            "id": "65227c0e-0d51-4b0b-b962-d3152fcce104",
            "particles": [
                "4daaa1fb-9eba-42f1-a57e-0a7858656b2f",
                "030a00b2-aeea-47b5-9ec4-13e9f05cec0c",
                "f7bbacf3-2a6b-44ca-8501-f06b36e99cda",
                "67e4dd05-032f-42f7-99d0-e5bdd09401dd",
                "91a9bb37-8aa9-434c-874f-06a8fcb7f401",
                "b4f9cbd0-df66-4b43-a01e-d5d188d0a252",
                "cff2059a-787a-43d7-abab-6e6d30311503",
                "af542d0d-f770-4f74-9792-c89954c6c430",
                "b619e65e-22ad-4e31-9ef2-560eb86d2557",
                "c43d9ef5-4b53-4f37-a582-735a47d2e48f",
                "2ef930b2-2b60-4f10-8487-0bad5ce5b0f3",
                "fd4f5ada-f0d4-4b8a-a4eb-2dbe4d5bc99e",
                "d81f8cc3-73fe-4ff4-b584-2d2e93a60e5b",
                "b88d9497-2464-472b-b1af-3c439902a5a0",
                "0ffb950a-bfd0-430b-9b73-dfae9ac02e14",
                "9a4a90f4-6086-410d-aacc-b8ece0ce3230",
                "083bcdb2-5e4f-4171-8897-8b4f795562e6",
                "d35088b9-751e-4e2f-bac2-2df0ad01c7d4",
                "1be64513-eb87-4b24-8b56-173512442c62",
                "ff4f16cb-f1d4-4601-9147-653c6478c613",
                "e31a30b5-8096-4ada-afc7-cc366d2ffcd3",
                "f3dba6f3-e825-4eeb-a41e-427af8edee79",
                "ba790431-32df-4b2f-8ebd-d41f59699621",
                "a55fa1df-848b-4fd4-a911-1a1b8fe62e47"
            ],
            "springs": [
                "3a70b521-6d6d-4ace-add2-4c2edc1f65d7",
                "9f551bd9-0208-4333-885d-315da74ec6a7",
                "649941b5-31fe-4be0-b2fe-305e96febe0d",
                "b5fb5b27-6d67-4659-8642-df432d82b851",
                "5d434674-6d3b-476f-849c-7f454de3709f",
                "330e5c84-d48b-42eb-8429-250708e20131",
                "03d67ce1-314a-4ef4-a90a-0a5a511c8fc3",
                "9536a308-8b79-4484-b6ca-b1517f267a50",
                "a704c217-b314-4145-bebf-ecd92f47fd6f",
                "4462150d-1644-4c93-848a-3dfe1dd339bf",
                "763f4a3d-9e25-4312-ab8d-1ab3bac3806a",
                "a00694ed-e6e1-43a5-b832-5b58839a3c6d",
                "2ff2a9a6-76f3-49fc-8d8f-fd6b6617d973",
                "154e29e3-f4d2-4c82-9d6f-e4ad780d6a35",
                "74e30709-1ff7-41c5-b3d0-c035756fbcce",
                "1ca08828-70e4-44d9-8e73-832cef674010",
                "c2e7c285-0e46-404a-b7b1-58772f354be8",
                "51614dca-302d-4471-9722-c4b524c232f3",
                "1dd4d580-6b06-47cc-8033-ff257f195635",
                "f43f100a-03ec-45ec-ba9f-644da1a2ea61",
                "83aa18a3-5199-4115-84ac-d4deca5ef679",
                "def5e450-ed03-4a01-9ded-a8ac4ca0e785",
                "158ee9e4-ed49-424c-852d-cc0850831d68",
                "ae533dce-4282-4196-b163-08d87f9cbe6b",
                "89bbd659-54aa-448f-b7d4-6512505800b8",
                "c04f39de-2bd7-4f62-a023-7a7cb3ab1e4b",
                "53e0283b-d462-4a47-aef2-ebbb212d54e2",
                "524a7365-d694-455e-8a88-79387c984446",
                "3c675006-d75f-49f9-be69-7ab18a92a69f",
                "b62f246a-a22d-4534-bd65-b72ecb13393f",
                "7f6b17c8-2f93-4e61-af68-50135997e613",
                "3c568657-706e-492b-9213-653ac1be7388",
                "60300acb-ba3b-402c-95f8-1cae44d7d5ff",
                "c12097cd-0b07-4b3d-94a4-c14db3c8d9bb",
                "510b8bb4-cc41-462d-8f1e-4564bef101ce",
                "1d717ca6-d000-4194-867e-526efca0b67a",
                "c99caf10-1d14-4795-81dc-7f8fb750865e",
                "2787ec79-aa9d-4a6f-be16-93894b08450f",
                "2125a587-8ab3-4d72-8758-3c2ae6d1ac7f",
                "4c4e93c5-6901-47a5-b4e2-53c5fb6ca0d3",
                "8ac19885-7198-4d95-861d-ca4cd696c13e",
                "6b274694-da42-4c4b-a723-e2c1d2f72822",
                "40e370bd-ba4d-4cb2-8c20-a75359a8b2cb",
                "57d463fa-f1d5-414b-902f-d8a436ee4478",
                "2a15dae4-be99-4da5-8862-0fdca739a785",
                "b9fce497-25d6-424e-b7a7-243592ac287a",
                "ae0482e1-6c3b-44ea-b1bf-b61926ea38c7",
                "a570af42-385f-4b62-8e8e-1477d8c7d95f",
                "15c1d98a-4f85-40c0-89af-b17c042619f7",
                "9769dab0-d739-4a3b-a93e-821cfe2c59bb",
                "604e3049-0783-4ec2-ae6b-77e0cbacd4d7",
                "349ce38e-7bdd-48e4-bf8d-0d569c81f2ff",
                "3c1acd19-72d1-4ffd-ac0c-471e362b65b5",
                "869e1278-ca97-466d-984f-0bc00afdda00",
                "38b90400-5a12-42f8-9e53-bcc688efab03",
                "6d8bf37c-b124-492f-83b9-c33ce1c11e75"
            ]
        }
    ],
    "springs": [
        {
            "id": "3a70b521-6d6d-4ace-add2-4c2edc1f65d7",
            "particles": [
                {
                    "id": "4daaa1fb-9eba-42f1-a57e-0a7858656b2f",
                    "position": {
                        "vector": [
                            385,
                            189.20000076293945
                        ]
                    },
                    "springIds": [
                        "3a70b521-6d6d-4ace-add2-4c2edc1f65d7",
                        "b5fb5b27-6d67-4659-8642-df432d82b851",
                        "89bbd659-54aa-448f-b7d4-6512505800b8"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "cff2059a-787a-43d7-abab-6e6d30311503",
                    "position": {
                        "vector": [
                            435,
                            189.20000076293945
                        ]
                    },
                    "springIds": [
                        "3a70b521-6d6d-4ace-add2-4c2edc1f65d7",
                        "9f551bd9-0208-4333-885d-315da74ec6a7",
                        "c04f39de-2bd7-4f62-a023-7a7cb3ab1e4b",
                        "53e0283b-d462-4a47-aef2-ebbb212d54e2",
                        "6d8bf37c-b124-492f-83b9-c33ce1c11e75"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "9f551bd9-0208-4333-885d-315da74ec6a7",
            "particles": [
                {
                    "id": "cff2059a-787a-43d7-abab-6e6d30311503",
                    "position": {
                        "vector": [
                            435,
                            189.20000076293945
                        ]
                    },
                    "springIds": [
                        "3a70b521-6d6d-4ace-add2-4c2edc1f65d7",
                        "9f551bd9-0208-4333-885d-315da74ec6a7",
                        "c04f39de-2bd7-4f62-a023-7a7cb3ab1e4b",
                        "53e0283b-d462-4a47-aef2-ebbb212d54e2",
                        "6d8bf37c-b124-492f-83b9-c33ce1c11e75"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "af542d0d-f770-4f74-9792-c89954c6c430",
                    "position": {
                        "vector": [
                            479,
                            189.20000076293945
                        ]
                    },
                    "springIds": [
                        "9f551bd9-0208-4333-885d-315da74ec6a7",
                        "649941b5-31fe-4be0-b2fe-305e96febe0d",
                        "524a7365-d694-455e-8a88-79387c984446",
                        "3c675006-d75f-49f9-be69-7ab18a92a69f",
                        "38b90400-5a12-42f8-9e53-bcc688efab03"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "649941b5-31fe-4be0-b2fe-305e96febe0d",
            "particles": [
                {
                    "id": "af542d0d-f770-4f74-9792-c89954c6c430",
                    "position": {
                        "vector": [
                            479,
                            189.20000076293945
                        ]
                    },
                    "springIds": [
                        "9f551bd9-0208-4333-885d-315da74ec6a7",
                        "649941b5-31fe-4be0-b2fe-305e96febe0d",
                        "524a7365-d694-455e-8a88-79387c984446",
                        "3c675006-d75f-49f9-be69-7ab18a92a69f",
                        "38b90400-5a12-42f8-9e53-bcc688efab03"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "b619e65e-22ad-4e31-9ef2-560eb86d2557",
                    "position": {
                        "vector": [
                            526,
                            189.20000076293945
                        ]
                    },
                    "springIds": [
                        "649941b5-31fe-4be0-b2fe-305e96febe0d",
                        "a704c217-b314-4145-bebf-ecd92f47fd6f",
                        "b62f246a-a22d-4534-bd65-b72ecb13393f"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "b5fb5b27-6d67-4659-8642-df432d82b851",
            "particles": [
                {
                    "id": "4daaa1fb-9eba-42f1-a57e-0a7858656b2f",
                    "position": {
                        "vector": [
                            385,
                            189.20000076293945
                        ]
                    },
                    "springIds": [
                        "3a70b521-6d6d-4ace-add2-4c2edc1f65d7",
                        "b5fb5b27-6d67-4659-8642-df432d82b851",
                        "89bbd659-54aa-448f-b7d4-6512505800b8"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "030a00b2-aeea-47b5-9ec4-13e9f05cec0c",
                    "position": {
                        "vector": [
                            385,
                            239.1999969482422
                        ]
                    },
                    "springIds": [
                        "b5fb5b27-6d67-4659-8642-df432d82b851",
                        "5d434674-6d3b-476f-849c-7f454de3709f",
                        "c04f39de-2bd7-4f62-a023-7a7cb3ab1e4b",
                        "7f6b17c8-2f93-4e61-af68-50135997e613",
                        "60300acb-ba3b-402c-95f8-1cae44d7d5ff"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "5d434674-6d3b-476f-849c-7f454de3709f",
            "particles": [
                {
                    "id": "030a00b2-aeea-47b5-9ec4-13e9f05cec0c",
                    "position": {
                        "vector": [
                            385,
                            239.1999969482422
                        ]
                    },
                    "springIds": [
                        "b5fb5b27-6d67-4659-8642-df432d82b851",
                        "5d434674-6d3b-476f-849c-7f454de3709f",
                        "c04f39de-2bd7-4f62-a023-7a7cb3ab1e4b",
                        "7f6b17c8-2f93-4e61-af68-50135997e613",
                        "60300acb-ba3b-402c-95f8-1cae44d7d5ff"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "f7bbacf3-2a6b-44ca-8501-f06b36e99cda",
                    "position": {
                        "vector": [
                            385,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "5d434674-6d3b-476f-849c-7f454de3709f",
                        "330e5c84-d48b-42eb-8429-250708e20131",
                        "3c568657-706e-492b-9213-653ac1be7388",
                        "c12097cd-0b07-4b3d-94a4-c14db3c8d9bb",
                        "1d717ca6-d000-4194-867e-526efca0b67a"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "330e5c84-d48b-42eb-8429-250708e20131",
            "particles": [
                {
                    "id": "f7bbacf3-2a6b-44ca-8501-f06b36e99cda",
                    "position": {
                        "vector": [
                            385,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "5d434674-6d3b-476f-849c-7f454de3709f",
                        "330e5c84-d48b-42eb-8429-250708e20131",
                        "3c568657-706e-492b-9213-653ac1be7388",
                        "c12097cd-0b07-4b3d-94a4-c14db3c8d9bb",
                        "1d717ca6-d000-4194-867e-526efca0b67a"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "67e4dd05-032f-42f7-99d0-e5bdd09401dd",
                    "position": {
                        "vector": [
                            385,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "330e5c84-d48b-42eb-8429-250708e20131",
                        "03d67ce1-314a-4ef4-a90a-0a5a511c8fc3",
                        "510b8bb4-cc41-462d-8f1e-4564bef101ce",
                        "c99caf10-1d14-4795-81dc-7f8fb750865e",
                        "57d463fa-f1d5-414b-902f-d8a436ee4478"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "03d67ce1-314a-4ef4-a90a-0a5a511c8fc3",
            "particles": [
                {
                    "id": "67e4dd05-032f-42f7-99d0-e5bdd09401dd",
                    "position": {
                        "vector": [
                            385,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "330e5c84-d48b-42eb-8429-250708e20131",
                        "03d67ce1-314a-4ef4-a90a-0a5a511c8fc3",
                        "510b8bb4-cc41-462d-8f1e-4564bef101ce",
                        "c99caf10-1d14-4795-81dc-7f8fb750865e",
                        "57d463fa-f1d5-414b-902f-d8a436ee4478"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "91a9bb37-8aa9-434c-874f-06a8fcb7f401",
                    "position": {
                        "vector": [
                            385,
                            383.1999969482422
                        ]
                    },
                    "springIds": [
                        "03d67ce1-314a-4ef4-a90a-0a5a511c8fc3",
                        "9536a308-8b79-4484-b6ca-b1517f267a50",
                        "2a15dae4-be99-4da5-8862-0fdca739a785",
                        "b9fce497-25d6-424e-b7a7-243592ac287a",
                        "ae0482e1-6c3b-44ea-b1bf-b61926ea38c7"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "9536a308-8b79-4484-b6ca-b1517f267a50",
            "particles": [
                {
                    "id": "91a9bb37-8aa9-434c-874f-06a8fcb7f401",
                    "position": {
                        "vector": [
                            385,
                            383.1999969482422
                        ]
                    },
                    "springIds": [
                        "03d67ce1-314a-4ef4-a90a-0a5a511c8fc3",
                        "9536a308-8b79-4484-b6ca-b1517f267a50",
                        "2a15dae4-be99-4da5-8862-0fdca739a785",
                        "b9fce497-25d6-424e-b7a7-243592ac287a",
                        "ae0482e1-6c3b-44ea-b1bf-b61926ea38c7"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "b4f9cbd0-df66-4b43-a01e-d5d188d0a252",
                    "position": {
                        "vector": [
                            384,
                            431.1999969482422
                        ]
                    },
                    "springIds": [
                        "9536a308-8b79-4484-b6ca-b1517f267a50",
                        "ae533dce-4282-4196-b163-08d87f9cbe6b",
                        "a570af42-385f-4b62-8e8e-1477d8c7d95f"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "a704c217-b314-4145-bebf-ecd92f47fd6f",
            "particles": [
                {
                    "id": "b619e65e-22ad-4e31-9ef2-560eb86d2557",
                    "position": {
                        "vector": [
                            526,
                            189.20000076293945
                        ]
                    },
                    "springIds": [
                        "649941b5-31fe-4be0-b2fe-305e96febe0d",
                        "a704c217-b314-4145-bebf-ecd92f47fd6f",
                        "b62f246a-a22d-4534-bd65-b72ecb13393f"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "c43d9ef5-4b53-4f37-a582-735a47d2e48f",
                    "position": {
                        "vector": [
                            525,
                            239.20000076293945
                        ]
                    },
                    "springIds": [
                        "a704c217-b314-4145-bebf-ecd92f47fd6f",
                        "4462150d-1644-4c93-848a-3dfe1dd339bf",
                        "3c675006-d75f-49f9-be69-7ab18a92a69f"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "4462150d-1644-4c93-848a-3dfe1dd339bf",
            "particles": [
                {
                    "id": "2ef930b2-2b60-4f10-8487-0bad5ce5b0f3",
                    "position": {
                        "vector": [
                            479,
                            239.20000076293945
                        ]
                    },
                    "springIds": [
                        "4462150d-1644-4c93-848a-3dfe1dd339bf",
                        "763f4a3d-9e25-4312-ab8d-1ab3bac3806a",
                        "53e0283b-d462-4a47-aef2-ebbb212d54e2",
                        "b62f246a-a22d-4534-bd65-b72ecb13393f",
                        "38b90400-5a12-42f8-9e53-bcc688efab03"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "c43d9ef5-4b53-4f37-a582-735a47d2e48f",
                    "position": {
                        "vector": [
                            525,
                            239.20000076293945
                        ]
                    },
                    "springIds": [
                        "a704c217-b314-4145-bebf-ecd92f47fd6f",
                        "4462150d-1644-4c93-848a-3dfe1dd339bf",
                        "3c675006-d75f-49f9-be69-7ab18a92a69f"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "763f4a3d-9e25-4312-ab8d-1ab3bac3806a",
            "particles": [
                {
                    "id": "fd4f5ada-f0d4-4b8a-a4eb-2dbe4d5bc99e",
                    "position": {
                        "vector": [
                            435,
                            239.1999969482422
                        ]
                    },
                    "springIds": [
                        "763f4a3d-9e25-4312-ab8d-1ab3bac3806a",
                        "a00694ed-e6e1-43a5-b832-5b58839a3c6d",
                        "89bbd659-54aa-448f-b7d4-6512505800b8",
                        "524a7365-d694-455e-8a88-79387c984446",
                        "7f6b17c8-2f93-4e61-af68-50135997e613",
                        "3c568657-706e-492b-9213-653ac1be7388",
                        "6d8bf37c-b124-492f-83b9-c33ce1c11e75"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "2ef930b2-2b60-4f10-8487-0bad5ce5b0f3",
                    "position": {
                        "vector": [
                            479,
                            239.20000076293945
                        ]
                    },
                    "springIds": [
                        "4462150d-1644-4c93-848a-3dfe1dd339bf",
                        "763f4a3d-9e25-4312-ab8d-1ab3bac3806a",
                        "53e0283b-d462-4a47-aef2-ebbb212d54e2",
                        "b62f246a-a22d-4534-bd65-b72ecb13393f",
                        "38b90400-5a12-42f8-9e53-bcc688efab03"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "a00694ed-e6e1-43a5-b832-5b58839a3c6d",
            "particles": [
                {
                    "id": "fd4f5ada-f0d4-4b8a-a4eb-2dbe4d5bc99e",
                    "position": {
                        "vector": [
                            435,
                            239.1999969482422
                        ]
                    },
                    "springIds": [
                        "763f4a3d-9e25-4312-ab8d-1ab3bac3806a",
                        "a00694ed-e6e1-43a5-b832-5b58839a3c6d",
                        "89bbd659-54aa-448f-b7d4-6512505800b8",
                        "524a7365-d694-455e-8a88-79387c984446",
                        "7f6b17c8-2f93-4e61-af68-50135997e613",
                        "3c568657-706e-492b-9213-653ac1be7388",
                        "6d8bf37c-b124-492f-83b9-c33ce1c11e75"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "d81f8cc3-73fe-4ff4-b584-2d2e93a60e5b",
                    "position": {
                        "vector": [
                            434,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "a00694ed-e6e1-43a5-b832-5b58839a3c6d",
                        "2ff2a9a6-76f3-49fc-8d8f-fd6b6617d973",
                        "60300acb-ba3b-402c-95f8-1cae44d7d5ff",
                        "c12097cd-0b07-4b3d-94a4-c14db3c8d9bb",
                        "510b8bb4-cc41-462d-8f1e-4564bef101ce",
                        "2787ec79-aa9d-4a6f-be16-93894b08450f",
                        "4c4e93c5-6901-47a5-b4e2-53c5fb6ca0d3"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "2ff2a9a6-76f3-49fc-8d8f-fd6b6617d973",
            "particles": [
                {
                    "id": "d81f8cc3-73fe-4ff4-b584-2d2e93a60e5b",
                    "position": {
                        "vector": [
                            434,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "a00694ed-e6e1-43a5-b832-5b58839a3c6d",
                        "2ff2a9a6-76f3-49fc-8d8f-fd6b6617d973",
                        "60300acb-ba3b-402c-95f8-1cae44d7d5ff",
                        "c12097cd-0b07-4b3d-94a4-c14db3c8d9bb",
                        "510b8bb4-cc41-462d-8f1e-4564bef101ce",
                        "2787ec79-aa9d-4a6f-be16-93894b08450f",
                        "4c4e93c5-6901-47a5-b4e2-53c5fb6ca0d3"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "b88d9497-2464-472b-b1af-3c439902a5a0",
                    "position": {
                        "vector": [
                            479,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "2ff2a9a6-76f3-49fc-8d8f-fd6b6617d973",
                        "154e29e3-f4d2-4c82-9d6f-e4ad780d6a35",
                        "2125a587-8ab3-4d72-8758-3c2ae6d1ac7f",
                        "8ac19885-7198-4d95-861d-ca4cd696c13e",
                        "40e370bd-ba4d-4cb2-8c20-a75359a8b2cb"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "154e29e3-f4d2-4c82-9d6f-e4ad780d6a35",
            "particles": [
                {
                    "id": "b88d9497-2464-472b-b1af-3c439902a5a0",
                    "position": {
                        "vector": [
                            479,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "2ff2a9a6-76f3-49fc-8d8f-fd6b6617d973",
                        "154e29e3-f4d2-4c82-9d6f-e4ad780d6a35",
                        "2125a587-8ab3-4d72-8758-3c2ae6d1ac7f",
                        "8ac19885-7198-4d95-861d-ca4cd696c13e",
                        "40e370bd-ba4d-4cb2-8c20-a75359a8b2cb"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "0ffb950a-bfd0-430b-9b73-dfae9ac02e14",
                    "position": {
                        "vector": [
                            523,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "154e29e3-f4d2-4c82-9d6f-e4ad780d6a35",
                        "74e30709-1ff7-41c5-b3d0-c035756fbcce",
                        "6b274694-da42-4c4b-a723-e2c1d2f72822"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "74e30709-1ff7-41c5-b3d0-c035756fbcce",
            "particles": [
                {
                    "id": "0ffb950a-bfd0-430b-9b73-dfae9ac02e14",
                    "position": {
                        "vector": [
                            523,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "154e29e3-f4d2-4c82-9d6f-e4ad780d6a35",
                        "74e30709-1ff7-41c5-b3d0-c035756fbcce",
                        "6b274694-da42-4c4b-a723-e2c1d2f72822"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "9a4a90f4-6086-410d-aacc-b8ece0ce3230",
                    "position": {
                        "vector": [
                            523,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "74e30709-1ff7-41c5-b3d0-c035756fbcce",
                        "1ca08828-70e4-44d9-8e73-832cef674010",
                        "40e370bd-ba4d-4cb2-8c20-a75359a8b2cb"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "1ca08828-70e4-44d9-8e73-832cef674010",
            "particles": [
                {
                    "id": "9a4a90f4-6086-410d-aacc-b8ece0ce3230",
                    "position": {
                        "vector": [
                            523,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "74e30709-1ff7-41c5-b3d0-c035756fbcce",
                        "1ca08828-70e4-44d9-8e73-832cef674010",
                        "40e370bd-ba4d-4cb2-8c20-a75359a8b2cb"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "083bcdb2-5e4f-4171-8897-8b4f795562e6",
                    "position": {
                        "vector": [
                            479,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "1ca08828-70e4-44d9-8e73-832cef674010",
                        "c2e7c285-0e46-404a-b7b1-58772f354be8",
                        "4c4e93c5-6901-47a5-b4e2-53c5fb6ca0d3",
                        "8ac19885-7198-4d95-861d-ca4cd696c13e",
                        "6b274694-da42-4c4b-a723-e2c1d2f72822"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "c2e7c285-0e46-404a-b7b1-58772f354be8",
            "particles": [
                {
                    "id": "083bcdb2-5e4f-4171-8897-8b4f795562e6",
                    "position": {
                        "vector": [
                            479,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "1ca08828-70e4-44d9-8e73-832cef674010",
                        "c2e7c285-0e46-404a-b7b1-58772f354be8",
                        "4c4e93c5-6901-47a5-b4e2-53c5fb6ca0d3",
                        "8ac19885-7198-4d95-861d-ca4cd696c13e",
                        "6b274694-da42-4c4b-a723-e2c1d2f72822"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "d35088b9-751e-4e2f-bac2-2df0ad01c7d4",
                    "position": {
                        "vector": [
                            434,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "c2e7c285-0e46-404a-b7b1-58772f354be8",
                        "51614dca-302d-4471-9722-c4b524c232f3",
                        "1d717ca6-d000-4194-867e-526efca0b67a",
                        "c99caf10-1d14-4795-81dc-7f8fb750865e",
                        "2787ec79-aa9d-4a6f-be16-93894b08450f",
                        "2125a587-8ab3-4d72-8758-3c2ae6d1ac7f",
                        "2a15dae4-be99-4da5-8862-0fdca739a785"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "51614dca-302d-4471-9722-c4b524c232f3",
            "particles": [
                {
                    "id": "d35088b9-751e-4e2f-bac2-2df0ad01c7d4",
                    "position": {
                        "vector": [
                            434,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "c2e7c285-0e46-404a-b7b1-58772f354be8",
                        "51614dca-302d-4471-9722-c4b524c232f3",
                        "1d717ca6-d000-4194-867e-526efca0b67a",
                        "c99caf10-1d14-4795-81dc-7f8fb750865e",
                        "2787ec79-aa9d-4a6f-be16-93894b08450f",
                        "2125a587-8ab3-4d72-8758-3c2ae6d1ac7f",
                        "2a15dae4-be99-4da5-8862-0fdca739a785"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "f3dba6f3-e825-4eeb-a41e-427af8edee79",
                    "position": {
                        "vector": [
                            433,
                            383.1999969482422
                        ]
                    },
                    "springIds": [
                        "51614dca-302d-4471-9722-c4b524c232f3",
                        "1dd4d580-6b06-47cc-8033-ff257f195635",
                        "57d463fa-f1d5-414b-902f-d8a436ee4478",
                        "b9fce497-25d6-424e-b7a7-243592ac287a",
                        "a570af42-385f-4b62-8e8e-1477d8c7d95f",
                        "15c1d98a-4f85-40c0-89af-b17c042619f7",
                        "9769dab0-d739-4a3b-a93e-821cfe2c59bb"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "1dd4d580-6b06-47cc-8033-ff257f195635",
            "particles": [
                {
                    "id": "f3dba6f3-e825-4eeb-a41e-427af8edee79",
                    "position": {
                        "vector": [
                            433,
                            383.1999969482422
                        ]
                    },
                    "springIds": [
                        "51614dca-302d-4471-9722-c4b524c232f3",
                        "1dd4d580-6b06-47cc-8033-ff257f195635",
                        "57d463fa-f1d5-414b-902f-d8a436ee4478",
                        "b9fce497-25d6-424e-b7a7-243592ac287a",
                        "a570af42-385f-4b62-8e8e-1477d8c7d95f",
                        "15c1d98a-4f85-40c0-89af-b17c042619f7",
                        "9769dab0-d739-4a3b-a93e-821cfe2c59bb"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "e31a30b5-8096-4ada-afc7-cc366d2ffcd3",
                    "position": {
                        "vector": [
                            478,
                            383.1999969482422
                        ]
                    },
                    "springIds": [
                        "1dd4d580-6b06-47cc-8033-ff257f195635",
                        "f43f100a-03ec-45ec-ba9f-644da1a2ea61",
                        "604e3049-0783-4ec2-ae6b-77e0cbacd4d7",
                        "349ce38e-7bdd-48e4-bf8d-0d569c81f2ff",
                        "869e1278-ca97-466d-984f-0bc00afdda00"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "f43f100a-03ec-45ec-ba9f-644da1a2ea61",
            "particles": [
                {
                    "id": "e31a30b5-8096-4ada-afc7-cc366d2ffcd3",
                    "position": {
                        "vector": [
                            478,
                            383.1999969482422
                        ]
                    },
                    "springIds": [
                        "1dd4d580-6b06-47cc-8033-ff257f195635",
                        "f43f100a-03ec-45ec-ba9f-644da1a2ea61",
                        "604e3049-0783-4ec2-ae6b-77e0cbacd4d7",
                        "349ce38e-7bdd-48e4-bf8d-0d569c81f2ff",
                        "869e1278-ca97-466d-984f-0bc00afdda00"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "1be64513-eb87-4b24-8b56-173512442c62",
                    "position": {
                        "vector": [
                            522,
                            383
                        ]
                    },
                    "springIds": [
                        "f43f100a-03ec-45ec-ba9f-644da1a2ea61",
                        "83aa18a3-5199-4115-84ac-d4deca5ef679",
                        "3c1acd19-72d1-4ffd-ac0c-471e362b65b5"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "83aa18a3-5199-4115-84ac-d4deca5ef679",
            "particles": [
                {
                    "id": "1be64513-eb87-4b24-8b56-173512442c62",
                    "position": {
                        "vector": [
                            522,
                            383
                        ]
                    },
                    "springIds": [
                        "f43f100a-03ec-45ec-ba9f-644da1a2ea61",
                        "83aa18a3-5199-4115-84ac-d4deca5ef679",
                        "3c1acd19-72d1-4ffd-ac0c-471e362b65b5"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "ff4f16cb-f1d4-4601-9147-653c6478c613",
                    "position": {
                        "vector": [
                            521,
                            431
                        ]
                    },
                    "springIds": [
                        "83aa18a3-5199-4115-84ac-d4deca5ef679",
                        "def5e450-ed03-4a01-9ded-a8ac4ca0e785",
                        "869e1278-ca97-466d-984f-0bc00afdda00"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "def5e450-ed03-4a01-9ded-a8ac4ca0e785",
            "particles": [
                {
                    "id": "ff4f16cb-f1d4-4601-9147-653c6478c613",
                    "position": {
                        "vector": [
                            521,
                            431
                        ]
                    },
                    "springIds": [
                        "83aa18a3-5199-4115-84ac-d4deca5ef679",
                        "def5e450-ed03-4a01-9ded-a8ac4ca0e785",
                        "869e1278-ca97-466d-984f-0bc00afdda00"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "a55fa1df-848b-4fd4-a911-1a1b8fe62e47",
                    "position": {
                        "vector": [
                            477,
                            431.1999969482422
                        ]
                    },
                    "springIds": [
                        "def5e450-ed03-4a01-9ded-a8ac4ca0e785",
                        "158ee9e4-ed49-424c-852d-cc0850831d68",
                        "9769dab0-d739-4a3b-a93e-821cfe2c59bb",
                        "349ce38e-7bdd-48e4-bf8d-0d569c81f2ff",
                        "3c1acd19-72d1-4ffd-ac0c-471e362b65b5"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "158ee9e4-ed49-424c-852d-cc0850831d68",
            "particles": [
                {
                    "id": "a55fa1df-848b-4fd4-a911-1a1b8fe62e47",
                    "position": {
                        "vector": [
                            477,
                            431.1999969482422
                        ]
                    },
                    "springIds": [
                        "def5e450-ed03-4a01-9ded-a8ac4ca0e785",
                        "158ee9e4-ed49-424c-852d-cc0850831d68",
                        "9769dab0-d739-4a3b-a93e-821cfe2c59bb",
                        "349ce38e-7bdd-48e4-bf8d-0d569c81f2ff",
                        "3c1acd19-72d1-4ffd-ac0c-471e362b65b5"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "ba790431-32df-4b2f-8ebd-d41f59699621",
                    "position": {
                        "vector": [
                            432,
                            431.1999969482422
                        ]
                    },
                    "springIds": [
                        "158ee9e4-ed49-424c-852d-cc0850831d68",
                        "ae533dce-4282-4196-b163-08d87f9cbe6b",
                        "ae0482e1-6c3b-44ea-b1bf-b61926ea38c7",
                        "15c1d98a-4f85-40c0-89af-b17c042619f7",
                        "604e3049-0783-4ec2-ae6b-77e0cbacd4d7"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "ae533dce-4282-4196-b163-08d87f9cbe6b",
            "particles": [
                {
                    "id": "ba790431-32df-4b2f-8ebd-d41f59699621",
                    "position": {
                        "vector": [
                            432,
                            431.1999969482422
                        ]
                    },
                    "springIds": [
                        "158ee9e4-ed49-424c-852d-cc0850831d68",
                        "ae533dce-4282-4196-b163-08d87f9cbe6b",
                        "ae0482e1-6c3b-44ea-b1bf-b61926ea38c7",
                        "15c1d98a-4f85-40c0-89af-b17c042619f7",
                        "604e3049-0783-4ec2-ae6b-77e0cbacd4d7"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "b4f9cbd0-df66-4b43-a01e-d5d188d0a252",
                    "position": {
                        "vector": [
                            384,
                            431.1999969482422
                        ]
                    },
                    "springIds": [
                        "9536a308-8b79-4484-b6ca-b1517f267a50",
                        "ae533dce-4282-4196-b163-08d87f9cbe6b",
                        "a570af42-385f-4b62-8e8e-1477d8c7d95f"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "89bbd659-54aa-448f-b7d4-6512505800b8",
            "particles": [
                {
                    "id": "4daaa1fb-9eba-42f1-a57e-0a7858656b2f",
                    "position": {
                        "vector": [
                            385,
                            189.20000076293945
                        ]
                    },
                    "springIds": [
                        "3a70b521-6d6d-4ace-add2-4c2edc1f65d7",
                        "b5fb5b27-6d67-4659-8642-df432d82b851",
                        "89bbd659-54aa-448f-b7d4-6512505800b8"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "fd4f5ada-f0d4-4b8a-a4eb-2dbe4d5bc99e",
                    "position": {
                        "vector": [
                            435,
                            239.1999969482422
                        ]
                    },
                    "springIds": [
                        "763f4a3d-9e25-4312-ab8d-1ab3bac3806a",
                        "a00694ed-e6e1-43a5-b832-5b58839a3c6d",
                        "89bbd659-54aa-448f-b7d4-6512505800b8",
                        "524a7365-d694-455e-8a88-79387c984446",
                        "7f6b17c8-2f93-4e61-af68-50135997e613",
                        "3c568657-706e-492b-9213-653ac1be7388",
                        "6d8bf37c-b124-492f-83b9-c33ce1c11e75"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "c04f39de-2bd7-4f62-a023-7a7cb3ab1e4b",
            "particles": [
                {
                    "id": "030a00b2-aeea-47b5-9ec4-13e9f05cec0c",
                    "position": {
                        "vector": [
                            385,
                            239.1999969482422
                        ]
                    },
                    "springIds": [
                        "b5fb5b27-6d67-4659-8642-df432d82b851",
                        "5d434674-6d3b-476f-849c-7f454de3709f",
                        "c04f39de-2bd7-4f62-a023-7a7cb3ab1e4b",
                        "7f6b17c8-2f93-4e61-af68-50135997e613",
                        "60300acb-ba3b-402c-95f8-1cae44d7d5ff"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "cff2059a-787a-43d7-abab-6e6d30311503",
                    "position": {
                        "vector": [
                            435,
                            189.20000076293945
                        ]
                    },
                    "springIds": [
                        "3a70b521-6d6d-4ace-add2-4c2edc1f65d7",
                        "9f551bd9-0208-4333-885d-315da74ec6a7",
                        "c04f39de-2bd7-4f62-a023-7a7cb3ab1e4b",
                        "53e0283b-d462-4a47-aef2-ebbb212d54e2",
                        "6d8bf37c-b124-492f-83b9-c33ce1c11e75"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "53e0283b-d462-4a47-aef2-ebbb212d54e2",
            "particles": [
                {
                    "id": "cff2059a-787a-43d7-abab-6e6d30311503",
                    "position": {
                        "vector": [
                            435,
                            189.20000076293945
                        ]
                    },
                    "springIds": [
                        "3a70b521-6d6d-4ace-add2-4c2edc1f65d7",
                        "9f551bd9-0208-4333-885d-315da74ec6a7",
                        "c04f39de-2bd7-4f62-a023-7a7cb3ab1e4b",
                        "53e0283b-d462-4a47-aef2-ebbb212d54e2",
                        "6d8bf37c-b124-492f-83b9-c33ce1c11e75"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "2ef930b2-2b60-4f10-8487-0bad5ce5b0f3",
                    "position": {
                        "vector": [
                            479,
                            239.20000076293945
                        ]
                    },
                    "springIds": [
                        "4462150d-1644-4c93-848a-3dfe1dd339bf",
                        "763f4a3d-9e25-4312-ab8d-1ab3bac3806a",
                        "53e0283b-d462-4a47-aef2-ebbb212d54e2",
                        "b62f246a-a22d-4534-bd65-b72ecb13393f",
                        "38b90400-5a12-42f8-9e53-bcc688efab03"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "524a7365-d694-455e-8a88-79387c984446",
            "particles": [
                {
                    "id": "fd4f5ada-f0d4-4b8a-a4eb-2dbe4d5bc99e",
                    "position": {
                        "vector": [
                            435,
                            239.1999969482422
                        ]
                    },
                    "springIds": [
                        "763f4a3d-9e25-4312-ab8d-1ab3bac3806a",
                        "a00694ed-e6e1-43a5-b832-5b58839a3c6d",
                        "89bbd659-54aa-448f-b7d4-6512505800b8",
                        "524a7365-d694-455e-8a88-79387c984446",
                        "7f6b17c8-2f93-4e61-af68-50135997e613",
                        "3c568657-706e-492b-9213-653ac1be7388",
                        "6d8bf37c-b124-492f-83b9-c33ce1c11e75"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "af542d0d-f770-4f74-9792-c89954c6c430",
                    "position": {
                        "vector": [
                            479,
                            189.20000076293945
                        ]
                    },
                    "springIds": [
                        "9f551bd9-0208-4333-885d-315da74ec6a7",
                        "649941b5-31fe-4be0-b2fe-305e96febe0d",
                        "524a7365-d694-455e-8a88-79387c984446",
                        "3c675006-d75f-49f9-be69-7ab18a92a69f",
                        "38b90400-5a12-42f8-9e53-bcc688efab03"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "3c675006-d75f-49f9-be69-7ab18a92a69f",
            "particles": [
                {
                    "id": "af542d0d-f770-4f74-9792-c89954c6c430",
                    "position": {
                        "vector": [
                            479,
                            189.20000076293945
                        ]
                    },
                    "springIds": [
                        "9f551bd9-0208-4333-885d-315da74ec6a7",
                        "649941b5-31fe-4be0-b2fe-305e96febe0d",
                        "524a7365-d694-455e-8a88-79387c984446",
                        "3c675006-d75f-49f9-be69-7ab18a92a69f",
                        "38b90400-5a12-42f8-9e53-bcc688efab03"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "c43d9ef5-4b53-4f37-a582-735a47d2e48f",
                    "position": {
                        "vector": [
                            525,
                            239.20000076293945
                        ]
                    },
                    "springIds": [
                        "a704c217-b314-4145-bebf-ecd92f47fd6f",
                        "4462150d-1644-4c93-848a-3dfe1dd339bf",
                        "3c675006-d75f-49f9-be69-7ab18a92a69f"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "b62f246a-a22d-4534-bd65-b72ecb13393f",
            "particles": [
                {
                    "id": "2ef930b2-2b60-4f10-8487-0bad5ce5b0f3",
                    "position": {
                        "vector": [
                            479,
                            239.20000076293945
                        ]
                    },
                    "springIds": [
                        "4462150d-1644-4c93-848a-3dfe1dd339bf",
                        "763f4a3d-9e25-4312-ab8d-1ab3bac3806a",
                        "53e0283b-d462-4a47-aef2-ebbb212d54e2",
                        "b62f246a-a22d-4534-bd65-b72ecb13393f",
                        "38b90400-5a12-42f8-9e53-bcc688efab03"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "b619e65e-22ad-4e31-9ef2-560eb86d2557",
                    "position": {
                        "vector": [
                            526,
                            189.20000076293945
                        ]
                    },
                    "springIds": [
                        "649941b5-31fe-4be0-b2fe-305e96febe0d",
                        "a704c217-b314-4145-bebf-ecd92f47fd6f",
                        "b62f246a-a22d-4534-bd65-b72ecb13393f"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "7f6b17c8-2f93-4e61-af68-50135997e613",
            "particles": [
                {
                    "id": "fd4f5ada-f0d4-4b8a-a4eb-2dbe4d5bc99e",
                    "position": {
                        "vector": [
                            435,
                            239.1999969482422
                        ]
                    },
                    "springIds": [
                        "763f4a3d-9e25-4312-ab8d-1ab3bac3806a",
                        "a00694ed-e6e1-43a5-b832-5b58839a3c6d",
                        "89bbd659-54aa-448f-b7d4-6512505800b8",
                        "524a7365-d694-455e-8a88-79387c984446",
                        "7f6b17c8-2f93-4e61-af68-50135997e613",
                        "3c568657-706e-492b-9213-653ac1be7388",
                        "6d8bf37c-b124-492f-83b9-c33ce1c11e75"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "030a00b2-aeea-47b5-9ec4-13e9f05cec0c",
                    "position": {
                        "vector": [
                            385,
                            239.1999969482422
                        ]
                    },
                    "springIds": [
                        "b5fb5b27-6d67-4659-8642-df432d82b851",
                        "5d434674-6d3b-476f-849c-7f454de3709f",
                        "c04f39de-2bd7-4f62-a023-7a7cb3ab1e4b",
                        "7f6b17c8-2f93-4e61-af68-50135997e613",
                        "60300acb-ba3b-402c-95f8-1cae44d7d5ff"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "3c568657-706e-492b-9213-653ac1be7388",
            "particles": [
                {
                    "id": "f7bbacf3-2a6b-44ca-8501-f06b36e99cda",
                    "position": {
                        "vector": [
                            385,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "5d434674-6d3b-476f-849c-7f454de3709f",
                        "330e5c84-d48b-42eb-8429-250708e20131",
                        "3c568657-706e-492b-9213-653ac1be7388",
                        "c12097cd-0b07-4b3d-94a4-c14db3c8d9bb",
                        "1d717ca6-d000-4194-867e-526efca0b67a"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "fd4f5ada-f0d4-4b8a-a4eb-2dbe4d5bc99e",
                    "position": {
                        "vector": [
                            435,
                            239.1999969482422
                        ]
                    },
                    "springIds": [
                        "763f4a3d-9e25-4312-ab8d-1ab3bac3806a",
                        "a00694ed-e6e1-43a5-b832-5b58839a3c6d",
                        "89bbd659-54aa-448f-b7d4-6512505800b8",
                        "524a7365-d694-455e-8a88-79387c984446",
                        "7f6b17c8-2f93-4e61-af68-50135997e613",
                        "3c568657-706e-492b-9213-653ac1be7388",
                        "6d8bf37c-b124-492f-83b9-c33ce1c11e75"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "60300acb-ba3b-402c-95f8-1cae44d7d5ff",
            "particles": [
                {
                    "id": "030a00b2-aeea-47b5-9ec4-13e9f05cec0c",
                    "position": {
                        "vector": [
                            385,
                            239.1999969482422
                        ]
                    },
                    "springIds": [
                        "b5fb5b27-6d67-4659-8642-df432d82b851",
                        "5d434674-6d3b-476f-849c-7f454de3709f",
                        "c04f39de-2bd7-4f62-a023-7a7cb3ab1e4b",
                        "7f6b17c8-2f93-4e61-af68-50135997e613",
                        "60300acb-ba3b-402c-95f8-1cae44d7d5ff"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "d81f8cc3-73fe-4ff4-b584-2d2e93a60e5b",
                    "position": {
                        "vector": [
                            434,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "a00694ed-e6e1-43a5-b832-5b58839a3c6d",
                        "2ff2a9a6-76f3-49fc-8d8f-fd6b6617d973",
                        "60300acb-ba3b-402c-95f8-1cae44d7d5ff",
                        "c12097cd-0b07-4b3d-94a4-c14db3c8d9bb",
                        "510b8bb4-cc41-462d-8f1e-4564bef101ce",
                        "2787ec79-aa9d-4a6f-be16-93894b08450f",
                        "4c4e93c5-6901-47a5-b4e2-53c5fb6ca0d3"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "c12097cd-0b07-4b3d-94a4-c14db3c8d9bb",
            "particles": [
                {
                    "id": "f7bbacf3-2a6b-44ca-8501-f06b36e99cda",
                    "position": {
                        "vector": [
                            385,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "5d434674-6d3b-476f-849c-7f454de3709f",
                        "330e5c84-d48b-42eb-8429-250708e20131",
                        "3c568657-706e-492b-9213-653ac1be7388",
                        "c12097cd-0b07-4b3d-94a4-c14db3c8d9bb",
                        "1d717ca6-d000-4194-867e-526efca0b67a"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "d81f8cc3-73fe-4ff4-b584-2d2e93a60e5b",
                    "position": {
                        "vector": [
                            434,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "a00694ed-e6e1-43a5-b832-5b58839a3c6d",
                        "2ff2a9a6-76f3-49fc-8d8f-fd6b6617d973",
                        "60300acb-ba3b-402c-95f8-1cae44d7d5ff",
                        "c12097cd-0b07-4b3d-94a4-c14db3c8d9bb",
                        "510b8bb4-cc41-462d-8f1e-4564bef101ce",
                        "2787ec79-aa9d-4a6f-be16-93894b08450f",
                        "4c4e93c5-6901-47a5-b4e2-53c5fb6ca0d3"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "510b8bb4-cc41-462d-8f1e-4564bef101ce",
            "particles": [
                {
                    "id": "d81f8cc3-73fe-4ff4-b584-2d2e93a60e5b",
                    "position": {
                        "vector": [
                            434,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "a00694ed-e6e1-43a5-b832-5b58839a3c6d",
                        "2ff2a9a6-76f3-49fc-8d8f-fd6b6617d973",
                        "60300acb-ba3b-402c-95f8-1cae44d7d5ff",
                        "c12097cd-0b07-4b3d-94a4-c14db3c8d9bb",
                        "510b8bb4-cc41-462d-8f1e-4564bef101ce",
                        "2787ec79-aa9d-4a6f-be16-93894b08450f",
                        "4c4e93c5-6901-47a5-b4e2-53c5fb6ca0d3"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "67e4dd05-032f-42f7-99d0-e5bdd09401dd",
                    "position": {
                        "vector": [
                            385,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "330e5c84-d48b-42eb-8429-250708e20131",
                        "03d67ce1-314a-4ef4-a90a-0a5a511c8fc3",
                        "510b8bb4-cc41-462d-8f1e-4564bef101ce",
                        "c99caf10-1d14-4795-81dc-7f8fb750865e",
                        "57d463fa-f1d5-414b-902f-d8a436ee4478"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "1d717ca6-d000-4194-867e-526efca0b67a",
            "particles": [
                {
                    "id": "f7bbacf3-2a6b-44ca-8501-f06b36e99cda",
                    "position": {
                        "vector": [
                            385,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "5d434674-6d3b-476f-849c-7f454de3709f",
                        "330e5c84-d48b-42eb-8429-250708e20131",
                        "3c568657-706e-492b-9213-653ac1be7388",
                        "c12097cd-0b07-4b3d-94a4-c14db3c8d9bb",
                        "1d717ca6-d000-4194-867e-526efca0b67a"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "d35088b9-751e-4e2f-bac2-2df0ad01c7d4",
                    "position": {
                        "vector": [
                            434,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "c2e7c285-0e46-404a-b7b1-58772f354be8",
                        "51614dca-302d-4471-9722-c4b524c232f3",
                        "1d717ca6-d000-4194-867e-526efca0b67a",
                        "c99caf10-1d14-4795-81dc-7f8fb750865e",
                        "2787ec79-aa9d-4a6f-be16-93894b08450f",
                        "2125a587-8ab3-4d72-8758-3c2ae6d1ac7f",
                        "2a15dae4-be99-4da5-8862-0fdca739a785"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "c99caf10-1d14-4795-81dc-7f8fb750865e",
            "particles": [
                {
                    "id": "67e4dd05-032f-42f7-99d0-e5bdd09401dd",
                    "position": {
                        "vector": [
                            385,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "330e5c84-d48b-42eb-8429-250708e20131",
                        "03d67ce1-314a-4ef4-a90a-0a5a511c8fc3",
                        "510b8bb4-cc41-462d-8f1e-4564bef101ce",
                        "c99caf10-1d14-4795-81dc-7f8fb750865e",
                        "57d463fa-f1d5-414b-902f-d8a436ee4478"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "d35088b9-751e-4e2f-bac2-2df0ad01c7d4",
                    "position": {
                        "vector": [
                            434,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "c2e7c285-0e46-404a-b7b1-58772f354be8",
                        "51614dca-302d-4471-9722-c4b524c232f3",
                        "1d717ca6-d000-4194-867e-526efca0b67a",
                        "c99caf10-1d14-4795-81dc-7f8fb750865e",
                        "2787ec79-aa9d-4a6f-be16-93894b08450f",
                        "2125a587-8ab3-4d72-8758-3c2ae6d1ac7f",
                        "2a15dae4-be99-4da5-8862-0fdca739a785"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "2787ec79-aa9d-4a6f-be16-93894b08450f",
            "particles": [
                {
                    "id": "d81f8cc3-73fe-4ff4-b584-2d2e93a60e5b",
                    "position": {
                        "vector": [
                            434,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "a00694ed-e6e1-43a5-b832-5b58839a3c6d",
                        "2ff2a9a6-76f3-49fc-8d8f-fd6b6617d973",
                        "60300acb-ba3b-402c-95f8-1cae44d7d5ff",
                        "c12097cd-0b07-4b3d-94a4-c14db3c8d9bb",
                        "510b8bb4-cc41-462d-8f1e-4564bef101ce",
                        "2787ec79-aa9d-4a6f-be16-93894b08450f",
                        "4c4e93c5-6901-47a5-b4e2-53c5fb6ca0d3"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "d35088b9-751e-4e2f-bac2-2df0ad01c7d4",
                    "position": {
                        "vector": [
                            434,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "c2e7c285-0e46-404a-b7b1-58772f354be8",
                        "51614dca-302d-4471-9722-c4b524c232f3",
                        "1d717ca6-d000-4194-867e-526efca0b67a",
                        "c99caf10-1d14-4795-81dc-7f8fb750865e",
                        "2787ec79-aa9d-4a6f-be16-93894b08450f",
                        "2125a587-8ab3-4d72-8758-3c2ae6d1ac7f",
                        "2a15dae4-be99-4da5-8862-0fdca739a785"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "2125a587-8ab3-4d72-8758-3c2ae6d1ac7f",
            "particles": [
                {
                    "id": "d35088b9-751e-4e2f-bac2-2df0ad01c7d4",
                    "position": {
                        "vector": [
                            434,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "c2e7c285-0e46-404a-b7b1-58772f354be8",
                        "51614dca-302d-4471-9722-c4b524c232f3",
                        "1d717ca6-d000-4194-867e-526efca0b67a",
                        "c99caf10-1d14-4795-81dc-7f8fb750865e",
                        "2787ec79-aa9d-4a6f-be16-93894b08450f",
                        "2125a587-8ab3-4d72-8758-3c2ae6d1ac7f",
                        "2a15dae4-be99-4da5-8862-0fdca739a785"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "b88d9497-2464-472b-b1af-3c439902a5a0",
                    "position": {
                        "vector": [
                            479,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "2ff2a9a6-76f3-49fc-8d8f-fd6b6617d973",
                        "154e29e3-f4d2-4c82-9d6f-e4ad780d6a35",
                        "2125a587-8ab3-4d72-8758-3c2ae6d1ac7f",
                        "8ac19885-7198-4d95-861d-ca4cd696c13e",
                        "40e370bd-ba4d-4cb2-8c20-a75359a8b2cb"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "4c4e93c5-6901-47a5-b4e2-53c5fb6ca0d3",
            "particles": [
                {
                    "id": "d81f8cc3-73fe-4ff4-b584-2d2e93a60e5b",
                    "position": {
                        "vector": [
                            434,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "a00694ed-e6e1-43a5-b832-5b58839a3c6d",
                        "2ff2a9a6-76f3-49fc-8d8f-fd6b6617d973",
                        "60300acb-ba3b-402c-95f8-1cae44d7d5ff",
                        "c12097cd-0b07-4b3d-94a4-c14db3c8d9bb",
                        "510b8bb4-cc41-462d-8f1e-4564bef101ce",
                        "2787ec79-aa9d-4a6f-be16-93894b08450f",
                        "4c4e93c5-6901-47a5-b4e2-53c5fb6ca0d3"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "083bcdb2-5e4f-4171-8897-8b4f795562e6",
                    "position": {
                        "vector": [
                            479,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "1ca08828-70e4-44d9-8e73-832cef674010",
                        "c2e7c285-0e46-404a-b7b1-58772f354be8",
                        "4c4e93c5-6901-47a5-b4e2-53c5fb6ca0d3",
                        "8ac19885-7198-4d95-861d-ca4cd696c13e",
                        "6b274694-da42-4c4b-a723-e2c1d2f72822"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "8ac19885-7198-4d95-861d-ca4cd696c13e",
            "particles": [
                {
                    "id": "b88d9497-2464-472b-b1af-3c439902a5a0",
                    "position": {
                        "vector": [
                            479,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "2ff2a9a6-76f3-49fc-8d8f-fd6b6617d973",
                        "154e29e3-f4d2-4c82-9d6f-e4ad780d6a35",
                        "2125a587-8ab3-4d72-8758-3c2ae6d1ac7f",
                        "8ac19885-7198-4d95-861d-ca4cd696c13e",
                        "40e370bd-ba4d-4cb2-8c20-a75359a8b2cb"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "083bcdb2-5e4f-4171-8897-8b4f795562e6",
                    "position": {
                        "vector": [
                            479,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "1ca08828-70e4-44d9-8e73-832cef674010",
                        "c2e7c285-0e46-404a-b7b1-58772f354be8",
                        "4c4e93c5-6901-47a5-b4e2-53c5fb6ca0d3",
                        "8ac19885-7198-4d95-861d-ca4cd696c13e",
                        "6b274694-da42-4c4b-a723-e2c1d2f72822"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "6b274694-da42-4c4b-a723-e2c1d2f72822",
            "particles": [
                {
                    "id": "083bcdb2-5e4f-4171-8897-8b4f795562e6",
                    "position": {
                        "vector": [
                            479,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "1ca08828-70e4-44d9-8e73-832cef674010",
                        "c2e7c285-0e46-404a-b7b1-58772f354be8",
                        "4c4e93c5-6901-47a5-b4e2-53c5fb6ca0d3",
                        "8ac19885-7198-4d95-861d-ca4cd696c13e",
                        "6b274694-da42-4c4b-a723-e2c1d2f72822"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "0ffb950a-bfd0-430b-9b73-dfae9ac02e14",
                    "position": {
                        "vector": [
                            523,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "154e29e3-f4d2-4c82-9d6f-e4ad780d6a35",
                        "74e30709-1ff7-41c5-b3d0-c035756fbcce",
                        "6b274694-da42-4c4b-a723-e2c1d2f72822"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "40e370bd-ba4d-4cb2-8c20-a75359a8b2cb",
            "particles": [
                {
                    "id": "b88d9497-2464-472b-b1af-3c439902a5a0",
                    "position": {
                        "vector": [
                            479,
                            288.1999969482422
                        ]
                    },
                    "springIds": [
                        "2ff2a9a6-76f3-49fc-8d8f-fd6b6617d973",
                        "154e29e3-f4d2-4c82-9d6f-e4ad780d6a35",
                        "2125a587-8ab3-4d72-8758-3c2ae6d1ac7f",
                        "8ac19885-7198-4d95-861d-ca4cd696c13e",
                        "40e370bd-ba4d-4cb2-8c20-a75359a8b2cb"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "9a4a90f4-6086-410d-aacc-b8ece0ce3230",
                    "position": {
                        "vector": [
                            523,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "74e30709-1ff7-41c5-b3d0-c035756fbcce",
                        "1ca08828-70e4-44d9-8e73-832cef674010",
                        "40e370bd-ba4d-4cb2-8c20-a75359a8b2cb"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "57d463fa-f1d5-414b-902f-d8a436ee4478",
            "particles": [
                {
                    "id": "67e4dd05-032f-42f7-99d0-e5bdd09401dd",
                    "position": {
                        "vector": [
                            385,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "330e5c84-d48b-42eb-8429-250708e20131",
                        "03d67ce1-314a-4ef4-a90a-0a5a511c8fc3",
                        "510b8bb4-cc41-462d-8f1e-4564bef101ce",
                        "c99caf10-1d14-4795-81dc-7f8fb750865e",
                        "57d463fa-f1d5-414b-902f-d8a436ee4478"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "f3dba6f3-e825-4eeb-a41e-427af8edee79",
                    "position": {
                        "vector": [
                            433,
                            383.1999969482422
                        ]
                    },
                    "springIds": [
                        "51614dca-302d-4471-9722-c4b524c232f3",
                        "1dd4d580-6b06-47cc-8033-ff257f195635",
                        "57d463fa-f1d5-414b-902f-d8a436ee4478",
                        "b9fce497-25d6-424e-b7a7-243592ac287a",
                        "a570af42-385f-4b62-8e8e-1477d8c7d95f",
                        "15c1d98a-4f85-40c0-89af-b17c042619f7",
                        "9769dab0-d739-4a3b-a93e-821cfe2c59bb"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "2a15dae4-be99-4da5-8862-0fdca739a785",
            "particles": [
                {
                    "id": "d35088b9-751e-4e2f-bac2-2df0ad01c7d4",
                    "position": {
                        "vector": [
                            434,
                            335.1999969482422
                        ]
                    },
                    "springIds": [
                        "c2e7c285-0e46-404a-b7b1-58772f354be8",
                        "51614dca-302d-4471-9722-c4b524c232f3",
                        "1d717ca6-d000-4194-867e-526efca0b67a",
                        "c99caf10-1d14-4795-81dc-7f8fb750865e",
                        "2787ec79-aa9d-4a6f-be16-93894b08450f",
                        "2125a587-8ab3-4d72-8758-3c2ae6d1ac7f",
                        "2a15dae4-be99-4da5-8862-0fdca739a785"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "91a9bb37-8aa9-434c-874f-06a8fcb7f401",
                    "position": {
                        "vector": [
                            385,
                            383.1999969482422
                        ]
                    },
                    "springIds": [
                        "03d67ce1-314a-4ef4-a90a-0a5a511c8fc3",
                        "9536a308-8b79-4484-b6ca-b1517f267a50",
                        "2a15dae4-be99-4da5-8862-0fdca739a785",
                        "b9fce497-25d6-424e-b7a7-243592ac287a",
                        "ae0482e1-6c3b-44ea-b1bf-b61926ea38c7"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "b9fce497-25d6-424e-b7a7-243592ac287a",
            "particles": [
                {
                    "id": "91a9bb37-8aa9-434c-874f-06a8fcb7f401",
                    "position": {
                        "vector": [
                            385,
                            383.1999969482422
                        ]
                    },
                    "springIds": [
                        "03d67ce1-314a-4ef4-a90a-0a5a511c8fc3",
                        "9536a308-8b79-4484-b6ca-b1517f267a50",
                        "2a15dae4-be99-4da5-8862-0fdca739a785",
                        "b9fce497-25d6-424e-b7a7-243592ac287a",
                        "ae0482e1-6c3b-44ea-b1bf-b61926ea38c7"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "f3dba6f3-e825-4eeb-a41e-427af8edee79",
                    "position": {
                        "vector": [
                            433,
                            383.1999969482422
                        ]
                    },
                    "springIds": [
                        "51614dca-302d-4471-9722-c4b524c232f3",
                        "1dd4d580-6b06-47cc-8033-ff257f195635",
                        "57d463fa-f1d5-414b-902f-d8a436ee4478",
                        "b9fce497-25d6-424e-b7a7-243592ac287a",
                        "a570af42-385f-4b62-8e8e-1477d8c7d95f",
                        "15c1d98a-4f85-40c0-89af-b17c042619f7",
                        "9769dab0-d739-4a3b-a93e-821cfe2c59bb"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "ae0482e1-6c3b-44ea-b1bf-b61926ea38c7",
            "particles": [
                {
                    "id": "91a9bb37-8aa9-434c-874f-06a8fcb7f401",
                    "position": {
                        "vector": [
                            385,
                            383.1999969482422
                        ]
                    },
                    "springIds": [
                        "03d67ce1-314a-4ef4-a90a-0a5a511c8fc3",
                        "9536a308-8b79-4484-b6ca-b1517f267a50",
                        "2a15dae4-be99-4da5-8862-0fdca739a785",
                        "b9fce497-25d6-424e-b7a7-243592ac287a",
                        "ae0482e1-6c3b-44ea-b1bf-b61926ea38c7"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "ba790431-32df-4b2f-8ebd-d41f59699621",
                    "position": {
                        "vector": [
                            432,
                            431.1999969482422
                        ]
                    },
                    "springIds": [
                        "158ee9e4-ed49-424c-852d-cc0850831d68",
                        "ae533dce-4282-4196-b163-08d87f9cbe6b",
                        "ae0482e1-6c3b-44ea-b1bf-b61926ea38c7",
                        "15c1d98a-4f85-40c0-89af-b17c042619f7",
                        "604e3049-0783-4ec2-ae6b-77e0cbacd4d7"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "a570af42-385f-4b62-8e8e-1477d8c7d95f",
            "particles": [
                {
                    "id": "f3dba6f3-e825-4eeb-a41e-427af8edee79",
                    "position": {
                        "vector": [
                            433,
                            383.1999969482422
                        ]
                    },
                    "springIds": [
                        "51614dca-302d-4471-9722-c4b524c232f3",
                        "1dd4d580-6b06-47cc-8033-ff257f195635",
                        "57d463fa-f1d5-414b-902f-d8a436ee4478",
                        "b9fce497-25d6-424e-b7a7-243592ac287a",
                        "a570af42-385f-4b62-8e8e-1477d8c7d95f",
                        "15c1d98a-4f85-40c0-89af-b17c042619f7",
                        "9769dab0-d739-4a3b-a93e-821cfe2c59bb"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "b4f9cbd0-df66-4b43-a01e-d5d188d0a252",
                    "position": {
                        "vector": [
                            384,
                            431.1999969482422
                        ]
                    },
                    "springIds": [
                        "9536a308-8b79-4484-b6ca-b1517f267a50",
                        "ae533dce-4282-4196-b163-08d87f9cbe6b",
                        "a570af42-385f-4b62-8e8e-1477d8c7d95f"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "15c1d98a-4f85-40c0-89af-b17c042619f7",
            "particles": [
                {
                    "id": "f3dba6f3-e825-4eeb-a41e-427af8edee79",
                    "position": {
                        "vector": [
                            433,
                            383.1999969482422
                        ]
                    },
                    "springIds": [
                        "51614dca-302d-4471-9722-c4b524c232f3",
                        "1dd4d580-6b06-47cc-8033-ff257f195635",
                        "57d463fa-f1d5-414b-902f-d8a436ee4478",
                        "b9fce497-25d6-424e-b7a7-243592ac287a",
                        "a570af42-385f-4b62-8e8e-1477d8c7d95f",
                        "15c1d98a-4f85-40c0-89af-b17c042619f7",
                        "9769dab0-d739-4a3b-a93e-821cfe2c59bb"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "ba790431-32df-4b2f-8ebd-d41f59699621",
                    "position": {
                        "vector": [
                            432,
                            431.1999969482422
                        ]
                    },
                    "springIds": [
                        "158ee9e4-ed49-424c-852d-cc0850831d68",
                        "ae533dce-4282-4196-b163-08d87f9cbe6b",
                        "ae0482e1-6c3b-44ea-b1bf-b61926ea38c7",
                        "15c1d98a-4f85-40c0-89af-b17c042619f7",
                        "604e3049-0783-4ec2-ae6b-77e0cbacd4d7"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "9769dab0-d739-4a3b-a93e-821cfe2c59bb",
            "particles": [
                {
                    "id": "f3dba6f3-e825-4eeb-a41e-427af8edee79",
                    "position": {
                        "vector": [
                            433,
                            383.1999969482422
                        ]
                    },
                    "springIds": [
                        "51614dca-302d-4471-9722-c4b524c232f3",
                        "1dd4d580-6b06-47cc-8033-ff257f195635",
                        "57d463fa-f1d5-414b-902f-d8a436ee4478",
                        "b9fce497-25d6-424e-b7a7-243592ac287a",
                        "a570af42-385f-4b62-8e8e-1477d8c7d95f",
                        "15c1d98a-4f85-40c0-89af-b17c042619f7",
                        "9769dab0-d739-4a3b-a93e-821cfe2c59bb"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "a55fa1df-848b-4fd4-a911-1a1b8fe62e47",
                    "position": {
                        "vector": [
                            477,
                            431.1999969482422
                        ]
                    },
                    "springIds": [
                        "def5e450-ed03-4a01-9ded-a8ac4ca0e785",
                        "158ee9e4-ed49-424c-852d-cc0850831d68",
                        "9769dab0-d739-4a3b-a93e-821cfe2c59bb",
                        "349ce38e-7bdd-48e4-bf8d-0d569c81f2ff",
                        "3c1acd19-72d1-4ffd-ac0c-471e362b65b5"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "604e3049-0783-4ec2-ae6b-77e0cbacd4d7",
            "particles": [
                {
                    "id": "e31a30b5-8096-4ada-afc7-cc366d2ffcd3",
                    "position": {
                        "vector": [
                            478,
                            383.1999969482422
                        ]
                    },
                    "springIds": [
                        "1dd4d580-6b06-47cc-8033-ff257f195635",
                        "f43f100a-03ec-45ec-ba9f-644da1a2ea61",
                        "604e3049-0783-4ec2-ae6b-77e0cbacd4d7",
                        "349ce38e-7bdd-48e4-bf8d-0d569c81f2ff",
                        "869e1278-ca97-466d-984f-0bc00afdda00"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "ba790431-32df-4b2f-8ebd-d41f59699621",
                    "position": {
                        "vector": [
                            432,
                            431.1999969482422
                        ]
                    },
                    "springIds": [
                        "158ee9e4-ed49-424c-852d-cc0850831d68",
                        "ae533dce-4282-4196-b163-08d87f9cbe6b",
                        "ae0482e1-6c3b-44ea-b1bf-b61926ea38c7",
                        "15c1d98a-4f85-40c0-89af-b17c042619f7",
                        "604e3049-0783-4ec2-ae6b-77e0cbacd4d7"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "349ce38e-7bdd-48e4-bf8d-0d569c81f2ff",
            "particles": [
                {
                    "id": "e31a30b5-8096-4ada-afc7-cc366d2ffcd3",
                    "position": {
                        "vector": [
                            478,
                            383.1999969482422
                        ]
                    },
                    "springIds": [
                        "1dd4d580-6b06-47cc-8033-ff257f195635",
                        "f43f100a-03ec-45ec-ba9f-644da1a2ea61",
                        "604e3049-0783-4ec2-ae6b-77e0cbacd4d7",
                        "349ce38e-7bdd-48e4-bf8d-0d569c81f2ff",
                        "869e1278-ca97-466d-984f-0bc00afdda00"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "a55fa1df-848b-4fd4-a911-1a1b8fe62e47",
                    "position": {
                        "vector": [
                            477,
                            431.1999969482422
                        ]
                    },
                    "springIds": [
                        "def5e450-ed03-4a01-9ded-a8ac4ca0e785",
                        "158ee9e4-ed49-424c-852d-cc0850831d68",
                        "9769dab0-d739-4a3b-a93e-821cfe2c59bb",
                        "349ce38e-7bdd-48e4-bf8d-0d569c81f2ff",
                        "3c1acd19-72d1-4ffd-ac0c-471e362b65b5"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "3c1acd19-72d1-4ffd-ac0c-471e362b65b5",
            "particles": [
                {
                    "id": "a55fa1df-848b-4fd4-a911-1a1b8fe62e47",
                    "position": {
                        "vector": [
                            477,
                            431.1999969482422
                        ]
                    },
                    "springIds": [
                        "def5e450-ed03-4a01-9ded-a8ac4ca0e785",
                        "158ee9e4-ed49-424c-852d-cc0850831d68",
                        "9769dab0-d739-4a3b-a93e-821cfe2c59bb",
                        "349ce38e-7bdd-48e4-bf8d-0d569c81f2ff",
                        "3c1acd19-72d1-4ffd-ac0c-471e362b65b5"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "1be64513-eb87-4b24-8b56-173512442c62",
                    "position": {
                        "vector": [
                            522,
                            383
                        ]
                    },
                    "springIds": [
                        "f43f100a-03ec-45ec-ba9f-644da1a2ea61",
                        "83aa18a3-5199-4115-84ac-d4deca5ef679",
                        "3c1acd19-72d1-4ffd-ac0c-471e362b65b5"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "869e1278-ca97-466d-984f-0bc00afdda00",
            "particles": [
                {
                    "id": "e31a30b5-8096-4ada-afc7-cc366d2ffcd3",
                    "position": {
                        "vector": [
                            478,
                            383.1999969482422
                        ]
                    },
                    "springIds": [
                        "1dd4d580-6b06-47cc-8033-ff257f195635",
                        "f43f100a-03ec-45ec-ba9f-644da1a2ea61",
                        "604e3049-0783-4ec2-ae6b-77e0cbacd4d7",
                        "349ce38e-7bdd-48e4-bf8d-0d569c81f2ff",
                        "869e1278-ca97-466d-984f-0bc00afdda00"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "ff4f16cb-f1d4-4601-9147-653c6478c613",
                    "position": {
                        "vector": [
                            521,
                            431
                        ]
                    },
                    "springIds": [
                        "83aa18a3-5199-4115-84ac-d4deca5ef679",
                        "def5e450-ed03-4a01-9ded-a8ac4ca0e785",
                        "869e1278-ca97-466d-984f-0bc00afdda00"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "38b90400-5a12-42f8-9e53-bcc688efab03",
            "particles": [
                {
                    "id": "af542d0d-f770-4f74-9792-c89954c6c430",
                    "position": {
                        "vector": [
                            479,
                            189.20000076293945
                        ]
                    },
                    "springIds": [
                        "9f551bd9-0208-4333-885d-315da74ec6a7",
                        "649941b5-31fe-4be0-b2fe-305e96febe0d",
                        "524a7365-d694-455e-8a88-79387c984446",
                        "3c675006-d75f-49f9-be69-7ab18a92a69f",
                        "38b90400-5a12-42f8-9e53-bcc688efab03"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "2ef930b2-2b60-4f10-8487-0bad5ce5b0f3",
                    "position": {
                        "vector": [
                            479,
                            239.20000076293945
                        ]
                    },
                    "springIds": [
                        "4462150d-1644-4c93-848a-3dfe1dd339bf",
                        "763f4a3d-9e25-4312-ab8d-1ab3bac3806a",
                        "53e0283b-d462-4a47-aef2-ebbb212d54e2",
                        "b62f246a-a22d-4534-bd65-b72ecb13393f",
                        "38b90400-5a12-42f8-9e53-bcc688efab03"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "6d8bf37c-b124-492f-83b9-c33ce1c11e75",
            "particles": [
                {
                    "id": "cff2059a-787a-43d7-abab-6e6d30311503",
                    "position": {
                        "vector": [
                            435,
                            189.20000076293945
                        ]
                    },
                    "springIds": [
                        "3a70b521-6d6d-4ace-add2-4c2edc1f65d7",
                        "9f551bd9-0208-4333-885d-315da74ec6a7",
                        "c04f39de-2bd7-4f62-a023-7a7cb3ab1e4b",
                        "53e0283b-d462-4a47-aef2-ebbb212d54e2",
                        "6d8bf37c-b124-492f-83b9-c33ce1c11e75"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                },
                {
                    "id": "fd4f5ada-f0d4-4b8a-a4eb-2dbe4d5bc99e",
                    "position": {
                        "vector": [
                            435,
                            239.1999969482422
                        ]
                    },
                    "springIds": [
                        "763f4a3d-9e25-4312-ab8d-1ab3bac3806a",
                        "a00694ed-e6e1-43a5-b832-5b58839a3c6d",
                        "89bbd659-54aa-448f-b7d4-6512505800b8",
                        "524a7365-d694-455e-8a88-79387c984446",
                        "7f6b17c8-2f93-4e61-af68-50135997e613",
                        "3c568657-706e-492b-9213-653ac1be7388",
                        "6d8bf37c-b124-492f-83b9-c33ce1c11e75"
                    ],
                    "bodyIds": [
                        "65227c0e-0d51-4b0b-b962-d3152fcce104"
                    ]
                }
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        }
    ],
    "particles": [
        {
            "id": "4daaa1fb-9eba-42f1-a57e-0a7858656b2f",
            "position": {
                "vector": [
                    385,
                    189.20000076293945
                ]
            },
            "springIds": [
                "3a70b521-6d6d-4ace-add2-4c2edc1f65d7",
                "b5fb5b27-6d67-4659-8642-df432d82b851",
                "89bbd659-54aa-448f-b7d4-6512505800b8"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "030a00b2-aeea-47b5-9ec4-13e9f05cec0c",
            "position": {
                "vector": [
                    385,
                    239.1999969482422
                ]
            },
            "springIds": [
                "b5fb5b27-6d67-4659-8642-df432d82b851",
                "5d434674-6d3b-476f-849c-7f454de3709f",
                "c04f39de-2bd7-4f62-a023-7a7cb3ab1e4b",
                "7f6b17c8-2f93-4e61-af68-50135997e613",
                "60300acb-ba3b-402c-95f8-1cae44d7d5ff"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "f7bbacf3-2a6b-44ca-8501-f06b36e99cda",
            "position": {
                "vector": [
                    385,
                    288.1999969482422
                ]
            },
            "springIds": [
                "5d434674-6d3b-476f-849c-7f454de3709f",
                "330e5c84-d48b-42eb-8429-250708e20131",
                "3c568657-706e-492b-9213-653ac1be7388",
                "c12097cd-0b07-4b3d-94a4-c14db3c8d9bb",
                "1d717ca6-d000-4194-867e-526efca0b67a"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "67e4dd05-032f-42f7-99d0-e5bdd09401dd",
            "position": {
                "vector": [
                    385,
                    335.1999969482422
                ]
            },
            "springIds": [
                "330e5c84-d48b-42eb-8429-250708e20131",
                "03d67ce1-314a-4ef4-a90a-0a5a511c8fc3",
                "510b8bb4-cc41-462d-8f1e-4564bef101ce",
                "c99caf10-1d14-4795-81dc-7f8fb750865e",
                "57d463fa-f1d5-414b-902f-d8a436ee4478"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "91a9bb37-8aa9-434c-874f-06a8fcb7f401",
            "position": {
                "vector": [
                    385,
                    383.1999969482422
                ]
            },
            "springIds": [
                "03d67ce1-314a-4ef4-a90a-0a5a511c8fc3",
                "9536a308-8b79-4484-b6ca-b1517f267a50",
                "2a15dae4-be99-4da5-8862-0fdca739a785",
                "b9fce497-25d6-424e-b7a7-243592ac287a",
                "ae0482e1-6c3b-44ea-b1bf-b61926ea38c7"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "b4f9cbd0-df66-4b43-a01e-d5d188d0a252",
            "position": {
                "vector": [
                    384,
                    431.1999969482422
                ]
            },
            "springIds": [
                "9536a308-8b79-4484-b6ca-b1517f267a50",
                "ae533dce-4282-4196-b163-08d87f9cbe6b",
                "a570af42-385f-4b62-8e8e-1477d8c7d95f"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "cff2059a-787a-43d7-abab-6e6d30311503",
            "position": {
                "vector": [
                    435,
                    189.20000076293945
                ]
            },
            "springIds": [
                "3a70b521-6d6d-4ace-add2-4c2edc1f65d7",
                "9f551bd9-0208-4333-885d-315da74ec6a7",
                "c04f39de-2bd7-4f62-a023-7a7cb3ab1e4b",
                "53e0283b-d462-4a47-aef2-ebbb212d54e2",
                "6d8bf37c-b124-492f-83b9-c33ce1c11e75"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "af542d0d-f770-4f74-9792-c89954c6c430",
            "position": {
                "vector": [
                    479,
                    189.20000076293945
                ]
            },
            "springIds": [
                "9f551bd9-0208-4333-885d-315da74ec6a7",
                "649941b5-31fe-4be0-b2fe-305e96febe0d",
                "524a7365-d694-455e-8a88-79387c984446",
                "3c675006-d75f-49f9-be69-7ab18a92a69f",
                "38b90400-5a12-42f8-9e53-bcc688efab03"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "b619e65e-22ad-4e31-9ef2-560eb86d2557",
            "position": {
                "vector": [
                    526,
                    189.20000076293945
                ]
            },
            "springIds": [
                "649941b5-31fe-4be0-b2fe-305e96febe0d",
                "a704c217-b314-4145-bebf-ecd92f47fd6f",
                "b62f246a-a22d-4534-bd65-b72ecb13393f"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "c43d9ef5-4b53-4f37-a582-735a47d2e48f",
            "position": {
                "vector": [
                    525,
                    239.20000076293945
                ]
            },
            "springIds": [
                "a704c217-b314-4145-bebf-ecd92f47fd6f",
                "4462150d-1644-4c93-848a-3dfe1dd339bf",
                "3c675006-d75f-49f9-be69-7ab18a92a69f"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "2ef930b2-2b60-4f10-8487-0bad5ce5b0f3",
            "position": {
                "vector": [
                    479,
                    239.20000076293945
                ]
            },
            "springIds": [
                "4462150d-1644-4c93-848a-3dfe1dd339bf",
                "763f4a3d-9e25-4312-ab8d-1ab3bac3806a",
                "53e0283b-d462-4a47-aef2-ebbb212d54e2",
                "b62f246a-a22d-4534-bd65-b72ecb13393f",
                "38b90400-5a12-42f8-9e53-bcc688efab03"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "fd4f5ada-f0d4-4b8a-a4eb-2dbe4d5bc99e",
            "position": {
                "vector": [
                    435,
                    239.1999969482422
                ]
            },
            "springIds": [
                "763f4a3d-9e25-4312-ab8d-1ab3bac3806a",
                "a00694ed-e6e1-43a5-b832-5b58839a3c6d",
                "89bbd659-54aa-448f-b7d4-6512505800b8",
                "524a7365-d694-455e-8a88-79387c984446",
                "7f6b17c8-2f93-4e61-af68-50135997e613",
                "3c568657-706e-492b-9213-653ac1be7388",
                "6d8bf37c-b124-492f-83b9-c33ce1c11e75"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "d81f8cc3-73fe-4ff4-b584-2d2e93a60e5b",
            "position": {
                "vector": [
                    434,
                    288.1999969482422
                ]
            },
            "springIds": [
                "a00694ed-e6e1-43a5-b832-5b58839a3c6d",
                "2ff2a9a6-76f3-49fc-8d8f-fd6b6617d973",
                "60300acb-ba3b-402c-95f8-1cae44d7d5ff",
                "c12097cd-0b07-4b3d-94a4-c14db3c8d9bb",
                "510b8bb4-cc41-462d-8f1e-4564bef101ce",
                "2787ec79-aa9d-4a6f-be16-93894b08450f",
                "4c4e93c5-6901-47a5-b4e2-53c5fb6ca0d3"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "b88d9497-2464-472b-b1af-3c439902a5a0",
            "position": {
                "vector": [
                    479,
                    288.1999969482422
                ]
            },
            "springIds": [
                "2ff2a9a6-76f3-49fc-8d8f-fd6b6617d973",
                "154e29e3-f4d2-4c82-9d6f-e4ad780d6a35",
                "2125a587-8ab3-4d72-8758-3c2ae6d1ac7f",
                "8ac19885-7198-4d95-861d-ca4cd696c13e",
                "40e370bd-ba4d-4cb2-8c20-a75359a8b2cb"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "0ffb950a-bfd0-430b-9b73-dfae9ac02e14",
            "position": {
                "vector": [
                    523,
                    288.1999969482422
                ]
            },
            "springIds": [
                "154e29e3-f4d2-4c82-9d6f-e4ad780d6a35",
                "74e30709-1ff7-41c5-b3d0-c035756fbcce",
                "6b274694-da42-4c4b-a723-e2c1d2f72822"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "9a4a90f4-6086-410d-aacc-b8ece0ce3230",
            "position": {
                "vector": [
                    523,
                    335.1999969482422
                ]
            },
            "springIds": [
                "74e30709-1ff7-41c5-b3d0-c035756fbcce",
                "1ca08828-70e4-44d9-8e73-832cef674010",
                "40e370bd-ba4d-4cb2-8c20-a75359a8b2cb"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "083bcdb2-5e4f-4171-8897-8b4f795562e6",
            "position": {
                "vector": [
                    479,
                    335.1999969482422
                ]
            },
            "springIds": [
                "1ca08828-70e4-44d9-8e73-832cef674010",
                "c2e7c285-0e46-404a-b7b1-58772f354be8",
                "4c4e93c5-6901-47a5-b4e2-53c5fb6ca0d3",
                "8ac19885-7198-4d95-861d-ca4cd696c13e",
                "6b274694-da42-4c4b-a723-e2c1d2f72822"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "d35088b9-751e-4e2f-bac2-2df0ad01c7d4",
            "position": {
                "vector": [
                    434,
                    335.1999969482422
                ]
            },
            "springIds": [
                "c2e7c285-0e46-404a-b7b1-58772f354be8",
                "51614dca-302d-4471-9722-c4b524c232f3",
                "1d717ca6-d000-4194-867e-526efca0b67a",
                "c99caf10-1d14-4795-81dc-7f8fb750865e",
                "2787ec79-aa9d-4a6f-be16-93894b08450f",
                "2125a587-8ab3-4d72-8758-3c2ae6d1ac7f",
                "2a15dae4-be99-4da5-8862-0fdca739a785"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "1be64513-eb87-4b24-8b56-173512442c62",
            "position": {
                "vector": [
                    522,
                    383
                ]
            },
            "springIds": [
                "f43f100a-03ec-45ec-ba9f-644da1a2ea61",
                "83aa18a3-5199-4115-84ac-d4deca5ef679",
                "3c1acd19-72d1-4ffd-ac0c-471e362b65b5"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "ff4f16cb-f1d4-4601-9147-653c6478c613",
            "position": {
                "vector": [
                    521,
                    431
                ]
            },
            "springIds": [
                "83aa18a3-5199-4115-84ac-d4deca5ef679",
                "def5e450-ed03-4a01-9ded-a8ac4ca0e785",
                "869e1278-ca97-466d-984f-0bc00afdda00"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "e31a30b5-8096-4ada-afc7-cc366d2ffcd3",
            "position": {
                "vector": [
                    478,
                    383.1999969482422
                ]
            },
            "springIds": [
                "1dd4d580-6b06-47cc-8033-ff257f195635",
                "f43f100a-03ec-45ec-ba9f-644da1a2ea61",
                "604e3049-0783-4ec2-ae6b-77e0cbacd4d7",
                "349ce38e-7bdd-48e4-bf8d-0d569c81f2ff",
                "869e1278-ca97-466d-984f-0bc00afdda00"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "f3dba6f3-e825-4eeb-a41e-427af8edee79",
            "position": {
                "vector": [
                    433,
                    383.1999969482422
                ]
            },
            "springIds": [
                "51614dca-302d-4471-9722-c4b524c232f3",
                "1dd4d580-6b06-47cc-8033-ff257f195635",
                "57d463fa-f1d5-414b-902f-d8a436ee4478",
                "b9fce497-25d6-424e-b7a7-243592ac287a",
                "a570af42-385f-4b62-8e8e-1477d8c7d95f",
                "15c1d98a-4f85-40c0-89af-b17c042619f7",
                "9769dab0-d739-4a3b-a93e-821cfe2c59bb"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "ba790431-32df-4b2f-8ebd-d41f59699621",
            "position": {
                "vector": [
                    432,
                    431.1999969482422
                ]
            },
            "springIds": [
                "158ee9e4-ed49-424c-852d-cc0850831d68",
                "ae533dce-4282-4196-b163-08d87f9cbe6b",
                "ae0482e1-6c3b-44ea-b1bf-b61926ea38c7",
                "15c1d98a-4f85-40c0-89af-b17c042619f7",
                "604e3049-0783-4ec2-ae6b-77e0cbacd4d7"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        },
        {
            "id": "a55fa1df-848b-4fd4-a911-1a1b8fe62e47",
            "position": {
                "vector": [
                    477,
                    431.1999969482422
                ]
            },
            "springIds": [
                "def5e450-ed03-4a01-9ded-a8ac4ca0e785",
                "158ee9e4-ed49-424c-852d-cc0850831d68",
                "9769dab0-d739-4a3b-a93e-821cfe2c59bb",
                "349ce38e-7bdd-48e4-bf8d-0d569c81f2ff",
                "3c1acd19-72d1-4ffd-ac0c-471e362b65b5"
            ],
            "bodyIds": [
                "65227c0e-0d51-4b0b-b962-d3152fcce104"
            ]
        }
    ]
}
 */

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map