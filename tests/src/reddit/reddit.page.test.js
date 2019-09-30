import React from 'react';
import {Provider} from 'react-redux';
import {render} from '@testing-library/react';
import {createReduxStoreWithInspector} from '../reduxstore/redux-testutils.test';
import mockAxios from 'axios';
import Reddit from "../../../src/app/reddit";
import mediaQuery from 'css-mediaquery';

let store = null;
let storeInspector = null;

function createMatchMedia(width) {
  return query => ({
    matches: mediaQuery.match(query, {width}),
    addListener: () => {
    },
    removeListener: () => {
    },
  });
}

beforeEach(() => {
  [store, storeInspector] = createReduxStoreWithInspector({doInit: false, doLogging: false});
  window.matchMedia = createMatchMedia(window.innerWidth);
});

afterEach(() => {
  mockAxios.reset();
});


describe('Reddit main page', () => {


  it('it is fine', async () => {

    window.history.pushState({}, '', '/')
    const {getByText, getByTestId, queryByTestId, queryByText, container, asFragment} = render(
      <Provider store={store}>
          <Reddit/>
      </Provider>
    );

    storeInspector.expectActionMatching({ type: 'LOAD_REDDIT_ENTRIES_PENDING' });

    getByTestId('list-loading-container');


    mockAxios.mockResponseFromFile({url: '/top.json?count=0&limit=50',

      file: 'top.json'
    });

    storeInspector.expectActionMatching({ type: 'LOAD_REDDIT_ENTRIES_SUCCESS' });

    const listLoadingContainer = queryByTestId('list-loading-container');

    expect(listLoadingContainer, "List loading skeleton should not be shown").toBeNull();

    const entriesList = getByTestId("reddit-entries-list");

    const firstEntryAuthor = queryByText("washedupwornout");

    expect(firstEntryAuthor, "Author washedupwornout should be shown").not.toBeNull();

    const postInOtherPage = queryByText("ostrofci");

    expect(postInOtherPage, "Author ostrofci should not be shown").toBeNull();
  });

});
