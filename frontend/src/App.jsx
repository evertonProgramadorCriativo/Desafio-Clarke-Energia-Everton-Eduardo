import React from 'react';

import { Header, Footer } from './components/layout';


function App() {

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
       <h3>Conteúdo da aplicação aqui</h3>
 
      <Footer />
    </div>
  );
}

export default App;