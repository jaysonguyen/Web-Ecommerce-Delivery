export function OrderTableFromJson(order) {
  // Ánh xạ key cũ sang key mới
  const newData = {
    "Order Code": order.order_code,
    Status: <div className="order_status">{order.action_name}</div>,
    "Receiver Name": JSON.parse(order.receiver).name,
    Address: JSON.parse(order.receiver).address,
    "ProductType Name": order.product_type_name,
    "Total Cost": order.total_cost,
  };

  // Chuyển đổi kết quả thành JSON mới
  return newData;
}

export function OrderItemFromJson(order) {
  // Ánh xạ key cũ sang key mới
  const newData = {
    order_id: order.order_id,
    order_code: order.order_code,
    action_name: order.action_name,
    user_name: order.user_name,
    receiver: JSON.parse(order.receiver).name,
    address: JSON.parse(order.receiver).address,
    phone: JSON.parse(order.receiver).phone,
    product_type_name: order.product_type_name,
    total_cost: order.total_cost,
    created: order.created,
    updated: order.updated,
  };

  // Chuyển đổi kết quả thành JSON mới
  return newData;
}

export function OrderDetailsFromJson(order) {
  // Ánh xạ key cũ sang key mới
  const newData = {
    order_id: order.order_id,
    order_code: order.order_code,
    action_name: order.action_name,
    user_name: order.user_name,
    receiver: JSON.parse(order.receiver),
    product: JSON.parse(order.product),
    package_order: JSON.parse(order.package_order),
    product_type_name: order.product_type_name,
    total_cost: order.total_cost,
    created: order.created,
    updated: order.updated,
  };

  // Chuyển đổi kết quả thành JSON mới
  return newData;
}

export function JsonToString(data) {
  return JSON.stringify(data);
}
