import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),

  // Examples of how to set up the router:
  // route("about", "./about.tsx"),
  // layout("./auth/layout.tsx", [
  //   route("login", "./auth/login.tsx"),
  //   route("register", "./auth/register.tsx"),
  // ]),
  // ...prefix("concerts", [
  //   index("./concerts/home.tsx"),
  //   route(":city", "./concerts/city.tsx"),
  //   route("trending", "./concerts/trending.tsx"),
  // ]),
] satisfies RouteConfig;
