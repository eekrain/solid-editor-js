<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-editor-js&background=tiles&project=%20" alt="solid-editor-js">
</p>

# solid-editor-js

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

An editor.js component wrapper for Solid.

## Quick start

Install it:

```bash
npm i solid-editor-js @editorjs/editorjs
# or
yarn add solid-editor-js @editorjs/editorjs
# or
pnpm add solid-editor-js @editorjs/editorjs
```

Example:

```tsx
import { Component, createSignal } from 'solid-js';
import { SolidEditorJS, InitialValue } from 'solid-editor-js';
import type EditorJS from '@editorjs/editorjs';
import Paragraph from '@editorjs/paragraph';

const savedBefore: InitialValue = {
  time: 1680316641030,
  blocks: [
    {
      id: '9WD_MSvvVE',
      type: 'paragraph',
      data: {
        text: 'Hi !',
      },
    },
  ],
  version: '2.26.5',
};

export const App: Component = () => {
  let el!: HTMLDivElement;

  const [initVal, setInitVal] = createSignal<InitialValue>();

  // initialValue can be static or async
  setTimeout(() => {
    setInitVal(savedBefore);
  }, 3000);

  const editor = createEditorJS(() => ({
    element: el,
    initialValue: initVal(),
    tools: {
      paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        config: {
          placeholder: 'Type the paragraph',
        },
      },
    },
  }));

  const saveOutput = () => {
    editor()
      .save()
      .then(output => console.log('🚀 ~ file: App.tsx:47 ~ editor ~ output:', output))
      .catch(reason => console.log('🚀 ~ file: App.tsx:56 ~ saveOutput ~ reason:', reason));
  };

  return (
    <div>
      <button onClick={saveOutput}>Log!</button>
      <div ref={el} />
    </div>
  );
};
```
