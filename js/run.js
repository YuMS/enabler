"use strict";

(function() {
    if (Storage.isDisabling()) {
        Utils.exitDisablingStatus();
    } else {
        var disabledElements = Detect.getDisabledElements();
        var rects = Utils.getElementsRectLists(disabledElements);
        var enablerButtons = Utils.createEnablerButtons(rects, disabledElements);
        Storage.disabling = true;
    }
})();
