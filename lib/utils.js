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
    createEnablerButtons: function(rectLists, disabledElements) {
        var enablerButtons = [];
        for (var i = 0; i < rectLists.length; i++) {
            var rect = rectLists[i][0];
            console.log(rect.left, rect.top, rect.width, rect.height);
            var enablerButton = document.createElement('button');
            // Temporarily use hard coded css to avoid reloading page
            enablerButton.className = 'enabler-button';
            enablerButton.id = 'enabler-button' + i;
            enablerButton.style.left = rect.left + window.scrollX + "px"
            enablerButton.style.top = rect.top + window.scrollY  + "px"
            enablerButton.style.width = rect.width + "px"
            enablerButton.style.height = rect.height + "px"
            document.documentElement.appendChild(enablerButton);
            enablerButtons.push(enablerButton);
            enablerButton.addEventListener('click', this.createEnablerCallback(disabledElements, enablerButton));
        }
        return enablerButtons;
    },
    findEnablerButtons: function() {
        return document.querySelectorAll('.enabler-button');
    },
    createEnablerCallback: function(disabledElements, thisEnablerButton) {
        return function() {
            var id = thisEnablerButton.id;
            var number = parseInt(id.substring(id.search(/\d/)));
            disabledElements[number].attributes.removeNamedItem('disabled');
            this.exitDisablingStatus();
        }.bind(this);
    },
    exitDisablingStatus: function() {
        var enablerButtons = this.findEnablerButtons();
        for (var i = 0; i < enablerButtons.length; i++) {
            var enablerButton = enablerButtons[i];
            enablerButton.remove();
        }
        Storage.disabling = false;
        return true;
    }
}
