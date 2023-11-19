import { FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

function Allusers() {
  const axiosSecure = useAxiosSecure();
  const {
    data: allUsers = [],
    refetch: refetchAllUser,
    isLoading,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("api/allUsers");
      return res.data;
    },
  });
  console.log(allUsers);
  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/api/deleteUser/${user._id}`).then((res) => {
          // console.log(res.data);
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
            refetchAllUser();
          }
        });
      }
    });
  };
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/api/makeAdminuser/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        refetchAllUser();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name}  is Successfully  made admin`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
    if (isLoading) {
      return <div>loading</div>;
    }
  };
  return (
    <div>
      <div className="flex justify-evenly my-4 ">
        <p className="text-3xl">All Users</p>
        <p className="text-3xl">Total User : {allUsers?.length}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((user, idx) => {
              return (
                <tr key={user._id}>
                  <th>{idx + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn bg-orange-500 btn-lg "
                      >
                        <FaUsers className="text-white text-2xl" />
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user)}
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
  );
}

export default Allusers;
