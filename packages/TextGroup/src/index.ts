
export class TextGroup extends vf.gui.DisplayObject {
    public constructor() {
        super();
    }

    private _optionList: any[] = []; //选项数组,{id,text, displayObject}
    private _originBlockTextList: string[] = []; //原始文本拆分后的list
    private _curPosX: number = 0; //当前行的起始位置x
    private _curPosY: number = 25; //当前行的起始位置y
    private _optionId: number = 0; //选项id
    private _groupId: number = 0; //radio时选项组


    private _optionType: string = "single"; //single-单选   multiple-多选   radio-选项互斥   blank-填空
    public set optionType(value: string) {
        this._optionType = value;
    }

    /**
     * 每个选项的状态
     * {
     *  id:0
     *  status: 'selected_right' //selected_right-选中且为正确项  selected_wrong-选中且为错误项  unselected_right-未选中且为正确项  unselected_wrong-未选中且为错误项
     * }
     */
    private _optionStatusList: any[] = [];
    public set optionStatusList(value: any){
        this._optionStatusList = vf.gui.Utils.deepCopy(value);
    }

    /**
     * 组件样式
     */
    private _config: any = {
        lineHeight: 80,
        fontSize: 22,
        textColor: 0x586176,
        textSelectedColor: 0x5161bb,
        optionBackgroundColor: 0xe9ecfe,
        optionBoardColor: 0x7487ef,
        optionPaddingX: 20,
        optionPaddingY: 15,
        optionMarginX: 20,
        optionMarginY: 15,
        containerWidth: 1000,
        optionBoardLineWidth: 2,
        optionBlankLineWidth: 5,
        optionRightColor: 0x00ff00,
        optionWrongColor: 0xff0000,
        optionRightIcon: './assets/right.png',
        optionWrongIcon: './assets/wrong.png',
        optionRightMissingIcon: './assets/right-miss.png',
        optionIconSize: 15
    }

    public set config(value: any){
        this._config = Object.assign(this._config, value);
    }

    public get config(){
        return this._config;
    }

    /**
     * 文本内容
     */
    private _text: string = "";
    public set text(value: string) {
        this._text = value;
        this.parseText();
    }
    public get text() {
        return this._text;
    }

    /**
     */
    private _selectedOptionId: number = 0;
    public set selectedOptionId(value: number) {
        this._selectedOptionId = value;
        this.checkOptionSelected(value);
    }

    private reset(){
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
                if(this._optionStatusList.length > 0){
                    //选项验证,不可点击
                    this.dealCheckedOption(item);
                }
                else{
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
    }

    private onClick() {
        let id: number = parseInt(arguments[1].name);
        this.checkOptionSelected(id);
    }

    private checkOptionSelected(id: number) {
        if(this._optionList.length == 0) return;
        //无论如何能找到对应的id
        let option = this._optionList.find((item) => {
            return item.id == id;
        });

        //判断是单选还是多选
        if (this._optionType == "single") {
            //已经选中的重置
            let selectedOption = this._optionList.find((item) => {
                return !!item.selected;
            });
            
            if (selectedOption) {
                if(selectedOption.id == id) return;
                this.onUnSelected(selectedOption);
            }

            this.onSelected(option);
        } else if (this._optionType == "multiple") {
            if (option.selected) {
                //已选中，重置状态
                this.onUnSelected(option);
            } else {
                this.onSelected(option);
            }
        } else if (this._optionType == "radio") {
            //互斥型的，找到同一组的，重置状态
            for(let i = 0; i < this._optionList.length; ++i){
                let groupOption = this._optionList[i];
                if(groupOption.id != id && groupOption.groupId == option.groupId && groupOption.selected){
                    this.onUnSelected(groupOption);
                }
            }

            //自己选中状态
            if(!option.selected){
                this.onSelected(option);
            }
        } else if (this._optionType == "blank") {
            //已经选中的重置
            let selectedOption = this._optionList.find((item) => {
                return !!item.selected;
            });
            if (selectedOption) {
                if(selectedOption.id == id) return;
                this.onUnSelected(selectedOption);
            }
            this.onSelected(option);
        }
    }

    /**
     * 选项选中
     */
    private onSelected(option: any) {
        option.selected = true;
        let rect = option.displayObj as vf.gui.Rect;
        rect.getChildAt(0).visible = true;
        if(this._optionType != 'blank'){
            option.label.style.color = this.config.textSelectedColor;
        }

        let data = {
            id: option.id,
            text: option.text,
            selected: option.selected,
        };
        //抛出事件
        this.emit('OPTION_CHANGE', this, data);
    }

    /**
     * 取消选中
     */
    private onUnSelected(option: any) {
        option.selected = false;
        let rect: vf.gui.Rect = option.displayObj as vf.gui.Rect;
        rect.getChildAt(0).visible = false;
        if(this._optionType != 'blank'){
            option.label.style.color = this.config.textColor;
        }
        
        let data = {
            id: option.id,
            text: option.text,
            selected: option.selected,
        };
        //抛出事件
        this.emit('OPTION_CHANGE', this, data);
    }

    /**
     * 处理选项
     */
    private dealOption(item: string) {
        item = item.replace(/[\{\}]/g, " ");
        let label = this.createLabel(item);
        if (label.width + this._curPosX > this.config.containerWidth) {
            //超过了，直接折行
            this._curPosY += this.config.lineHeight;
            this._curPosX = 0;
        }
        let displayObj: any = null;
        let interactObj: any = null;
        if (this._optionType == "blank") {
            //填空题，默认文字颜色是选中颜色
            label.style.color = this.config.textSelectedColor;
            displayObj = interactObj = this.createLine(label.width);
            this.addElement(displayObj, this._curPosX, this._curPosY + this.config.fontSize + 5);
            interactObj = this.createTransparentRect(label.width, this.config.fontSize + this.config.optionPaddingY * 2);
            this.addElement(interactObj, this._curPosX, this._curPosY - this.config.optionPaddingY);
        } else {
            displayObj = interactObj = this.createRect(label.width + this.config.optionPaddingX * 2, this.config.fontSize + this.config.optionPaddingY * 2);
            this.addElement(displayObj, this._curPosX, this._curPosY + this.config.fontSize / 2);
        }
        //添加到选项数组
        interactObj.name = this._optionId;
        let option = {
            id: this._optionId++,
            groupId: this._groupId,
            text: item,
            selected: false,
            displayObj: displayObj as vf.gui.Rect,
            interactObj: interactObj as vf.gui.DisplayObject,
            label: label
        };
        this._optionList.push(option);

        this.addElement(label, this._curPosX + this.config.optionPaddingX, this._curPosY);
        this._curPosX += label.width + this.config.optionPaddingX * 2;
    }

    /**
     * 处理验证阶段的选项
     */
    private dealCheckedOption(item: string) {
        item = item.replace(/[\{\}]/g, " ");
        let label = this.createLabel(item);
        let _width = 0;
        if(this._optionType != "blank" && this._optionStatusList[this._optionId].status != 'unselected_wrong'){
            //需要额外添加一个图标的宽度
            _width = this.config.fontSize + this.config.optionPaddingX;
        }
        if (_width + label.width + this._curPosX > this.config.containerWidth) {
            //超过了，直接折行
            this._curPosY += this.config.lineHeight;
            this._curPosX = 0;
        }
        let displayObj: any = null;
        let interactObj: any = null;
        let status = this._optionStatusList[this._optionId].status;
        if (this._optionType == "blank") {
            //填空题，正确是绿色，错误是红色且添加删除线
            if(status == 'selected_right' || status == 'unselected_right'){
                label.style.color = this.config.optionRightColor;
            }
            else{
                label.style.color = this.config.optionWrongColor;
                displayObj = this.createLine(label.width);
                displayObj.color = this.config.optionWrongColor;
                this.addElement(displayObj, this._curPosX, this._curPosY + this.config.fontSize / 2);
            }
            this.addElement(label, this._curPosX, this._curPosY);
            this._curPosX += _width + label.width;
        } else {
            displayObj = this.createRect(label.width + _width, this.config.fontSize + this.config.optionPaddingY * 2);
            this.addElement(displayObj, this._curPosX + this.config.optionPaddingX, this._curPosY + this.config.fontSize / 2);
            if(status == 'selected_right'){
                label.style.color = 0xffffff;
                let icon = this.createImage(this.config.optionRightIcon);
                displayObj.color = displayObj.lineColor = this.config.optionRightColor;
                this.addElement(icon, this._curPosX + label.width + this.config.optionPaddingX, this._curPosY + this.config.fontSize / 2 );
            }
            else if(status == 'selected_wrong'){
                label.style.color = 0xffffff;
                let icon = this.createImage(this.config.optionWrongIcon);
                displayObj.color = displayObj.lineColor = this.config.optionWrongColor;
                this.addElement(icon, this._curPosX + label.width + this.config.optionPaddingX, this._curPosY + this.config.fontSize / 2);
            }
            else if(status == 'unselected_right'){
                let icon = this.createImage(this.config.optionRightMissingIcon);
                this.addElement(icon, this._curPosX + label.width + this.config.optionPaddingX, this._curPosY + this.config.fontSize / 2);
            }
            else if(status == 'unselected_wrong'){

            }
            this.addElement(label, this._curPosX + this.config.optionPaddingX, this._curPosY);
            this._curPosX += _width + label.width + this.config.optionPaddingX * 2;
        }
        this._optionId++;
    }

    /**
     * 处理文本
     * @param flag  //是否遇难后直接折行
     */
    private dealText(text: string, flag: boolean = false) {
        //如果不是/,则选项组id+1,否则认为接下来的选项属于同一个组
        if(flag && text.trim() != '/'){
            this._groupId++;
        }
        if(text == ''){
            return;
        }
        let label = this.createLabel(text);
        if (text.indexOf("\n") !== -1) {
            //有换行符
            let arr = text.split("\n");
            for (let i = 0; i < arr.length; ++i) {
                this.dealText(arr[i], false);
                if (i !== arr.length - 1) {
                    this._curPosY += this.config.lineHeight;
                    this._curPosX = 0;
                }
            }
        } else if (this._curPosX + label.width > this.config.containerWidth) {
            //判断label是否需要折行
            if (flag) {
                label.release();
                //简单的方法是按空格截一下，暂时先这样，如果有性能问题再换其他方法
                text = text.replace(" ", " *_#");
                let arr: string[] = text.split("*_#");
                arr.forEach((item) => {
                    this.dealText(item, false);
                });
            } else {
                this._curPosX = 0;
                this._curPosY += this.config.lineHeight;
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
        label.style.lineHeight = this.config.lineHeight;
        label.style.fontSize = this.config.fontSize;
        label.style.color = this.config.textColor;
        label.validateSize();
        return label;
    }

    private createRect(width: number, height: number) {
        const rect = new vf.gui.Rect();
        rect.lineColor = this.config.optionBackgroundColor;
        rect.lineWidth = 0;
        rect.anchorY = 0.5;
        rect.style.width = width;
        rect.style.height = height;
        rect.color = this.config.optionBackgroundColor;
        rect.radius = this.config.optionBackgroundRadius; //圆角

        //再加一层边框的
        const rect1 = new vf.gui.Rect();
        rect1.lineColor = this.config.optionBoardColor;
        rect1.lineWidth = this.config.optionBoardLineWidth;
        rect1.anchorY = 0.5;
        rect1.style.width = width - this.config.optionBoardLineWidth;
        rect1.style.height = height - this.config.optionBoardLineWidth;
        rect1.color = this.config.optionBackgroundColor;
        rect1.radius = this.config.optionBackgroundRadius; //圆角
        rect1.x = this.config.optionBoardLineWidth / 2;
        rect1.visible = false;
        rect.addChild(rect1);
        return rect;
    }

    private createTransparentRect(width: number, height: number) {
        const rect = new vf.gui.Rect();
        rect.style.width = width;
        rect.style.height = height;
        rect.color = 0xffffff;
        rect.alpha = 0.01;
        return rect;
    }

    private createLine(width: number) {
        const rect = new vf.gui.Rect();
        rect.style.width = width;
        rect.style.height = this.config.optionBlankLineWidth;
        rect.color = this.config.optionBackgroundColor;

        const rect1 = new vf.gui.Rect();
        rect1.style.width = width;
        rect1.style.height = this.config.optionBoardLineWidth;
        rect1.color = this.config.optionBoardColor;
        rect1.visible = false;
        rect.addChild(rect1);
        return rect;
    }

    private createImage(src: string| number){
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
