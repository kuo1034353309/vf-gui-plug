var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TestButton = /** @class */ (function (_super) {
        __extends(TestButton, _super);
        function TestButton(text) {
            if (text === void 0) { text = ""; }
            var _this = _super.call(this) || this;
            _this._text = '';
            _this.sprite = new PIXI.Text(text, { breakWords: true, fill: "#ffffff" }); //PIXI基础组件
            _this.container.addChild(_this.sprite); //容器
            return _this;
        }
        Object.defineProperty(TestButton.prototype, "text", {
            /**
             * 文本内容
             */
            get: function () {
                return this._text;
            },
            set: function (value) {
                this._text = value;
                this.invalidateSize();
                this.invalidateDisplayList(); //触发更新显示列表
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 更新显示列表
         * @param unscaledWidth
         * @param unscaledHeight
         */
        TestButton.prototype.updateDisplayList = function (unscaledWidth, unscaledHeight) {
            _super.prototype.updateDisplayList.call(this, unscaledWidth, unscaledHeight);
            this.sprite.text = this._text;
        };
        TestButton.prototype.release = function () {
            _super.prototype.release.call(this);
            var sprite = this.sprite;
            if (sprite && sprite.parent) {
                sprite.parent.removeChild(sprite).destroy();
            }
            this.offAll();
        };
        return TestButton;
    }(gui.DisplayObject));
    exports.TestButton = TestButton;
});
//# sourceMappingURL=TestButton.js.map