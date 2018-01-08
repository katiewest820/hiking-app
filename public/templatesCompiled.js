(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['addNewFoodItem'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class='visibleFoodItemDetails'>\r\n	<h3>"
    + alias4(((helper = (helper = helpers.item || (depth0 != null ? depth0.item : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"item","hash":{},"data":data}) : helper)))
    + "</h3>\r\n    <p>Quantity: "
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "</p>\r\n    <p>Weight: "
    + alias4(((helper = (helper = helpers.weight || (depth0 != null ? depth0.weight : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"weight","hash":{},"data":data}) : helper)))
    + "</p>\r\n    <a class='deleteFoodItem' value='"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "' href='#'>\r\n    	<i class='fa fa-trash' aria-hidden='true'></i>\r\n    </a>\r\n</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.foodItem : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['addNewFoodList'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div>\r\n	<h2 class='foodListOwner' value='"
    + alias4(((helper = (helper = helpers.owner || (depth0 != null ? depth0.owner : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"owner","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers.owner || (depth0 != null ? depth0.owner : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"owner","hash":{},"data":data}) : helper)))
    + "\r\n		<div class=\"foodWeight\">\r\n		</div>\r\n	</h2>\r\n    <i class='fa fa-angle-down fa-3x showFoodList' aria-hidden='true' title='See Food List'></i>\r\n    <div class='"
    + alias4(container.lambda((depths[1] != null ? depths[1].className : depths[1]), depth0))
    + "'>\r\n		<div class='visibleFoodItemDetails'>\r\n			<h3>"
    + alias4(((helper = (helper = helpers.item || (depth0 != null ? depth0.item : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"item","hash":{},"data":data}) : helper)))
    + "</h3>\r\n    		<p>Quantity: "
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "</p>\r\n    		<p>Weight: "
    + alias4(((helper = (helper = helpers.weight || (depth0 != null ? depth0.weight : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"weight","hash":{},"data":data}) : helper)))
    + "</p>\r\n    		<a class='deleteFoodItem' value='"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "' href='#'>\r\n    			<i class='fa fa-trash' aria-hidden='true'></i>\r\n    		</a>\r\n		</div>\r\n    </div>\r\n</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.foodItem : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
templates['addNewGearItem'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class='visibleGearItemDetails'>\r\n	<h3>"
    + alias4(((helper = (helper = helpers.item || (depth0 != null ? depth0.item : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"item","hash":{},"data":data}) : helper)))
    + "</h3>\r\n    <p>Quantity: "
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "</p>\r\n    <p>Weight: "
    + alias4(((helper = (helper = helpers.weight || (depth0 != null ? depth0.weight : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"weight","hash":{},"data":data}) : helper)))
    + "</p>\r\n    <a class='deleteGearItem' value='"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "' href='#'>\r\n    	<i class='fa fa-trash' aria-hidden='true'></i>\r\n    </a>\r\n</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.gearItem : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
templates['addNewGearList'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div>\r\n	<h2 class='gearListOwner' value='"
    + alias4(((helper = (helper = helpers.owner || (depth0 != null ? depth0.owner : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"owner","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers.owner || (depth0 != null ? depth0.owner : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"owner","hash":{},"data":data}) : helper)))
    + "\r\n		<div class=\"gearWeight\">\r\n		</div>\r\n	</h2>\r\n    <i class='fa fa-angle-down fa-3x showGearList' aria-hidden='true' title='See Food List'></i>\r\n    <div class='"
    + alias4(container.lambda((depths[1] != null ? depths[1].className : depths[1]), depth0))
    + "'>\r\n		<div class='visibleGearItemDetails'>\r\n			<h3>"
    + alias4(((helper = (helper = helpers.item || (depth0 != null ? depth0.item : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"item","hash":{},"data":data}) : helper)))
    + "</h3>\r\n    		<p>Quantity:!!! "
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "</p>\r\n    		<p>Weight: "
    + alias4(((helper = (helper = helpers.weight || (depth0 != null ? depth0.weight : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"weight","hash":{},"data":data}) : helper)))
    + "</p>\r\n    		<a class='deleteGearItem' value='"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "' href='#'>\r\n    			<i class='fa fa-trash' aria-hidden='true'></i>\r\n    		</a>\r\n		</div>\r\n    </div>\r\n</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.gearItem : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n\r\n\r\n\r\n            ";
},"useData":true,"useDepths":true});
templates['archivedTripDetails'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <div>\r\n                <h2 class='gearListOwner' value='"
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\r\n                    <div class=\"gearWeight\"></div>\r\n                </h2>\r\n                <i class='fa fa-angle-right fa-3x showGearList' aria-hidden='true' title='See Gear List'></i>\r\n                <div class='food-"
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + " gearItemDetails'>\r\n                    <div class='visibleGearItemDetails'>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.gearList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </div>\r\n                </div>\r\n            </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                        <h3>"
    + alias2(alias1((depth0 != null ? depth0.item : depth0), depth0))
    + "</h3>\r\n                        <p>Quantity:"
    + alias2(alias1((depth0 != null ? depth0.quantity : depth0), depth0))
    + "</p>\r\n                        <p>Weight:"
    + alias2(alias1((depth0 != null ? depth0.weight : depth0), depth0))
    + "</p>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <div>\r\n                <h2 class='foodListOwner' value='"
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\r\n                    <div class=\"foodWeight\"></div>\r\n                </h2>\r\n                <i class='fa fa-angle-right fa-3x showFoodList' aria-hidden='true' title='See Food List'></i>\r\n                <div class='food-"
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + " foodItemDetails'>\r\n                    <div class='visibleFoodItemDetails'>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.foodList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </div>\r\n                </div>\r\n            </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"tripDetailsDiv\">\r\n    <a  target='_blank' href='https://www.google.com/maps/search/"
    + alias4(((helper = (helper = helpers.trailHead || (depth0 != null ? depth0.trailHead : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"trailHead","hash":{},"data":data}) : helper)))
    + "+trailhead'>\r\n        <h1>"
    + alias4(((helper = (helper = helpers.trail || (depth0 != null ? depth0.trail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"trail","hash":{},"data":data}) : helper)))
    + "</h1>\r\n    </a>\r\n<p>Start Date: <br> "
    + alias4(((helper = (helper = helpers.startDate || (depth0 != null ? depth0.startDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"startDate","hash":{},"data":data}) : helper)))
    + "</p><style></style><p>End Date: <br>"
    + alias4(((helper = (helper = helpers.endDate || (depth0 != null ? depth0.endDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"endDate","hash":{},"data":data}) : helper)))
    + "</p>\r\n</div>\r\n<div class=\"mapDistanceTotalsDiv\"></div>\r\n<div id=\"map2\"></div>\r\n<div class=\"gearListDiv\">\r\n    <h1>Gear Lists</h1>\r\n    <div class=\"currGearList\">\r\n        <div class=\"userGearLists\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.gearData : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n</div>\r\n<div class=\"foodListDiv\">\r\n    <h1>Food Lists</h1>\r\n    <div class=\"currFoodList\">\r\n        <div class=\"userFoodLists\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.foodData : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n</div>\r\n<i aria-hidden=\"true\" class=\"fa fa-arrow-left fa-2x backToArchives\" title=\"Back to Dashboard\"></i>";
},"useData":true});
templates['archivesList'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class='archivedTripDiv'>\r\n	<a href='#' value='"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.trip : depth0)) != null ? stack1._id : stack1), depth0))
    + "'>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.trip : depth0)) != null ? stack1.trail : stack1), depth0))
    + "</a>\r\n	<i class='fa fa-trash deleteArchive' value='"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.trip : depth0)) != null ? stack1._id : stack1), depth0))
    + "' aria-hidden='true' title='Delete Trip'></i>\r\n	<button class='reactivateTrip' value='"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.trip : depth0)) != null ? stack1._id : stack1), depth0))
    + "'><i class='fa fa-check-circle-o' ></i>Reactivate Trip</button>\r\n<div>\r\n\r\n\r\n                ";
},"useData":true});
templates['currDashboard'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.archived : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class='tripDiv'>\r\n        <a class='tripName' value='"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "' href='#'>"
    + alias4(((helper = (helper = helpers.trail || (depth0 != null ? depth0.trail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"trail","hash":{},"data":data}) : helper)))
    + "</a>\r\n        <i class='fa fa-trash deleteTrip' aria-hidden='true' value='"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "' title='Delete Trip'></i>\r\n        <i class='fa fa-share-alt shareImg' aria-hidden='true' value='"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "' title='Share Trip'></i>\r\n        <i class='fa fa-archive archiveTrip' aria-hidden='true' value='"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "' title='Archive Trip'></i>\r\n        <i class='fa fa-pencil editTrip' aria-hidden='true' value='"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "' title='Edit Trip'></i>\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h1>Your Trips:</h1>\r\n<div class=\"currTrips\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.trips : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\r\n\r\n\r\n";
},"useData":true});
templates['sharedDashboard'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.trip : depth0)) != null ? stack1.archived : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "    <div class='colabTripDiv'>\r\n        <a value='"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.trip : depth0)) != null ? stack1._id : stack1), depth0))
    + "' href='#'>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.trip : depth0)) != null ? stack1.trail : stack1), depth0))
    + "</a>\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<h1>Shared Trips:</h1>\r\n<div class=\"colabTrips\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.colabTrips : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\r\n";
},"useData":true});
templates['tripDetails'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <div>\r\n                <h2 class='gearListOwner' value='"
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\r\n                    <div class=\"gearWeight\"></div>\r\n                </h2>\r\n                <i class='fa fa-angle-right fa-3x showGearList' aria-hidden='true' title='See Gear List'></i>\r\n                <div class='gear-"
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + " gearItemDetails'>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.gearList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\r\n            </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                    <div class='visibleGearItemDetails'>\r\n                        <h3>"
    + alias2(alias1((depth0 != null ? depth0.item : depth0), depth0))
    + "</h3>\r\n                        <p>Quantity:"
    + alias2(alias1((depth0 != null ? depth0.quantity : depth0), depth0))
    + "</p>\r\n                        <p>Weight:"
    + alias2(alias1((depth0 != null ? depth0.weight : depth0), depth0))
    + "</p>\r\n                        <a class='deleteGearItem' value='"
    + alias2(alias1((depth0 != null ? depth0._id : depth0), depth0))
    + "' href='#'><i class='fa fa-trash' aria-hidden='true'></i></a>\r\n                    </div>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <div>\r\n                <h2 class='foodListOwner' value='"
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\r\n                    <div class=\"foodWeight\"></div>\r\n                </h2>\r\n                <i class='fa fa-angle-right fa-3x showFoodList' aria-hidden='true' title='See Food List'></i>\r\n                <div class='food-"
    + alias4(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + " foodItemDetails'>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.foodList : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\r\n            </div>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                    <div class='visibleFoodItemDetails'>\r\n                        <h3>"
    + alias2(alias1((depth0 != null ? depth0.item : depth0), depth0))
    + "</h3>\r\n                        <p>Quantity:"
    + alias2(alias1((depth0 != null ? depth0.quantity : depth0), depth0))
    + "</p>\r\n                        <p>Weight:"
    + alias2(alias1((depth0 != null ? depth0.weight : depth0), depth0))
    + "</p>\r\n                        <a class='deleteFoodItem' value='"
    + alias2(alias1((depth0 != null ? depth0._id : depth0), depth0))
    + "' href='#'><i class='fa fa-trash' aria-hidden='true'></i></a>\r\n                    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"tripDetailsDiv\">\r\n    <a  target='_blank' href='https://www.google.com/maps/search/"
    + alias4(((helper = (helper = helpers.trailHead || (depth0 != null ? depth0.trailHead : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"trailHead","hash":{},"data":data}) : helper)))
    + "+trailhead'>\r\n        <h1>"
    + alias4(((helper = (helper = helpers.trail || (depth0 != null ? depth0.trail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"trail","hash":{},"data":data}) : helper)))
    + "</h1>\r\n    </a>\r\n<p>Start Date: <br> "
    + alias4(((helper = (helper = helpers.startDate || (depth0 != null ? depth0.startDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"startDate","hash":{},"data":data}) : helper)))
    + "</p><style></style><p>End Date: <br>"
    + alias4(((helper = (helper = helpers.endDate || (depth0 != null ? depth0.endDate : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"endDate","hash":{},"data":data}) : helper)))
    + "</p>\r\n</div>\r\n<div class=\"mapDistanceTotalsDiv\"></div>\r\n<div id=\"map2\"></div>\r\n<div class=\"gearListDiv\">\r\n    <h1>Gear Lists</h1>\r\n    <i aria-hidden=\"true\" class=\"fa fa-plus fa-2x addGearItem\" title=\"Add List Item\"></i>\r\n    <div class=\"currGearList\">\r\n        <div class=\"hiddenAddGearItemForm addGearItemForm\">\r\n            <input class=\"newGearListOwner\" placeholder=\"Item Owner\" type=\"text\"> \r\n            <input class=\"newGearItem\" placeholder=\"Gear Item\" type=\"text\"> \r\n            <input class=\"newGearItemWeight\" placeholder=\"Item Weight\" type=\"text\"> \r\n            <select class=\"weightMeasure\" name=\"weight\">\r\n                <option value=\"oz\">Oz</option>\r\n                <option value=\"lbs\">Lbs</option>\r\n                <option value=\"g\">Grams</option>\r\n            </select> \r\n            <input class=\"newGearItemQ\" placeholder=\"Quantity\" type=\"text\"> \r\n            <button class=\"submitGearItemBtn\">Submit</button>\r\n        </div>\r\n        <div class=\"userGearLists\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.gearData : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            \r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"foodListDiv\">\r\n    <h1>Food Lists</h1>\r\n    <i aria-hidden=\"true\" class=\"fa fa-plus fa-2x addFoodItem\" title=\"Add List Item\"></i>\r\n    <div class=\"currFoodList\">\r\n        <div class=\"hiddenAddFoodItemForm addFoodItemForm\">\r\n            <input class=\"newFoodListOwner\" placeholder=\"Item Owner\" type=\"text\"> \r\n            <input class=\"newFoodItem\" placeholder=\"Food Item\" type=\"text\"> \r\n            <input class=\"newFoodItemWeight\" placeholder=\"Item Weight\" type=\"text\"> \r\n            <select class=\"foodWeightMeasure\" name=\"weight\">\r\n                <option value=\"oz\">Oz</option>\r\n                <option value=\"lbs\">Lbs</option>\r\n                <option value=\"g\">Grams</option>\r\n            </select> \r\n            <input class=\"newFoodItemQ\" placeholder=\"Quantity\" type=\"text\"> \r\n            <button class=\"submitFoodItemBtn\">Submit</button>\r\n        </div>\r\n        <div class=\"userFoodLists\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.foodData : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            \r\n        </div>\r\n    </div>\r\n</div>\r\n<i aria-hidden=\"true\" class=\"fa fa-arrow-left fa-2x backToDashboard leaveTripPage\" title=\"Back to Dashboard\"></i>";
},"useData":true});
})();