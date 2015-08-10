"use strict";

var ElementFactory = {
    createEnablerCallback: function(disabledElements, thisEnablerButton) {
        return function() {
            var id = thisEnablerButton.id;
            var number = parseInt(id.substring(id.search(/\d/)));
            if (disabledElements[number].attributes.getNamedItem('disabled')) {
                disabledElements[number].attributes.removeNamedItem('disabled');
                thisEnablerButton.style.animation = 'disappear 1s';
                ElementFactory.addAnimationendListener(thisEnablerButton);
            }
        }.bind(this);
    },
    createEnablerButtons: function(rectLists, disabledElements) {
        var enablerButtons = [];
        var enablerContainerDiv = document.createElement('div');
        enablerContainerDiv.id = 'enabler-container';
        for (var i = 0; i < rectLists.length; i++) {
            var rect = rectLists[i][0];
            var enablerButton = document.createElement('button');
            // Temporarily use hard coded css to avoid reloading page
            enablerButton.className = 'enabler-button';
            enablerButton.id = 'enabler-button' + i;
            enablerButton.style.left = rect.left + window.scrollX + "px";
            enablerButton.style.top = rect.top + window.scrollY  + "px";
            enablerButton.style.width = rect.width + "px";
            enablerButton.style.height = rect.height + "px";
            enablerContainerDiv.appendChild(enablerButton);
            enablerButton.addEventListener('click', this.createEnablerCallback(disabledElements, enablerButton));
            enablerButtons.push(enablerButton);
        }
        document.documentElement.appendChild(enablerContainerDiv);
        return enablerButtons;
    },
    createEnablerIndicators: function(rectLists, disabledElements) {
        var enablerIndicators = [];
        var INDICATOR_WIDTH = 5
        for (var i = 0; i < rectLists.length; i++) {
            var rect = rectLists[i][0];
            var enablerIndicator = document.createElement('div');
            // Temporarily use hard coded css to avoid reloading page
            enablerIndicator.className = 'enabler-indicator';
            enablerIndicator.id = 'enabler-indicator' + i;
            enablerIndicator.style.left = rect.left + 3 + window.scrollX + "px";
            // minus half of the height
            enablerIndicator.style.top = rect.top + rect.height / 2 - INDICATOR_WIDTH + window.scrollY  + "px";
            enablerIndicator.style.width = rect.width + "px";
            enablerIndicator.style.borderTopWidth = INDICATOR_WIDTH + "px";
            enablerIndicator.style.borderBottomWidth = INDICATOR_WIDTH + "px";
            enablerIndicator.style.borderRightWidth = INDICATOR_WIDTH + "px";
            document.documentElement.appendChild(enablerIndicator);
            enablerIndicators.push(enablerIndicator);
            // setInterval(this.createEnablerIndicatorAnimation, 1);
        }
        return enablerIndicators;
    },
    addAnimationendListener: function(element) {
        var removeElement = function(event) {
            if (event.animationName === 'disappear') {
                event.target.parentNode.removeChild(event.target);
            }
        };
        element.addEventListener('animationend', removeElement);
    }
}
