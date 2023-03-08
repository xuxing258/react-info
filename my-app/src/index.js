import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import './index.css';
import { RouterProvider } from "react-router-dom";
import router from "./router/index.js";
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} >
    </RouterProvider>
  </Provider>

);

