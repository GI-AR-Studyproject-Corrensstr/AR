var abbildung;

gpsData = {
    a: { lat: 51.967800, lon: 7.596500, alt: 0 },
    b: { lat: 51.968600, lon: 7.596400, alt: -1 },
    c: { lat: 51.967800, lon: 7.596200, alt: 0 }
}

kartData = {
    a: { x: 0, y: 0, z: 0 },
    b: { x: 0, y: 95, z: 0 },
    c: { x: -22, y: 0, z: 0 }
}

var testPoint = [[51.968600], [7.596400], [-1]];

var GPSmatrix = [[gpsData.a.lat,gpsData.b.lat,gpsData.c.lat],
                 [gpsData.a.lon,gpsData.b.lon,gpsData.c.lon],
                 [gpsData.a.alt,gpsData.b.alt,gpsData.c.alt]];

var kartMatrix = [[kartData.a.x, kartData.b.x, kartData.c.x],
                  [kartData.a.y, kartData.b.y, kartData.c.y],
                  [kartData.a.z, kartData.b.z, kartData.c.z]]

// var GPSmatrix = [[gpsData.a.lat, gpsData.a.lon, gpsData.a.alt],
//                  [gpsData.b.lat, gpsData.b.lon, gpsData.b.alt],
//                  [gpsData.c.lat, gpsData.c.lon, gpsData.c.alt]];

// var kartMatrix = [[kartData.a.x, kartData.a.y, kartData.a.z],
//                   [kartData.b.x, kartData.b.y, kartData.b.z], 
//                   [kartData.c.x, kartData.c.y, kartData.c.z]];

function multiplyMatrices(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

function CalculateCoordinatesOfGPS(matrix) {
    var inverse = math.inv(matrix);
    var abbildung = multiplyMatrices(kartMatrix, inverse);
    console.log(abbildung);
    calculatePoint(abbildung, testPoint);
}

CalculateCoordinatesOfGPS(GPSmatrix);

function calculatePoint(abbildung, point) {
    console.log("Abbildung: ", abbildung);
    var kartPoint = math.multiply(abbildung, point);
    console.log("KartPoint: ", kartPoint);
}