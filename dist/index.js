"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var json_schema_to_typescript_1 = require("json-schema-to-typescript");
var http = require('http');
var apiDefinitionsRoot = '/profile';
var baseURL = process.argv[2];
var outputPath = process.argv[3];
if (!outputPath) {
    outputPath = './generated-model';
}
function generate() {
    get(apiDefinitionsRoot, 'application/json', function (rootData) {
        var apiDefinition = JSON.parse(rootData);
        var _loop_1 = function (property) {
            if (property && property !== 'self') {
                get(apiDefinitionsRoot + "/" + property, 'application/schema+json', function (entityData) {
                    fs_1.writeFile(outputPath + "/" + property + ".json", entityData, function (error) {
                        if (error) {
                            return console.log(error);
                        }
                        console.log("JSON definition for '" + property + "' has been saved to: " + outputPath + "/" + property + ".json");
                        generateClassFromJSON(property);
                    });
                });
            }
        };
        for (var property in apiDefinition._links) {
            _loop_1(property);
        }
    });
}
function get(path, accept, callback) {
    var urlComponents = baseURL.match(/^(\S.+?)\/\/(\S.+?):(\d{1,5})(.*)/);
    if (urlComponents && urlComponents.length >= 4) {
        if (urlComponents.length === 5) {
            path = urlComponents[4] + path;
        }
        var options = {
            protocol: urlComponents[1],
            hostname: urlComponents[2],
            port: urlComponents[3],
            method: 'GET',
            path: path,
            headers: {
                accept: accept
            }
        };
        var data_1 = '';
        http.get(options, function (response) {
            response.on('data', function (chunk) {
                data_1 += chunk;
            });
            response.on('end', function () {
                callback(data_1);
            });
        }).on('error', function (error) {
            console.log('Error: ' + error.message);
        });
    }
    else {
        console.log('Invalid API URL provided.');
    }
}
function generateClassFromJSON(property) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = fs_1.writeFileSync;
                    _b = [outputPath + "/" + property + ".d.ts"];
                    return [4 /*yield*/, json_schema_to_typescript_1.compileFromFile(outputPath + "/" + property + ".json", {
                            style: {
                                singleQuote: true
                            }
                        })];
                case 1:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    console.log("Type definition for '" + property + "' has been saved to: " + outputPath + "/" + property + ".d.ts");
                    return [2 /*return*/];
            }
        });
    });
}
generate();
//# sourceMappingURL=index.js.map