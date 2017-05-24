import reducer, {
  PAGE_INIT,
  PAGE_UPDATE_META,
  PAGE_INSERT_BLOCK,
  PAGE_UPDATE_BLOCK,
  PAGE_APPEND_BLOCK,
  PAGE_REMOVE_BLOCK,
  PAGE_MOVE_UP_BLOCK,
  PAGE_MOVE_DOWN_BLOCK,
  init,
  updateMeta,
  updateBlock,
  insertBlockBefore,
  appendBlock,
  removeBlock,
  moveUpBlock,
  moveDownBlock,
} from './page.js';

// Test data
const ID = '12345';
const OBJECT = { foo: 'bar' };
const INPUT_PAGE = {
  foo: 'bar',
  children: [
    {
      props: {
        baz: 'qux',
      },
    },
  ],
};
const STATE = {
  bar: 'foo',
  children: [
    {
      id: '6789',
      props: {
        qux: 'baz',
      },
    },
  ],
};
const STATE_WITH_THREE_BLOCKS = {
  foo: 'bar',
  children: [
    {
      id: '6789',
      props: {
        title: 'foo',
      },
    },
    {
      id: '4321',
      props: {
        title: 'bar',
      },
    },
    {
      id: '1337',
      props: {
        title: 'baz',
      },
    },
  ],
};

describe('page actions', () => {
  test('should create an action to init the page', () => {
    expect(init(OBJECT)).toEqual({
      type: PAGE_INIT,
      page: OBJECT,
    });
  });

  test('should create an action to update the page metadata', () => {
    expect(updateMeta(OBJECT)).toEqual({
      type: PAGE_UPDATE_META,
      props: OBJECT,
    });
  });

  test('should create an action to update a block', () => {
    expect(updateBlock(ID, OBJECT)).toEqual({
      type: PAGE_UPDATE_BLOCK,
      id: ID,
      props: OBJECT,
    });
  });

  test('should create an action to insert a block', () => {
    expect(insertBlockBefore(ID, OBJECT)).toEqual({
      type: PAGE_INSERT_BLOCK,
      id: ID,
      block: OBJECT,
    });
  });

  test('should create an action to append a block', () => {
    expect(appendBlock(OBJECT)).toEqual({
      type: PAGE_APPEND_BLOCK,
      block: OBJECT,
    });
  });

  test('should create an action to remove a block', () => {
    expect(removeBlock(ID)).toEqual({
      type: PAGE_REMOVE_BLOCK,
      id: ID,
    });
  });

  test('should create an action to move a block up', () => {
    expect(moveUpBlock(ID)).toEqual({
      type: PAGE_MOVE_UP_BLOCK,
      id: ID,
    });
  });

  test('should create an action to move a block down', () => {
    expect(moveDownBlock(ID)).toEqual({
      type: PAGE_MOVE_DOWN_BLOCK,
      id: ID,
    });
  });
});

describe('page reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  test('should handle PAGE_INIT', () => {
    expect(
      reducer(
        {},
        {
          type: PAGE_INIT,
          page: INPUT_PAGE,
        }
      )
    ).toEqual(
      expect.objectContaining({
        foo: 'bar',
        children: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            props: {
              baz: 'qux',
            },
          }),
        ]),
      })
    );
  });

  test('should handle PAGE_INIT with malformed object', () => {
    expect(
      reducer(
        {},
        {
          type: PAGE_INIT,
          page: OBJECT,
        }
      )
    ).toEqual(
      expect.objectContaining({
        foo: 'bar',
        children: [],
      })
    );
  });

  test('should handle PAGE_UPDATE_META', () => {
    expect(
      reducer(STATE, {
        type: PAGE_UPDATE_META,
        props: { title: 'foobar' },
      })
    ).toEqual({
      bar: 'foo',
      title: 'foobar',
      children: [
        {
          id: '6789',
          props: {
            qux: 'baz',
          },
        },
      ],
    });
  });

  test('should handle PAGE_UPDATE_BLOCK', () => {
    expect(
      reducer(STATE, {
        type: PAGE_UPDATE_BLOCK,
        id: '6789',
        props: {
          qux: 'new baz',
          newProp: 'foobar',
        },
      })
    ).toEqual({
      bar: 'foo',
      children: [
        {
          id: '6789',
          props: {
            qux: 'new baz',
            newProp: 'foobar',
          },
        },
      ],
    });
  });

  test('should handle PAGE_INSERT_BLOCK', () => {
    expect(
      reducer(STATE, {
        type: PAGE_INSERT_BLOCK,
        id: '6789',
        block: {
          props: {
            qux: 'foo',
          },
        },
      })
    ).toEqual({
      bar: 'foo',
      children: [
        expect.objectContaining({
          id: expect.any(String),
          props: {
            qux: 'foo',
          },
        }),
        expect.objectContaining({
          id: '6789',
          props: {
            qux: 'baz',
          },
        }),
      ],
    });
  });

  test('should handle PAGE_APPEND_BLOCK', () => {
    expect(
      reducer(STATE, {
        type: PAGE_APPEND_BLOCK,
        block: {
          props: {
            qux: 'foo',
          },
        },
      })
    ).toEqual({
      bar: 'foo',
      children: [
        expect.objectContaining({
          id: '6789',
          props: {
            qux: 'baz',
          },
        }),
        expect.objectContaining({
          id: expect.any(String),
          props: {
            qux: 'foo',
          },
        }),
      ],
    });
  });

  test('should handle PAGE_REMOVE_BLOCK', () => {
    expect(
      reducer(STATE_WITH_THREE_BLOCKS, {
        type: PAGE_REMOVE_BLOCK,
        id: '4321',
      })
    ).toEqual({
      foo: 'bar',
      children: [
        {
          id: '6789',
          props: {
            title: 'foo',
          },
        },
        {
          id: '1337',
          props: {
            title: 'baz',
          },
        },
      ],
    });
    expect(
      reducer(STATE, {
        type: PAGE_REMOVE_BLOCK,
        id: '6789',
      })
    ).toEqual({
      bar: 'foo',
      children: [],
    });
  });

  test('should handle PAGE_MOVE_UP_BLOCK', () => {
    expect(
      reducer(STATE_WITH_THREE_BLOCKS, {
        type: PAGE_MOVE_UP_BLOCK,
        id: '4321',
      })
    ).toEqual({
      foo: 'bar',
      children: [
        {
          id: '4321',
          props: {
            title: 'bar',
          },
        },
        {
          id: '6789',
          props: {
            title: 'foo',
          },
        },
        {
          id: '1337',
          props: {
            title: 'baz',
          },
        },
      ],
    });
  });

  test('should handle PAGE_MOVE_DOWN_BLOCK', () => {
    expect(
      reducer(STATE_WITH_THREE_BLOCKS, {
        type: PAGE_MOVE_DOWN_BLOCK,
        id: '4321',
      })
    ).toEqual({
      foo: 'bar',
      children: [
        {
          id: '6789',
          props: {
            title: 'foo',
          },
        },
        {
          id: '1337',
          props: {
            title: 'baz',
          },
        },
        {
          id: '4321',
          props: {
            title: 'bar',
          },
        },
      ],
    });
  });
});
