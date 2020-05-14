
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
            rect.style.width = "100%";
            rect.style.height = "100%";
            uiStage.addChild(rect);

            let TextChoice:TextChoice = new (vf.gui as any).TextChoice();
            TextChoice.y = 100;
            TextChoice.x = 0;
            TextChoice.config = {
                containerWidth: 700,                 //组件容器宽度
                labelStyle: {
                    lineHeight: 100,                       //行高
                    fontSize: 30,                         //文本字号
                    color: 0,                      //文本颜色
                    fontFamily: 'Arial',                       //文本字体
                },
                textSelectedColor: 0x5161bb,          //文本选中时的颜色
                optionSelectedBackgroundColor: 0xe9ecfe,      //选项选中时背景色
                optionSelectedBoardColor: 0x7487ef,           //选项选中时边框颜色
                optionSelectedBoardLineWidth: 6,              //选项选中时边框线宽
                optionSelectedBackgroundRadius: 10,           //选项框选中时radius
        
                optionBackgroundColor: 0xffffff,      //选项背景色
                optionBoardColor: 0x999999,           //选项边框颜色
                optionBoardLineWidth: 2,              //选项边框线宽
                optionBackgroundRadius: 10,           //选项框radius
        
                optionPaddingX: 20,                    //选项水平间隔
                optionPaddingY: 15,                   //选项框竖直间隔
                optionRightColor: 0x00ff00,           //选项正确颜色
                optionWrongColor: 0xff0000,           //选项错误颜色
                optionRightIcon: "./assets/right.png",                 //选项判定正确图标
                optionWrongIcon: "./assets/wrong.png",                 //选项判定错误图标
                optionRightMissingIcon: "./assets/right-miss.png",     //选项判定miss图标
                optionIconSize: 15,                                    //图标尺寸
                optionType: "radio",                                  //选项类型，single-单选   multiple-多选   radio-选项互斥
                targetOption: {
                    "text": "This is a {} / {} example, {} / {} select the {} / {} option.",
                    "key": "0,2,5"
                },
                selectOption: [
                    {
                        "text": "textChoice",
                        "key": "0"
                    },
                    {
                        "text": "sdasdad",
                        "key": "1"
                    },
                    {
                        "text": "please",
                        "key": "2"
                    },
                    {
                        "text": "eloiujkv",
                        "key": "3"
                    },
                    {
                        "text": ";dkiuome",
                        "key": "4"
                    },
                    {
                        "text": "correct",
                        "key": "5"
                    }]
            }
            uiStage.addChild(TextChoice);
            TextChoice.on('OPTION_CHANGE', (target: any, data: any) => {
            })
            TextChoice.on('RESULT', (target: any, data: any) => {
                console.log('result', data)
            })
            TextChoice.on('LOADED', (target: any, data: any) => {
                console.log('size', data)
            })


            const button = new vf.gui.Button();
            button.style.left = 150;
            button.style.top = 30;
            button.style.width = 100;
            button.style.height = 50;
            button.label.style.color = 0xff0000;
            button.text = "提交";
            button.on(vf.gui.Interaction.TouchMouseEvent.onClick, () => {
                TextChoice.checkResult = true;
            }, this);

            const button1 = new vf.gui.Button();
            button1.style.left = 250;
            button1.style.top = 30;
            button1.style.width = 100;
            button1.style.height = 50;
            button1.label.style.color = 0xff0000;
            button1.text = "重置";
            button1.on(vf.gui.Interaction.TouchMouseEvent.onClick, () => {
                TextChoice.restart();
            }, this);

            uiStage.addChild(button);
            uiStage.addChild(button1);
        });

    }
}