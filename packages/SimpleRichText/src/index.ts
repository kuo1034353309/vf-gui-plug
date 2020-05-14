export class SimpleRichText extends vf.gui.DisplayObject{
    public constructor() {
        super();
    }

    private _curPosX: number = 0; //当前行的起始位置x
    private _curPosY: number = 25; //当前行的起始位置y
    

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
     * 组件样式
     */
    private _compStyle: any = {
        lineHeight: 80,
        fontSize: 22,
        textColor: 0x586176
    }

    public set compStyle(value: any){
        this._compStyle = Object.assign(this._compStyle, value);
    }

    public get compStyle(){
        return this._compStyle;
    }

    private parseText(){
        //找最外层的< 和 />
        let checkIndexArr = this.parseBlock();
        if(checkIndexArr[0] != 0){
            checkIndexArr.unshift(0);
        }
        let elementArr = [];
        for(let i = 0; i < checkIndexArr.length; ++i){
            let element = '';
            if(i != checkIndexArr.length - 1){
                element = this.text.substring(checkIndexArr[i], checkIndexArr[i+1]);
            }
            else{
                element = this.text.substring(checkIndexArr[i]);
            }
            elementArr.push(element);
        }
        console.log('ziye----', elementArr);
        elementArr.forEach(item => {
            //判断是否带< />
            if(item.indexOf('<') !== -1 && item.indexOf('/>') !== -1){
                //块级元素
                this.dealBlock(item);
            }
            else{
                //纯文本
                this.dealText(item, true);
            }
        })
    }   

    /**
     * 处理块级元素
     */
    private dealBlock(item: string){
        //掐头去尾改成{}就是个对象了
        item = item.slice(1, item.length - 2);
        console.log(item);
        item = '{' + item + '}';
        console.log(item);
        let blockObj = JSON.parse(item);
    }

    /**
     * 处理文本
     * @param flag  //是否遇难后直接折行
     */
    private dealText(text: string, flag: boolean = false) {
        let label = this.createLabel(text, this.compStyle);
        if (text.indexOf("\n") !== -1) {
            //有换行符
            let arr = text.split("\n");
            for (let i = 0; i < arr.length; ++i) {
                this.dealText(arr[i], false);
                if (i !== arr.length - 1) {
                    this._curPosY += this.compStyle.lineHeight;
                    this._curPosX = 0;
                }
            }
        } else if (this._curPosX + label.width > this.compStyle.containerWidth) {
            //判断label是否需要折行
            if (flag) {
                //TODO:label需要释放
                //简单的方法是按空格截一下，暂时先这样，回头有性能问题再换其他方法
                text = text.replace(" ", " *_#");
                let arr: string[] = text.split("*_#");
                arr.forEach((item) => {
                    this.dealText(item, false);
                });
            } else {
                this._curPosX = 0;
                this._curPosY += this.compStyle.lineHeight;
                this.addElement(label, this._curPosX, this._curPosY);
                this._curPosX += label.width;
            }
        } else {
            this.addElement(label, this._curPosX, this._curPosY);
            this._curPosX += label.width;
        }
    }

    private parseBlock(){
        let startIndexArr = [];
        let checkedIndexArr = [];
        for(let i = 0; i < this.text.length; ++i){
            if(this.text[i] == '<'){
                startIndexArr.push(i);
            }
            else if(this.text[i] == '>' && this.text[i-1] == '/'){
                if(startIndexArr.length == 1){
                    //配对成功
                    checkedIndexArr.push(startIndexArr[0]);
                    checkedIndexArr.push(i+1);
                }
                //移出一个
                startIndexArr.pop();
            }
        }
        return checkedIndexArr;
    }

    private createRect(style: any) {
        const rect = new vf.gui.Rect();
        rect.style.width = style.width || 100;
        rect.style.height = style.height || 50;
        rect.color = style.color || 0xffffff;
        rect.lineColor = style.lineColor || 0xffffff;
        rect.lineWidth = style.lineWidth || 1;
        rect.radius = style.radius || 0; //圆角
        rect.alpha = style.alpha || 1;
        return rect;
    }

    private addElement(element: vf.gui.DisplayObject, left: number, top: number) {
        element.style.left = left;
        element.style.top = top;
        this.addChild(element);
    }

    private createLabel(text: string, style: any) {
        const label = new vf.gui.Label();
        label.text = text;
        label.style.lineHeight = style.lineHeight;
        label.style.fontSize = style.fontSize;
        label.style.color = style.textColor;
        label.validateSize();
        return label;
    }
}