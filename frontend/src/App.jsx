import React from 'react';
import { Header, Footer } from './components/layout';
import FormularioCalculo  from './components/calculadora/FormularioCalculo.jsx';

function App() {

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <FormularioCalculo />
 
      <Footer />
    </div>
  );
}

export default App;