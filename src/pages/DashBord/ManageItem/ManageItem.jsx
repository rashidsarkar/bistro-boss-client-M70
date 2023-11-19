import { MdDelete } from "react-icons/md";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

function ManageItem() {
  const [menu, loading, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();
  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/api/deleteMenuItem/${item._id}`);
        console.log(res.data);
        if (res.data.deletedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} has been deleted`,
            showConfirmButton: false,
            timer: 1000,
          });
        }
      }
    });
  };

  // console.log("ok");
  if (loading) {
    return <p>loading....</p>;
  }
  console.log(menu);
  return (
    <div>
      <SectionTitle
        heading={`manage all items`}
        subHeading={`hurry up`}
      ></SectionTitle>
      <div>
        {" "}
        <div className="overflow-x-auto ">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, idx) => {
                return (
                  <tr key={item._id}>
                    <td>{idx + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 h-12 mask mask-squircle">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td className="text-right">$ {item.price}</td>
                    <td>
                      <Link to={`/dashBord/updateItem/${item._id}`}>
                        <button className="bg-orange-500 btn btn-sm ">
                          <FaEdit className="text-white " />
                        </button>
                      </Link>
                    </td>
                    <td className="">
                      <button
                        onClick={() => handleDeleteItem(item)}
                        className="btn btn-ghost btn-lg "
                      >
                        <MdDelete className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageItem;
