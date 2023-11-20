import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function PaymentHistory() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: totalPayments, isLoading } = useQuery({
    queryKey: ["payment", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentHistory/${user.email}`);
      return res.data;
    },
  });
  console.log(totalPayments);
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <h2 className="text-3xl">Total Payment :{totalPayments?.length} </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Price</th>
              <th>Transaction Id</th>
              <th>Payment status</th>
            </tr>
          </thead>
          <tbody>
            {totalPayments.map((payment, idx) => {
              return (
                <tr key={payment._id}>
                  <th>{++idx}</th>
                  <td> $ {payment.email}</td>
                  <td> $ {payment.price}</td>
                  <td>{payment.transactionID}</td>
                  <td>{payment.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PaymentHistory;
