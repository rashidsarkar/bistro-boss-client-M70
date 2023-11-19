import { useParams } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_Hosting_Api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
function UpdatedItem() {
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();

  const { axiosPublic } = useAxiosPublic();
  const { id } = useParams();
  // console.log(id);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/menu/${id}`);
      return res.data;
    },
  });
  if (isLoading) return <div>loading...</div>;
  // console.log(data);
  const { name, category, recipe, price, _id } = data || {};
  console.log();
  const onSubmit = async (data) => {
    console.log(data);
    //NOTE - image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_Hosting_Api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      //NOTE - now send the menu item data to the server with the image URL
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      //NOTE -
      const menuRes = await axiosSecure.patch(
        `/api/updateMenu/${_id}`,
        menuItem
      );
      console.log(menuRes.data);
      if (menuRes.data.modifiedCount) {
        // show success sweet alert
        // reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is Updated to the menu `,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log(res.data);
  };

  return (
    <div>
      <SectionTitle
        heading={"updated item"}
        subHeading={`refres info`}
      ></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full my-6 form-control">
            <label className="label">
              <span className="label-text">Recipe Name </span>
            </label>
            <input
              type="text"
              defaultValue={name}
              placeholder="Recipe Name"
              {...register("name", { required: true })}
              required
              className="w-full input input-bordered"
            />
          </div>
          <div className="flex gap-6">
            <div className="w-full my-6 form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                defaultValue={category}
                {...register("category", { required: true })}
                className="w-full select select-bordered"
              >
                <option disabled value={`default`}>
                  Select a category
                </option>
                <option value="salad">salad</option>
                <option value="pizza">pizza</option>
                <option value="soup">soup</option>
                <option value="dessert">dessert</option>
                <option value="drinks">drinks</option>
              </select>
            </div>

            <div className="w-full my-6 form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                defaultValue={price}
                placeholder="Price"
                {...register("price", { required: true })}
                className="w-full input input-bordered"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              {...register("recipe")}
              defaultValue={recipe}
              className="h-24 textarea textarea-bordered"
              placeholder="Recipe Details"
            ></textarea>
          </div>
          <div className="w-full my-6 form-control">
            <input
              {...register("image", { required: true })}
              type="file"
              className="w-full max-w-xs file-input"
            />
          </div>

          <button type="submit" className="btn">
            Update Menu Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatedItem;
