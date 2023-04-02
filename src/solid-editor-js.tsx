import { createEffect, createSignal, splitProps, onCleanup, Accessor } from 'solid-js';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';

export type BaseEditorOptions = Omit<
  EditorConfig,
  'data' | 'holder' | 'holderId' | 'initialBlock' | 'onChange'
>;

interface CreateEditorOptions<T extends HTMLElement> extends BaseEditorOptions {
  element: T;
  initialValue?: EditorConfig['data'];
}

export type InitialValue = EditorConfig['data'];

export const createEditorJS = <T extends HTMLElement>(props: () => CreateEditorOptions<T>) => {
  const [signal, setSignal] = createSignal<EditorJS>();

  createEffect(() => {
    const [internal, otherProps] = splitProps(props(), ['element', 'initialValue']);

    const [editorJSProps] = splitProps(otherProps, [
      'autofocus',
      'defaultBlock',
      'placeholder',
      'sanitizer',
      'hideToolbar',
      'onReady',
      'tools',
      'minHeight',
      'logLevel',
      'readOnly',
      'i18n',
      'inlineToolbar',
      'tunes',
    ]);

    const instance = new EditorJS({
      ...editorJSProps,
      holder: internal.element,
      data: internal.initialValue,
    });

    onCleanup(() => {
      instance.destroy();
    });

    setSignal(instance);
  });

  return signal as Accessor<EditorJS>;
};
