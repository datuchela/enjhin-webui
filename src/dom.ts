import { Editor } from "./state";
import type { EventWithValue } from "./types";

export function refreshListView(state: Editor) {
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
      state.setCurrentBodyId((e as EventWithValue).target.value);
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

export function refreshButtons(state: Editor) {
  state.elements.modeButtons.forEach((btn) => {
    btn.element.disabled = false;
    if (btn.mode !== state.mode) return;
    btn.element.disabled = true;
  });
}

