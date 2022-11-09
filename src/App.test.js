import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from "react-redux";
import { HashRouter } from 'react-router-dom'
import store from './store'

test('renders learn react link', () => {
  render(
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
