const Order = {
  order_id: "3d3b3ed3-fb59-4b32-98b2-7c861b2b29b0",
  action_name: "accept",
  receiver: "thao my",
  address: "le duc tho, go vap",
  product_type_name: "type number one",
  product: "khan tam",
  cost: 0.0,
  total_cost: 0.0,
  collect_money: false,
  created: "2023-11-03T12:47:54.070123",
  updated: "2023-11-03T12:47:54.070123",
  user_name: "user number one",
};

export class OrderModel {
  constructor(json) {
    this.order_id = json.order_id;
    this.order_code = json.order_code;
    this.action_name = json.action_name;
    this.product_type_name = json.product_type_name;
    this.collect_money = json.collect_money;
    this.created = json.created;
    this.updated = json.updated;
    this.user_name = json.user_name;
    this.receiver = JSON.parse(json.receiver);
    this.product = JSON.parse(json.product);
  }
}
