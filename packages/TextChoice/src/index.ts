export class TextChoice extends vf.gui.DisplayObject {
    public constructor() {
        super();
    }

    private _optionList: any[] = []; //选项数组,{id,text, displayObject}
    private _originBlockTextList: string[] = []; //原始文本拆分后的list
    private _curPosX: number = 0; //当前行的起始位置x
    private _curPosY: number = 25; //当前行的起始位置y
    private _optionId: number = 0; //选项id
    private _groupId: number = 0; //radio时选项组

    /**
     * 每个选项的状态
     * {
     *  id:0
     *  status: 'selected_right' //selected_right-选中且为正确项  selected_wrong-选中且为错误项  unselected_right-未选中且为正确项  unselected_wrong-未选中且为错误项
     * }
     */
    private _optionStatusList: any[] = [];

    /**
     * 正确答案
     */
    private _optionAnswer: string[] = [];

    /**
     * 已选择的选项数量
     */
    private _selectedTotal: number = 0;

    /**
     * 组件配置
     */
    private _config: any = {
        containerWidth: 1000,                 //组件容器宽度
        labelStyle: {
            lineHeight: 80,                       //行高
            fontSize: 22,                         //文本字号
            color: 0x586176,                      //文本颜色
            fontFamily: '',                       //文本字体
        },
        textSelectedColor: 0x5161bb,          //文本选中时的颜色

        optionSelectedBackgroundColor: 0xe9ecfe,      //选项选中时背景色
        optionSelectedBoardColor: 0x7487ef,           //选项选中时边框颜色
        optionSelectedBoardLineWidth: 3,              //选项选中时边框线宽
        optionSelectedBackgroundRadius: 10,           //选项框选中时radius

        optionBackgroundColor: 0xffffff,      //选项背景色
        optionBoardColor: 0x999999,           //选项边框颜色
        optionBoardLineWidth: 2,              //选项边框线宽
        optionBackgroundRadius: 10,           //选项框radius

        optionPaddingX: 0,                    //选项水平间隔
        optionPaddingY: 15,                   //选项框竖直间隔
        optionRightColor: 0x00ff00,           //选项正确颜色
        optionWrongColor: 0xff0000,           //选项错误颜色
        optionRightIcon: "./assets/right.png",                 //选项判定正确图标
        optionWrongIcon: "./assets/wrong.png",                 //选项判定错误图标
        optionRightMissingIcon: "./assets/right-miss.png",     //选项判定miss图标
        optionIconSize: 15,                                    //图标尺寸
        optionType: "single",                                  //选项类型，single-单选   multiple-多选   radio-选项互斥
        targetOption: null,                   //目标属性
        selectOption: null,                   //选项属性
        checkResultType: 0                    //验证显示类型  0-仅正确错误  1-错误的需要修正
    };

    private _resultKeyArr: string[] = []; //作答结果

    public set config(value: any) {
        this._config = Object.assign(this._config, value);
        this.parseTemplateData();
    }
    public get config(){
        return this._config;
    }

    /*
    *重新开始
    */
    public restart(){
        this._resultKeyArr = [];
        this._optionStatusList = [];
        this._selectedTotal = 0;
        this._optionAnswer = [];
        this._checkResult = false;
        this.parseTemplateData();
    }

    /**
     * 验证结果
     */
    private _checkResult: boolean = false;
    public set checkResult(value: boolean) {
        if (this._checkResult) return;
        this._checkResult = value;
        if(this._checkResult){
            this.dealCheckResult();
            this.parseText();
        }
    }

    /**
     * 文本内容
     */
    private _originText: string = "";
    private _text: string = "";
    private set text(value: string) {
        this._text = value;
        this.parseText();
    }
    private get text() {
        return this._text;
    }

    /**
     * 设置选中option
     */
    private _selectedOptionId: number = 0;
    public set selectedOptionId(value: number) {
        this._selectedOptionId = value;
        this.checkOptionSelected(value);
    }

    /**
     * 解析模板data
     */
    private parseTemplateData() {
        if (!this.config.targetOption || !this.config.selectOption) return;
        let text = (this._originText = this.config.targetOption.text);
        //有多少选项就有多少个空，必须匹配
        for (let i = 0; i < this.config.selectOption.length; ++i) {
            let item = this.config.selectOption[i];
            let option = `{${item.text}}`;
            text = text.replace(/{}/, option);
        }
        let answerStr = this.config.targetOption.key;
        this._optionAnswer = answerStr.split(",");
        this.text = text; //触发解析
    }

    private reset() {
        this.removeChildren();
        this._optionId = 0;
        this._groupId = 0;
        this._optionList = [];
        this._curPosX = 0;
        this._curPosY = 0;
    }

    private parseText() {
        this.reset();
        //为避免重复，搞个比较复杂的*_#
        this._text = this._text.replace(/\{/g, "*_#{");
        this._text = this._text.replace(/\}/g, "}*_#");
        this._originBlockTextList = this._text.split("*_#");
        this._originBlockTextList.forEach((item) => {
            //判断是否带{}
            if (item.indexOf("{") !== -1 && item.indexOf("}") !== -1) {
                if (this._checkResult) {
                    //选项验证,不可点击
                    this.dealCheckedOption(item);
                } else {
                    this.dealOption(item);
                }
            } else {
                this.dealText(item, true);
            }
        });

        //注册点击事件
        this._optionList.forEach((item) => {
            let interactObj: vf.gui.DisplayObject = item.interactObj as vf.gui.DisplayObject;
            interactObj.interactabled = true;
            interactObj.on("click", this.onClick, this);
        });

        //挂载完成，回调
        let data = {
            width: this.config.containerWidth,
            height: this._curPosY + this.config.labelStyle.lineHeight
        }
        this.emit("LOADED", this, data);
    }

    private onClick() {
        let id: number = parseInt(arguments[1].name);
        this.checkOptionSelected(id);
    }

    private checkOptionSelected(id: number) {
        if (this._optionList.length == 0) return;
        //无论如何能找到对应的id
        let option = this._optionList.find((item) => {
            return item.id == id;
        });

        //判断是单选还是多选
        if (this.config.optionType == "single") {
            //已经选中的重置
            let selectedOption = this._optionList.find((item) => {
                return !!item.selected;
            });

            if (selectedOption) {
                if (selectedOption.id == id) return;
                this.onUnSelected(selectedOption);
            }

            this.onSelected(option);
        } else if (this.config.optionType == "multiple") {
            if (option.selected) {
                //已选中，重置状态
                this.onUnSelected(option);
            } else {
                this.onSelected(option);
            }
        } else if (this.config.optionType == "radio") {
            //互斥型的，找到同一组的，重置状态
            for (let i = 0; i < this._optionList.length; ++i) {
                let groupOption = this._optionList[i];
                if (groupOption.id != id && groupOption.groupId == option.groupId && groupOption.selected) {
                    this.onUnSelected(groupOption);
                }
            }

            //自己选中状态
            if (!option.selected) {
                this.onSelected(option);
            }
        }
    }

    /**
     * 选项选中
     */
    private onSelected(option: any) {
        option.selected = true;
        this._selectedOptionId = option.id;
        let rect = option.displayObj as vf.gui.Rect;
        rect.getChildAt(0).visible = true;
        option.label.style.color = this.config.textSelectedColor;

        let data = {
            id: option.id,
            key: this.config.selectOption[option.id].key,
            selected: option.selected,
        };

        //抛出事件
        this.emit("OPTION_CHANGE", this, data);
        this._selectedTotal++;
        if (this.config.optionType == "radio") {
            if (this._selectedTotal == this._optionAnswer.length) {
                this.emit("COMPLETE", this);
            }
        } else {
            this.emit("COMPLETE", this);
        }
    }

    /**
     * 取消选中
     */
    private onUnSelected(option: any) {
        option.selected = false;
        let rect: vf.gui.Rect = option.displayObj as vf.gui.Rect;
        rect.getChildAt(0).visible = false;
        option.label.style.color = this.config.labelStyle.color;

        let data = {
            id: option.id,
            key: this.config.selectOption[option.id].key,
            selected: option.selected,
        };
        //抛出事件
        this.emit("OPTION_CHANGE", this, data);
        this._selectedTotal--;
    }

    /**
     * 处理选项
     */
    private dealOption(item: string) {
        item = item.replace(/[\{\}]/g, " ");
        let label = this.createLabel(item);
        let _width = label.width;

        if (this._curPosX + _width + this.config.optionPaddingX * 2 > this.config.containerWidth) {
            //超过了，直接折行
            this._curPosY += this.config.labelStyle.lineHeight;
            this._curPosX = 0;
        }
        let displayObj: any = null;
        let interactObj: any = null;
        displayObj = interactObj = this.createRect(
            label.width + this.config.optionPaddingX * 2,
            this.config.labelStyle.fontSize + this.config.optionPaddingY * 2
        );
        this.addElement(displayObj, this._curPosX, this._curPosY + this.config.labelStyle.fontSize / 2 + this.config.labelStyle.fontSize / 10);
        this.addElement(label, this._curPosX + this.config.optionPaddingX, this._curPosY);
        this._curPosX += label.width + this.config.optionPaddingX * 2;

        //添加到选项数组
        interactObj.name = this._optionId;
        let option = {
            id: this._optionId++,
            groupId: this._groupId - 1,
            text: item.trim(),
            selected: false,
            displayObj: displayObj as vf.gui.Rect,
            interactObj: interactObj as vf.gui.DisplayObject,
            label: label,
        };
        this._optionList.push(option);
    }

    /**
     * 处理验证阶段的选项
     */
    private dealCheckedOption(item: string) {
        item = item.replace(/[\{\}]/g, " ");
        let label = this.createLabel(item);
        let _width = 0;
        if (this._optionStatusList[this._optionId].status == "selected_right" ||
            this._optionStatusList[this._optionId].status == "selected_wrong") {
            //需要额外添加一个图标的宽度
            _width = this.config.labelStyle.fontSize / 4 + this.config.optionIconSize;
        }
        if (_width + label.width  + this.config.optionPaddingX * 2 + this._curPosX > this.config.containerWidth) {
            //超过了，直接折行
            this._curPosY += this.config.labelStyle.lineHeight;
            this._curPosX = 0;
        }
        let displayObj: any = null;
        let interactObj: any = null;
        let status = this._optionStatusList[this._optionId].status;
        displayObj = this.createRect(label.width + _width + this.config.optionPaddingX * 2, this.config.labelStyle.fontSize + this.config.optionPaddingY * 2);
        this.addElement(
            displayObj,
            this._curPosX,
            this._curPosY + this.config.labelStyle.fontSize / 2 + this.config.labelStyle.fontSize / 10
        );
        if (status == "selected_right") {
            label.style.color = 0xffffff;
            let icon = this.createImage(this.config.optionRightIcon);
            displayObj.color = displayObj.lineColor = this.config.optionRightColor;
            this.addElement(
                icon,
                this._curPosX + label.width + this.config.optionPaddingX,
                this._curPosY + this.config.labelStyle.fontSize / 2 + this.config.labelStyle.fontSize / 10
            );
        } else if (status == "selected_wrong") {
            label.style.color = 0xffffff;
            let icon = this.createImage(this.config.optionWrongIcon);
            displayObj.color = displayObj.lineColor = this.config.optionWrongColor;
            this.addElement(
                icon,
                this._curPosX + label.width + this.config.optionPaddingX,
                this._curPosY + this.config.labelStyle.fontSize / 2 + this.config.labelStyle.fontSize / 10
            );
        } else if (status == "unselected_right") {
            // let icon = this.createImage(this.config.optionRightMissingIcon);
            // this.addElement(
            //     icon,
            //     this._curPosX + label.width + this.config.optionPaddingX,
            //     this._curPosY + this.config.labelStyle.fontSize / 2 + this.config.labelStyle.fontSize / 10
            // );
        } else if (status == "unselected_wrong") {
        }
        this.addElement(label, this._curPosX + this.config.optionPaddingX, this._curPosY);
        this._curPosX += _width + label.width + this.config.optionPaddingX * 2;
        this._optionId++;
    }

    /**
     * 答题结果验证
     */
    private dealCheckResult() {
        this._optionStatusList = [];
        for (let i = 0; i < this._optionList.length; ++i) {
            let option = this._optionList[i];
            let optionStatus: any = {};
            this._optionStatusList.push(optionStatus);
            if (option.selected) {
                this._resultKeyArr.push(this.config.selectOption[option.id].key);
                if (this.config.optionType == "radio") {
                    if (this._optionAnswer[option.groupId] == this.config.selectOption[option.id].key) {
                        optionStatus.status = "selected_right";
                    } else {
                        optionStatus.status = "selected_wrong";
                    }
                } else {
                    if (this._optionAnswer.includes(this.config.selectOption[option.id].key)) {
                        optionStatus.status = "selected_right";
                    } else {
                        optionStatus.status = "selected_wrong";
                    }
                }
            } else {
                if (this.config.optionType == "radio") {
                    if (this._optionAnswer[option.groupId] == this.config.selectOption[option.id].key) {
                        optionStatus.status = "unselected_right";
                    } else {
                        optionStatus.status = "unselected_wrong";
                    }
                } else {
                    if (this._optionAnswer.includes(this.config.selectOption[option.id].key)) {
                        optionStatus.status = "unselected_right";
                    } else {
                        optionStatus.status = "unselected_wrong";
                    }
                }
            }
        }

        this.emit("RESULT", this, {keys: this._resultKeyArr}); //验证结果完成，回调
    }
    /**
     * 处理文本
     * @param flag  //是否遇难后直接折行
     */
    private dealText(text: string, flag: boolean = false) {
        //如果不是/,则选项组id+1,否则认为接下来的选项属于同一个组
        if (flag && text.trim() != "/") {
            this._groupId++;
        }
        if (text == "") {
            return;
        }
        let label = this.createLabel(text);
        if (text.indexOf("\n") !== -1) {
            //有换行符
            label.release();
            let arr = text.split("\n");
            for (let i = 0; i < arr.length; ++i) {
                this.dealText(arr[i], false);
                if (i !== arr.length - 1) {
                    this._curPosY += this.config.labelStyle.lineHeight;
                    this._curPosX = 0;
                }
            }
        } else if (this._curPosX + label.width > this.config.containerWidth) {
            //判断label是否需要折行
            if (flag) {
                label.release();
                //简单的方法是按空格截一下，暂时先这样，如果有性能问题再换其他方法
                text = text.replace(/ /g, " *_#");
                let arr: string[] = text.split("*_#");
                arr.forEach((item) => {
                    this.dealText(item, false);
                });
            } else {
                this._curPosX = 0;
                this._curPosY += this.config.labelStyle.lineHeight;
                this.addElement(label, this._curPosX, this._curPosY);
                this._curPosX += label.width;
            }
        } else {
            this.addElement(label, this._curPosX, this._curPosY);
            this._curPosX += label.width;
        }
    }

    private addElement(element: vf.gui.DisplayObject, left: number, top: number) {
        element.style.left = left;
        element.style.top = top;
        this.addChild(element);
    }

    private createLabel(text: string) {
        const label = new vf.gui.Label();
        label.text = text;
        label.fontCssStyle = this.config.labelStyle;
        label.validateSize();
        return label;
    }

    private createRect(width: number, height: number) {
        const rect = new vf.gui.Rect();
        rect.anchorY = 0.5;
        rect.style.width = width - this.config.optionBoardLineWidth;
        rect.style.height = height - this.config.optionBoardLineWidth;
        rect.color = this.config.optionBackgroundColor;
        rect.radius = this.config.optionBackgroundRadius; //圆角
        rect.lineColor = this.config.optionBoardColor;
        rect.lineWidth = this.config.optionBoardLineWidth;


        //再加一层选中时的边框的
        const rect1 = new vf.gui.Rect();
        rect1.lineColor = this.config.optionSelectedBoardColor;
        rect1.lineWidth = this.config.optionSelectedBoardLineWidth;
        rect1.anchorY = 0.5;
        rect1.style.width = width - this.config.optionSelectedBoardLineWidth;
        rect1.style.height = height - this.config.optionSelectedBoardLineWidth;
        rect1.color = this.config.optionSelectedBackgroundColor;
        rect1.radius = this.config.optionSelectedBackgroundRadius; //圆角
        rect1.x = this.config.optionSelectedBoardLineWidth / 2;
        rect1.visible = false;
        rect.addChild(rect1);
        return rect;
    }

    private createImage(src: string | number) {
        const img = new vf.gui.Image();
        img.src = src;
        img.width = this.config.optionIconSize;
        img.height = this.config.optionIconSize;
        img.anchorX = 0;
        img.anchorY = 0.5;
        img.validateSize();
        return img;
    }
}
