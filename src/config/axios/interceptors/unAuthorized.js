export default function unAuthorizedInterceptor(axiosConfig) {
  axiosConfig.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        let currentUser = localStorage.currentUser;
        localStorage.clear();
        if (currentUser) {
          localStorage.currentUser = currentUser;
        }
        window.location.replace('/user/login');
      }

      return Promise.reject(error);
    }
  );
}
