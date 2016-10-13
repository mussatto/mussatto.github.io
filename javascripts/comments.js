var vm
window.onload = function () {
    vm = new Vue({
      el: 'body',
      data: {
        hostName: 'https://mussatto.appspot.com/',
        comments: []
      },
      methods: {
          getLogs : function(){
            var url = this.hostName+"/comment";
            this.$http.get(url).then(function(data){
                jsonData = data.json();
                if( typeof jsonData !== 'undefined' && jsonData != null){
                    this.$set('comments', jsonData);
                }
                console.log("Sucess!");
            },error);
          }

      },
      ready: function () {
        this.getLogs();

        setInterval(function () {
          this.getLogs();
        }.bind(this), 30000);
      }

    })
}
