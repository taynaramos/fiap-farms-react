import login_paths from "../login/src/presentation/routes";
import host_paths from "../host/src/presentation/routes";
import remote_paths from "../remote/src/presentation/routes";

const REMOTE_PREFIX = "/app";
const LOGIN_PREFIX = "/login";

export function remotePath(path: string) {
  if (path.startsWith(REMOTE_PREFIX)) return path;
  return `${REMOTE_PREFIX}${path}`;
}

export function loginPath(path: string) {
  if (path.startsWith(LOGIN_PREFIX)) return path;
  return `${LOGIN_PREFIX}${path}`;
}

export default class Routes {
  static paths = {
    ...login_paths.paths,
    ...host_paths.paths,
    ...remote_paths.paths,
  };
}
