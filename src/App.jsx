import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import "./App.css";
import RootLayout from "./layout/RootLayout";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import Welcomepage from "./pages/UserPages/Welcomepage";
import Storyfeedpage from "./pages/UserPages/Storyfeedpage";
import SingleStoryPage from "./pages/UserPages/SingleStoryPage";
import UserStories from "./pages/UserPages/UserStories";
import { EditPost } from "./pages/UserPages/EditPost";
import { CreateStories } from "./pages/UserPages/CreateStories";
import { Private } from "./components/Private/Private";

// import ErrorPage from "./pages/404/ErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />}>
        <Route index path="/" element={<Homepage />} />

        <Route element={<Private />}>
          <Route path="/welcome" element={<Welcomepage />} />
          <Route path="/stories" element={<Storyfeedpage />} />
          <Route path="/createStories" element={<CreateStories />} />

          <Route path="/stories/:storyId" element={<SingleStoryPage />} />
          <Route path="/mystories" element={<UserStories />} />
          <Route path="/editpost/:id" element={<EditPost />} />
        </Route>
      </Route>

      {/* <Route path="*" element={<ErrorPage />} /> */}
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
