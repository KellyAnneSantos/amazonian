import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ProductShow from "./components/ProductShow";
import LandingPage from "./components/LandingPage";
import CreateProductForm from "./components/CreateProductForm";
import AddReviewForm from "./components/AddReviewForm";
import EditReviewPage from "./components/EditReviewPage";
import AccountPage from "./components/AccountPage";
import ProfilePage from "./components/ProfilePage";
import ImagesTab from "./components/ImagesTab";
import MyInventoryPage from "./components/MyInventoryPage";
import VitalInfoTab from "./components/VitalInfoTab";
import DescriptionTab from "./components/DescriptionTab";
import MyOrdersPage from "./components/MyOrdersPage";
import SearchResultsPage from "./components/SearchResultsPage";
import MyCartPage from "./components/MyCartPage";
import AnswerForm from "./components/AnswerForm";

function App() {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {!sessionUser && (
        <Switch>
          <Route path="/register">
            <SignupFormPage />
          </Route>
          <Route path="/">
            <LoginFormPage />
          </Route>
        </Switch>
      )}
      {sessionUser && <Navigation />}
      {/* {sessionUser && <Navigation isLoaded={isLoaded} />} */}
      {sessionUser
        ? isLoaded && (
            <Switch>
              <Route path="/products/new">
                <CreateProductForm />
              </Route>
              <Route path="/products/:productId/reviews/new">
                <AddReviewForm />
              </Route>
              <Route path="/products/:productId/descriptions">
                <DescriptionTab />
              </Route>
              <Route path="/products/:productId/edit">
                <VitalInfoTab />
              </Route>
              <Route path="/products/:productId/images">
                <ImagesTab />
              </Route>
              <Route path="/products/:productId">
                <ProductShow />
              </Route>
              <Route path="/questions/:questionId">
                <AnswerForm />
              </Route>
              <Route path="/reviews/:reviewId/edit">
                <EditReviewPage />
              </Route>
              <Route path="/profile/:userId">
                <ProfilePage />
              </Route>
              <Route path="/my/cart">
                <MyCartPage />
              </Route>
              <Route path="/my/orders">
                <MyOrdersPage />
              </Route>
              <Route path="/my/profile">
                <AccountPage />
              </Route>
              <Route path="/inventory">
                <MyInventoryPage />
              </Route>
              <Route path="/search">
                <SearchResultsPage />
              </Route>
              <Route path="/">
                <LandingPage />
              </Route>
            </Switch>
          )
        : ""}
    </>
  );
}

export default App;
