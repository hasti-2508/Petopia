import { useEffect } from "react";
import { useRouter } from "next/navigation";

const redirectLoggedIn = (WrappedComponent) => {
  const RedirectLoggedIn = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("jwt");
      if (!token) {
        router.push("/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return RedirectLoggedIn;
};

export default redirectLoggedIn;
