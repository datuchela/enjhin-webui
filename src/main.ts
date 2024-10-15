import { Mode } from "./types";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import { handleDeleteBodyClick, handleExportClick, handleModeClick, handleMouseDown, handleMouseMove, handleMouseUp, handleNewBodyClick } from "./handlers";
import { redrawAll } from "./utils";
import { Editor } from "./state";

var state: Editor;

(() => {
  const canvas = document.getElementById("enjhin-editor") as HTMLCanvasElement | null;
  const bodyList = document.getElementById("list-view") as HTMLMenuElement | null;

  // Buttons
  const selectModeBtn = document.getElementById("mode-select") as HTMLButtonElement | null;
  const insertModeBtn = document.getElementById("mode-insert") as HTMLButtonElement | null;
  const moveModeBtn = document.getElementById("mode-move") as HTMLButtonElement | null;
  const connectModeBtn = document.getElementById("mode-connect") as HTMLButtonElement | null;
  const deleteModeBtn = document.getElementById("mode-delete") as HTMLButtonElement | null;

  const exportBtn = document.getElementById("export") as HTMLButtonElement | null;
  const newBodyBtn = document.getElementById("new-body") as HTMLButtonElement | null;
  const deleteBodyBtn = document.getElementById("delete-body") as HTMLButtonElement | null;

  if (!canvas) throw new Error("Couldn't get canvas");
  if (!bodyList) throw new Error("Couldn't get bodyList");
  if (!selectModeBtn) throw new Error("Couldn't get selectModeBtn");
  if (!insertModeBtn) throw new Error("Couldn't get insertModeBtn");
  if (!moveModeBtn) throw new Error("Couldn't get moveModeBtn");
  if (!connectModeBtn) throw new Error("Couldn't get connectModeBtn");
  if (!deleteModeBtn) throw new Error("Couldn't get deleteModeBtn");
  if (!exportBtn) throw new Error("Couldn't get exportBtn");
  if (!newBodyBtn) throw new Error("Couldn't get newBodyBtn");
  if (!deleteBodyBtn) throw new Error("Couldn't get deleteBodyBtn");

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  state = new Editor(canvas, {
    elements: {
      exportButton: exportBtn,
      newBodyButton: newBodyBtn,
      bodyList: bodyList,
      modeButtons: [
        { mode: Mode.SELECT, element: selectModeBtn },
        { mode: Mode.INSERT, element: insertModeBtn },
        { mode: Mode.MOVE, element: moveModeBtn },
        { mode: Mode.CONNECT, element: connectModeBtn },
        { mode: Mode.DELETE, element: deleteModeBtn },
      ],
    }
  }
  );

  exportBtn.addEventListener("click", (e) => handleExportClick(e, state));
  newBodyBtn.addEventListener("click", () => handleNewBodyClick(state));
  deleteBodyBtn.addEventListener("click", () => handleDeleteBodyClick(state));

  state.canvasElement.addEventListener("mousedown", (e) => handleMouseDown(e, state));
  state.canvasElement.addEventListener("mousemove", (e) => handleMouseMove(e, state));
  state.canvasElement.addEventListener("mouseup", (e) => handleMouseUp(e, state));
  state.elements.modeButtons.forEach((btn) => {
    btn.element.addEventListener("click", () => handleModeClick(btn.mode, state));
  });

  redrawAll(state);

  function frame(_timeStamp: number) {
    state.canvas.redraw(state);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

})();
