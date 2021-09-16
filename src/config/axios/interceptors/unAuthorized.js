export default function unAuthorizedInterceptor(axiosConfig) {
  axiosConfig.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        let activeMerchant = localStorage.activeMerchant;
        localStorage.clear();
        if (activeMerchant) {
          localStorage.activeMerchant = activeMerchant;
        }
        window.location.replace('/user/login');
      }

      return Promise.reject(error);
    }
  );
}
