const SESSION_KEY = "hrms_lite_user_namespace";

export function getUserNamespace(): string {
  let ns = localStorage.getItem(SESSION_KEY);

  if (!ns) {
    ns = "user_" + Math.random().toString(36).substring(2, 10);
    localStorage.setItem(SESSION_KEY, ns);
  }

  return ns;
}

export function resetUserNamespace() {
  localStorage.removeItem(SESSION_KEY);
  window.location.reload();
}
