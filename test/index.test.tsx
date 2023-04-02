import { createSignal } from 'solid-js';
import { isServer } from 'solid-js/web';
import { describe, expect, it, test } from 'vitest';
import { render } from '@solidjs/testing-library';
import { createEditorJS, InitialValue } from '../src';

describe('environment', () => {
  it('runs on server', () => {
    expect(typeof window).toBe('object');
    expect(isServer).toBe(false);
  });
});

describe('solid-editor-js', () => {
  test('Returns the editor.js instance via signals', async () => {
    let el!: HTMLDivElement;
    render(() => <div ref={el}></div>);

    const editor = createEditorJS(() => ({ element: el }));

    await new Promise(resolve => setTimeout(resolve, 1000));

    expect(typeof editor).toBe('function');
    expect(typeof editor().destroy).toBe('function');
    expect(typeof editor().save).toBe('function');
    expect(typeof editor().clear).toBe('function');
    expect(typeof editor().off).toBe('function');
    expect(typeof editor().on).toBe('function');
    expect(typeof editor().render).toBe('function');
  });

  test('Re-create editor on initialValue change', async () => {
    let el!: HTMLDivElement;
    const { getByText, queryByText } = render(() => <div ref={el}></div>);

    const [initVal, setInitVal] = createSignal<InitialValue>();
    const editor = createEditorJS(() => ({ element: el, initialValue: initVal() }));

    await new Promise(resolve => setTimeout(resolve, 500));

    expect(queryByText('Hai 1')).toBeNull();

    await new Promise(resolve => setTimeout(resolve, 1000));
    setInitVal(savedBefore);
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(getByText('Hai 1')).toBeDefined();
  });

  test('Value from initialValue when saved without changed should be the same', async () => {
    let el!: HTMLDivElement;
    render(() => <div ref={el}></div>);

    const editor = createEditorJS(() => ({ element: el, initialValue: savedBefore }));

    await new Promise(resolve => setTimeout(resolve, 1000));

    const res = await editor().save();
    expect(res.blocks).toStrictEqual(savedBefore!.blocks);
  });
});

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
  ],
  version: '2.26.5',
};
