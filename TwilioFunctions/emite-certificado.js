
exports.handler = async function(context, event, callback) {
    console.log('palavra-chave', event.palavraChave);
    console.log('palestra', event.palestra);
    console.log('nome', event.nome);
    console.log('from', event.from);
    console.log('to', event.to);
    
    let nome = event.nome.trim();

  const client = context.getTwilioClient();
  const urlPdf=encodeURI(`https://URL_TWILIO_FUNCTION.twil.io/pdf?nome=${nome}&palestra=${event.palestra}&duracao=${event.duracao}`)
  let resultado = await client.messages.create({
      from: event.to, // número da Sandbox do WhatsApp
      to: event.from,
      body: 'Faça o download do seu certificado.',
      mediaUrl: [urlPdf]
    })
    .catch(e => {
      console.error('Erro enviar certificado', e);
      return null;
    })
    .then(message => { 
      console.log(`Message sent: ${message.sid}`);
      
      client.messages.create({
        from: event.to, // número da Sandbox do WhatsApp
        to: event.from,
        body: 'O certificado foi gerado com sucesso!\nAgradecemos pela participação no evento!'
      })
      return message;
    });  
  console.log('Enviou certificado', resultado);
  
  return callback(null, resultado);
};