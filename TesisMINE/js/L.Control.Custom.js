L.Control.Custom = L.Control.extend({
    options: {
        position: 'bottomleft'
    },

    onAdd: function (map) {
        map.customControl = this;
        return L.DomUtil.create('div', 'my-custom-control');
    },

    onRemove: function (map) {
    delete map.customControl;
    }

});

L.control.custom = function (options) {
    return new L.Control.Custom(options);
};

L.Map.include({
  hasCustomControl: function () {
    return (this.customControl) ? true : false;
  }
});