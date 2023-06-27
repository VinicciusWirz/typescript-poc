export function notFoundError(message: string) {
  const errorMessage: string = `${message && message} Not Found`.trim();
  return {
    type: "not-found",
    message: errorMessage,
  };
}

export function conflictError(message: string) {
  const errorMessage: string = `${message && message} Already Exists`.trim();
  return {
    type: "conflict",
    message: errorMessage,
  };
}
