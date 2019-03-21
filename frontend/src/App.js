
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import AppRouter from './routes/AppRouter';
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from './theme/theme';

const App = ({client}) => {
  return (
    <ApolloProvider client={client}>
        <AppRouter />
    </ApolloProvider>
  )
}

export default App;