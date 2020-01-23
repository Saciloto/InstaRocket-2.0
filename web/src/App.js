import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Routes from './routes';
import Header from './components/Header'
//Componente é um arquivo Javascript que tem por objetivo retornar um conteúdo JSX, pode ser função ou classe.
//É um conjunto de isolado de código estrutural, estilização e de lógica javascript, 
function App() {
  return (
      <BrowserRouter>
        <Header/>
        <Routes/>
      </BrowserRouter>
  );
}

export default App;
