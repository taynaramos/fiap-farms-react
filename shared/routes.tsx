import login_paths from "../login/src/presentation/routes";
import host_paths from "../host/src/presentation/routes";
import remote_paths from "../remote/src/presentation/routes";

export default class Routes {
  static paths = {
    ...login_paths.paths,
    ...host_paths.paths,
    ...remote_paths.paths,
  };
}
