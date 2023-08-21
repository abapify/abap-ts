import { Program, ProgramInput } from './statements/program';

export default {
  program(input: ProgramInput | string) {
    return new Program(typeof input === 'string' ? { name: input } : input);
  },
};
