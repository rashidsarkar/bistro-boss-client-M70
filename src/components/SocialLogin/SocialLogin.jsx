import { FaGoogle } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
function SocialLogin() {
  const { axiosPublic } = useAxiosPublic();
  const { googleSingIn } = useAuth();
  const nabvigate = useNavigate();
  const handleGoogleSingIn = () => {
    googleSingIn().then((res) => {
      console.log(res.user);
      const userInfo = {
        email: res.user?.email,
        name: res.user?.displayName,
      };
      axiosPublic.post("/api/users", userInfo).then((res) => {
        console.log(res.data);
        nabvigate("/");
      });
    });
  };
  return (
    <div className="p-8">
      <div>
        <div className="divider"></div>
        <button onClick={handleGoogleSingIn} className="btn">
          <FaGoogle className="mr-4" />
          Google
        </button>
      </div>
    </div>
  );
}

export default SocialLogin;
