const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
  const buf = fs.readFileSync('D:\\Downloads\\DigiYatra_2.0_Ecosystem_Blueprint.pdf');
  const dataBuffer = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  const parser = new PDFParse(dataBuffer);
  await parser.load();
  
  const textObj = await parser.getText();
  fs.writeFileSync('digiyatra_content.txt', textObj.text);
  console.log('Pages:', textObj.total);
  console.log('Chars:', textObj.text.length);
  console.log('Written to digiyatra_content.txt');
  parser.destroy();
}

main().catch(err => console.error(err));
