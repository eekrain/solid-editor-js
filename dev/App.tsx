import { Component, createSignal } from 'solid-js';
import { createEditorJS, InitialValue } from '../src/solid-editor-js';

const savedBefore: InitialValue = {
  time: 1680316641030,
  blocks: [
    {
      id: '9WD_MSvvVE',
      type: 'paragraph',
      data: {
        text: 'Hai 1',
      },
    },
    {
      id: 'aeIr56ig6a',
      type: 'paragraph',
      data: {
        text: 'Hai 2',
      },
    },
    {
      id: '6HcXp2Dg4I',
      type: 'header',
      data: {
        text: 'Heading',
        level: 3,
      },
    },
  ],
  version: '2.26.5',
};

const App: Component = () => {
  let el!: HTMLDivElement;

  const [initVal, setInitVal] = createSignal<InitialValue>();

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

export default App;
