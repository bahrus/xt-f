export interface XtFProps extends HTMLElement{
    pipedChunk: DocumentFragment | Element | undefined | NodeListOf<Element> | Element[];

    startAnew: boolean | undefined;
}