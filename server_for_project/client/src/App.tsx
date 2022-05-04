import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client'; // check this might be a problem
import {Herolists} from './components/Herolists/Herolists';
import { BrowserRouter } from 'react-router-dom';
import { Route, Router } from 'react-router';
import { Routes } from 'react-router';
import { Hero } from './components/Herolists/Hero';
import logo from './stwarslogo.png';
import './App.css';

const client = new ApolloClient({
  uri:'/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
      <ApolloProvider client={client}>
        <div className="container">
          <img src={logo} alt="Stwars" style={{width: 300, display: 'block', margin: 'auto'}} />
          <br />
          <BrowserRouter>
            <Routes>
              <Route  path='/' element={<Herolists />} />
              <Route  path='/:name' element={<Hero />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ApolloProvider>
  );
}

export default App;
