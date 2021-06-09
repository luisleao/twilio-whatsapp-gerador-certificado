
// Lista de eventos válidos!

let opcoes = {
    // DIA 1
    
    'fspon': {
      palestra: 'A comunidade mudou minha vida com Dan Vitoriano',
      duracao: '1 hora e 30 minutos'    
    },
    'chatbot': {
      palestra: 'O futuro das conversas com Michael Barney',
      duracao: '1 hora e 30 minutos'    
    },
    'segment': {
      palestra: 'Como Segment usa o Segment para construir o Segment com Netto Farah',
      duracao: '1 hora e 30 minutos'    
    },
    'skynet': {
      palestra: 'Destruindo a Skynet: práticas para Machine Learning responsável com Bianca Ximenes',
      duracao: '1 hora e 30 minutos'    
    },
    'comunidades': {
      palestra: 'Painel Comunidades, Carreira e Tecnologia com Águino Silva, Caio Calado, Flávia Oliveira, Janaína Pereira e Mariana Moreira',
      duracao: '1 hora e 30 minutos'    
    },
  
    // DIA 2
    
    'rladies': {
      palestra: 'RLadies São Paulo como um espaço de ensino-aprendizagem, com Haydee Svab',
      duracao: '1 hora e 30 minutos'    
    },
    'livecoding': {
      palestra: 'Live Coding com Twilio e Python com Gabriela Cavalcante e Raquel Oliveira',
      duracao: '1 hora e 30 minutos'    
    },
    'pydata': {
      palestra: 'Democratizando a Engenharia de Dados com Kadu Vido',
      duracao: '1 hora e 30 minutos'    
    },
    'pizza': {
      palestra: 'Ligando pro iFood pra pedir Pizza com Joselito Junior',
      duracao: '1 hora e 30 minutos'    
    },
    'escala': {
      palestra: 'Técnicas arquiteturais para escalar um app em Flutter com Fausto Blanco',
      duracao: '1 hora e 30 minutos'    
    },
    
    
    
    
    // DIA 3
    
    'websockets': {
      palestra: 'WebSockets sobre demanda com AWS lambdas e Node.js com Italo José',
      duracao: '1 hora e 30 minutos'    
    },
    'flutter': {
      palestra: 'Quão bem o Flutter escala? com Noe Branagan',
      duracao: '1 hora e 30 minutos'    
    },
    'biohacking': {
      palestra: 'Primeiros passos em bio hacking - como criar seu laboratório independente? com Lina Lopes',
      duracao: '1 hora e 30 minutos'    
    },
    'flutterando': {
      palestra: 'Porque investir no Flutter? com Toshi Ossada',
      duracao: '1 hora e 30 minutos'    
    },
    'conversacional': {
      palestra: 'UX e Interfaces Conversacionais: como designers projetam experiências conversacionais? com Caio Calado',
      duracao: '1 hora e 30 minutos'    
    },
    
    
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