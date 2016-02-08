var m = angular.module('cart', []);

class CatalogCtrl {
  constructor(catalogItems, cartActions){
    this.cartActions = cartActions;
    this.catalogItems = catalogItems;
  }

  addToCart(catalogItem){
    this.cartActions.addItem(catalogItem);
  }
}

m.controller('CatalogCtrl', CatalogCtrl);

m.value("catalogItems", [
    { id: 1, title: 'item #1', cost: 1},
    { id: 2, title: 'item #2', cost: 2},
    { id: 3, title: 'item #3', cost: 3}
]);

// Actions
var ADD_ITEM = "ADD_ITEM";

m.factory("cartActions", function(dispatcher){
  return {
    addItem(item){
      dispatcher.emit({
        actionType: ADD_ITEM,
        item: item
      });
    }
  };
});

// Dispatcher
class EventEmitter {
  constructor(){
    this.listeners = [];
  }

  emit(event){
    this.listeners.forEach((listener) => {
      listener(event);
    });
  }

  addListener(listener){
    this.listeners.push(listener);
    return this.listeners.length - 1;
  }
}

m.service("dispatcher", EventEmitter);

// Store
class CartStore extends EventEmitter {
  constructor(){
    super();
    this.cartItems = [];
  }

  addItem(catalogItem){
    var items = this.cartItems.filter((i) => i.catalogItem == catalogItem);

    if (items.length == 0){
      this.cartItems.push({
        qty: 1,
        catalogItem: catalogItem
      });
    } else {
      items[0].qty += 1;
    }
  }

  removeItem(cartItem){
    var index = this.cartItems.indexOf(cartItem);
    this.cartItems.splice(index,1);
  }

  emitChange(){
    this.emit("change");
  }
}

m.factory("cartStore", function(dispatcher){
  var cartStore = new CartStore();

  dispatcher.addListener(function(action){
    switch(action.actionType){
      case ADD_ITEM:
        cartStore.addItem(action.item);
        cartStore.emitChange();
        break;
      case REMOVE_ITEM:
        cartStore.removeItem(action.item);
        cartStore.emitChange();
        break;
    }
  });

  // expose only the public interface
  return {
    addListener: (l) => cartStore.addListener(l),
    cartItems: () => cartStore.cartItems
  };
});

// closing the loop
class CartCtrl {
  constructor(cartStore, cartActions){
    this.cartStore = cartStore;
    this.cartActions = cartActions;
    this.resetItems();

    cartStore.addListener(()=>this.resetItems());
  }

  resetItems(){
    this.items = this.cartStore.cartItems();
  }

  remoteItem(item){
    // to be implemented
  }
}

m.controller("CartCtrl", CartCtrl);

module.exports = m;
