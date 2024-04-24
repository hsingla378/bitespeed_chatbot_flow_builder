# Chatbot Flow Builder

This is a simple chatbot flow builder built using React and [React Flow](https://reactflow.dev/). It allows users to create chatbot flows by connecting multiple message nodes together to decide the order of execution.

![Bitespeed Chatbot flow builder](https://bitespeed.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F75974f28-7e11-4222-b99f-83ae626dc6b8%2FText_node.jpeg?table=block&id=118525ef-afef-4cf8-b073-d813ce8493b2&spaceId=bd075709-aeb9-477a-aa0d-347a38181da2&width=2000&userId=&cache=v2)

## Demo

You can try out the demo of the project [here](https://bitespeed-chat-flow-builder.vercel.app/).

## Features

1. **Text Node**
   - Supports adding multiple text nodes to the flow.
   - Nodes are added to the flow by dragging and dropping from the nodes panel.
   
2. **Nodes Panel**
   - Houses all kinds of nodes supported by the flow builder.
   - Easily extensible for adding more types of nodes in the future.
   
3. **Edge**
   - Connects two nodes together.
   
4. **Source Handle**
   - Source of a connecting edge.
   - Can only have one edge originating from a source handle.
   
5. **Target Handle**
   - Target of a connecting edge.
   - Can have more than one edge connecting to a target handle.
   
6. **Settings Panel**
   - Replaces the nodes panel when a node is selected.
   - Allows editing the text of the selected text node.

    ![Settings Panel](https://bitespeed.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F38e424e4-01cd-462b-a4af-29de9d2c404c%2FSettings_panel.jpeg?table=block&id=7ae6c90f-b3d5-47e9-9d12-0d0b7275bf5f&spaceId=bd075709-aeb9-477a-aa0d-347a38181da2&width=2000&userId=&cache=v2)
   
7. **Save Button**
   - Button to save the flow.
   - Shows an error if there are more than one nodes and more than one node has empty target handles.
  
     ![QKart](https://bitespeed.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fb33c6166-aa3e-4c1a-b1b8-1dbd010e1e2e%2FScreenshot_2022-10-24_at_10.41.29_PM.png?table=block&id=fcd6da61-a9da-42e5-a341-77871648de6e&spaceId=bd075709-aeb9-477a-aa0d-347a38181da2&width=2000&userId=&cache=v2)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hsingla378/bitespeed_chatbot_flow_builder.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 to view it in the browser.

## Deployment

The project can be deployed to any free hosting service like Heroku, Vercel, etc. Follow their respective deployment instructions to host the application.

## Contributing

Contributions are welcome! Please feel free to open issues or pull requests for any improvements or additional features.
