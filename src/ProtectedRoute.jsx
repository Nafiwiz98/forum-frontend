import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Components/Contexts/AuthContext';
import axiosBase from './axiosConfig';
import { UserContext } from './Components/Contexts/UserContext';

const ProtectedRoute = ({ children }) => {
  const {UserInfo, setUserInfo} = useContext(UserContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // ⏳ Prevent premature redirect

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axiosBase.get('/user/dashboard', {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        // console.log(response?.data.user);
        setUserInfo(response?.data.user)
        setIsAuthenticated(true);
      } catch (err) {
        console.log(err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;