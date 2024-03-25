import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import React, { lazy, Suspense } from "react";

import "./App.css";
import RootLayout from "./layout/RootLayout";
import { EditPost } from "./pages/UserPages/EditPost";
import { CreateStories } from "./pages/UserPages/CreateStories";
import { Private } from "./components/Private/Private";
import { Error } from "./pages/Error";
import { PageLoader } from "./components/Loader/PageLoader";

const Home = React.lazy(() => import("./pages/Homepage"));
const Welcome = React.lazy(() => import("./pages/UserPages/Welcomepage"));
const Storyfeedpage = React.lazy(() =>
  import("./pages/UserPages/Storyfeedpage")
);
const SingleStoryPage = React.lazy(() =>
  import("./pages/UserPages/SingleStoryPage")
);
const UserStories = React.lazy(() => import("./pages/UserPages/UserStories"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />

        <Route element={<Private />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/stories" element={<Storyfeedpage />} />
          <Route path="/createStories" element={<CreateStories />} />

          <Route path="/stories/:storyId" element={<SingleStoryPage />} />
          <Route path="/mystories" element={<UserStories />} />
          <Route path="/editpost/:id" element={<EditPost />} />
        </Route>
      </Route>

      <Route path="*" element={<Error />} />
    </>
  )
);

function App() {
  return (
    <Suspense
      fallback={
        <div>
          <PageLoader />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
