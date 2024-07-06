var Constants = {
  get_api_base_url: function () {
    if(location.hostname == 'localhost'){
      return "http://localhost/final20244/backend/";
    } else {
      return "https://walrus-app-4o96g.ondigitalocean.app/backend/";
    }
  }
};