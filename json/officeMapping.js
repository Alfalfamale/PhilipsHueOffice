const officeMapping = {
    backOffice:{
        hubId: 'backOffice',
        username:'jAX7zVjPIZVEZN6Z-xjIFx5jumO4-G-5g8erVZ7c',
        bridgeIp: '10.3.9.52',
        groups:{
            ua:{
                config:'block',
                subgroups:{
                    right: 0,
                    backFront:0
                },
                lights:['6','62','7','58'],
                id:'3'
            },
            lxg:{
                config:'vrow',
                subgroups:{
                    middle: 0,
                    backFront:0
                },
                lights:['60','54','9','61','59','8'],
                id:'4'
            },
            xm:{
                config:'hrow',
                subgroups:{
                    right: 1,
                    backFront:1
                },
                lights:['44','56','5'],
                id:'5'
            },
            af:{
                config:'hrow',
                subgroups:{
                    right: 2,
                    backFront:2
                },
                lights:['50','57','42'],
                id:'6'
            },
            pi:{
                config:'hrow',
                subgroups:{
                    right: 3,
                    backFront:3
                },
                lights:['45','51','48'],
                id:'7'
            },
            devops:{
                config:'vrow',
                subgroups:{
                    middle: 1,
                    backFront:1
                },
                lights:['3','2','4','1'],
                id:'8'
            },
            ci1:{
                config:'hrow',
                subgroups:{
                    left: 0,
                    backFront:1
                },
                lights:['41','11','40'],
                id:'9'
            },
            ci2:{
                config:'hrow',
                subgroups:{
                    left: 1,
                    backFront:2
                },
                lights:['55','43','47'],
                id:'10'
            },
            ci3:{
                config:'hrow',
                subgroups:{
                    left: 2,
                    backFront:3
                },
                lights:['52','49','46'],
                id:'11'
            }
        }
    },
    frontOffice: {
        hubId: 'frontOffice',
        username: '-4yfT4pui4L14HxmJ5GMVwvsnNDDF2bKijGC0485',
        bridgeIp: '10.3.9.50',
        groups: {
            uv1: {
                config: 'block',
                subgroups: {
                    right: 4,
                    backFront: 4
                },
                lights: ['24', '22', '21', '23'],
                id:'6'
            },
            uv2: {
                config: 'block',
                subgroups: {
                    right: 5,
                    backFront: 5
                },
                lights: ['17', '18', '20', '19'],
                id:'7'
            },
            pc: {
                config: 'block',
                subgroups: {
                    right: 6,
                    backFront: 6
                },
                lights: ['8', '7', '2', '1','3'],
                id:'8'
            },
            uv3: {
                config: 'block',
                subgroups: {
                    left: 3,
                    backFront: 4
                },
                lights: ['9', '10', '12', '11'],
                id:'9'
            },
            cs: {
                config: 'block',
                subgroups: {
                    left: 4,
                    backFront: 5
                },
                lights: ['16', '15', '13', '14'],
                id:'10'
            }
        }
    }
};