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
const propActions = [] as PropAction[];

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

const slicedPropDefs =  xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(XtF, slicedPropDefs, 'onPropChange');
applyMixins(XtF, [GroupedSiblings]);
xc.define(XtF);

export interface XtF extends GroupedSiblings{}