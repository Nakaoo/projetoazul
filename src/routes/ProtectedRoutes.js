
// eslint-disable-next-line
const ProtectedRoute = ({ children }) => {

    // eslint-disable-next-line
    const user = localStorage.getItem('tk-user')
    if (!user) {
        return null;
    } else {
        return children;
    }

};

export default ProtectedRoute;