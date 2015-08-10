"use strict";

(function() {
    if (Warehouse.isDisabling()) {
        Utils.exitDisablingStatus();
    } else {
        var disabledElements = Detect.getDisabledElements();
        var rects = Utils.getElementsRectLists(disabledElements);
        var enablerButtons = ElementFactory.createEnablerButtons(rects, disabledElements);
        // var enablerIndicators = ElementFactory.createEnablerIndicators(rects, disabledElements);
        Warehouse.disabling = true;
    }
})();
