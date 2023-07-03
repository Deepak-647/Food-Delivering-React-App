const OrderNotification = ({ show }) => {
  return (
    <div className="notification">
      <p>
        Thank you for ordering from Hunger
        <span style={{ color: " rgb(234 88 12)" }}>Head</span>
      </p>
      <p>Your Order Placed successfully !</p>
      <span className="notification_progress"></span>
    </div>
  );
};
export default OrderNotification;
