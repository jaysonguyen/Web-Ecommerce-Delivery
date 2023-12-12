class MultiItem {
  constructor(value, label, selected) {
    this.value = value;
    this.label = label;
    this.selected = selected;
  }

  initData(value, label, selected) {
    this.value = value;
    this.label = label;
    this.selected = selected;
  }

  getLabel() {
    return this.label;
  }

  setSelected() {
    this.selected = !this.selected;
  }
}
