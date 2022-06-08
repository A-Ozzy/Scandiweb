import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import { BrowserRouter as Router, } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';
import store from './store';

import '../src/index.scss';


const client = new ApolloClient({
   uri: "http://localhost:4000/graphql",
   cache: new InMemoryCache()
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <ApolloProvider client={client}>
         <Provider store={store}>
            <Router>
               <App />
            </Router>
         </Provider>
      </ApolloProvider>
   </React.StrictMode>
);
