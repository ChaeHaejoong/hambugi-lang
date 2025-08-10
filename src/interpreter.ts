export class Interpreter {
  memory: number[];
  pointer: number;
  tokens: string[];
  pc: number;

  constructor(tokens: string[]) {
    this.memory = [0];
    this.pointer = 0;
    this.tokens = tokens;
    this.pc = 0;
  }

  run() {
    while (this.pc < this.tokens.length) {
      const cmd = this.tokens[this.pc];

      switch (cmd) {
        case "햄북어":
          this.memory[this.pointer] = (this.memory[this.pointer] + 1) % 256;
          break;
        case "함부르크":
          this.memory[this.pointer] = (this.memory[this.pointer] + 5) % 256;
          break;
        case "햄북스딱스":
          this.memory[this.pointer] = (this.memory[this.pointer] + 10) % 256;
          break;
        case "햄부거":
          this.memory[this.pointer] = (this.memory[this.pointer] + 3) % 256;
          break;
        case "햄부가우가":
          this.memory[this.pointer] =
            (this.memory[this.pointer] + 256 - 5) % 256;
          break;
        case "햄부기햄북":
          this.memory[this.pointer] =
            (this.memory[this.pointer] + 256 - 1) % 256;
          break;
        case "햄부가티":
          this.memory[this.pointer] =
            (this.memory[this.pointer] + 256 - 10) % 256;
          break;
        case "햄비기":
          this.pointer++;
          if (this.pointer >= this.memory.length) {
            this.memory.push(0);
          }
          break;
        case "햄부기 온앤 온을 차려오거라.":
        case "햄부기 온앤 온을 차려오라고 하지않았느냐.":
          process.stdout.write(String.fromCharCode(this.memory[this.pointer]));
          break;
        default:
          // 무시
          break;
      }

      this.pc++;
    }
    process.stdout.write("\n");
  }
}
