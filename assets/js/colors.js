/**
 * Created by Mike C on 30-Jun-17.
 */
document.addEventListener("DOMContentLoaded", function(event) {

    var backOfficeUser = 'jAX7zVjPIZVEZN6Z-xjIFx5jumO4-G-5g8erVZ7c';
    var frontOfficeUser = '-4yfT4pui4L14HxmJ5GMVwvsnNDDF2bKijGC0485';

    var backOfficeOrder = ['48','51','45','50','57','42','44','56','5','7','58','6','62'];
    var timeOut;

    var colors = [255,0,0];

    turnAllOn();

    $(".light").change(function(){

        var id = $(this).attr('id');
        var hex = $(this).val();
        console.log(hex);
        var r = hexToRgb(hex)['r'];
        var g = hexToRgb(hex)['g'];
        var b = hexToRgb(hex)['b'];
        putLightsStatus(id,r,g,b);
    });

    function setCurrentLightStatus(){

    }

    function turnAllOn(){

        var group = 0;
        var url = "http://10.3.9.52/api/" + backOfficeUser + "/groups/" + group + "/action";
        var sendData = {"on":true};

        _ajax_request(url, sendData, allOn, 'PUT');
    }

    function allOn(result){

        if(Object.keys(result[0])[0] === 'success'){

            getLights();
        }else{

            turnAllOn();
        }
    }

    function getLights() {

        var url = "http://10.3.9.52/api/"+backOfficeUser+"/lights/";
        $.getJSON(url, function (data) {

            console.log('data received');
            discoFever(data);
        });
    }

    function discoFever(lights){

        var interval = 10;

    keysOfLight = Object.keys(lights);
        //console.log(keysOfLight);
        //keysOfLight = ['44','56','5'];
        //keysOfLight = ['1','2','3','4'];
        //keysOfLight = ['50','57','42'];
        //keysOfLight = ['40','11','41'];
        //{"alert":"select"}
        //keysOfLight = backOfficeOrder;
        timer = 0;


        timeOut = setInterval(function() {


                // shuffle(keysOfLight);
                // shuffle(colors);

                // keysOfLight.forEach((lightId) => {
                //
                //     shuffle(colors);
                //     putLightsElementStatus(lightId, colors[0], colors[1], colors[2]);
                // });
            lightId = keysOfLight[timer];
                putLightsStatus(lightId, 255, 255, 255);
                console.log(timer + "/" + keysOfLight.length);
                timer++;
                if(timer >= keysOfLight.length){

                    stopDisco();
                    //reverseDisco();
                    // keysOfLight.reverse();
                    // shuffle(colors);
                    //timer = 0;

                }

        }, interval);

    }

    function stopDisco() {

        clearInterval(timeOut);
        console.log('stop timer');
    }

    function putLightsStatus(lightId, r,g,b) {

        var lightOn = true;


        var x = toXY(r,g,b)[0];
        var y = toXY(r,g,b)[1];
        var url = "http://10.3.9.52/api/jAX7zVjPIZVEZN6Z-xjIFx5jumO4-G-5g8erVZ7c/lights/" + lightId + "/state";
        //var sendData = {"on": lightOn, "sat": 254, "bri": 200, "hue": 10000, "xy":[Number(x),Number(y)]};
        //var sendData = {"effect":"loop"};
        var sendData = {"transitiontime": 1, "bri":200, "xy":[Number(x),Number(y)]};
        _ajax_request(url, sendData, putSucces, 'PUT');
    }

    function putSucces(result) {

       console.log(result);
    }

    function _ajax_request(url, data, callback, method) {

        return $.ajax({
            url: url,
            method: method,
            type: 'JSON',
            data: JSON.stringify(data),
            success: callback
        });
    }


    function toXY(red, green, blue) {
        //Gamma correctie
        red = (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92);
        green = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92);
        blue = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92);

        //Apply wide gamut conversion D65
        var X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
        var Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
        var Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;

        var fx = X / (X + Y + Z);
        var fy = Y / (X + Y + Z);


        return [fx.toPrecision(4), fy.toPrecision(4)];
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function shuffle(a) {
        for (var i = a.length; i; i--) {
            var j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    }

    function rgbToHex(r, g, b) {
        function componentToHex(c) {
            let hex = c.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }

        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

});