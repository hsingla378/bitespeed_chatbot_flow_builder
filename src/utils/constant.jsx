export const initialNodes = [
  {
    id: "1",
    data: { label: "text message 1" },
    position: { x: 100, y: 250 },
    type: "textUpdater",
  },
  {
    id: "2",
    data: { label: "text message 2" },
    position: { x: 400, y: 200 },
    type: "textUpdater",
  },
];

export const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export const defaultViewport = { x: 0, y: 0, zoom: 1.2 };
