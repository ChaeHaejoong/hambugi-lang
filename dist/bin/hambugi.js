#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const interpreter_1 = require("../src/interpreter");
const startToken = "내일도 햄부기 먹자";
const endToken = "알겠어...... 햄부기 혼자 먹을게";
// 명령어 리스트 (길이 내림차순 유지)
const commands = [
    "햄부기 온앤 온을 차려오거라.",
    "햄부기 온앤 온을 차려오라고 하지않았느냐.",
    "햄북스딱스",
    "함부르크",
    "햄부거",
    "햄부가우가",
    "햄부가티",
    "햄북어",
    "햄비기",
    "햄부기햄북",
];
function tokenize(source) {
    const tokens = [];
    let pos = 0;
    while (pos < source.length) {
        let matched = false;
        for (const cmd of commands.sort((a, b) => b.length - a.length)) {
            if (source.startsWith(cmd, pos)) {
                tokens.push(cmd);
                pos += cmd.length;
                matched = true;
                break;
            }
        }
        if (!matched) {
            if (/\s/.test(source[pos])) {
                pos++;
            }
            else {
                throw new Error(`알 수 없는 명령어 또는 문자 발견 위치: ${pos}`);
            }
        }
    }
    return tokens;
}
function extractProgramTokens(source) {
    const startIdx = source.indexOf(startToken);
    const endIdx = source.indexOf(endToken);
    if (startIdx === -1) {
        console.error(`시작 토큰 "${startToken}"를 찾을 수 없습니다.`);
        process.exit(1);
    }
    if (endIdx === -1) {
        console.error(`끝 토큰 "${endToken}"를 찾을 수 없습니다.`);
        process.exit(1);
    }
    if (endIdx <= startIdx) {
        console.error(`끝 토큰이 시작 토큰 앞에 있습니다.`);
        process.exit(1);
    }
    const programStr = source.slice(startIdx + startToken.length, endIdx);
    return tokenize(programStr);
}
function main() {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error("사용법: hambugi <파일명.bugi>");
        process.exit(1);
    }
    let source;
    try {
        source = (0, fs_1.readFileSync)(args[0], "utf-8");
    }
    catch {
        console.error(`파일을 읽을 수 없습니다: ${args[0]}`);
        process.exit(1);
    }
    const tokens = extractProgramTokens(source);
    const interpreter = new interpreter_1.Interpreter(tokens);
    interpreter.run();
}
main();
