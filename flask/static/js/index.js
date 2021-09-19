var app = new Vue({
    el: '#app',
    data: {
        img_data: "",
        is_reload: true,
        frame_ratio: 10000,
        timer_id: null,
        current_fps: null,
        last_reloaded_date: null
    },

    methods: {
        get_date: function(){
            DD = new Date();
            Year = DD.getYear();
            Month = DD.getMonth() + 1;
            Day = DD.getDate();
            Hours = DD.getHours();
            Minutes = DD.getMinutes();
            Seconds = DD.getSeconds();

            Year += 1900;
            Month = ("00" + Month).slice(-2);
            Day = ("00" + Day).slice(-2);
            Hours = ("00" + Hours).slice(-2);
            Minutes = ("00" + Minutes).slice(-2);
            Seconds = ("00" + Seconds).slice(-2);
            return Year + "/" + Month + "/" + Day + " " + Hours + ":" + Minutes + ":" + Seconds;
        },
        fetch_img_data: function(){
            axios.get('/get_hist_data')
                .then(response => {
                    this.img_data = response.data.img_base64;
                    this.last_reloaded_date = this.get_date();
                })
                .catch(error => {console.log(error)});
        },
        stop_reloading: function(){
            window.clearInterval(this.timer_id);
        },
        start_reloading: function(){
            this.stop_reloading();
            this.current_fps = 1 / (this.frame_ratio / 1000);
            this.timer_id = window.setInterval(function(){app.fetch_img_data()}, Number(this.frame_ratio));
        },
    },

    mounted :function(){
        this.fetch_img_data();
    }
});