
const ProtectedRoute = ({ children }) => {

    const user = localStorage.getItem('tk-user')
    if (!user) {
        return null;
    } else {
        return children;
    }

};

export default ProtectedRoute;