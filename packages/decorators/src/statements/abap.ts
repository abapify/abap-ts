// import exp = require('constants');
// import { test } from 'node:test';
// import { hasUncaughtExceptionCaptureCallback } from 'process';

// type Src = Array<string>;

// export class Template extends String {
//   constructor(src: string) {
//     super(src.startsWith('\n') ? src.slice(1) : src);
//   }
// }

// export class Code extends Template {
//   constructor(src: Src) {
//     super(src.join('.\n'));
//   }
// }

// export class List extends Template {
//   constructor(src: Src) {
//     super(src.join(',\n'));
//   }
// }

// export class Block extends Template {
//   constructor(block: string, src: Src) {
//     super(`${block}: ${new List(src)}`);
//   }
// }

export const code = (code: TemplateStringsArray) => code.join('./n');
export const list = (code: TemplateStringsArray) => code.join(',/n');
export const block = (block: string, ...code: TemplateStringsArray) =>
  `${block}: ${list(code)}`;
