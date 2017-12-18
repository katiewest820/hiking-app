let ownerGearWeight = {}
let ownerFoodWeight = {}

function calculatePackWeight() {
    $.ajax({
            url: `${myURL}trip/id/${tripIdValue}`,
            type: 'GET',
            headers: { authorization: myStorage.tokenKey }
        })
        .done((data) => {
            for (let owner in data.orderGearList) {
                let total = [];
                for (let i = 0; i < data.orderGearList[owner].length; i++) {
                    let splitWeight = data.orderGearList[owner][i].weight.split(' ');
                    let quantity = data.orderGearList[owner][i].quantity
                    console.log(splitWeight)
                    if (splitWeight[1] == 'lbs') {

                        total.push(splitWeight[0] * 16 * quantity);
                    }
                    if (splitWeight[1] == 'g') {
                        total.push(splitWeight[0] / 28.34952 * quantity)
                    } else {
                        let num = parseInt(splitWeight[0])
                        total.push(num * quantity)
                    }

                }
                let theTotal = total.reduce((a, b) => {
                    return a + b
                });
                ownerGearWeight[owner] = theTotal;
            }

            for (let owner in data.orderFoodList) {
                let total = [];
                for (let i = 0; i < data.orderFoodList[owner].length; i++) {
                    let splitWeight = data.orderFoodList[owner][i].weight.split(' ');
                    let quantity = data.orderFoodList[owner][i].quantity
                    console.log(splitWeight)
                    if (splitWeight[1] == 'lbs') {

                        total.push(splitWeight[0] * 16 * quantity);
                    }
                    if (splitWeight[1] == 'g') {
                        total.push(splitWeight[0] / 28.34952 * quantity)
                    } else {
                        let num = parseInt(splitWeight[0])
                        total.push(num * quantity)
                    }

                }
                let theTotal = total.reduce((a, b) => {
                    return a + b
                });
                ownerFoodWeight[owner] = theTotal
            }
            console.log(ownerGearWeight)
            console.log(ownerFoodWeight)
            displayGearWeight();
            displayFoodWeight();
        })
        .fail((err) => {
            console.log(err)
        })
}


function displayGearWeight() {
	
	$('.gearWeightDisplay').empty();
	
    for (let owner in ownerGearWeight) {
        let myOwner = $('.gearListOwner').each((index, element) => {
            if (owner == $(element).attr('value')) {
                let myNum = ownerGearWeight[owner] / 16;
                let myWeight = myNum.toFixed(2);
                console.log(myWeight)
                $(element).append(`<p class="gearWeightDisplay">Current List Weight: ${myWeight} Lbs</p>`)
            }
        })
        console.log(myOwner)
    }
}

function displayFoodWeight() {
	$('.foodWeightDisplay').empty();
    for (let owner in ownerFoodWeight) {
        let myOwner = $('.foodListOwner').each((index, element) => {
            if (owner == $(element).attr('value')) {
                let myNum = ownerFoodWeight[owner] / 16;
                let myWeight = myNum.toFixed(2)
                console.log(myWeight)
                $(element).append(`<p class="foodWeightDisplay">Current List Weight: ${myWeight} Lbs</p>`)
            }
        })
        console.log(myOwner)
    }
}