export class TestButton extends vf.gui.DisplayObject{

    public constructor(text = "") {
        super();
        
        this.sprite = new vf.Text(text,{breakWords : true,fill:"#ffffff"}); //VF基础组件
        this.container.addChild(this.sprite); //容器

    }

    public readonly sprite: vf.Text;
    private _text:string = '';
    /**
     * 文本内容
     */
    public get text() {
        return this._text;
    }
    public set text(value) {
        this._text = value;
        this.invalidateSize();
        this.invalidateDisplayList(); //触发更新显示列表
        this.alpha
    }

    /**
     * 更新显示列表
     * @param unscaledWidth 
     * @param unscaledHeight 
     */
    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void {
        super.updateDisplayList(unscaledWidth,unscaledHeight);
        this.sprite.text = this._text;
    }

    public release(){
        super.release();
        const sprite = this.sprite;
        if(sprite && sprite.parent){
            sprite.parent.removeChild(sprite).destroy();
        }
        this.offAll();
    }
}