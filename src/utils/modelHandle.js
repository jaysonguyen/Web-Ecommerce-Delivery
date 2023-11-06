export function OrderTableFromJson(order) {
  // Ánh xạ key cũ sang key mới
  const newData = {
    "Order ID": order.order_id,
    Status: order.action_name,
    "Receiver Name": order.receiver,
    Address: order.address,
    "ProductType Name": order.product_type_name,
    "Total Cost": order.total_cost,
  };

  // Chuyển đổi kết quả thành JSON mới
  return newData;
}

export function ToJson(data) {
  return JSON.stringify(data);
}
