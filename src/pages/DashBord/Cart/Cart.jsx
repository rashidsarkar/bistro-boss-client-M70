import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

function Cart() {
  const { carts, cartsRefetch } = useCart();
  const axiosSecure = useAxiosSecure();

  const totalPrice = carts?.reduce((total, item) => total + item.price, 0);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/api/cartsDelete/${id}`).then((res) => {
          // console.log(res.data);
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            cartsRefetch();
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="flex justify-evenly mb-6">
        <h2 className="text-4xl">Items:{carts?.length}</h2>
        <h2 className="text-4xl">Total Price: ${totalPrice}</h2>
        <button className="btn btn-primary">Pay</button>
      </div>
      <div className="overflow-x-auto ">
        <table className="table w-full">
          {/* head */}

          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {carts?.map((item, idx) => (
              <tr key={item._id}>
                <th>{++idx}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item?.name}</td>
                <td>${item?.price}</td>
                <th>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-ghost btn-lg "
                  >
                    <MdDelete className="text-red-600" />
                  </button>
                </th>
              </tr>
            ))}

            {/* row 2 */}

            {/* row 3 */}

            {/* row 4 */}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
}

export default Cart;
