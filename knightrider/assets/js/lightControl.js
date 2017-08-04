/**
 * Created by Mike C & Danny on 04-Aug-17.
 */
let knightRiderEnabled = false;
function startKnightRider() {

    let order = initGroupOrder('right');
    loopNightRider(order, 5);
}

function initGroupOrder(subGroup) {

    let result = {};
    for (y = 0; y < Object.keys(officeMapping).length; y++) {

        let hubId = Object.keys(officeMapping)[y];
        let groups = officeMapping[hubId].groups;
        for (i = 0; i < Object.keys(groups).length; i++) {

            let groupId = Object.keys(groups)[i];
            let group = groups[groupId];
            if (subGroup in group.subgroups) {

                let groupIndex = group.subgroups[subGroup];
                if (!result[groupIndex]) {

                    result[groupIndex] = [];
                }
                result[groupIndex].push(group);

                // Put them in the begin state while were here

                putGroupStatus(group.id, group.hubId, 255, 0, 0, 0, 50);
            }
        }
    }

    return result;
}

function loopNightRider(order, totalTime) {

    const steps = Object.keys(order);
    steps.sort();
    let stepTime = totalTime / steps.length;
    if(stepTime < 1){

        stepTime = 1;
    }
    const transition = parseInt(totalTime * 0.5 * 10);

    let currentStep = 0;
    let currentlyGoingUp = true;
    const interval = setInterval(() => {

        if (knightRiderEnabled === false) {

            clearInterval(interval);
        }

        // Set the right groups to the right setting

        const currentGroups = order[currentStep];
        setGroups(currentGroups, 200);

        // What is the next step (up or down)
        let step = 1;
        if (currentlyGoingUp === false) {

            step = -1;
        }

        // Set previous light off
        let offGroup = order[currentStep - step];
        setTimeout(() => {

            setGroups(offGroup, 50, transition);
        }, 75);


        // Next step not available, flip step and direction
        if (!order[currentStep + step]) {

            console.log("Take it back now y'all");
            currentlyGoingUp = !currentlyGoingUp;
            step *= -1;
        }

        // Add the step
        currentStep += step;
    }, stepTime * 1000);
}

function setGroups(currentGroups, bri, transitionTime) {

    transitionTime = transitionTime || 0;

    if (typeof(currentGroups) !== 'undefined') {

        for (let i = 0; i < currentGroups.length; i++) {

            group = currentGroups[i];
            console.log(group.lights, bri);

            let lightNr = 0;
            group.lights.forEach((lightId) => {
                setTimeout(() => {
                    console.log('Setting light:', lightId, bri);
                    putLightStatus(lightId, group.hubId, 255, 0, 0, transitionTime, bri);
                }, 150 * lightNr);

                lightNr++;
            });
        }
    }
}
