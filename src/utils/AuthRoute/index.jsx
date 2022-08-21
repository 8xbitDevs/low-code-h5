import { getToken } from "../../pages/login/index";
import { Navigate } from "react-router-dom";

function AuthRoute({ children }) {
  const isToken = getToken();
  if (isToken != null) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
}

// <AuthComponent> <Layout/> </AuthComponent>
// 登录：<><Layout/></>
// 非登录：<Navigate to="/login" replace />

export { AuthRoute };
