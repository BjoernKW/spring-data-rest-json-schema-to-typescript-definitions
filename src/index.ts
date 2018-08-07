import { writeFile, writeFileSync } from 'fs';
import { compileFromFile } from 'json-schema-to-typescript';
import { ServerResponse } from 'http';

const http = require('http');
const apiDefinitionsRoot = '/profile';

const baseURL = process.argv[2];
let outputPath = process.argv[3];
if (!outputPath) {
  outputPath = './generated-model';
}

function generate() {
  get(apiDefinitionsRoot, 'application/json', (rootData: any) => {
    const apiDefinition = JSON.parse(rootData);
    for (const property in apiDefinition._links) {
      if (property && property !== 'self') {
        get(`${apiDefinitionsRoot}/${property}`, 'application/schema+json', (entityData: any) => {
          writeFile(`${outputPath}/${property}.json`, entityData, (error) => {
            if (error) {
              return console.log(error);
            }

            console.log(`JSON definition for '${property}' has been saved to: ${outputPath}/${property}.json`);

            generateClassFromJSON(property);
          });
        });
      }
    }
  });
}

function get(path: string, accept: string, callback: Function) {
  const urlComponents = baseURL.match(/^(\S.+?)\/\/(\S.+?):(\d{1,5})(.*)/);
  
  if (urlComponents && urlComponents.length >= 4) {
    if (urlComponents.length === 5) {
      path = urlComponents[4] + path
    }
    const options = {
      protocol: urlComponents[1],
      hostname: urlComponents[2],
      port: urlComponents[3],
      method: 'GET',
      path: path,
      headers: {
        accept: accept
      }
    };

    let data = '';
    http.get(options, (response: ServerResponse) => {
      response.on('data', (chunk: Buffer) => {
        data += chunk;
      });

      response.on('end', () => {
        callback(data);
      });
    }).on('error', (error: Error) => {
      console.log('Error: ' + error.message);
    });
  } else {
    console.log('Invalid API URL provided.');
  }
}

async function generateClassFromJSON(property: string) {
  writeFileSync(`${outputPath}/${property}.d.ts`, await compileFromFile(`${outputPath}/${property}.json`, {
    style: {
      singleQuote: true
    }
  }));

  console.log(`Type definition for '${property}' has been saved to: ${outputPath}/${property}.d.ts`);
}

generate();
