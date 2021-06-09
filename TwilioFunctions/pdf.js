const fs = require('fs');
const tmp_dir = require('os').tmpdir();

const PDFDocument = require('pdfkit');
const md5 = require('md5');


exports.handler = function(context, event, callback) {

  // Definindo arquivos
  const file = 'certificado-' + md5(JSON.stringify(event)) + '.pdf'
  const pdfFile = [tmp_dir, file].join('/');
  const certificado = Runtime.getAssets()['/certificado.png'].path;
  
  // Crie o documento PDF
  const doc = new PDFDocument({
    size: 'A4', 
    layout: 'landscape', 
    margins: {
      top: 0, bottom: 0, left: 0, right: 0
    }
  });

  doc.info['Title'] = 'Certificado de Participação';

  const stream = doc.pipe(fs.createWriteStream(pdfFile));

  doc
    .moveTo(0, 0)
    .image(certificado, 0,0, {width: doc.page.width, height: doc.page.height});
  
  doc.fontSize(50).font('Times-Bold').text('CERTIFICADO', 0, 95, {
    width: doc.page.width,
    align: 'center'
  });
  doc.fontSize(20).moveDown().font('Times-Roman').text('Confiro o presente certificado a', {
    width: doc.page.width,
    align: 'center'
  });
  doc.moveDown().fontSize(35).font('Times-Bold').text(event.nome, {
    width: doc.page.width,
    align: 'center'
  });
  
  doc.fontSize(20).font('Times-Roman').text('Por assistir a palestra ', 80, (doc.page.height / 2), {
    width: doc.page.width - 160,
    align: 'left',
    continued: true
  }).font('Times-Bold').text(`${event.palestra}`, {
    continued: true
  }).font('Times-Roman').text(` com total de ${event.duracao}. `,{
    continued: true
  })
  .text('A palestra foi realizada no evento The Developer\'s Conference (thedevconf.com).');
  
  // TODO: Incluir assinatura
  // doc
  //   .image(assinatura, doc.page.width - 200, doc.page.height - 190, {width: 150});
  
  doc.fontSize(20).font('Times-Roman')
    .text(`Luís Leão`, 0, doc.page.height - 150, {
      width: doc.page.width - 80,
      align: 'right'
    })
    .fontSize(14) // .moveDown()
    .text('Developer Evangelist - Twilio',
    {
      width: doc.page.width - 80,
      align: 'right'
    });
  
  doc
    .fontSize(10)
    .text('Imagem de fundo criada por Garik Barseghyan e disponível no Pixabay', 0, doc.page.height - 80, {
      width: doc.page.width - 80,
      align: 'right'
    })
  
  // Finalizar o arquivo PDF
  doc.end();
  
  
  
  
  
  
  stream.on('finish', function() {

    // Ler o arquivo e jogar para o buffer
    const stat = fs.statSync(pdfFile);
    const buffer = fs.readFileSync(pdfFile);
    const response = new Twilio.Response();

    // Definir o corpo da resposta com o buffer binário
    response.setBody(buffer);
    response.appendHeader('Content-Disposition', 'attachment;filename="'+file+'"');
    response.appendHeader('Content-Type', 'application/pdf');
    response.appendHeader('Content-Length', stat.size);

    callback(null, response);  
  });
};

// Créditos da imagem de fundo do certificado:
// https://pixabay.com/pt/vectors/certificado-diploma-de-fundo-1243231/


// Como adicionar uma fonte personalizada:
// doc
//   .font('fonts/PalatinoBold.ttf')
//   .fontSize(25)
//   .text('Some text with an embedded font!', 100, 100);
