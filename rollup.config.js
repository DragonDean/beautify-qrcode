/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs';
import path from 'path';
import { minify } from 'uglify-js';
import buble from '@rollup/plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import saveLicense from 'uglify-save-license';
import stripBanner from 'rollup-plugin-strip-banner';
import babel from 'rollup-plugin-babel';
const copyright = fs.readFileSync(path.join('COPYRIGHT'), 'utf-8');

const SRC_DIR = path.resolve('src');
const DIST_DIR = path.resolve('release');

export default {
    input: path.join(SRC_DIR, 'index.js'),
    output: {
        banner: copyright,
        name: 'beautifyQrcode',
        exports: 'named',
        file: path.join(DIST_DIR, 'beautifyQrcode.js'),
        format: 'umd',
        sourcemap: false,
    },
    external: ['yup'],
    globals: {
        yup: 'yup',
    },
    plugins: [
        commonjs({
            sourceMap: false,
        }),
        json(),
        stripBanner(),
        babel({
            exclude: 'node_modules/**',
        }),
    ],
};
