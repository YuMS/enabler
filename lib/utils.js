"use strict";

var Utils = {
    getElementsRectLists: function(elements) {
        var rectLists = [];
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var rects = element.getClientRects();
            console.log(rects[0].left, rects[0].top, rects[0].width, rects[0].height);
            rectLists.push(rects);
        }
        return rectLists;
    },
    findEnablerContainer: function() {
        return document.querySelectorAll('#enabler-container');
    },
    exitDisablingStatus: function() {
        var enablerContainer = this.findEnablerContainer();
        enablerContainer.remove();
        Warehouse.disabling = false;
    }
}
