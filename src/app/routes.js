import MainContainer from "app_containers/MainContainer";
import StartPageContainer from "app_containers/StartPageContainer";

const routes = [
  {
    component: MainContainer,
    routes: [
      {
        path: '/',
        component: StartPageContainer
      }
    ]
  }
]

export default routes;