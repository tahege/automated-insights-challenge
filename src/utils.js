function cardValueToInteger(value, aceHigh = true) {
    switch(value) {
        case "ACE":
            return aceHigh ? 14 : 1;
        case "KING":
            return 13;
        case "QUEEN":
            return 12;
        case "JACK":
            return 11;
        default:
            return parseInt(value);
    }
}

export {
    cardValueToInteger
}