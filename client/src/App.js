import { ApolloProvider } from 'react-apollo';
import  ApolloClient from 'apollo-boost';
import './App.css';
import logo from './spacex.png';
import Launches from './components/Launches'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  
})
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <img src={logo} alt='spaceX' style={{width: 300, display: 'block', margin: 'auto'}} />
        <Launches />
      </div>
    </ApolloProvider>
    
  );
}

export default App;
