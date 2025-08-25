import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getuserByHandle } from "../api/DevTree";
import { HandleData } from "../components/HandleData";


export const HandleView = () => {
  const params = useParams();

  const handle = params.handle!;

  console.log( handle );
  const { data, error, isLoading } = useQuery({
    queryKey: ['handle',handle],
    queryFn: () => getuserByHandle(handle),
    retry: 1
  });


  if( isLoading ) return <p className="text-center text-white">Cargando...</p>

  if(error) return <Navigate to={'/404'}/>

  if(data) return <HandleData data={data}/>

};
