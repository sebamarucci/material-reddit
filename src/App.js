import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles';
import {MuiThemeProvider} from "@material-ui/core";
import Reddit from "./app/reddit";
import {Provider} from "react-redux";
import * as reduxstore from './reduxstore/index';
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontSize: 12,
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif'
    ].join(','),
  },
});

export default function App(props) {


  return(
    <Provider store={reduxstore.store}>
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Reddit {...props}/>
        </MuiThemeProvider>
      </div>
    </Provider>
  );
}
// class App extends Component {
//   render() {
//     return <div className="App">
//       <div className="App-heading App-flex">
//         <h2>Welcome to <span className="App-react">React</span></h2>
//       </div>
//       <div className="App-instructions App-flex">
//         <img className="App-logo" src={require('./react.svg')}/>
//         <p>Edit <code>src/App.js</code> and save to hot reload your changes.</p>
//       </div>
//     </div>
//   }
// }
//
// export default App
