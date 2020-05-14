import { TextFillBlanks } from "../src";
import { importScript } from "../../../utils";

export class TestTextFillBlanks {
    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {
        let url =
            process.env.NODE_ENV === "production"
                ? "//s.vipkidstatic.com/vf/plugin/TextFillBlanks/0.0.2.js"
                : "./dist/TextFillBlanks.js";
        importScript(url, "TextFillBlanks", (value: any, className: string) => {
            let rect = new vf.gui.Rect();
            rect.color = 0xffffff;
            rect.style.width = 500;
            rect.style.height = 1000;
            uiStage.addChild(rect);

            let TextFillBlanks: TextFillBlanks = new (vf.gui as any).TextFillBlanks();
            TextFillBlanks.y = 100;
            TextFillBlanks.x = 0;
            TextFillBlanks.config = {
                containerWidth: 500, //组件容器宽度
                labelStyle: {
                    lineHeight: 60, //行高
                    fontSize: 30, //文本字号
                    color: 0, //文本颜色
                    fontFamily: "Arial", //文本字体
                },
                textSelectedColor: 0x5161bb, //文本选中时的颜色
                optionBackgroundColor: 0xe9ecfe, //选项线条背景色
                optionBoardColor: 0x7487ef, //选项选中时的颜色
                optionPaddingX: 0, //选项水平间隔
                optionPaddingY: 10, //选项框竖直间隔
                optionBoardLineWidth: 2, //选项选中时边框线宽
                optionBackgroundRadius: 10, //选项框radius
                optionRightColor: 0x00ff00, //选项正确颜色
                optionWrongColor: 0xff0000, //选项错误颜色
                optionRightIcon: "./assets/right.png", //选项判定正确图标
                optionWrongIcon: "./assets/wrong.png", //选项判定错误图标
                optionRightMissingIcon: "./assets/right-miss.png", //选项判定miss图标
                optionIconSize: 15, //图标尺寸
                optionType: "single", //选项类型，single-单选   multiple-多选   radio-选项互斥
                targetOption: {
                    text: "This is a {} example, {} select the {} option.",
                    key: "1,0,2",
                },
                selectOption: [
                    {
                        text: "textFillBlanks",
                        key: "0",
                    },
                    {
                        text: "please",
                        key: "1",
                    },
                    {
                        text: "correct",
                        key: "2",
                    },
                ],
            };
            uiStage.addChild(TextFillBlanks);
            TextFillBlanks.on("OPTION_CHANGE", (target: any, data: any) => {});
            TextFillBlanks.on("RESULT", (target: any, data: any) => {
                console.log("result", data);
            });

            const button = new vf.gui.Button();
            button.style.left = 230;
            button.style.top = 30;
            button.style.width = 100;
            button.style.height = 50;
            button.label.style.color = 0xff0000;
            button.text = "提交";
            button.on(
                vf.gui.Interaction.TouchMouseEvent.onClick,
                () => {
                    console.log("ziye------button");
                    TextFillBlanks.checkResult = true;
                },
                this
            );

            uiStage.addChild(button);

            const button1 = new vf.gui.Button();
            button1.style.left = 100;
            button1.style.top = 250;
            button1.style.width = 100;
            button1.style.height = 50;
            button1.label.style.color = 0;
            button1.text = "textFillBlanks";
            button1.on(
                vf.gui.Interaction.TouchMouseEvent.onClick,
                () => {
                    TextFillBlanks.setBlankValue("0");
                },
                this
            );

            uiStage.addChild(button1);

            const button2 = new vf.gui.Button();
            button2.style.left = 200;
            button2.style.top = 250;
            button2.style.width = 100;
            button2.style.height = 50;
            button2.label.style.color = 0;
            button2.text = "please";
            button2.on(
                vf.gui.Interaction.TouchMouseEvent.onClick,
                () => {
                    TextFillBlanks.setBlankValue("1");
                },
                this
            );

            uiStage.addChild(button2);

            const button3 = new vf.gui.Button();
            button3.style.left = 300;
            button3.style.top = 250;
            button3.style.width = 100;
            button3.style.height = 50;
            button3.label.style.color = 0;
            button3.text = "correct";
            button3.on(
                vf.gui.Interaction.TouchMouseEvent.onClick,
                () => {
                    TextFillBlanks.setBlankValue("2");
                },
                this
            );

            uiStage.addChild(button3);
        });
    }
}
