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
