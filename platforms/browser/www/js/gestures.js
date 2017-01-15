var app={
    start: function(){
        this.startButtons();
        this.startFastClick();
        this.startHammer();
    },

    startFastClick: function () {
        FastClick.attach(document.body);
    },

    startButtons: function(){
        var lightButton = document.querySelector('#light');
        var darkButton = document.querySelector('#dark');

        lightButton.addEventListener('click',this.ponloClaro,false);
        darkButton.addEventListener('click',app.ponloOscuro,false);
    },

    startHammer: function() {
        var zona = document.getElementById('gesture-zone');
        var hammertime = new Hammer(zona);

        hammertime.get('pinch').set({ enable: true });
        hammertime.get('rotate').set({ enable: true });
        hammertime.get('tap').set({ enable: true });

        zona.addEventListener('webkitAnimationEnd',function(e){
            zona.className='';
        });

        hammertime.on('doubletap', function(ev) {
            zona.className='doubletap';
        });

        hammertime.on('press', function(ev) {
            zona.className='press';
        });

        hammertime.on('tap', function(ev) {
            zona.className='tap';
        });

        hammertime.on('swipe', function(ev) {
            var clase=undefined;
            direccion=ev.direction;

            if (direccion==4) clase='swipe-right';
            if (direccion==2) clase='swipe-left';

            zona.className=clase;
        });


        hammertime.on('rotate', function(ev) {
            var umbral=25;
            if (ev.distance > umbral) zona.className='rotate';
        });
    },

    ponloClaro: function(){
        document.body.className = 'light';
    },

    ponloOscuro: function(){
        document.body.className = 'dark';
    },

};

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        app.start();
    }, false);
}

