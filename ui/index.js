import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { registerGqlTag } from 'apollo-client/gql';

// Polyfill fetch
import 'whatwg-fetch';

import Feed from './Feed';
import Layout from './Layout';
import NewEntry from './NewEntry';

import './style.css';

import configureStore from './configureStore';

// Globally register gql template literal tag
registerGqlTag();

const client = new ApolloClient({
  networkInterface: createNetworkInterface('/graphql', {
    credentials: 'same-origin',
  }),
  queryTransformer: addTypename,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) { // eslint-disable-line no-underscore-dangle
      return result.__typename + result.id; // eslint-disable-line no-underscore-dangle
    }
    return null;
  },
  shouldBatch: true,
});

const store = configureStore({}, client);

render((
  <ApolloProvider client={client} store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Feed} />
        <Route path="feed/:type" component={Feed} />
        <Route path="submit" component={NewEntry} />
      </Route>
    </Router>
  </ApolloProvider>
), document.getElementById('root'));

/* eslint-disable */
(function (i, s, o, g, r, a, m) { i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
  (i[r].q = i[r].q || []).push(arguments); }, i[r].l = 1 * new Date(); a = s.createElement(o),
m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-74643563-4', 'auto');
ga('send', 'pageview');
/* eslint-enable */
