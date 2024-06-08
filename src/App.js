import React from "react";

import ReservationForm from "./components/ReservationForm";
import { Provider } from "react-redux";
import store from "./app/store";

const App = () => {
  return (
    <div className="mx-12">
      <div>
        <Provider store={store}>
          <ReservationForm />
        </Provider>
      </div>
    </div>
  );
};

export default App;
