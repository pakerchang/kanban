import React from "react";
import PublicLayout from "./layouts/PublicLayout";
import Header from "./components/header";
import Kanban from "./components/kanban";

function App() {
  return (
    <PublicLayout>
      <Header />
      <Kanban />
    </PublicLayout>
  );
}

export default App;
