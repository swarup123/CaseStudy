"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    }
};
