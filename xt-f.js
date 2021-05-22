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
        this.style.display = 'none';
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
const onPipedChunk = ({ pipedChunk, self }) => {
    if (pipedChunk instanceof HTMLTemplateElement) {
        const documentFragment = pipedChunk.content.cloneNode(true);
        appendFragment(documentFragment, self);
    }
    else if (pipedChunk instanceof Element) {
        appendEl(pipedChunk, self);
    }
    else if (Array.isArray(pipedChunk)) {
        appendArray(pipedChunk, self);
    }
    else if (pipedChunk instanceof NodeList) {
        appendArray(Array.from(pipedChunk), self);
    }
};
const onStartAnew = ({ startAnew, self }) => {
    self.groupedRange?.deleteContents();
};
const propActions = [onPipedChunk, onStartAnew];
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
function appendArray(ar, self) {
    ar.forEach(el => {
        appendEl(el, self);
    });
}
function appendFragment(f, self) {
    Array.from(f.children).forEach(child => {
        appendEl(child, self);
    });
}
function appendEl(el, self) {
    const elToAppendTo = self.lastGroupedSibling === undefined ? self : self.lastGroupedSibling;
    elToAppendTo.insertAdjacentElement('afterend', el);
    self.lastGroupedSibling = el;
}
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(XtF, slicedPropDefs, 'onPropChange');
applyMixins(XtF, [GroupedSiblings]);
xc.define(XtF);
