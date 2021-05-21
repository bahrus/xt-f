# xt-f [TODO]

xt-f is a web component.  The f stands for "fragment.". The xt can stand for "external", "existential", "XmlStream" -- whatever makes it easier to remember.  

It provides an api, so that fragments can be passed in and managed, keeping things flat.

Combined with [sceadu-fæx](https://github.com/bahrus/sceadu-fax)[TODO], it can behave similar (but certainly not identical) to the slot element within shadow DOM, though it's scope may be more limited.

## Syntax

```html
<!-- Petalia Notation -->
<xt-f -template-chunk -start-anew></xt-f>
```

Property templateChunk can either be a DocumentFragment, an Element, or a Template.  In the case of a template, it is first cloned into a DocumentFragment.

When the property is set (or changed), the externally provided content is appended to a flat range of siblings after the xt-f element.

If xt-f is removed from the live DOM tree, the content it manages follows the same fate.

**NB:**  This component might not play well with other rendering libraries. For a rendering library to be compatible with this component, it must use the following API:

1.  If the contents "grouped" by xt-f need to be moved to a new location in the DOM tree, this should be done via newDestination.appendChild($0.extractContents()) where $0 is the instance of xt-f.
2.  The rendering library may need to skip over the grouped siblings when updating the DOM, via $0.nextUngroupedSibling, where $0 is the instance of xt-f.

Property startAnew is a boolean (that can be repeatedly set to true), that clears the contents.

