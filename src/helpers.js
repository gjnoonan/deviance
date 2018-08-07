function hasProperty(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
}

export { hasProperty };
