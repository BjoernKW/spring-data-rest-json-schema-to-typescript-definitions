# spring-data-rest-json-schema-to-typescript-definitions

npm package that allows you to generate TypeScript definitions from JSON Schema metadata supplied by [Spring Data REST](https://projects.spring.io/spring-data-rest/) endpoints.

## Getting Started

### Installing

`npm install spring-data-rest-json-schema-to-typescript-definitions --save-dev`

### Usage

Add a script named *generate-model* to your project's *package.json*, e.g.:

~~~~~~~~
{
  ...
  "scripts": {
    ...
    "generate-model": "node node_modules/spring-data-rest-json-schema-to-typescript-definitions/dist/index.js http://localhost:8080 ./src/app/generated-model"
    ...
  },
  ...
}

~~~~~~~~

The main *index.js* takes two arguments:

1. The root URL of the API (*http://localhost:8080* in the example above; the script automatically appends the */profile* part to the URL) generated by Spring Data REST (see https://docs.spring.io/spring-data/rest/docs/current/reference/html/#metadata.json-schema for more information).
2. The directory to which the TypeScript definitions will be written (*./src/app/generated-model* in the example above).

Now you can generate TypeScript definitions from your [Spring Data REST](https://projects.spring.io/spring-data-rest/) endpoints by using this command from your project's root directory:

`npm run generate-model`

## Built With

* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)

## Authors

* **[Björn Wilmsmann](https://bjoernkw.com)**

## License

[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)

## Acknowledgements

Thanks to [Boris Cherny](https://github.com/bcherny) whose [json-schema-to-typescript](https://github.com/bcherny/json-schema-to-typescript) package I could draw upon for creating this package.
