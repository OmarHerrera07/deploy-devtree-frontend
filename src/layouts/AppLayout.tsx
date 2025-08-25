import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTree";
import { DevTree } from "../components/DevTree";

export const AppLayout = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return "Cargando...";

  if (isError) return <Navigate to={"/auth/login"} />;

  if (data) return <DevTree data={data} />;
};
