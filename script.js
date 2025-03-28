const indexWithinArray = (index, array) => index > -1 && index < array.length;

class Container {
  constructor(name) {
    this.name = name;
    this.items = [];
    this.weight = 0;
  }

  describe() {
    return `${this.name} has ${this.items.length} items and weighs ${this.weight}lbs in total.`;
  }

  addItem(item) {
    if (item instanceof Item) {
      this.items.push(item);
      this.weight += item.weight;
    }
    else {
      throw new Error(`attempted to add invalid item: ${item}`);
    }
  }

  removeItem(index) {
    if (indexWithinArray(index, this.items)) {
      this.weight -= this.items[index].weight;
      this.items.splice(index, 1);
    } else {
      console.log(`Invalid item index: ${index}`);
    }
  }
}

class Item {
  constructor(name, weight) {
    this.name = name;
    if(isNaN(weight)) throw new Error(`Attempted to create item with invalid weight: ${this.weight}`);
    else this.weight = weight;
  }

  describe() {
    return `${this.name} weighs ${this.weight}lbs.`;
  }
}

class Menu {
  constructor() {
    this.containers = [];
    this.selectedContainer = null;
  }

  start() {
    let selection = this.showOptions("main");
    while (selection != 0) {
      switch (selection) {
        case "1":
          this.createContainer();
          break;
        case "2":
          this.viewContainer();
          break;
        case "3":
          this.deleteContainer();
          break;
        case "4":
          this.displayContainers();
          break;
        default:
          selection = 0;
      }
      selection = this.showOptions("main");
    }
    alert("Goodbye!");
  }

  // displays an option menu, with an optional prefix for information
  showOptions(menu, prefix = "") {
    let instructions = null;
    switch (menu) {
      case "main":
        instructions = "0) exit\n"
        + "1) create a new container\n"
        + "2) view a container\n"
        + "3) delete a container\n"
        + "4) display all containers\n";
        break;
      case "viewcontainer":
        instructions = "0) exit\n"
        + "1) add item\n"
        + "2) remove item\n";
        break
      default: // in case of an unset menu
        throw new Error(`unknown option menu: ${menu}`);
    }
    return prompt(`${prefix}${instructions}`);
  }

  createContainer() {
    let name = prompt("Enter name for new container: ");
    this.containers.push(new Container(name));
  }

  viewContainer() {
    let index = prompt("Enter the index of the container you wish to view:");
    if (indexWithinArray(index, this.containers)) {
      this.selectedContainer = this.containers[index];
      let selection = null;
      while (selection != 0) {
        let description = `Container name: ${this.selectedContainer.name}\n${this.selectedContainer.describe()}\n`;
        for (let i = 0; i < this.selectedContainer.items.length; i++) {
          description += `${i}) ${this.selectedContainer.items[i].describe()}\n`;
          console.log(this.selectedContainer.items[i]);
        }
        description += "-------------------------------\n";
        selection = this.showOptions("viewcontainer", description);
        switch (selection) {
          case "1":
            this.addItem();
            break;
          case "2":
            this.removeItem();
            break;
          default:
            selection = 0;
        }
      }
    } else {
      console.log(`Invalid container delay index ${index}`);
    }
  }

  addItem() {
    let name = prompt("Enter item name: ");
    let weight = Number(prompt("Enter weight for new item in lbs: "));
    this.selectedContainer.addItem(new Item(name, weight));
  }

  removeItem() {
    this.selectedContainer.removeItem(prompt("Enter the index of the item to delete: "));
  }

  deleteContainer() {
    let index = prompt("Enter the index of the container to delete: ");
    if (indexWithinArray(index, this.containers)) {
      this.containers.splice(index, 1);
    } else {
      console.log(`Invalid container index: ${index}`);
    }
  }

  displayContainers() {
    let output = "";
    for (let i = 0; i < this.containers.length; i++) {
      output += `${i}) ${this.containers[i].name}, weighing ${this.containers[i].weight} lbs\n`;
    }
    alert(output);
  }
}

let menu = new Menu();
menu.start();