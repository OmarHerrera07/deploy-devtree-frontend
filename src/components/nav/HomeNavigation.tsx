import { Link } from "react-router-dom";

export const HomeNavigation = () => {
  return (
    <>
      <Link to={'/auth/login'} className='text-white p-2 uppercase font-black text-xs cursor-pointer'>Iniciar sesión</Link>
      <Link to={'/auth/login'} className='bg-lime-500 text-slate-800 p-2 uppercase font-black text-xs cursor-pointer rounded-2xl'>Registrarme</Link>
    </>
  );
};
