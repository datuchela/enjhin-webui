import { refreshButtons } from "./dom";
import type { Editor } from "./state";

export function redrawAll(state: Editor) {
  refreshButtons(state);
}

