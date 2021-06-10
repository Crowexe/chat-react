import Home from './components/Home';
import General from "./components/General";
import Anime from "./components/Anime";
import ReactDoubt from "./components/ReactDoubt";
import Login from "./components/Login";
import { useUser } from "./context/user";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from 'react-router-dom';

const App = () => {
  const { user } = useUser();
  
  return (
    <Router>
    	{user ? 
		<>	
			<Link to="/">Home</Link>
			<Link to="/general">General</Link>
			<Link to="/anime">Anime</Link>
			<Link to="/reactDoubt">React Doubt</Link>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/general">
					<General />
				</Route>
				<Route path="/anime">
					<Anime />
				</Route>
				<Route path="/reactDoubt">
					<ReactDoubt />
				</Route>
			</Switch>
		</>
	  	: <Login />
		}
    </Router>
  );
}


export default App;
