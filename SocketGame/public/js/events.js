const BUTTON_DOWN = -1;
const BUTTON_HOLD = 0;
const BUTTON_UP = 1;

const 

function EventButton(buttonId, type) {
    var self = {};

    self.buttonId = buttonId;
    self.type = type;

    return self;
}

// TODO: add more events with controller complexity