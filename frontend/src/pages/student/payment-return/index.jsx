import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { capturePaymentService } from "../../../services";
import {Card, CardHeader, CardTitle} from '@/components/ui/card'
const PaypalPaymentReturnPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      async function capturePayment() {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
        const response = await capturePaymentService(
          paymentId,
          payerId,
          orderId
        );
        if(response.success){
            sessionStorage.removeItem("currentOrderId");
            window.location.href = "/student-courses";
        }
      }
      capturePayment();
    }
  }, [paymentId, payerId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing payment... please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PaypalPaymentReturnPage;
