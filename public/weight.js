let ownerGearWeight = {};
let ownerFoodWeight = {};

//Get request for current gear and food list details. Converts values to lbs and totals
function calculatePackWeight() {
    $.ajax({
        url: `${myURL}trip/id/${tripIdValue}`,
        type: 'GET',
        headers: {
            authorization: myStorage.tokenKey
        }
    }).done((data) => {
        console.log(data)
        for (let owner in data.orderGearList) {
            let total = [];
            for (let i = 0; i < data.orderGearList[owner].length; i++) {
                let splitWeight = data.orderGearList[owner][i].weight.split(' ');
                let quantity = data.orderGearList[owner][i].quantity;
                if (splitWeight[1] == 'lbs') {
                    total.push(splitWeight[0] * 16 * quantity);
                }
                if (splitWeight[1] == 'g') {
                    total.push(splitWeight[0] / 28.34952 * quantity);
                } else if (splitWeight[1] == 'oz') {
                    let num = parseInt(splitWeight[0]);
                    total.push(num * quantity);
                }
            }
            let theTotal = total.reduce((a, b) => {
                return a + b;
            });
            ownerGearWeight[owner] = theTotal;
        }
        for (let owner in data.orderFoodList) {
            let total = [];
            for (let i = 0; i < data.orderFoodList[owner].length; i++) {
                let splitWeight = data.orderFoodList[owner][i].weight.split(' ');
                let quantity = data.orderFoodList[owner][i].quantity;
                if (splitWeight[1] == 'lbs') {
                    total.push(splitWeight[0] * quantity * 16);
                }
                if (splitWeight[1] == 'g') {
                    total.push(splitWeight[0] * quantity / 28.34952);
                } else if (splitWeight[1] == 'oz') {
                    let num = parseInt(splitWeight[0]);
                    total.push(quantity * num);
                }
            }
            let theTotal = total.reduce((a, b) => {
                return a + b;
            });
            ownerFoodWeight[owner] = theTotal;
        }
        displayGearWeight();
        displayFoodWeight();
    }).fail((err) => {
        console.log(err)
    });
}

//Displays gear list weight total on trip details page
function displayGearWeight() {
    $('.gearWeightDisplay').empty();
    for (let owner in ownerGearWeight) {
        let myOwner = $('.gearListOwner').each((index, element) => {
            if (owner == $(element).attr('value')) {
                let myWeight = ownerGearWeight[owner] / 16;
                $(element).find('.gearWeight').html(`<p class='gearWeightDisplay'>Current List Weight: ${myWeight} Lbs</p>`);
            }
        });
    }
}

//Displays food list weight total on trip details page
function displayFoodWeight() {
    $('.foodWeightDisplay').empty();
    for (let owner in ownerFoodWeight) {
        let myOwner = $('.foodListOwner').each((index, element) => {
            if (owner == $(element).attr('value')) {
                let myWeight = ownerFoodWeight[owner] / 16;
                $(element).find('.foodWeight').html(`<p class='foodWeightDisplay'>Current List Weight: ${myWeight} Lbs</p>`);
            }
        });
    }
}