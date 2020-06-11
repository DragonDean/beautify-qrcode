import * as yup from 'yup';
import { getTypeTable, QRPointType } from '../utils/qrcodeHandler';
import { createRenderer } from '../utils/Renderer';
import { defaultImage } from '../constant/References';

function listPoints(qrcode, params) {
    if (!qrcode) return [];

    const nCount = qrcode.getModuleCount();
    const typeTable = getTypeTable(qrcode);
    const pointList = new Array(nCount);

    const type = params[1];
    let size = params[2] / 100 / 3;
    const opacity = params[3] / 100;
    const otherColorDark = params[4];
    const otherColorLight = params[5];
    const posType = params[6];
    const posColor = params[7];
    let id = 0;

    const vw = [3, -3];
    const vh = [3, -3];

    if (size <= 0) size = 1.0;

    pointList.push(
        `<image
            key="${id++}"
            x="0"
            y="0"
            width="${nCount}"
            height="${nCount}"
            xlink:href="${params[0]}"
        />`
    );

    for (let x = 0; x < nCount; x++) {
        for (let y = 0; y < nCount; y++) {
            if (
                typeTable[x][y] === QRPointType.ALIGN_CENTER ||
                typeTable[x][y] === QRPointType.ALIGN_OTHER ||
                typeTable[x][y] === QRPointType.TIMING
            ) {
                if (qrcode.isDark(x, y)) {
                    if (type === 0)
                        pointList.push(
                            `<rect
                                opacity="${opacity}"
                                width="${size}"
                                height="${size}"
                                key="${id++}"
                                fill="${otherColorDark}"
                                x="${x + (1 - size) / 2}"
                                y="${y + (1 - size) / 2}"
                            />`
                        );
                    else if (type === 1)
                        pointList.push(
                            `<circle
                                opacity="${opacity}"
                                r="${size / 2}"
                                key="${id++}"
                                fill="${otherColorDark}"
                                cx="${x + 0.5}"
                                cy="${y + 0.5}"
                            />`
                        );
                } else {
                    if (type === 0)
                        pointList.push(
                            `<rect
                                opacity="${opacity}"
                                width="${size}"
                                height="${size}"
                                key="${id++}"
                                fill="${otherColorLight}"
                                x="${x + (1 - size) / 2}"
                                y="${y + (1 - size) / 2}"
                            />`
                        );
                    else if (type === 1)
                        pointList.push(
                            `<circle
                                opacity="${opacity}"
                                r="${size / 2}"
                                key="${id++}"
                                fill="${otherColorLight}"
                                cx="${x + 0.5}"
                                cy="${y + 0.5}"
                            />`
                        );
                }
            } else if (typeTable[x][y] === QRPointType.POS_CENTER) {
                if (qrcode.isDark(x, y)) {
                    if (posType === 0) {
                        pointList.push(
                            `<rect
                                width="${1}"
                                height="${1}"
                                key="${id++}"
                                fill="${posColor}"
                                x="${x}"
                                y="${y}"
                            />`
                        );
                    } else if (posType === 1) {
                        pointList.push(
                            `<circle
                                key="${id++}"
                                fill="white"
                                cx="${x + 0.5}"
                                cy="${y + 0.5}"
                                r="${5}"
                            />`
                        );
                        pointList.push(
                            `<circle
                                key="${id++}"
                                fill="${posColor}"
                                cx="${x + 0.5}"
                                cy="${y + 0.5}"
                                r="${1.5}"
                            />`
                        );
                        pointList.push(
                            `<circle
                                key="${id++}"
                                fill="none"
                                strokeWidth="1"
                                stroke="${posColor}"
                                cx="${x + 0.5}"
                                cy="${y + 0.5}"
                                r="${3}"
                            />`
                        );
                    } else if (posType === 2) {
                        pointList.push(
                            `<circle
                                key="${id++}"
                                fill="white"
                                cx="${x + 0.5}"
                                cy="${y + 0.5}"
                                r="${5}"
                            />`
                        );
                        pointList.push(
                            `<circle
                                key="${id++}"
                                fill="${posColor}"
                                cx="${x + 0.5}"
                                cy="${y + 0.5}"
                                r="${1.5}"
                            />`
                        );
                        pointList.push(
                            `<circle
                                key="${id++}"
                                fill="none"
                                strokeWidth="0.15"
                                strokeDasharray="0.5,0.5"
                                stroke="${posColor}"
                                cx="${x + 0.5}"
                                cy="${y + 0.5}"
                                r="${3}"
                            />`
                        );
                        for (let w = 0; w < vw.length; w++) {
                            pointList.push(
                                `<circle
                                    key="${id++}"
                                    fill="${posColor}"
                                    cx="${x + vw[w] + 0.5}"
                                    cy="${y + 0.5}"
                                    r="${0.5}"
                                />`
                            );
                        }
                        for (let h = 0; h < vh.length; h++) {
                            pointList.push(
                                `<circle
                                    key="${id++}"
                                    fill="${posColor}"
                                    cx="${x + 0.5}"
                                    cy="${y + vh[h] + 0.5}"
                                    r="${0.5}"
                                />`
                            );
                        }
                    }
                }
            } else if (typeTable[x][y] === QRPointType.POS_OTHER) {
                if (qrcode.isDark(x, y)) {
                    if (posType === 0) {
                        pointList.push(
                            `<rect
                                width="${1}"
                                height="${1}"
                                key="${id++}"
                                fill="${posColor}"
                                x="${x}"
                                y="${y}"
                            />`
                        );
                    }
                } else {
                    if (posType === 0) {
                        pointList.push(
                            `<rect
                                width="${1}"
                                height="${1}"
                                key="${id++}"
                                fill="white"
                                x="${x}"
                                y="${y}"
                            />`
                        );
                    }
                }
            } else {
                if (qrcode.isDark(x, y)) {
                    if (type === 0)
                        pointList.push(
                            `<rect
                                opacity="${opacity}"
                                width="${size}"
                                height="${size}"
                                key="${id++}"
                                fill="${otherColorDark}"
                                x="${x + (1 - size) / 2}"
                                y="${y + (1 - size) / 2}"
                            />`
                        );
                    else if (type === 1)
                        pointList.push(
                            `<circle
                                opacity="${opacity}"
                                r="${size / 2}"
                                key="${id++}"
                                fill="${otherColorDark}"
                                cx="${x + 0.5}"
                                cy="${y + 0.5}"
                            />`
                        );
                } else {
                    if (type === 0)
                        pointList.push(
                            `<rect
                                opacity="${opacity}"
                                width="${size}"
                                height="${size}"
                                key="${id++}"
                                fill="${otherColorLight}"
                                x="${x + (1 - size) / 2}"
                                y="${y + (1 - size) / 2}"
                            />`
                        );
                    else if (type === 1)
                        pointList.push(
                            `<circle
                                opacity="${opacity}"
                                r="${size / 2}"
                                key="${id++}"
                                fill="${otherColorLight}"
                                cx="${x + 0.5}"
                                cy="${y + 0.5}"
                            />`
                        );
                }
            }
        }
    }

    return pointList;
}

const schemaImage = yup.object().shape({
    // 背景图片
    backgroudImage: yup.string().default(defaultImage),
    // 信息点样式 ['矩形', '圆形'],
    type: yup.mixed().oneOf([0, 1, 2]).default(0),
    // 信息点缩放
    size: yup.number().default(100),
    // 信息点不透明度
    opacity: yup.number().default(100),
    // 信息点深色
    otherColorDark: yup.string().default('#000000'),
    // 信息点浅色
    otherColorLight: yup.string().default('#000000'),
    // 定位点样式 ['矩形', '圆形', '行星']
    posType: yup.mixed().oneOf([0, 1, 2]).default(0),
    // 定位点颜色
    posColor: yup.string().default('#000000'),
});

const RendererImage = (qrcode, options = {}) => {
    try {
        options = schemaImage.validateSync(options);
    } catch (err) {
        console.log(err);
        return err;
    }

    const params = [
        'backgroudImage',
        'type',
        'size',
        'opacity',
        'otherColorDark',
        'otherColorLight',
        'posType',
        'posColor',
    ].map((k) => options[k]);

    const svg = createRenderer({
        listPoints: listPoints,
    })({ qrcode, params });

    return svg;
};

export default RendererImage;
