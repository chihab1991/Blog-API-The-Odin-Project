import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [logoutApiCall] = useLogoutMutation();
	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();
			dispatch(logout());
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<header>
			<nav>
				<div className="nav-left">
					<Link to="/">Home Page</Link>
				</div>
				<div className="nav-right">
					{userInfo ? (
						<button onClick={logoutHandler}>Logout</button>
					) : (
						<Link to="/login">Login</Link>
					)}
				</div>
			</nav>
			<hr />
		</header>
	);
};
export default Header;
