import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginView } from "./views/LoginView";
import { RegisterView } from "./views/RegisterView";
import { AuthLayout } from "./layouts/AuthLayout";
import { AppLayout } from "./layouts/AppLayout";
import { ProfileView } from "./views/ProfileView";
import { LinkTreeView } from "./views/LinkTreeView";
import { HandleView } from "./views/HandleView";
import { NotFoundView } from "./views/NotFoundView";
import { HomeView } from "./views/HomeView";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element = {<AuthLayout/>}>
            <Route path='/auth/login' element={<LoginView/>}/>
            <Route path='/auth/register' element={<RegisterView/>}/>
        </Route>

        <Route element={<AppLayout />}>
          <Route path='/admin' >
          <Route index={true} element={<LinkTreeView />}/>
          <Route path='profile' element={ <ProfileView/>}/>
          </Route>
        </Route>

        <Route path='/:handle' element = {<AuthLayout/>}>
          <Route element={ <HandleView/>} index={true} />

        </Route>

        <Route path='/' element={<HomeView/>}/>

        <Route path='/404' element={<AuthLayout/>}>
          <Route element={<NotFoundView/>} index={true} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
