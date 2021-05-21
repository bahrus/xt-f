import { xc } from 'xtal-element/lib/XtalCore.js';
import { applyMixins } from 'xtal-element/lib/applyMixins.js';
import { GroupedSiblings } from 'xtal-element/lib/GroupedSiblings.js';
export class XtF extends HTMLElement {
    constructor() {
        super(...arguments);
        this.self = this;
        this.propActions = propActions;
        this.reactor = new xc.Rx(this);
    }
    connectedCallback() {
        xc.mergeProps(this, slicedPropDefs);
    }
    onPropChange(n, prop, nv) {
        this.reactor.addToQueue(prop, nv);
    }
    disconnectedCallback() {
        if (!this._doNotCleanUp)
            this.groupedRange?.deleteContents();
    }
}
XtF.is = 'xt-f';
const propActions = [];
const propDefMap = {
    pipedChunk: {
        type: Object,
        stopReactionsIfFalsy: true,
    },
    startAnew: {
        type: Boolean,
        stopReactionsIfFalsy: true,
    }
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(XtF, slicedPropDefs, 'onPropChange');
applyMixins(XtF, [GroupedSiblings]);
xc.define(XtF);
