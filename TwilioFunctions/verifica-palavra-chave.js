
// Lista de eventos válidos!

let opcoes = {
    // DEMO
    
    'demo': {
      palestra: 'Demonstração de emissão de certificado',
      duracao: '5 minutos'    
    }
  }
  
  // dia 1: ^(demo|fspon|chatbot|segment|skynet|comunidades)$
  // dia 2: ^(demo|escala|pizza|pydata|livecoding|rladies)$
  // dia 3: ^(demo|websockets|flutter|biohacking|flutterando|conversacional)$
  
  exports.handler = function(context, event, callback) {
    console.log('palavra-chave', event.palavraChave);
    
    let palavra = event.palavraChave.toLowerCase().trim();
    if (opcoes[palavra]) {
      return callback(null, opcoes[palavra]);
  
    } else {
      return callback('Palavra-chave não encontrada!', null);
    }
  };