/**
 * Created by Mike C on 30-Jun-17.
 */

document.addEventListener("DOMContentLoaded", function (event) {

    loadHub(officeMapping.backOffice);
    loadHub(officeMapping.frontOffice);
    updateLightStatuses(officeMapping.backOffice);
    updateLightStatuses(officeMapping.frontOffice);

    // rgb = hexToRgb('#0000ff');
    // console.log(rgb);
    // xy = toXY(rgb.r, rgb.g, rgb.b);
    // console.log(xy);
    // hex = xyBriToRgb(xy[0], xy[1], 200);
    // console.log(hex);

    $(".light").change(function () {

        let hex = $(this).val();
        let r = hexToRgb(hex)['r'];
        let g = hexToRgb(hex)['g'];
        let b = hexToRgb(hex)['b'];
        putLightsElementStatus(this, r, g, b);
    });

    $(".groupColor").change(function () {

        let hex = $(this).val();
        let r = hexToRgb(hex)['r'];
        let g = hexToRgb(hex)['g'];
        let b = hexToRgb(hex)['b'];

        let groupOption = $('.groupSelect').children(":selected");
        let groupId = groupOption.attr('value');
        let hubId = groupOption.attr('data-hub');

        putGroupStatus(groupId, hubId, r, g, b);
    });

    $(".turnOnKnightRider").click(function () {

        knightRiderEnabled = true;
        startKnightRider();
    });

    $(".turnOffKnightRider").click(function () {

        knightRiderEnabled = false;
    });

});


function createGroup(groupName, group) {
    /*
     let url = "http://" + group.hubIp + "/api/" + group.hubUsername + "/groups/";
     let sendData = {"name": groupName, "lights": group.lights};
     console.log(url, sendData);
     _ajax_request(url, sendData, putSucces, 'POST');
     */
}


function loadHub(hub) {

    let groupNames = Object.keys(hub.groups);
    for (i = 0; i < groupNames.length; i++) {

        groupName = groupNames[i];
        group = hub.groups[groupName];
        group.hubId = hub.hubId;
        group.hubIp = hub.bridgeIp;
        group.hubUsername = hub.username;
        loadGroup(groupName, group);
        //DON'T USE THIS FUNCTION... unless your name is Danny or Mike C.
        //createGroup(groupName, group);
    }
}

function loadGroup(groupName, group) {

    let groupElement = $("div[data-team='" + groupName + "']");
    groupElement.addClass(group.config);
    groupElement.attr('data-hub', group.hubId);

    let container = groupElement;
    if (group.config === 'block') {

        container = document.createElement('div');
    }

    for (let i = 0; i < group.lights.length; i++) {

        if (group.config === 'block' && i === 2) {

            groupElement.append(container);
            container = document.createElement('div');
        }
        let lightId = group.lights[i];
        let lightElement = document.createElement('input');
        lightElement.setAttribute('class', 'light');
        lightElement.setAttribute('type', 'color');
        lightElement.setAttribute('id', lightId);

        container.append(lightElement);
    }
    groupElement.append(container);

    // And now the group select :D

    let option = $("<option value='" + group.id + "'>" + groupName + "</option>");
    option.attr('data-hub', group.hubId);

    let groupSelect = $("select.groupSelect");
    groupSelect.append(option);
}

function updateLightStatuses(hub) {

    let url = 'http://' + hub.bridgeIp + '/api/' + hub.username + '/lights/';
    $.getJSON(url, function (data) {

        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {

            let lightId = keys[i];
            let lightState = data[lightId].state;
            let xy = lightState.xy;
            let hex = xyBriToRgb(xy[0], xy[1], lightState.bri);
            let light = $("div[data-hub='" + hub.hubId + "'] #" + lightId);
            light.attr('value', hex);
        }
    });
}


function xyBriToRgb(x, y, bri) {
    z = 1.0 - x - y;

    Y = bri / 255.0; // Brightness of lamp
    X = (Y / y) * x;
    Z = (Y / y) * z;
    r = X * 1.612 - Y * 0.203 - Z * 0.302;
    g = -X * 0.509 + Y * 1.412 + Z * 0.066;
    b = X * 0.026 - Y * 0.072 + Z * 0.962;
    r = r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055;
    g = g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055;
    b = b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055;
    maxValue = Math.max(r, g, b);
    r /= maxValue;
    g /= maxValue;
    b /= maxValue;
    r = r * 255;
    if (r < 0) {
        r = 255
    }
    ;
    g = g * 255;
    if (g < 0) {
        g = 255
    }
    ;
    b = b * 255;
    if (b < 0) {
        b = 255
    }
    ;

    r = Math.round(r).toString(16);
    g = Math.round(g).toString(16);
    b = Math.round(b).toString(16);

    if (r.length < 2)
        r = "0" + r;
    if (g.length < 2)
        g = "0" + g;
    if (b.length < 2)
        b = "0" + r;
    rgb = "#" + r + g + b;
    return rgb;
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function toXY(red, green, blue) {
    //Gamma correctie
    red = (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92);
    green = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92);
    blue = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92);

    //Apply wide gamut conversion D65
    let X = red * 0.664511 + green * 0.154324 + blue * 0.162028;
    let Y = red * 0.283881 + green * 0.668433 + blue * 0.047685;
    let Z = red * 0.000088 + green * 0.072310 + blue * 0.986039;

    let fx = X / (X + Y + Z);
    let fy = Y / (X + Y + Z);


    return [fx.toPrecision(4), fy.toPrecision(4)];
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

function putLightsElementStatus(lightElement, r, g, b) {

    let lightId = lightElement.getAttribute('id');
    let parent = lightElement.parentElement;
    if (parent.hasAttribute('data-hub') === false) {

        parent = parent.parentElement;
    }
    let dataHub = parent.getAttribute('data-hub');

    putLightStatus(lightId, dataHub, r, g, b);
}

function putLightStatus(lightId, hubId, r, g, b, transitionTime, bri) {

    transitionTime = transitionTime || 1;
    bri = bri || 200;

    let hubConfig = officeMapping[hubId];
    let hubIp = hubConfig.bridgeIp;
    let hubUsername = hubConfig.username;

    let x = toXY(r, g, b)[0];
    let y = toXY(r, g, b)[1];
    let url = "http://" + hubIp + "/api/" + hubUsername + "/lights/" + lightId + "/state";
    let sendData = {"transitiontime": transitionTime, "bri": bri, "xy": [Number(x), Number(y)]};
    _ajax_request(url, sendData, putSucces, 'PUT');
}

function putGroupStatus(groupId, hubId, r, g, b, transitionTime, bri) {

    transitionTime = transitionTime || 1;
    bri = bri || 200;

    let hubConfig = officeMapping[hubId];
    let hubIp = hubConfig.bridgeIp;
    let hubUsername = hubConfig.username;

    let x = toXY(r, g, b)[0];
    let y = toXY(r, g, b)[1];
    let url = "http://" + hubIp + "/api/" + hubUsername + "/groups/" + groupId + "/action";
    let sendData = {"transitiontime": transitionTime, "bri": bri, "xy": [Number(x), Number(y)]};
    _ajax_request(url, sendData, (response) => {
        response.forEach((part) => {
            let key = Object.keys(part.success)[0];
            if(key.indexOf('bri') !== -1){

                if(part.success[key] != bri){

                    //console.log('something going wrong here!', response);
                }
            }
        });
    }, 'PUT');
}

function putSucces() {

}