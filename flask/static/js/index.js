var app = new Vue({
    el: '#app',
    data: {
        img_data: ""
    },

    methods: {
        fetch_img_data: function(){
            axios.get('/get_hist_data')
                .then(response => {
                    this.img_data = response.data.img_base64;
                })
                .catch(error => {console.log(error)});
        },
        sleep: function(waitSec, callbackFunc) {
            // 経過時間（秒）
            var spanedSec = 0;
            // 1秒間隔で無名関数を実行
            var id = setInterval(function () {
                spanedSec++;
                // 経過時間 >= 待機時間の場合、待機終了。
                if (spanedSec >= waitSec) {
                    // タイマー停止
                    clearInterval(id);
                    // 完了時、コールバック関数を実行
                    if (callbackFunc) callbackFunc();
                }
            }, 1000);
        },
    },

    mounted :function(){
        window.setInterval(function(){
            app.fetch_img_data();
        }, 1000);
    }
});