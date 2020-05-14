
import { TextChoice } from "../src";
import { importScript } from "../../../utils"


export class TestTextChoice{
    public constructor(app: vf.Application, uiStage: vf.gui.Stage){
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage){
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextChoice/0.0.2.js"
                : "./dist/TextChoice.js";
        importScript(url, 'TextChoice', (value: any, className: string) => {
            let rect = new vf.gui.Rect();
            rect.color = 0xffffff;
            rect.style.width = 500;
            rect.style.height = 1000;
            uiStage.addChild(rect);

            let TextChoice:TextChoice = new (vf.gui as any).TextChoice();
            TextChoice.y = 100;
            TextChoice.x = 0;
            TextChoice.config = {
                containerWidth: 500,                 //组件容器宽度
                labelStyle: {
                    lineHeight: 100,                       //行高
                    fontSize: 30,                         //文本字号
                    color: 0xff0000,                      //文本颜色
                    fontFamily: 'Arial',                       //文本字体
                },
                textSelectedColor: 0x5161bb,          //文本选中时的颜色
                optionBackgroundColor: 0xe9ecfe,      //选项线条背景色
                optionBoardColor: 0x7487ef,           //选项选中时的颜色
                optionPaddingX: 0,                   //选项水平间隔
                optionPaddingY: 10,                   //选项框竖直间隔
                optionBoardLineWidth: 2,              //选项选中时边框线宽
                optionBackgroundRadius: 10,           //选项框radius
                optionRightColor: 0x00ff00,           //选项正确颜色
                optionWrongColor: 0xff0000,           //选项错误颜色
                optionRightIcon: "./assets/right.png",                 //选项判定正确图标
                optionWrongIcon: "./assets/wrong.png",                 //选项判定错误图标
                optionRightMissingIcon: "./assets/right-miss.png",     //选项判定miss图标
                optionIconSize: 15,                                    //图标尺寸
                optionType: "single",                                  //选项类型，single-单选   multiple-多选   radio-选项互斥
                targetOption: {
                    "text": "This is a {} example, {} select the {} option.",
                    "key": "1"
                },
                selectOption: [
                    {
                        "text": "textChoice",
                        "key": "0"
                    },
                    {
                        "text": "please",
                        "key": "1"
                    },
                    {
                        "text": "correct",
                        "key": "2"
                    }]
            }
            uiStage.addChild(TextChoice);
            TextChoice.on('OPTION_CHANGE', (target: any, data: any) => {
            })
            TextChoice.on('RESULT', (target: any, data: any) => {
                console.log('result', data)
            })


            const button = new vf.gui.Button();
            button.style.left = 230;
            button.style.top = 30;
            button.style.width = 100;
            button.style.height = 50;
            button.label.style.color = 0xff0000;
            button.text = "提交";
            button.on(vf.gui.Interaction.TouchMouseEvent.onClick, () => {
                TextChoice.checkResult = true;
            }, this);

            uiStage.addChild(button);
        });

    }
}