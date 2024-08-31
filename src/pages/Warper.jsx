import { Outlet } from "react-router-dom";

const Warper = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Warper;
