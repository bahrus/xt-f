import {xc, PropDef, PropAction, PropDefMap, IReactor, ReactiveSurface} from 'xtal-element/lib/XtalCore.js';
import {applyMixins} from 'xtal-element/lib/applyMixins.js';
import {GroupedSiblings} from 'xtal-element/lib/GroupedSiblings.js';
export class XtF extends HTMLElement implements ReactiveSurface{
    static is = 'xt-f';
    self = this;
    propActions = propActions;
    reactor: IReactor = new xc.Rx(this);

    pipedChunk: DocumentFragment | Element | undefined | NodeListOf<Element> | Element[];

    startAnew: boolean | undefined;

    connectedCallback(){
        xc.mergeProps(this, slicedPropDefs);
    }
    onPropChange(n: string, prop: PropDef, nv: any){
        this.reactor.addToQueue(prop, nv);
    }
    disconnectedCallback(){
        if(!this._doNotCleanUp) this.groupedRange?.deleteContents();
    }
}

const onPipedChunk = ({pipedChunk, self}: XtF) => {
    if(pipedChunk instanceof HTMLTemplateElement){
        const documentFragment = pipedChunk.content.cloneNode(true);
        appendFragment(documentFragment as DocumentFragment, self);
    }else if(pipedChunk instanceof Element){
        appendEl(pipedChunk, self);
    }else if(Array.isArray(pipedChunk)){
        appendArray(pipedChunk, self);
    }else if(pipedChunk instanceof NodeList){
        appendArray(Array.from(pipedChunk), self);
    }
};

const onStartAnew = ({startAnew, self}: XtF) => {
    self.groupedRange?.deleteContents();
};
const propActions = [onPipedChunk, onStartAnew] as PropAction[];

const propDefMap: PropDefMap<XtF> = {
    pipedChunk: {
        type: Object,
        stopReactionsIfFalsy: true,
    },
    startAnew: {
        type: Boolean,
        stopReactionsIfFalsy: true,
    }
};



function appendArray(ar: Element[], self: XtF){
    ar.forEach(el => {
        appendEl(el, self);
    })
}

function appendFragment(f: DocumentFragment, self: XtF){
    Array.from(f.children).forEach(child => {
        appendEl(child, self);
    })
}

function appendEl(el: Element, self: XtF){
    const elToAppendTo = self.lastGroupedSibling === undefined ? self : self.lastGroupedSibling;
    elToAppendTo.insertAdjacentElement('afterend', el);
    self.lastGroupedSibling = el;
}

const slicedPropDefs =  xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(XtF, slicedPropDefs, 'onPropChange');
applyMixins(XtF, [GroupedSiblings]);
xc.define(XtF);

export interface XtF extends GroupedSiblings{}