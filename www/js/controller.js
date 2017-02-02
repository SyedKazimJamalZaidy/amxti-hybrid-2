var resultData = [];//result of flights coming from Sabre api
resultDataHotels = [];//result of hotels coming from Sabre api
var result=[]; //Response result of Airports from solude amxti
var airlineInfo; //Response result of Airlines
var selectedFlightMulti =[]; //for multi city
var selectedFlight; //for round and single trip
var securityToken; //Security Token received from Sabre
var airlineCodeFinal = ""; //for flight preferences
var passengerUniqueId;//PNR
var resultDataMulti0 = []; //First location result
var resultDataMulti1= []; //Second location result
var resultDataMulti2= []; //Third location result
var selectedFlightMulti0; //Selected Flights for multi city
var selectedFlightMulti1; //Selected Flights for multi city
var selectedFlightMulti2; //Selected Flights for multi city
var passengerDetail= [];
var totalFareMulti = 0;
var selectedHotel;//Selected hotel detail
var selectedHotelDetails = []; //Further details for hotels
app.controller('MenuController', function($scope, $ionicSideMenuDelegate) {
      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
    })

app.controller('HomePageController', function($scope, $ionicSideMenuDelegate) {
  
    })

app.controller('Controller', function($scope, $ionicSideMenuDelegate) {
    })


app.controller('ChatController', function($scope, $ionicSideMenuDelegate) {
    })


app.controller('ChatSingleController', function($scope, $ionicSideMenuDelegate) {
    })


app.controller('DrinkController', function($scope, $ionicSideMenuDelegate) {
    })




app.controller('TabTwoController', function($scope, $ionicSideMenuDelegate) {
    })


app.controller('TabThreeController', function($scope, $ionicSideMenuDelegate) {
    })


//First Tab Controller
app.controller('FirstController', function($scope, $ionicSideMenuDelegate, $state) {
        $scope.login = function(){
            $state.go('login');
        }
        $scope.register = function(){
            $state.go('registration');
        }
    })


//Login Page Controller
app.controller('LoginController', function($scope, $ionicSideMenuDelegate, $state) {
        $scope.success = function(){
            $state.go('menu.homepage');
        }
		$scope.register = function(){
            $state.go('registration');
        }
    })


// Flights Controller RoundTrip
.controller('RoundController', function($scope, $http, $state,$ionicSideMenuDelegate, $ionicLoading) {
  $ionicLoading.show({
    template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
    duration: 1000
  })
  var destinationName= [];
  var destinationIATA = [];
  resultData = [];

  

  $scope.whichClassToUse = function(someValue){
    someValue = ionic.Platform.platform();
    if(someValue == "android"){
      return "has-tabs-top"
    }
  }
    $scope.flightDetails = function(){
      resultData = [];
          $ionicLoading.show({
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'
          }).then(function(){
              var from = document.getElementById("from").value;
      var to = document.getElementById("to").value;
      var departDate = document.getElementById('departDate').value;
      var arrDate = document.getElementById('arrDate').value;
      var adult = document.getElementById('adult').value;
      var airlineCode = document.getElementById("airlineCode");
      var airlinesName = airlineCode.options[airlineCode.selectedIndex].value;
      
      var fromIATA;
      var toIATA;
      for (var i = 0; i < result.length; i++) {
        if(from == result[i].label)
          {
            fromIATA = result[i].id;
            
          }
      }

      for (var i = 0; i < result.length; i++) {
        if(to == result[i].label)
          {
            toIATA = result[i].id;
            
          }
      }
      if(fromIATA == toIATA){
        alert("Please select a different departure or arrival airport to complete a journey!")
      }
      else {
              for (var i = 0; i < airlineInfo.length; i++) {

        if(airlinesName == airlineInfo[i].AirlineName){
          
          airlineCodeFinal = airlineInfo[i].AirlineCode;
          
        }
        else {
          airlineCodeFinal = "";
        }
      }
     
          
      var flightPreference = '';
   
     if(airlineCodeFinal!=""){
      
      flightPreference = "<VendorPref Code=\""+airlineCodeFinal+"\" PreferLevel=\"Only\"/>";
     }
      
      var getFlightData = {
        "async": true,
        "crossDomain": true,
        "url": "https://webservices-as.havail.sabre.com/",
        "method": "POST",
        "headers": {
          "content-type": "text/xml",
          "cache-control": "no-cache",
          
        },
        "data": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\r\n   <soapenv:Header>\r\n      <MessageHeader xmlns=\"http://www.ebxml.org/namespaces/messageHeader\">\r\n         <From>\r\n            <PartyId type=\"urn:x12.org:IO5:01\">CRS</PartyId>\r\n         </From>\r\n         <To>\r\n            <PartyId type=\"urn:x12.org:IO5:01\">Sabre</PartyId>\r\n         </To>\r\n         <CPAId>R7OI</CPAId>\r\n         <ConversationId>9999</ConversationId>\r\n         <Service type=\"string\">Cruise</Service>\r\n         <Action>BargainFinderMaxRQ</Action>\r\n         <MessageData>\r\n            <MessageId>1426190858</MessageId>\r\n            <Timestamp>2015-03-12T02:07:38-06:00</Timestamp>\r\n            <TimeToLive>2015-03-12T03:07:38-06:00</TimeToLive>\r\n         </MessageData>\r\n      </MessageHeader>\r\n      <wsse:Security xmlns:wsse=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" xmlns:wsu=\"http://schemas.xmlsoap.org/ws/2002/12/utility\">\r\n           <wsse:BinarySecurityToken  valueType=\"String\" EncodingType=\"wsse:Base64Binary\">"+securityToken+"</wsse:BinarySecurityToken>\r\n      </wsse:Security>\r\n   </soapenv:Header>\r\n   <soapenv:Body>\r\n   \r\n   <OTA_AirLowFareSearchRQ xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" xmlns=\"http://www.opentravel.org/OTA/2003/05\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" Target=\"Production\" Version=\"1.9.5\" ResponseType=\"OTA\" ResponseVersion=\"1.9.5\">\r\n    <POS>\r\n        <Source PseudoCityCode=\"R7OI\">\r\n        <RequestorID ID=\"1\" Type=\"1\">\r\n            <CompanyName Code=\"TN\" />\r\n        </RequestorID>\r\n        </Source>\r\n    </POS>\r\n    <OriginDestinationInformation RPH=\"1\">\r\n        <DepartureDateTime>"+departDate+"T00:00:00</DepartureDateTime>\r\n        <OriginLocation LocationCode=\""+fromIATA+"\" />\r\n        <DestinationLocation LocationCode=\""+toIATA+"\" />\r\n\t\t\r\n        <TPA_Extensions>\r\n            <SegmentType Code=\"O\" />\r\n        </TPA_Extensions>\r\n\t\t\r\n    </OriginDestinationInformation>\r\n    <OriginDestinationInformation RPH=\"2\">\r\n        <DepartureDateTime>"+arrDate+"T00:00:00</DepartureDateTime>\r\n        <OriginLocation LocationCode=\""+toIATA+"\" />\r\n        <DestinationLocation LocationCode=\""+fromIATA+"\" />\r\n        <TPA_Extensions>\r\n            <SegmentType Code=\"O\" />\r\n        </TPA_Extensions>\r\n\t\r\n    </OriginDestinationInformation>\r\n    \r\n  <TravelPreferences ValidInterlineTicket=\"true\">\r\n"+flightPreference+"\
        <CabinPref PreferLevel=\"Preferred\" Cabin=\"Y\" />\
        <TPA_Extensions>\
            <TripType Value=\"Return\" />\
            <LongConnectTime Min=\"0\" Max=\"999\" Enable=\"true\" />\
            <ExcludeCallDirectCarriers Enabled=\"true\" />\
        </TPA_Extensions>\
    </TravelPreferences>  <TravelerInfoSummary>\r\n        <SeatsRequested>1</SeatsRequested>\r\n        <AirTravelerAvail>\r\n            \t<PassengerTypeQuantity Code=\"ADT\" Quantity= \""+adult+"\" />\r\n\t\t\t \r\n        </AirTravelerAvail>\r\n    </TravelerInfoSummary>\r\n    <TPA_Extensions>\r\n        <IntelliSellTransaction>\r\n            <RequestType Name=\"50ITINS\" />\r\n        </IntelliSellTransaction>\r\n    </TPA_Extensions>\r\n</OTA_AirLowFareSearchRQ>\r\n\r\n    </soapenv:Body>\r\n</soapenv:Envelope>"
}
//Making AJAX Request for data of flights
$.ajax(getFlightData).done(function(response){
  if(response.getElementsByTagName("PricedItineraries").length != 0){
    var pricedItineraries = response.getElementsByTagName("PricedItineraries")[0].childNodes;
      
        for (var i = 0; i < pricedItineraries.length; i++) {
          
          var totalFare = pricedItineraries[i].getElementsByTagName("ItinTotalFare")[0].getElementsByTagName("TotalFare")[0].getAttribute("Amount");
          
          var originDestinationOptions = pricedItineraries[i].getElementsByTagName("AirItinerary")[0].getElementsByTagName("OriginDestinationOptions")[0];
          
          var tempArray = [];
          for (var j = 0; j < originDestinationOptions.childNodes.length; j++) {
            var originDestinationOption = originDestinationOptions.childNodes[j].childNodes;
            
            for (var k = 0; k < originDestinationOption.length; k++) {              
              var departureAirport = originDestinationOption[k].getElementsByTagName("DepartureAirport")[0].getAttribute("LocationCode");
              var departureDateTime = originDestinationOption[k].getAttribute("DepartureDateTime");
              var arrivalAirport = originDestinationOption[k].getElementsByTagName("ArrivalAirport")[0].getAttribute("LocationCode");
              var arrivalDateTime = originDestinationOption[k].getAttribute("ArrivalDateTime");
              var elapsedTime = originDestinationOption[k].getAttribute("ElapsedTime");
              var flightNumber = originDestinationOption[k].getAttribute("FlightNumber");
              var flightCode = originDestinationOption[k].getElementsByTagName("MarketingAirline")[0].getAttribute("Code");

              var res1 = departureDateTime.split("T");
              var departureDate = res1[0];
              var departureTime = res1[1];
              var res2 = arrivalDateTime.split("T");
              var arrivalDate = res2[0];
              var arrivalTime = res2[1];
              var departureAirportName;
              var arrivalAirportName;
              for (var x = 0; x < result.length; x++) {
                if(departureAirport == result[x].id){
                  departureAirportName = result[x].label;
                }
              }
              for (var y = 0; y < result.length; y++) {
                if(arrivalAirport == result[y].id){
                  arrivalAirportName = result[y].label;
                }
              }

              var resultObj = {departureAirport, departureDate, departureTime, departureAirportName, arrivalAirport, arrivalDate, arrivalTime, arrivalAirportName, elapsedTime, totalFare, flightCode, flightNumber};
              tempArray.push(resultObj);
              
            }
            
          }
         
          resultData.push(tempArray);
          
        }
        $ionicLoading.hide();
        $state.go('menu.flightdetails');
  }
  else {
    $ionicLoading.hide();
    alert("No flights found");
  }
      
    })
}
          });

      
    

       
      

  }
         
    



    //Authenticating for token
    var auth = {
  "async": true,
  "crossDomain": true,
  "url": "https://webservices-as.havail.sabre.com/",
  "method": "POST",
  "headers": {
    "content-type": "text/xml",
    "cache-control": "no-cache",
    
  },
  "data":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\t\t<SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:eb=\"http://www.ebxml.org/namespaces/messageHeader\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:xsd=\"http://www.w3.org/1999/XMLSchema\">\r\n\t\t    <SOAP-ENV:Header>\r\n\t\t        <eb:MessageHeader SOAP-ENV:mustUnderstand=\"1\" eb:version=\"1.0\">\r\n\t\t            <eb:ConversationId>99999</eb:ConversationId>\r\n\t\t            <eb:From>\r\n\t\t                <eb:PartyId type=\"urn:x12.org:IO5:01\">999999</eb:PartyId>\r\n\t\t            </eb:From>\r\n\t\t            <eb:To>\r\n\t\t                <eb:PartyId type=\"urn:x12.org:IO5:01\">123123</eb:PartyId>\r\n\t\t            </eb:To>\r\n\t\t            <eb:CPAId>R7OI</eb:CPAId>\r\n\t\t            <eb:Service eb:type=\"OTA\">SessionCreateRQ</eb:Service>\r\n\t\t            <eb:Action>SessionCreateRQ</eb:Action>\r\n\t\t            <eb:MessageData>\r\n\t\t                <eb:MessageId>1000</eb:MessageId>\r\n\t\t                <eb:Timestamp>2001-02-15T11:15:12Z</eb:Timestamp>\r\n\t\t                <eb:TimeToLive>2001-02-15T11:15:12Z</eb:TimeToLive>\r\n\t\t            </eb:MessageData>\r\n\t\t        </eb:MessageHeader>\r\n\t\t        <wsse:Security xmlns:wsse=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" xmlns:wsu=\"http://schemas.xmlsoap.org/ws/2002/12/utility\">\r\n\t\t            <wsse:UsernameToken> \r\n\t\t                <wsse:Username>595258</wsse:Username>\r\n\t\t                <wsse:Password>WS500917</wsse:Password>\r\n\t\t                <Organization>R7OI</Organization>\r\n\t\t                <Domain>DEFAULT</Domain> \r\n\t\t            </wsse:UsernameToken>\r\n\t\t        </wsse:Security>\r\n\t\t    </SOAP-ENV:Header>\r\n\t\t    <SOAP-ENV:Body>\r\n\t\t        <eb:Manifest SOAP-ENV:mustUnderstand=\"1\" eb:version=\"1.0\">\r\n\t\t            <eb:Reference xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"cid:rootelement\" xlink:type=\"simple\"/>\r\n\t\t        </eb:Manifest>\r\n\t\t    </SOAP-ENV:Body>\r\n\t\t</SOAP-ENV:Envelope>"
}

$.ajax(auth).done(function(response){
  securityToken = response.getElementsByTagName("BinarySecurityToken")[0].childNodes[0].nodeValue;
  })
  



        // Getting list of Airlines
    
      $http({
        method: "GET",
        url: "js/airlines.json",
        headers: {
          "Content-Type" : "application/x-www-form-urlencoded"
        }
      }).then(function(response){

      $scope.airlineInfo = response.data.AirlineInfo;
      airlineInfo = $scope.airlineInfo;
      
      var airlineName = [];
      for (var i = 0; i < airlineInfo.length; i++) {
        airlineName.push(airlineInfo[i].AirlineName);
      }
      $scope.airlineName = airlineName; 
    });
      
    // Getting list of Airports
    if(result.length == 0){
    $http({
      method: "GET",
      url: "js/airports.json",
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      }
    }).then(function(response){
      result = response.data;
      for (var i = 0; i < result.length; i++) {
          destinationName.push(result[i].label);
          destinationIATA.push(result[i].id);
      }
      $("#from").autocomplete({
        source: destinationName
      })
      $("#to").autocomplete({
        source: destinationName
      })
    });
  }
  else {
    for (var i = 0; i < result.length; i++) {
          destinationName.push(result[i].label);
          destinationIATA.push(result[i].id);
      }
       $("#from").autocomplete({
        source: destinationName
      })
      $("#to").autocomplete({
        source: destinationName
      })
  }
})
// Flights Controller End


// Single Trip Controller
.controller('SingleController', function($scope, $http, $state,$ionicSideMenuDelegate, $ionicLoading) {
  var destinationName= [];
  var destinationIATA = [];
  resultData= [];
  $scope.whichClassToUse = function(someValue){
    someValue = ionic.Platform.platform();
    if(someValue == "android"){
      return "has-tabs-top"
    }
 }
 $ionicLoading.show({
  template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
  duration: 1000
 })
    $scope.flightDetails = function(){
      resultData = [];
      $ionicLoading.show({
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'
          }).then(function(){
            var fromSingle = document.getElementById("fromSingle").value;
      var toSingle = document.getElementById("toSingle").value;
      var departDate = document.getElementById('departDate').value;
      var adult = document.getElementById('adult').value;
      var airlineCode = document.getElementById("airlineCode");
      var airlinesName = airlineCode.options[airlineCode.selectedIndex].value;
      var airlineCodeFinal = "";
      var fromIATA;
      var toIATA;
      for (var i = 0; i < result.length; i++) {
        if(fromSingle == result[i].label)
          {
            fromIATA = result[i].id;
            
          }
      }

      for (var i = 0; i < result.length; i++) {
        if(toSingle == result[i].label)
          {
            toIATA = result[i].id;
            
          }
      }

      if(fromIATA == toIATA){
        alert("Plese select different departure or arrival airport to complete the journey");
      }
      
      else {
        for (var i = 0; i < airlineInfo.length; i++) {

        if(airlinesName == airlineInfo[i].AirlineName){
          
          airlineCodeFinal = airlineInfo[i].AirlineCode;
          
        }
        else {
          airlineCodeFinal = "";
        }
      }
     
          
      var flightPreference = '';
      
     if(airlineCodeFinal!=""){
      
      flightPreference = "<VendorPref Code=\""+airlineCodeFinal+"\" PreferLevel=\"Only\"/>";
     }
      
      var getFlightData = {
        "async": true,
        "crossDomain": true,
        "url": "https://webservices-as.havail.sabre.com/",
        "method": "POST",
        "headers": {
          "content-type": "text/xml",
          "cache-control": "no-cache",
          
        },
        "data": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\r\n   <soapenv:Header>\r\n      <MessageHeader xmlns=\"http://www.ebxml.org/namespaces/messageHeader\">\r\n         <From>\r\n            <PartyId type=\"urn:x12.org:IO5:01\">CRS</PartyId>\r\n         </From>\r\n         <To>\r\n            <PartyId type=\"urn:x12.org:IO5:01\">Sabre</PartyId>\r\n         </To>\r\n         <CPAId>R7OI</CPAId>\r\n         <ConversationId>9999</ConversationId>\r\n         <Service type=\"string\">Cruise</Service>\r\n         <Action>BargainFinderMaxRQ</Action>\r\n         <MessageData>\r\n            <MessageId>1426190858</MessageId>\r\n            <Timestamp>2015-03-12T02:07:38-06:00</Timestamp>\r\n            <TimeToLive>2015-03-12T03:07:38-06:00</TimeToLive>\r\n         </MessageData>\r\n      </MessageHeader>\r\n      <wsse:Security xmlns:wsse=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" xmlns:wsu=\"http://schemas.xmlsoap.org/ws/2002/12/utility\">\r\n           <wsse:BinarySecurityToken  valueType=\"String\" EncodingType=\"wsse:Base64Binary\">"+securityToken+"</wsse:BinarySecurityToken>\r\n      </wsse:Security>\r\n   </soapenv:Header>\r\n   <soapenv:Body>\r\n   \r\n   <OTA_AirLowFareSearchRQ xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" xmlns=\"http://www.opentravel.org/OTA/2003/05\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" Target=\"Production\" Version=\"1.9.5\" ResponseType=\"OTA\" ResponseVersion=\"1.9.5\">\r\n    <POS>\r\n        <Source PseudoCityCode=\"R7OI\">\r\n        <RequestorID ID=\"1\" Type=\"1\">\r\n            <CompanyName Code=\"TN\" />\r\n        </RequestorID>\r\n        </Source>\r\n    </POS>\r\n    <OriginDestinationInformation RPH=\"1\">\r\n        <DepartureDateTime>"+departDate+"T00:00:00</DepartureDateTime>\r\n        <OriginLocation LocationCode=\""+fromIATA+"\" />\r\n        <DestinationLocation LocationCode=\""+toIATA+"\" />\r\n\t\t\r\n        <TPA_Extensions>\r\n            <SegmentType Code=\"O\" />\r\n        </TPA_Extensions>\r\n\t\t\r\n    </OriginDestinationInformation>\r\n    \r\n    \r\n  <TravelPreferences ValidInterlineTicket=\"true\">\r\n"+flightPreference+"\
        <CabinPref PreferLevel=\"Preferred\" Cabin=\"Y\" />\
        <TPA_Extensions>\
            <TripType Value=\"Return\" />\
            <LongConnectTime Min=\"0\" Max=\"999\" Enable=\"true\" />\
            <ExcludeCallDirectCarriers Enabled=\"true\" />\
        </TPA_Extensions>\
    </TravelPreferences>  <TravelerInfoSummary>\r\n        <SeatsRequested>1</SeatsRequested>\r\n        <AirTravelerAvail>\r\n            \t<PassengerTypeQuantity Code=\"ADT\" Quantity= \""+adult+"\" />\r\n\t\t\t \r\n        </AirTravelerAvail>\r\n    </TravelerInfoSummary>\r\n    <TPA_Extensions>\r\n        <IntelliSellTransaction>\r\n            <RequestType Name=\"50ITINS\" />\r\n        </IntelliSellTransaction>\r\n    </TPA_Extensions>\r\n</OTA_AirLowFareSearchRQ>\r\n\r\n    </soapenv:Body>\r\n</soapenv:Envelope>"
}
//Making AJAX Request for data of flights
$.ajax(getFlightData).done(function(response){
  
      if(response.getElementsByTagName("PricedItineraries").length != 0){
      var pricedItineraries = response.getElementsByTagName("PricedItineraries")[0].childNodes;
       
        for (var i = 0; i < pricedItineraries.length; i++) {
          
          var totalFare = pricedItineraries[i].getElementsByTagName("ItinTotalFare")[0].getElementsByTagName("TotalFare")[0].getAttribute("Amount");
          
          var originDestinationOptions = pricedItineraries[i].getElementsByTagName("AirItinerary")[0].getElementsByTagName("OriginDestinationOptions")[0];
          
          var tempArray = [];
          for (var j = 0; j < originDestinationOptions.childNodes.length; j++) {
            var originDestinationOption = originDestinationOptions.childNodes[j].childNodes;
            
            for (var k = 0; k < originDestinationOption.length; k++) {
            
              
              var departureAirport = originDestinationOption[k].getElementsByTagName("DepartureAirport")[0].getAttribute("LocationCode");
              var departureDateTime = originDestinationOption[k].getAttribute("DepartureDateTime");
              arrivalDateTime = originDestinationOption[k].getAttribute("ArrivalDateTime");
              var arrivalAirport = originDestinationOption[k].getElementsByTagName("ArrivalAirport")[0].getAttribute("LocationCode");
              
              var elapsedTime = originDestinationOption[k].getAttribute("ElapsedTime");
              var flightNumber = originDestinationOption[k].getAttribute("FlightNumber");
              var flightCode = originDestinationOption[k].getElementsByTagName("MarketingAirline")[0].getAttribute("Code");

              var res1 = departureDateTime.split("T");
              var departureDate = res1[0];
              var departureTime = res1[1];
              var res2 = arrivalDateTime.split("T");
              var arrivalDate = res2[0];
              var arrivalTime = res2[1];
              var departureAirportName;
              var arrivalAirportName;
              for (var x = 0; x < result.length; x++) {
                if(departureAirport == result[x].id){
                  departureAirportName = result[x].label;
                }
              }
              for (var y = 0; y < result.length; y++) {
                if(arrivalAirport == result[y].id){
                  arrivalAirportName = result[y].label;
                }
              }
              var resultObj = {departureAirport, departureDate, departureTime, departureAirportName, arrivalAirport, arrivalTime, arrivalDate, arrivalAirportName, elapsedTime, totalFare, flightCode, flightNumber};
              tempArray.push(resultObj);
              
            }
            
          }
          resultData.push(tempArray);
          
        }
        $ionicLoading.hide();
        $state.go('menu.flightdetails');
       
      }
      else {
        $ionicLoading.hide();
        alert("No flights found");
      }
    })


      }
       
          });
      
  }
         
    



    //Authenticating for token
    var auth = {
  "async": true,
  "crossDomain": true,
  "url": "https://webservices-as.havail.sabre.com/",
  "method": "POST",
  "headers": {
    "content-type": "text/xml",
    "cache-control": "no-cache",
    
  },
  "data":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\t\t<SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:eb=\"http://www.ebxml.org/namespaces/messageHeader\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:xsd=\"http://www.w3.org/1999/XMLSchema\">\r\n\t\t    <SOAP-ENV:Header>\r\n\t\t        <eb:MessageHeader SOAP-ENV:mustUnderstand=\"1\" eb:version=\"1.0\">\r\n\t\t            <eb:ConversationId>99999</eb:ConversationId>\r\n\t\t            <eb:From>\r\n\t\t                <eb:PartyId type=\"urn:x12.org:IO5:01\">999999</eb:PartyId>\r\n\t\t            </eb:From>\r\n\t\t            <eb:To>\r\n\t\t                <eb:PartyId type=\"urn:x12.org:IO5:01\">123123</eb:PartyId>\r\n\t\t            </eb:To>\r\n\t\t            <eb:CPAId>R7OI</eb:CPAId>\r\n\t\t            <eb:Service eb:type=\"OTA\">SessionCreateRQ</eb:Service>\r\n\t\t            <eb:Action>SessionCreateRQ</eb:Action>\r\n\t\t            <eb:MessageData>\r\n\t\t                <eb:MessageId>1000</eb:MessageId>\r\n\t\t                <eb:Timestamp>2001-02-15T11:15:12Z</eb:Timestamp>\r\n\t\t                <eb:TimeToLive>2001-02-15T11:15:12Z</eb:TimeToLive>\r\n\t\t            </eb:MessageData>\r\n\t\t        </eb:MessageHeader>\r\n\t\t        <wsse:Security xmlns:wsse=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" xmlns:wsu=\"http://schemas.xmlsoap.org/ws/2002/12/utility\">\r\n\t\t            <wsse:UsernameToken> \r\n\t\t                <wsse:Username>595258</wsse:Username>\r\n\t\t                <wsse:Password>WS500917</wsse:Password>\r\n\t\t                <Organization>R7OI</Organization>\r\n\t\t                <Domain>DEFAULT</Domain> \r\n\t\t            </wsse:UsernameToken>\r\n\t\t        </wsse:Security>\r\n\t\t    </SOAP-ENV:Header>\r\n\t\t    <SOAP-ENV:Body>\r\n\t\t        <eb:Manifest SOAP-ENV:mustUnderstand=\"1\" eb:version=\"1.0\">\r\n\t\t            <eb:Reference xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"cid:rootelement\" xlink:type=\"simple\"/>\r\n\t\t        </eb:Manifest>\r\n\t\t    </SOAP-ENV:Body>\r\n\t\t</SOAP-ENV:Envelope>"
}

$.ajax(auth).done(function(response){
  securityToken = response.getElementsByTagName("BinarySecurityToken")[0].childNodes[0].nodeValue;
  })
  


 

        // Getting list of Airlines

      $http({
        method: "GET",
        url: "js/airlines.json",
        headers: {
          "Content-Type" : "application/x-www-form-urlencoded"
        }
      }).then(function(response){

      $scope.airlineInfo = response.data.AirlineInfo;
      airlineInfo = $scope.airlineInfo;
      
      var airlineName = [];

      for (var i = 0; i < airlineInfo.length; i++) {
        airlineName.push(airlineInfo[i].AirlineName);
      }
      $scope.airlineName = airlineName; 
    });
   // Getting list of Airports
    if(result.length == 0){
    $http({
      method: "GET",
      url: "js/airports.json",
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      }
    }).then(function(response){
      result = response.data;
      for (var i = 0; i < result.length; i++) {
          destinationName.push(result[i].label);
          destinationIATA.push(result[i].id);
      }
      $("#fromSingle").autocomplete({
        source: destinationName
      })
      $("#toSingle").autocomplete({
        source: destinationName
      })
    });
  }
  else {
    for (var i = 0; i < result.length; i++) {
          destinationName.push(result[i].label);
          destinationIATA.push(result[i].id);
      }
       $("#fromSingle").autocomplete({
        source: destinationName
      })
      $("#toSingle").autocomplete({
        source: destinationName
      })
  }
})
//Single Flights Controller End

//Flight Detail Controller
app.controller('FlightDetailController', function($scope, $ionicSideMenuDelegate, $state, $ionicLoading) {
  
        $scope.finalData = resultData;
        $scope.resultLength = resultData.length;
        $scope.toConfirm = function($index){
          selectedFlight = $scope.finalData[$index];
          $ionicLoading.show({
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'
          }).then(function(){
            $ionicLoading.hide();
          $state.go('menu.flightconfirmation');
          });
        }
        $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
    })
//FLight Detail Controller End

//Flight Detail Multi Controller
app.controller('FlightDetailMultiController0', function($scope, $ionicSideMenuDelegate, $state, $ionicLoading) {
  
        $scope.finalData = resultDataMulti0;
        $scope.resultLength = resultDataMulti0.length;

        $scope.toConfirm = function($index){
          totalFareMulti = 0;
          selectedFlightMulti0 = $scope.finalData[$index];
          selectedFlightMulti.push(selectedFlightMulti0);
          totalFareMulti = parseInt(selectedFlightMulti0[0].totalFare);
          // $state.go('menu.flightconfirmation');
           $ionicLoading.show({
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'
          }).then(function(){});
          if(resultDataMulti1.length != 0){
            $ionicLoading.hide();
            $state.go('menu.flightdetailsmulti1');
          }
          else {
            $ionicLoading.hide();
            $state.go('menu.flightconfirmationMulti');
          }
        }
        $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
    })
//FLight Detail Multi Controller End

//Flight Detail Multi Controller
app.controller('FlightDetailMultiController1', function($scope, $ionicSideMenuDelegate, $state, $ionicLoading) {
  
       $scope.finalData = resultDataMulti1;
       $scope.resultLength = resultDataMulti1.length;
        $scope.toConfirm = function($index){
          selectedFlightMulti1 = $scope.finalData[$index];
          selectedFlightMulti.push(selectedFlightMulti1);
          totalFareMulti = totalFareMulti + parseInt(selectedFlightMulti1[0].totalFare);
          // $state.go('menu.flightconfirmation');
          $ionicLoading.show({
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'
          }).then(function(){});
          if(resultDataMulti2.length != 0){
            $ionicLoading.hide();
            $state.go('menu.flightdetailsmulti2')
          }
          else {
            $ionicLoading.hide();
           $state.go('menu.flightconfirmationMulti');
          }
        }
        $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
    })
//FLight Detail Multi Controller End

//Flight Detail Multi Controller
app.controller('FlightDetailMultiController2', function($scope, $ionicSideMenuDelegate, $state, $ionicLoading) {
  
        $scope.finalData = resultDataMulti2;
        $scope.resultLength = resultDataMulti2.length;
        $scope.toConfirm = function($index){
          selectedFlightMulti2 = $scope.finalData[$index];
          selectedFlightMulti.push(selectedFlightMulti2);
          totalFareMulti = totalFareMulti + parseInt(selectedFlightMulti2[0].totalFare);
          $ionicLoading.show({
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'
          }).then(function(){});
          $ionicLoading.hide();
          $state.go('menu.flightconfirmationMulti');
        }
        $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
    })
//FLight Detail Multi Controller End

//Flight COnfrimation Controller
app.controller('FlightConfirmationController', function($scope, $ionicSideMenuDelegate, $state, $ionicLoading) {
      $ionicLoading.show({
        template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
        duration: 1000
      });
      $scope.selectedFlight = selectedFlight;
      $scope.toUserDetails = function(){
        $state.go('menu.userdetails');
      }
    })
//Flight Confirmation Controller End
//Flight COnfrimation Multi Controller
app.controller('FlightConfirmationMultiController', function($scope, $ionicSideMenuDelegate, $state, $ionicLoading) {
  $ionicLoading.show({
        template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
        duration: 1000
      });
      $scope.selectedFlight = selectedFlightMulti;
      $scope.totalFareMulti = totalFareMulti;
      $scope.toUserDetails = function(){
        $state.go('menu.userdetails');
      }
    })
//Flight Confirmation Multi Controller End

//User Details Controller
app.controller('UserDetailsController', function($scope, $ionicSideMenuDelegate, $state, $http, $ionicLoading,$ionicHistory) {
      passengerDetail = [];
      console.log($ionicHistory.backView());
      console.log($ionicHistory.backView().stateName);
      $http({
        method: "GET",
        url: "js/countrycodes.json",
        headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      }
      }).then(function(response){
        
        $scope.countryCodes = response.data;
        
      });
      //pay later function
      $scope.payLater = function(){
        $ionicLoading.show({
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
            duration: 3000
          }).then(function(){
            alert("Please check your email for payment information");
          });
      }

      $scope.toPayment = function(){
        //Hotels PNR
          if ($ionicHistory.backView().stateName == "menu.hotelconfirmation") {
            console.log('Kazim');
            passengerDetail = [];
          var fname = document.getElementById("fname").value;
          var mname = document.getElementById("mname").value;
          var lname = document.getElementById("lname").value;
          var countrycode = document.getElementById("countrycode");
          var selectedCountryName = countrycode.options[countrycode.selectedIndex].value;
          var selectedCountryCode;
          var cnumber = document.getElementById("cnumber").value;
          var email = document.getElementById("email").value;
          
          for (var i = 0; i < $scope.countryCodes.length; i++) {
            
           if($scope.countryCodes[i].name == selectedCountryName){
            selectedCountryCode = $scope.countryCodes[i].code;
           }
          }
          passengerDetail.push(fname, mname, lname, selectedCountryCode, cnumber, email);
          var getHotelPNR = {
            "async": true,
            "crossDomain": true,
            "url": "https://webservices-as.havail.sabre.com/",
            "method": "POST",
            "headers": {
              "content-type": "text/xml",
              "cache-control": "no-cache",
              "postman-token": "1343030e-c41f-ffda-0506-02456987b190"
            },
            "data": "\t<SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\">\r\n        <SOAP-ENV:Header>\r\n            <eb:MessageHeader xmlns:eb=\"http://www.ebxml.org/namespaces/messageHeader\" SOAP-ENV:mustUnderstand=\"0\">\r\n                <eb:From>\r\n                    <eb:PartyId eb:type=\"urn:x12.org:IO5:01\">999999</eb:PartyId>\r\n                </eb:From>\r\n                <eb:To>\r\n                    <eb:PartyId eb:type=\"urn:x12.org:IO5:01\">123123</eb:PartyId>\r\n                </eb:To>\r\n                <eb:CPAId>R7OI</eb:CPAId>\r\n                 <eb:ConversationId>99999</eb:ConversationId>\r\n                <eb:Service eb:type=\"sabreXML\"></eb:Service>\r\n                <eb:Action>PassengerDetailsRQ</eb:Action>\r\n            </eb:MessageHeader> <ns6:Security xmlns:ns6=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" SOAP-ENV:mustUnderstand=\"0\">\r\n                <ns6:BinarySecurityToken>"+securityToken+"</ns6:BinarySecurityToken>\r\n            </ns6:Security>\r\n        </SOAP-ENV:Header>\r\n        <SOAP-ENV:Body>\r\n<PassengerDetailsRQ xmlns=\"http://services.sabre.com/sp/pd/v3_3\" version=\"3.3.0\" IgnoreOnError=\"false\" HaltOnError=\"false\">\r\n<PostProcessing IgnoreAfter=\"false\" RedisplayReservation=\"true\" UnmaskCreditCard=\"true\"/>\r\n<PreProcessing IgnoreBefore=\"true\">\r\n<UniqueID ID=\"\"/>\r\n</PreProcessing>\r\n\r\n<TravelItineraryAddInfoRQ>\r\n<AgencyInfo>\r\n<Address>\r\n<AddressLine>SABRE TRAVEL</AddressLine>\r\n<CityName>SOUTHLAKE</CityName>\r\n<CountryCode>US</CountryCode>\r\n<PostalCode>76092</PostalCode>\r\n<StateCountyProv StateCode=\"TX\"/>\r\n<StreetNmbr>3150 SABRE DRIVE</StreetNmbr>\r\n<VendorPrefs>\r\n<Airline Hosted=\"true\"/>\r\n</VendorPrefs>\r\n</Address>\r\n</AgencyInfo>\r\n<CustomerInfo>\r\n<ContactNumbers>\r\n<ContactNumber NameNumber=\"1.1\" Phone=\""+selectedCountryCode+cnumber+"\" PhoneUseType=\"M\"/>\r\n</ContactNumbers>\r\n<PersonName NameNumber=\"1.1\" NameReference=\"ABC123\" PassengerType=\"ADT\">\r\n<GivenName>"+fname+mname+"</GivenName>\r\n<Surname>"+lname+"</Surname>\r\n</PersonName>\r\n</CustomerInfo>\r\n</TravelItineraryAddInfoRQ>\r\n</PassengerDetailsRQ>\r\n      </SOAP-ENV:Body>\r\n    </SOAP-ENV:Envelope>\r\n "
          }

          $.ajax(getHotelPNR).done(function (response) {
            console.log(response);
          });
          }
          //Hotels PNR End

          //Flights PNR
          else {
            passengerDetail = [];
          var fname = document.getElementById("fname").value;
          var mname = document.getElementById("mname").value;
          var lname = document.getElementById("lname").value;
          var countrycode = document.getElementById("countrycode");
          var selectedCountryName = countrycode.options[countrycode.selectedIndex].value;
          var selectedCountryCode;
          var cnumber = document.getElementById("cnumber").value;
          var email = document.getElementById("email").value;
          
          for (var i = 0; i < $scope.countryCodes.length; i++) {
            
           if($scope.countryCodes[i].name == selectedCountryName){
            selectedCountryCode = $scope.countryCodes[i].code;
           }
          }
          passengerDetail.push(fname, mname, lname, selectedCountryCode, cnumber, email);

          
        //Getting user data
        var getUserData = {
            "async": true,
            "crossDomain": true,
            "url": "https://webservices-as.havail.sabre.com/",
            "method": "POST",
            "headers": {
              "content-type": "text/xml",
              "cache-control": "no-cache",
            },
            "data": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\r\n   <soapenv:Header>\r\n      <MessageHeader xmlns=\"http://www.ebxml.org/namespaces/messageHeader\">\r\n         <From>\r\n            <PartyId type=\"urn:x12.org:IO5:01\">CRS</PartyId>\r\n         </From>\r\n         <To>\r\n            <PartyId type=\"urn:x12.org:IO5:01\">Sabre</PartyId>\r\n         </To>\r\n         <CPAId>R7OI</CPAId>\r\n         <ConversationId>9999</ConversationId>\r\n         <Service type=\"string\">Cruise</Service>\r\n         <Action>PassengerDetailsRQ</Action>\r\n         <MessageData>\r\n            <MessageId>1426190858</MessageId>\r\n            <Timestamp>2015-03-12T02:07:38-06:00</Timestamp>\r\n            <TimeToLive>2015-03-12T03:07:38-06:00</TimeToLive>\r\n         </MessageData>\r\n      </MessageHeader>\r\n      <wsse:Security xmlns:wsse=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" xmlns:wsu=\"http://schemas.xmlsoap.org/ws/2002/12/utility\">\r\n           <wsse:BinarySecurityToken  valueType=\"String\" EncodingType=\"wsse:Base64Binary\">"+securityToken+"</wsse:BinarySecurityToken>\r\n      </wsse:Security>\r\n   </soapenv:Header>\r\n   <soapenv:Body>\r\n   \r\n   <PassengerDetailsRQ xmlns=\"http://services.sabre.com/sp/pd/v3_3\" version=\"3.3.0\" IgnoreOnError=\"false\" HaltOnError=\"false\">\r\n\t<MiscSegmentSellRQ>\r\n\t\t<MiscSegment DepartureDateTime=\"01-24\" InsertAfter=\"0\" NumberInParty=\"1\" Status=\"GK\" Type=\"OTH\">\r\n\t\t\t<OriginLocation LocationCode=\""+selectedFlight[0].departureAirport+"\"/>\r\n\t\t\t<Text>RETENTION SEGMENT</Text>\r\n\t\t\t<VendorPrefs>\r\n\t\t\t\t<Airline Code=\""+airlineCodeFinal+"\"/>\r\n\t\t\t</VendorPrefs>\r\n\t\t</MiscSegment>\r\n\t</MiscSegmentSellRQ>\r\n\t<PostProcessing IgnoreAfter=\"false\" RedisplayReservation=\"true\">\r\n\t\t<EndTransactionRQ>\r\n\t\t\t<EndTransaction Ind=\"true\">\r\n\t\t\t</EndTransaction>\r\n\t\t\t<Source ReceivedFrom=\"AMXTI\"/>\r\n\t\t</EndTransactionRQ>\r\n\t</PostProcessing>\r\n\t\r\n\t\r\n\t\t<TravelItineraryAddInfoRQ>\r\n\t\t\t<AgencyInfo>\r\n\t\t\t\t<Ticketing TicketType=\"7TAW/\"/>\r\n\t\t\t</AgencyInfo>\r\n\t\t\t<CustomerInfo>\r\n\t\t\t\t<ContactNumbers>\r\n\t\t\t\t\t  <ContactNumber NameNumber=\"1.1\" Phone=\""+selectedCountryCode+cnumber+"\" PhoneUseType=\"M\" />\r\n\t\t\t\t</ContactNumbers>\r\n\t\t\t\t<PersonName NameNumber=\"1.1\" PassengerType=\"ADT\">\r\n\t\t\t\t\t     <GivenName>"+fname + mname+"</GivenName>\r\n                <Surname>"+lname+"</Surname>\r\n\t\t\t\t</PersonName>\r\n\t\t\t</CustomerInfo>\r\n\t\t</TravelItineraryAddInfoRQ>\r\n\t    \r\n\t</PassengerDetailsRQ>\r\n\t\r\n\t\r\n\r\n    </soapenv:Body>\r\n</soapenv:Envelope>"
          }

          $.ajax(getUserData).done(function(response){
            passengerUniqueId = response.getElementsByTagName("ItineraryRef")[0].getAttribute("ID");
            
            var flightSegment = [];
            for (var i = 0; i < selectedFlight.length; i++) {
                flightSegment.push(" <FlightSegment DepartureDateTime=\""+selectedFlight[i].departureDate+'T'+selectedFlight[i].departureTime+"\" FlightNumber=\""+selectedFlight[i].flightNumber+"\" NumberInParty=\"1\" ResBookDesigCode=\"Y\" Status=\"NN\">\
                <DestinationLocation LocationCode=\""+selectedFlight[i].arrivalAirport+"\" />\
                <MarketingAirline Code=\""+selectedFlight[i].flightCode+"\" FlightNumber=\""+selectedFlight[i].flightNumber+"\" />\
                <OriginLocation LocationCode=\""+selectedFlight[i].departureAirport+"\" />\
            </FlightSegment>"); 
            }
            flightSegment = flightSegment.join(" ");
            var flightBooking = {
            "async": true,
            "crossDomain": true,
            "url": "https://webservices-as.havail.sabre.com/",
            "method": "POST",
            "headers": {
              "content-type": "text/xml",
              "cache-control": "no-cache",
              },
            "data" : "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\
                     <soapenv:Header>\
                        <MessageHeader xmlns=\"http://www.ebxml.org/namespaces/messageHeader\">\
                           <From>\
                              <PartyId type=\"urn:x12.org:IO5:01\">CRS</PartyId>\
                           </From>\
                           <To>\
                              <PartyId type=\"urn:x12.org:IO5:01\">Sabre</PartyId>\
                           </To>\
                           <CPAId>R7OI</CPAId>\
                           <ConversationId>9999</ConversationId>\
                           <Service type=\"string\">Cruise</Service>\
                           <Action>EnhancedAirBookRQ</Action>\
                           <MessageData>\
                              <MessageId>1426190858</MessageId>\
                              <Timestamp>2015-03-12T02:07:38-06:00</Timestamp>\
                              <TimeToLive>2015-03-12T03:07:38-06:00</TimeToLive>\
                           </MessageData>\
                        </MessageHeader>\
                        <wsse:Security xmlns:wsse=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" xmlns:wsu=\"http://schemas.xmlsoap.org/ws/2002/12/utility\">\
                             <wsse:BinarySecurityToken  valueType=\"String\" EncodingType=\"wsse:Base64Binary\">"+securityToken+"</wsse:BinarySecurityToken>\
                        </wsse:Security>\
                     </soapenv:Header>\
                    <soapenv:Body>\
                        <EnhancedAirBookRQ xmlns=\"http://services.sabre.com/sp/eab/v3_7\" version=\"3.7.0\" IgnoreOnError=\"true\" HaltOnError=\"true\">\
                                    <OTA_AirBookRQ>\
                                    <OriginDestinationInformation>\
                                        "+flightSegment+"\
                                        </OriginDestinationInformation>\
                                    </OTA_AirBookRQ>\
                                    <PostProcessing IgnoreAfter=\"true\">\
                                        <RedisplayReservation/>\
                                    </PostProcessing>\
                                    <PreProcessing IgnoreBefore=\"false\">\
                                        <UniqueID ID=\""+passengerUniqueId+"\" />\
                                    </PreProcessing>\
                                  </EnhancedAirBookRQ>\
                                  </soapenv:Body>\
                                  </soapenv:Envelope>"}
              

              $.ajax(flightBooking).done(function(response){
                console.log(response)
                // $state.go('menu.paymentmethod');
              })
          })
          }
          
        
      }
    })
//User Details Controller End

//Payment Method Controller
app.controller('PaymentMethodController', function($scope, $ionicSideMenuDelegate, $state, $http) {
      $http({
        method: "GET",
        url: "js/countrycodes.json",
        headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      }
      }).then(function(response){
        
        $scope.countryCodes = response.data;
        
      });
    })
//Payment Method Controller End

//MultiCity Controller
app.controller('MutliCityController', function($scope, $ionicSideMenuDelegate, $http, $state, $ionicLoading) {
  var destinationName= [];
  var destinationIATA = [];
  resultDataMulti0 = [];
  resultDataMulti1 = [];
  resultDataMulti2 = [];
  totalFareMulti = [];
  var fromIATA0;
  var fromIATA1;
  var fromIATA2;
  var toIATA0;
  var toIATA1;
  var toIATA2;
   $ionicLoading.show({
    template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
    duration: 1000
  })
      $scope.whichClassToUse = function(someValue){
    someValue = ionic.Platform.platform();
    if(someValue == "android"){
      return "has-tabs-top"
    }
 }
 

      // Getting list of Airlines
      $http({
        method: "GET",
        url: "js/airlines.json",
        headers: {
          "Content-Type" : "application/x-www-form-urlencoded"
        }
      }).then(function(response){

      $scope.airlineInfo = response.data.AirlineInfo;
      airlineInfo = $scope.airlineInfo;
      
      var airlineName = [];

      for (var i = 0; i < airlineInfo.length; i++) {
        airlineName.push(airlineInfo[i].AirlineName);
      }
      $scope.airlineName = airlineName; 
    });

    // Getting list of Airports
    if(result.length == 0){
      
    $http({
      method: "GET",
      url: "js/airports.json",
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      }
    }).then(function(response){
      result = response.data;
      for (var i = 0; i < result.length; i++) {
          destinationName.push(result[i].label);
          destinationIATA.push(result[i].id);
      }

      $("#from0").autocomplete({
        source: destinationName
      })
      $("#to0").autocomplete({
        source: destinationName
      })

       $("#from1").autocomplete({
        source: destinationName
      })
        $("#to1").autocomplete({
        source: destinationName
      })


        $("#from2").autocomplete({
        source: destinationName
      })
         $("#to2").autocomplete({
        source: destinationName
      })
         });
}

    
else {
  for (var i = 0; i < result.length; i++) {
          destinationName.push(result[i].label);
          destinationIATA.push(result[i].id);
      }

      $("#from0").autocomplete({
        source: destinationName
      })
      $("#to0").autocomplete({
        source: destinationName
      })

       $("#from1").autocomplete({
        source: destinationName
      })
        $("#to1").autocomplete({
        source: destinationName
      })


        $("#from2").autocomplete({
        source: destinationName
      })
         $("#to2").autocomplete({
        source: destinationName
      })
}

    //Authenticating for token
    var auth = {
  "async": true,
  "crossDomain": true,
  "url": "https://webservices-as.havail.sabre.com/",
  "method": "POST",
  "headers": {
    "content-type": "text/xml",
    "cache-control": "no-cache",
    
  },
  "data":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\t\t<SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:eb=\"http://www.ebxml.org/namespaces/messageHeader\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:xsd=\"http://www.w3.org/1999/XMLSchema\">\r\n\t\t    <SOAP-ENV:Header>\r\n\t\t        <eb:MessageHeader SOAP-ENV:mustUnderstand=\"1\" eb:version=\"1.0\">\r\n\t\t            <eb:ConversationId>99999</eb:ConversationId>\r\n\t\t            <eb:From>\r\n\t\t                <eb:PartyId type=\"urn:x12.org:IO5:01\">999999</eb:PartyId>\r\n\t\t            </eb:From>\r\n\t\t            <eb:To>\r\n\t\t                <eb:PartyId type=\"urn:x12.org:IO5:01\">123123</eb:PartyId>\r\n\t\t            </eb:To>\r\n\t\t            <eb:CPAId>R7OI</eb:CPAId>\r\n\t\t            <eb:Service eb:type=\"OTA\">SessionCreateRQ</eb:Service>\r\n\t\t            <eb:Action>SessionCreateRQ</eb:Action>\r\n\t\t            <eb:MessageData>\r\n\t\t                <eb:MessageId>1000</eb:MessageId>\r\n\t\t                <eb:Timestamp>2001-02-15T11:15:12Z</eb:Timestamp>\r\n\t\t                <eb:TimeToLive>2001-02-15T11:15:12Z</eb:TimeToLive>\r\n\t\t            </eb:MessageData>\r\n\t\t        </eb:MessageHeader>\r\n\t\t        <wsse:Security xmlns:wsse=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" xmlns:wsu=\"http://schemas.xmlsoap.org/ws/2002/12/utility\">\r\n\t\t            <wsse:UsernameToken> \r\n\t\t                <wsse:Username>595258</wsse:Username>\r\n\t\t                <wsse:Password>WS500917</wsse:Password>\r\n\t\t                <Organization>R7OI</Organization>\r\n\t\t                <Domain>DEFAULT</Domain> \r\n\t\t            </wsse:UsernameToken>\r\n\t\t        </wsse:Security>\r\n\t\t    </SOAP-ENV:Header>\r\n\t\t    <SOAP-ENV:Body>\r\n\t\t        <eb:Manifest SOAP-ENV:mustUnderstand=\"1\" eb:version=\"1.0\">\r\n\t\t            <eb:Reference xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"cid:rootelement\" xlink:type=\"simple\"/>\r\n\t\t        </eb:Manifest>\r\n\t\t    </SOAP-ENV:Body>\r\n\t\t</SOAP-ENV:Envelope>"
}

$.ajax(auth).done(function(response){
  securityToken = response.getElementsByTagName("BinarySecurityToken")[0].childNodes[0].nodeValue;
  })
  
    $scope.getFirstValue = function(){
      resultDataMulti0 = [];
      $ionicLoading.show({
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'
          }).then(function(){
            var firstLocationfrom = document.getElementById("from0").value;
      var firstLocationto = document.getElementById("to0").value;
      var firstLocationdepartdate = document.getElementById("departDate0").value;
      var airlineCode = document.getElementById("airlineCode");
      var airlinesName = airlineCode.options[airlineCode.selectedIndex].value;
       var adult = document.getElementById('adult').value;
      fromIATA0 ="";
      toIATA0="";

      for (var i = 0; i < result.length; i++) {
        if(firstLocationfrom == result[i].label)
          {
            fromIATA0 = result[i].id;
            
          }
      }
      for (var i = 0; i < result.length; i++) {
        if(firstLocationto == result[i].label)
          {
            toIATA0 = result[i].id;
            
          }
      }
      if(fromIATA0 == toIATA0){
        alert("Please select different departure or arrival airport to complete a journey");
        $ionicLoading.hide();
      }
      else {
        for (var i = 0; i < airlineInfo.length; i++) {

            if(airlinesName == airlineInfo[i].AirlineName){
              
              airlineCodeFinal = airlineInfo[i].AirlineCode;
              
            }
            else {
          airlineCodeFinal = "";
        }
          }
     
          
          var flightPreference = '';
          
         if(airlineCodeFinal!=""){
          
          flightPreference = "<VendorPref Code=\""+airlineCodeFinal+"\" PreferLevel=\"Only\"/>";
         }
    var getFlightData = {
        "async": true,
        "crossDomain": true,
        "url": "https://webservices-as.havail.sabre.com/",
        "method": "POST",
        "headers": {
          "content-type": "text/xml",
          "cache-control": "no-cache",
          
        },
        "data": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\r\n   <soapenv:Header>\r\n      <MessageHeader xmlns=\"http://www.ebxml.org/namespaces/messageHeader\">\r\n         <From>\r\n            <PartyId type=\"urn:x12.org:IO5:01\">CRS</PartyId>\r\n         </From>\r\n         <To>\r\n            <PartyId type=\"urn:x12.org:IO5:01\">Sabre</PartyId>\r\n         </To>\r\n         <CPAId>R7OI</CPAId>\r\n         <ConversationId>9999</ConversationId>\r\n         <Service type=\"string\">Cruise</Service>\r\n         <Action>BargainFinderMaxRQ</Action>\r\n         <MessageData>\r\n            <MessageId>1426190858</MessageId>\r\n            <Timestamp>2015-03-12T02:07:38-06:00</Timestamp>\r\n            <TimeToLive>2015-03-12T03:07:38-06:00</TimeToLive>\r\n         </MessageData>\r\n      </MessageHeader>\r\n      <wsse:Security xmlns:wsse=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" xmlns:wsu=\"http://schemas.xmlsoap.org/ws/2002/12/utility\">\r\n           <wsse:BinarySecurityToken  valueType=\"String\" EncodingType=\"wsse:Base64Binary\">"+securityToken+"</wsse:BinarySecurityToken>\r\n      </wsse:Security>\r\n   </soapenv:Header>\r\n   <soapenv:Body>\r\n   \r\n   <OTA_AirLowFareSearchRQ xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" xmlns=\"http://www.opentravel.org/OTA/2003/05\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" Target=\"Production\" Version=\"1.9.5\" ResponseType=\"OTA\" ResponseVersion=\"1.9.5\">\r\n    <POS>\r\n        <Source PseudoCityCode=\"R7OI\">\r\n        <RequestorID ID=\"1\" Type=\"1\">\r\n            <CompanyName Code=\"TN\" />\r\n        </RequestorID>\r\n        </Source>\r\n    </POS>\r\n    <OriginDestinationInformation RPH=\"1\">\r\n        <DepartureDateTime>"+firstLocationdepartdate+"T00:00:00</DepartureDateTime>\r\n        <OriginLocation LocationCode=\""+fromIATA0+"\" />\r\n        <DestinationLocation LocationCode=\""+toIATA0+"\" />\r\n\t\t\r\n        <TPA_Extensions>\r\n            <SegmentType Code=\"O\" />\r\n        </TPA_Extensions>\r\n\t\t\r\n    </OriginDestinationInformation>\r\n    \r\n    \r\n  <TravelPreferences ValidInterlineTicket=\"true\">\r\n"+flightPreference+"\
        <CabinPref PreferLevel=\"Preferred\" Cabin=\"Y\" />\
        <TPA_Extensions>\
            <TripType Value=\"Return\" />\
            <LongConnectTime Min=\"0\" Max=\"999\" Enable=\"true\" />\
            <ExcludeCallDirectCarriers Enabled=\"true\" />\
        </TPA_Extensions>\
    </TravelPreferences>  <TravelerInfoSummary>\r\n        <SeatsRequested>1</SeatsRequested>\r\n        <AirTravelerAvail>\r\n            \t<PassengerTypeQuantity Code=\"ADT\" Quantity= \""+adult+"\" />\r\n\t\t\t \r\n        </AirTravelerAvail>\r\n    </TravelerInfoSummary>\r\n    <TPA_Extensions>\r\n        <IntelliSellTransaction>\r\n            <RequestType Name=\"50ITINS\" />\r\n        </IntelliSellTransaction>\r\n    </TPA_Extensions>\r\n</OTA_AirLowFareSearchRQ>\r\n\r\n    </soapenv:Body>\r\n</soapenv:Envelope>"
}
//Making AJAX Request for data of flights
$.ajax(getFlightData).done(function(response){
  if(response.getElementsByTagName("PricedItineraries").length !=0){
      var pricedItineraries = response.getElementsByTagName("PricedItineraries")[0].childNodes;

        for (var i = 0; i < pricedItineraries.length; i++) {
          
          var totalFare = pricedItineraries[i].getElementsByTagName("ItinTotalFare")[0].getElementsByTagName("TotalFare")[0].getAttribute("Amount");
          
          var originDestinationOptions = pricedItineraries[i].getElementsByTagName("AirItinerary")[0].getElementsByTagName("OriginDestinationOptions")[0];
          
          var tempArray = [];
          for (var j = 0; j < originDestinationOptions.childNodes.length; j++) {
            var originDestinationOption = originDestinationOptions.childNodes[j].childNodes;
            
            for (var k = 0; k < originDestinationOption.length; k++) {
            
              
              var departureAirport = originDestinationOption[k].getElementsByTagName("DepartureAirport")[0].getAttribute("LocationCode");
              var departureDateTime = originDestinationOption[k].getAttribute("DepartureDateTime");
              var arrivalDateTime = originDestinationOption[k].getAttribute("ArrivalDateTime");
              var arrivalAirport = originDestinationOption[k].getElementsByTagName("ArrivalAirport")[0].getAttribute("LocationCode");
              
              var elapsedTime = originDestinationOption[k].getAttribute("ElapsedTime");
              var flightNumber = originDestinationOption[k].getAttribute("FlightNumber");
              var flightCode = originDestinationOption[k].getElementsByTagName("MarketingAirline")[0].getAttribute("Code");

              var res1 = departureDateTime.split("T");
              var departureDate = res1[0];
              var departureTime = res1[1];
              var res2 = arrivalDateTime.split("T");
              var arrivalDate = res2[0];
              var arrivalTime = res2[1];
              var departureAirportName;
              var arrivalAirportName;
              for (var x = 0; x < result.length; x++) {
                if(departureAirport == result[x].id){
                  departureAirportName = result[x].label;
                }
              }
              for (var y = 0; y < result.length; y++) {
                if(arrivalAirport == result[y].id){
                  arrivalAirportName = result[y].label;
                }
              }

              var resultObj = {departureAirport, departureDate, departureTime, departureAirportName, arrivalAirport, arrivalTime, arrivalDate, arrivalAirportName, elapsedTime, totalFare, flightCode, flightNumber};
              tempArray.push(resultObj);
              
            }
            
          }
          resultDataMulti0.push(tempArray);
          
        }
        $ionicLoading.hide();
      }
      else {
        $ionicLoading.hide();
        alert('No flights found for the first trip');
      }
    })
      }
      

          });
      
      
    }//Flight data ends

    $scope.getSecondValue = function(){
      resultDataMulti1 = [];
      $ionicLoading.show({
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'
          }).then(function(){
            var secondLocationfrom = document.getElementById("from1").value;
      var secondLocationto = document.getElementById("to1").value;
      var secondLocationdepartdate = document.getElementById("departDate1").value;
      var airlineCode = document.getElementById("airlineCode");
      var airlinesName = airlineCode.options[airlineCode.selectedIndex].value;
       var adult = document.getElementById('adult').value;
      fromIATA1 ="";
      toIATA1="";

      for (var i = 0; i < result.length; i++) {
        if(secondLocationfrom == result[i].label)
          {
            fromIATA1 = result[i].id;
            
          }
      }
      if(fromIATA1 != toIATA0){
        alert("Departure airport should be same as previous arrival airport!")
      }
      else {
        if(fromIATA1 == toIATA1){
          alert("Please select different departure or arrival airport to complete a journey");
        }
        else {
          for (var i = 0; i < result.length; i++) {
        if(secondLocationto == result[i].label)
          {
            toIATA1 = result[i].id;
            
          }
      }
      for (var i = 0; i < airlineInfo.length; i++) {

            if(airlinesName == airlineInfo[i].AirlineName){
              
              airlineCodeFinal = airlineInfo[i].AirlineCode;
              
            }
          }
     
          
          var flightPreference = '';
          
         if(airlineCodeFinal!=""){
          
          flightPreference = "<VendorPref Code=\""+airlineCodeFinal+"\" PreferLevel=\"Only\"/>";
         }
    var getFlightData = {
        "async": true,
        "crossDomain": true,
        "url": "https://webservices-as.havail.sabre.com/",
        "method": "POST",
        "headers": {
          "content-type": "text/xml",
          "cache-control": "no-cache",
          
        },
        "data": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\r\n   <soapenv:Header>\r\n      <MessageHeader xmlns=\"http://www.ebxml.org/namespaces/messageHeader\">\r\n         <From>\r\n            <PartyId type=\"urn:x12.org:IO5:01\">CRS</PartyId>\r\n         </From>\r\n         <To>\r\n            <PartyId type=\"urn:x12.org:IO5:01\">Sabre</PartyId>\r\n         </To>\r\n         <CPAId>R7OI</CPAId>\r\n         <ConversationId>9999</ConversationId>\r\n         <Service type=\"string\">Cruise</Service>\r\n         <Action>BargainFinderMaxRQ</Action>\r\n         <MessageData>\r\n            <MessageId>1426190858</MessageId>\r\n            <Timestamp>2015-03-12T02:07:38-06:00</Timestamp>\r\n            <TimeToLive>2015-03-12T03:07:38-06:00</TimeToLive>\r\n         </MessageData>\r\n      </MessageHeader>\r\n      <wsse:Security xmlns:wsse=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" xmlns:wsu=\"http://schemas.xmlsoap.org/ws/2002/12/utility\">\r\n           <wsse:BinarySecurityToken  valueType=\"String\" EncodingType=\"wsse:Base64Binary\">"+securityToken+"</wsse:BinarySecurityToken>\r\n      </wsse:Security>\r\n   </soapenv:Header>\r\n   <soapenv:Body>\r\n   \r\n   <OTA_AirLowFareSearchRQ xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" xmlns=\"http://www.opentravel.org/OTA/2003/05\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" Target=\"Production\" Version=\"1.9.5\" ResponseType=\"OTA\" ResponseVersion=\"1.9.5\">\r\n    <POS>\r\n        <Source PseudoCityCode=\"R7OI\">\r\n        <RequestorID ID=\"1\" Type=\"1\">\r\n            <CompanyName Code=\"TN\" />\r\n        </RequestorID>\r\n        </Source>\r\n    </POS>\r\n    <OriginDestinationInformation RPH=\"1\">\r\n        <DepartureDateTime>"+secondLocationdepartdate+"T00:00:00</DepartureDateTime>\r\n        <OriginLocation LocationCode=\""+fromIATA1+"\" />\r\n        <DestinationLocation LocationCode=\""+toIATA1+"\" />\r\n\t\t\r\n        <TPA_Extensions>\r\n            <SegmentType Code=\"O\" />\r\n        </TPA_Extensions>\r\n\t\t\r\n    </OriginDestinationInformation>\r\n    \r\n    \r\n  <TravelPreferences ValidInterlineTicket=\"true\">\r\n"+flightPreference+"\
        <CabinPref PreferLevel=\"Preferred\" Cabin=\"Y\" />\
        <TPA_Extensions>\
            <TripType Value=\"Return\" />\
            <LongConnectTime Min=\"0\" Max=\"999\" Enable=\"true\" />\
            <ExcludeCallDirectCarriers Enabled=\"true\" />\
        </TPA_Extensions>\
    </TravelPreferences>  <TravelerInfoSummary>\r\n        <SeatsRequested>1</SeatsRequested>\r\n        <AirTravelerAvail>\r\n            \t<PassengerTypeQuantity Code=\"ADT\" Quantity= \""+adult+"\" />\r\n\t\t\t \r\n        </AirTravelerAvail>\r\n    </TravelerInfoSummary>\r\n    <TPA_Extensions>\r\n        <IntelliSellTransaction>\r\n            <RequestType Name=\"50ITINS\" />\r\n        </IntelliSellTransaction>\r\n    </TPA_Extensions>\r\n</OTA_AirLowFareSearchRQ>\r\n\r\n    </soapenv:Body>\r\n</soapenv:Envelope>"
}
//Making AJAX Request for data of flights
$.ajax(getFlightData).done(function(response){
  if(response.getElementsByTagName("PricedItineraries").length != 0){
      var pricedItineraries = response.getElementsByTagName("PricedItineraries")[0].childNodes;

        for (var i = 0; i < pricedItineraries.length; i++) {
          
          var totalFare = pricedItineraries[i].getElementsByTagName("ItinTotalFare")[0].getElementsByTagName("TotalFare")[0].getAttribute("Amount");
          
          var originDestinationOptions = pricedItineraries[i].getElementsByTagName("AirItinerary")[0].getElementsByTagName("OriginDestinationOptions")[0];
          
          var tempArray = [];
          for (var j = 0; j < originDestinationOptions.childNodes.length; j++) {
            var originDestinationOption = originDestinationOptions.childNodes[j].childNodes;
            
            for (var k = 0; k < originDestinationOption.length; k++) {
            
              
              var departureAirport = originDestinationOption[k].getElementsByTagName("DepartureAirport")[0].getAttribute("LocationCode");
              var departureDateTime = originDestinationOption[k].getAttribute("DepartureDateTime");
              var arrivalDateTime = originDestinationOption[k].getAttribute("ArrivalDateTime");
              var arrivalAirport = originDestinationOption[k].getElementsByTagName("ArrivalAirport")[0].getAttribute("LocationCode");
              
              var elapsedTime = originDestinationOption[k].getAttribute("ElapsedTime");
              var flightNumber = originDestinationOption[k].getAttribute("FlightNumber");
              var flightCode = originDestinationOption[k].getElementsByTagName("MarketingAirline")[0].getAttribute("Code");

              var res1 = departureDateTime.split("T");
              var departureDate = res1[0];
              var departureTime = res1[1];
              var res2 = arrivalDateTime.split("T");
              var arrivalDate = res2[0];
              var arrivalTime = res2[1];
              var departureAirportName;
              var arrivalAirportName;
              for (var x = 0; x < result.length; x++) {
                if(departureAirport == result[x].id){
                  departureAirportName = result[x].label;
                }
              }
              for (var y = 0; y < result.length; y++) {
                if(arrivalAirport == result[y].id){
                  arrivalAirportName = result[y].label;
                }
              }

              var resultObj = {departureAirport, departureDate, departureTime, departureAirportName, arrivalAirport, arrivalDate, arrivalTime, arrivalAirportName, elapsedTime, totalFare, flightCode, flightNumber};
              tempArray.push(resultObj);
              
            }
            
          }
          resultDataMulti1.push(tempArray);
          
        }
        $ionicLoading.hide();
       }
       else {
        $ionicLoading.hide();
          alert("No flights found for second trip");
        } 
    })
        }
      }
      
          });
      
      

    }//Flight data ends

    $scope.getThirdValue = function(){
      resultDataMulti2 = [];
      $ionicLoading.show({
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'
          }).then(function(){
            var thirdLocationfrom = document.getElementById("from2").value;
      var thirdLocationto = document.getElementById("to2").value;
      var thirdLocationdepartdate = document.getElementById("departDate2").value;
      var airlineCode = document.getElementById("airlineCode");
      var airlinesName = airlineCode.options[airlineCode.selectedIndex].value;
       var adult = document.getElementById('adult').value;
      fromIATA2;
      toIATA2;

      for (var i = 0; i < result.length; i++) {
        if(thirdLocationfrom == result[i].label)
          {
            fromIATA2 = result[i].id;
            
          }
      }
      if(fromIATA2 != toIATA1){
        alert("Departure airport should be same as previous arrival airport!");
      }
      else{
        if(fromIATA2 == toIATA2){
          alert("Please select different departure or arrival airport to complete a journey");
        }
        else {
          for (var i = 0; i < result.length; i++) {
        if(thirdLocationto == result[i].label)
          {
            toIATA2 = result[i].id;
            
          }
      }
      for (var i = 0; i < airlineInfo.length; i++) {

            if(airlinesName == airlineInfo[i].AirlineName){
              
              airlineCodeFinal = airlineInfo[i].AirlineCode;
              
            }
          }
     
          
          var flightPreference = '';
          
         if(airlineCodeFinal!=""){
          
          flightPreference = "<VendorPref Code=\""+airlineCodeFinal+"\" PreferLevel=\"Only\"/>";
         }
    var getFlightData = {
        "async": true,
        "crossDomain": true,
        "url": "https://webservices-as.havail.sabre.com/",
        "method": "POST",
        "headers": {
          "content-type": "text/xml",
          "cache-control": "no-cache",
          
        },
        "data": "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\r\n   <soapenv:Header>\r\n      <MessageHeader xmlns=\"http://www.ebxml.org/namespaces/messageHeader\">\r\n         <From>\r\n            <PartyId type=\"urn:x12.org:IO5:01\">CRS</PartyId>\r\n         </From>\r\n         <To>\r\n            <PartyId type=\"urn:x12.org:IO5:01\">Sabre</PartyId>\r\n         </To>\r\n         <CPAId>R7OI</CPAId>\r\n         <ConversationId>9999</ConversationId>\r\n         <Service type=\"string\">Cruise</Service>\r\n         <Action>BargainFinderMaxRQ</Action>\r\n         <MessageData>\r\n            <MessageId>1426190858</MessageId>\r\n            <Timestamp>2015-03-12T02:07:38-06:00</Timestamp>\r\n            <TimeToLive>2015-03-12T03:07:38-06:00</TimeToLive>\r\n         </MessageData>\r\n      </MessageHeader>\r\n      <wsse:Security xmlns:wsse=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" xmlns:wsu=\"http://schemas.xmlsoap.org/ws/2002/12/utility\">\r\n           <wsse:BinarySecurityToken  valueType=\"String\" EncodingType=\"wsse:Base64Binary\">"+securityToken+"</wsse:BinarySecurityToken>\r\n      </wsse:Security>\r\n   </soapenv:Header>\r\n   <soapenv:Body>\r\n   \r\n   <OTA_AirLowFareSearchRQ xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" xmlns=\"http://www.opentravel.org/OTA/2003/05\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" Target=\"Production\" Version=\"1.9.5\" ResponseType=\"OTA\" ResponseVersion=\"1.9.5\">\r\n    <POS>\r\n        <Source PseudoCityCode=\"R7OI\">\r\n        <RequestorID ID=\"1\" Type=\"1\">\r\n            <CompanyName Code=\"TN\" />\r\n        </RequestorID>\r\n        </Source>\r\n    </POS>\r\n    <OriginDestinationInformation RPH=\"1\">\r\n        <DepartureDateTime>"+thirdLocationdepartdate+"T00:00:00</DepartureDateTime>\r\n        <OriginLocation LocationCode=\""+fromIATA2+"\" />\r\n        <DestinationLocation LocationCode=\""+toIATA2+"\" />\r\n\t\t\r\n        <TPA_Extensions>\r\n            <SegmentType Code=\"O\" />\r\n        </TPA_Extensions>\r\n\t\t\r\n    </OriginDestinationInformation>\r\n    \r\n    \r\n  <TravelPreferences ValidInterlineTicket=\"true\">\r\n"+flightPreference+"\
        <CabinPref PreferLevel=\"Preferred\" Cabin=\"Y\" />\
        <TPA_Extensions>\
            <TripType Value=\"Return\" />\
            <LongConnectTime Min=\"0\" Max=\"999\" Enable=\"true\" />\
            <ExcludeCallDirectCarriers Enabled=\"true\" />\
        </TPA_Extensions>\
    </TravelPreferences>  <TravelerInfoSummary>\r\n        <SeatsRequested>1</SeatsRequested>\r\n        <AirTravelerAvail>\r\n            \t<PassengerTypeQuantity Code=\"ADT\" Quantity= \""+adult+"\" />\r\n\t\t\t \r\n        </AirTravelerAvail>\r\n    </TravelerInfoSummary>\r\n    <TPA_Extensions>\r\n        <IntelliSellTransaction>\r\n            <RequestType Name=\"50ITINS\" />\r\n        </IntelliSellTransaction>\r\n    </TPA_Extensions>\r\n</OTA_AirLowFareSearchRQ>\r\n\r\n    </soapenv:Body>\r\n</soapenv:Envelope>"
}
//Making AJAX Request for data of flights
$.ajax(getFlightData).done(function(response){
  if(response.getElementsByTagName("PricedItineraries").length != 0){
      var pricedItineraries = response.getElementsByTagName("PricedItineraries")[0].childNodes;

        for (var i = 0; i < pricedItineraries.length; i++) {
          
          var totalFare = pricedItineraries[i].getElementsByTagName("ItinTotalFare")[0].getElementsByTagName("TotalFare")[0].getAttribute("Amount");
          
          var originDestinationOptions = pricedItineraries[i].getElementsByTagName("AirItinerary")[0].getElementsByTagName("OriginDestinationOptions")[0];
          
          var tempArray = [];
          for (var j = 0; j < originDestinationOptions.childNodes.length; j++) {
            var originDestinationOption = originDestinationOptions.childNodes[j].childNodes;
            
            for (var k = 0; k < originDestinationOption.length; k++) {
            
              
              var departureAirport = originDestinationOption[k].getElementsByTagName("DepartureAirport")[0].getAttribute("LocationCode");
              var departureDateTime = originDestinationOption[k].getAttribute("DepartureDateTime");
              var arrivalDateTime = originDestinationOption[k].getAttribute("ArrivalDateTime");
              var arrivalAirport = originDestinationOption[k].getElementsByTagName("ArrivalAirport")[0].getAttribute("LocationCode");
              
              var elapsedTime = originDestinationOption[k].getAttribute("ElapsedTime");
              var flightNumber = originDestinationOption[k].getAttribute("FlightNumber");
              var flightCode = originDestinationOption[k].getElementsByTagName("MarketingAirline")[0].getAttribute("Code");

              var res1 = departureDateTime.split("T");
              var departureDate = res1[0];
              var departureTime = res1[1];
              var res2 = arrivalDateTime.split("T");
              var arrivalDate = res2[0];
              var arrivalTime = res2[1];
              var departureAirportName;
              var arrivalAirportName;
              for (var x = 0; x < result.length; x++) {
                if(departureAirport == result[x].id){
                  departureAirportName = result[x].label;
                }
              }
              for (var y = 0; y < result.length; y++) {
                if(arrivalAirport == result[y].id){
                  arrivalAirportName = result[y].label;
                }
              }

              var resultObj = {departureAirport, departureDate, departureTime, departureAirportName, arrivalAirport, arrivalTime, arrivalDate,arrivalAirportName, elapsedTime, totalFare, flightCode, flightNumber};
              tempArray.push(resultObj);
              
            }
            
          }
          resultDataMulti2.push(tempArray);
          
        }
        $ionicLoading.hide();
      }
      else {
        $ionicLoading.hide();
        alert("No flights found for third trip");
      }
    })

        }
      }
      
          });
      
      
    }//Flight data ends
    $scope.flightDetailsMulti = function(){
       $ionicLoading.show({
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'
          }).then(function(){
            if(resultDataMulti0.length == 0){
              $ionicLoading.hide();
              alert("Enter atleast one location to proceed");
             }
             else {
              $ionicLoading.hide();
               $state.go('menu.flightdetailsmulti0');
             }
          });
     
      

}//function on the button ends here


});
//Multi City Controller Ends

//Hotel controller starts
app.controller('HotelController', function($scope, $ionicSideMenuDelegate, $http, $state, $ionicLoading) {
  var destinationName = [];
  var destinationIATA = [];
  var availabilityOption;
  resultDataHotels = [];
  $ionicLoading.show({
    template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
    duration: 1000
  })
  $scope.getHotels = function(){
    $ionicLoading.show({
      template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'
    }).then(function(){
          resultDataHotels = [];
    var destinationNameHotel = document.getElementById("destinationName").value;
    var fromStay = document.getElementById("fromStay").value;
    var toStay = document.getElementById("toStay").value;
    var guests = document.getElementById("guests").value;
    var rooms = document.getElementById("rooms").value;
    var fromStay = fromStay.split("-");
    fromStay = fromStay.splice(1,2);
    var toStay = toStay.split("-");
    toStay = toStay.splice(1,2);
    var destinationNameHotelIATA;
    for (var i = 0; i < result.length; i++) {
      if (destinationNameHotel == result[i].label) {
        destinationNameHotelIATA = result[i].id;
      }
    }

    //Getting Hotel Data
    var getHotelDetail = {
      "async": true,
      "crossDomain": true,
      "url": "https://webservices-as.havail.sabre.com/",
      "method": "POST",
      "headers": {
        "content-type": "text/xml",
        "cache-control": "no-cache",
        "postman-token": "81985fa3-39b2-33b5-67c4-ba4c58e7278c"
      },
      "data": "<SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\">\r\n        <SOAP-ENV:Header>\r\n            <eb:MessageHeader xmlns:eb=\"http://www.ebxml.org/namespaces/messageHeader\" SOAP-ENV:mustUnderstand=\"0\">\r\n                <eb:From>\r\n                    <eb:PartyId eb:type=\"urn:x12.org:IO5:01\">999999</eb:PartyId>\r\n                </eb:From>\r\n                <eb:To>\r\n                    <eb:PartyId eb:type=\"urn:x12.org:IO5:01\">123123</eb:PartyId>\r\n                </eb:To>\r\n                <eb:CPAId>R7OI</eb:CPAId>\r\n                 <eb:ConversationId>99999</eb:ConversationId>\r\n                <eb:Service eb:type=\"sabreXML\"></eb:Service>\r\n                <eb:Action>OTA_HotelAvailLLSRQ</eb:Action>\r\n            </eb:MessageHeader> <ns6:Security xmlns:ns6=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" SOAP-ENV:mustUnderstand=\"0\">\r\n                <ns6:BinarySecurityToken>"+securityToken+"</ns6:BinarySecurityToken>\r\n            </ns6:Security>\r\n        </SOAP-ENV:Header>\r\n        <SOAP-ENV:Body>\r\n\r\n\t<OTA_HotelAvailRQ xmlns=\"http://webservices.sabre.com/sabreXML/2011/10\" xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" Version=\"2.2.1\">\r\n    <AvailRequestSegment>\r\n        <Customer>\r\n            <Corporate>\r\n                <ID>R7OI</ID>\r\n            </Corporate>\r\n        </Customer>\r\n        <GuestCounts Count=\""+guests+"\" />\r\n        <HotelSearchCriteria>\r\n            <Criterion>\r\n                <HotelRef HotelCityCode=\""+destinationNameHotelIATA+"\" />\r\n            </Criterion>\r\n        </HotelSearchCriteria>\r\n        <TimeSpan End=\""+toStay[0]+"-"+toStay[1]+"\" Start=\""+fromStay[0]+"-"+fromStay[1]+"\" />\r\n    </AvailRequestSegment>\r\n</OTA_HotelAvailRQ>\r\n\t\r\n\t\r\n\t    </SOAP-ENV:Body>\r\n    </SOAP-ENV:Envelope>\r\n "
    }

$.ajax(getHotelDetail).done(function (response) {
  availabilityOption = response.getElementsByTagName("AvailabilityOption");
  var tempArray=[];
  for (var i = 0; i < availabilityOption.length; i++) {
    var hotelCode = availabilityOption[i].getElementsByTagName("BasicPropertyInfo")[0].getAttribute("HotelCode");
    var hotelImage;
    //Getting Image
    var getImage = {
      "crossDomain": true,
      "url": "https://webservices-as.havail.sabre.com/",
      "method": "POST",
      async: false,
      "headers": {
        "content-type": "text/xml",
        "cache-control": "no-cache",
        "postman-token": "44c7d3d1-3811-57ec-85aa-4896648583d7"
      },
      "data": "<SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\">\r\n        <SOAP-ENV:Header>\r\n            <eb:MessageHeader xmlns:eb=\"http://www.ebxml.org/namespaces/messageHeader\" SOAP-ENV:mustUnderstand=\"0\">\r\n                <eb:From>\r\n                    <eb:PartyId eb:type=\"urn:x12.org:IO5:01\">999999</eb:PartyId>\r\n                </eb:From>\r\n                <eb:To>\r\n                    <eb:PartyId eb:type=\"urn:x12.org:IO5:01\">123123</eb:PartyId>\r\n                </eb:To>\r\n                <eb:CPAId>R7OI</eb:CPAId>\r\n                 <eb:ConversationId>99999</eb:ConversationId>\r\n                <eb:Service eb:type=\"sabreXML\"></eb:Service>\r\n                <eb:Action>GetHotelMediaRQ</eb:Action>\r\n            </eb:MessageHeader> <ns6:Security xmlns:ns6=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" SOAP-ENV:mustUnderstand=\"0\">\r\n                <ns6:BinarySecurityToken>"+securityToken+"</ns6:BinarySecurityToken>\r\n            </ns6:Security>\r\n        </SOAP-ENV:Header>\r\n        <SOAP-ENV:Body>\r\n<GetHotelMediaRQ xmlns=\"http://services.sabre.com/hotel/media/v1\" version=\"1.0.0\">\r\n    <HotelRefs>\r\n        <HotelRef HotelCode=\""+hotelCode+"\" CodeContext=\"Sabre\">\r\n            <ImageRef MaxImages=\"1\">\r\n                <Images>\r\n                    <Image Type=\"THUMBNAIL\" />\r\n                </Images>\r\n                <Categories>\r\n                    <Category Code=\"1\" />\r\n                </Categories>\r\n                <AdditionalInfo>\r\n                    <Info Type=\"CAPTION\">true</Info>\r\n                </AdditionalInfo>\r\n                <Languages>\r\n                    <Language Code=\"EN\" />\r\n                </Languages>\r\n            </ImageRef>\r\n        </HotelRef>\r\n    </HotelRefs>\r\n</GetHotelMediaRQ>\r\n\t\r\n\t    </SOAP-ENV:Body>\r\n    </SOAP-ENV:Envelope>\r\n "
    }

    $.ajax(getImage).done(function (result) {
      var hotelMedia = result.getElementsByTagName("HotelMediaInfo").length;
      if(hotelMedia != 0){
        var image = result.getElementsByTagName("ImageItem").length;
        if(image != 0){
          hotelImage = result.getElementsByTagName("Image")[0].getAttribute("Url");
        }
        else {
          hotelImage = "images/nophoto.png";
        }
      }
      else {
               hotelImage = "images/nophoto.png";
             }       
    });
    //Getting Image End
    var hotelName = availabilityOption[i].getElementsByTagName("BasicPropertyInfo")[0].getAttribute("HotelName");
    var hotelLongitude = availabilityOption[i].getElementsByTagName("BasicPropertyInfo")[0].getAttribute("Longitude");
    var hotelLatitude = availabilityOption[i].getElementsByTagName("BasicPropertyInfo")[0].getAttribute("Latitude");
    var hotelAddress1 = availabilityOption[i].getElementsByTagName("AddressLine")[0].childNodes[0].nodeValue;
    var hotelAddress2 = availabilityOption[i].getElementsByTagName("AddressLine")[1].childNodes[0].nodeValue;
    var hotelAddress = hotelAddress1 + " " + hotelAddress2;
    var phoneNumber = availabilityOption[i].getElementsByTagName("ContactNumber")[0].getAttribute("Phone");
    var faxNumber = availabilityOption[i].getElementsByTagName("ContactNumber")[0].getAttribute("Fax");
    if(availabilityOption[i].getElementsByTagName("Property")[0] != null){
      var forRating = availabilityOption[i].getElementsByTagName("Property")[0];
    var rating = forRating.getElementsByTagName("Text")[0].childNodes[0].nodeValue;
    }
    else {
      rating = "";
    }
    if(availabilityOption[i].getElementsByTagName("RateRange")[0] !=null){
      var rateRangeMin = availabilityOption[i].getElementsByTagName("RateRange")[0].getAttribute("Min");
      var rateRangeMax = availabilityOption[i].getElementsByTagName("RateRange")[0].getAttribute("Max");
    }
    else {
      rateRangeMax = "";
      rateRangeMin = "";
    }
    tempArray.push({hotelCode, hotelName, hotelLongitude, hotelLatitude, hotelAddress, phoneNumber, faxNumber, rating, rateRangeMin, rateRangeMax, hotelImage, toStay, fromStay});
  }
  resultDataHotels.push(tempArray);
  $ionicLoading.hide();
  $state.go('menu.hoteldetails');
});
//Hotel Data Getting end


});
}
    // Getting list of Airports
    if(result.length == 0){
    $http({
      method: "GET",
      url: "js/airports.json",
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      }
    }).then(function(response){
      result = response.data;
      for (var i = 0; i < result.length; i++) {
          destinationName.push(result[i].label);
          destinationIATA.push(result[i].id);
      }
      $("#destinationName").autocomplete({
        source: destinationName
      })
    });
  }
  else {
    for (var i = 0; i < result.length; i++) {
          destinationName.push(result[i].label);
          destinationIATA.push(result[i].id);
      }
       $("#destinationName").autocomplete({
        source: destinationName
      })
    }

    //Authenticating for token
    var auth = {
  "async": true,
  "crossDomain": true,
  "url": "https://webservices-as.havail.sabre.com/",
  "method": "POST",
  "headers": {
    "content-type": "text/xml",
    "cache-control": "no-cache",
    
  },
  "data":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n\t\t<SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:eb=\"http://www.ebxml.org/namespaces/messageHeader\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:xsd=\"http://www.w3.org/1999/XMLSchema\">\r\n\t\t    <SOAP-ENV:Header>\r\n\t\t        <eb:MessageHeader SOAP-ENV:mustUnderstand=\"1\" eb:version=\"1.0\">\r\n\t\t            <eb:ConversationId>99999</eb:ConversationId>\r\n\t\t            <eb:From>\r\n\t\t                <eb:PartyId type=\"urn:x12.org:IO5:01\">999999</eb:PartyId>\r\n\t\t            </eb:From>\r\n\t\t            <eb:To>\r\n\t\t                <eb:PartyId type=\"urn:x12.org:IO5:01\">123123</eb:PartyId>\r\n\t\t            </eb:To>\r\n\t\t            <eb:CPAId>R7OI</eb:CPAId>\r\n\t\t            <eb:Service eb:type=\"OTA\">SessionCreateRQ</eb:Service>\r\n\t\t            <eb:Action>SessionCreateRQ</eb:Action>\r\n\t\t            <eb:MessageData>\r\n\t\t                <eb:MessageId>1000</eb:MessageId>\r\n\t\t                <eb:Timestamp>2001-02-15T11:15:12Z</eb:Timestamp>\r\n\t\t                <eb:TimeToLive>2001-02-15T11:15:12Z</eb:TimeToLive>\r\n\t\t            </eb:MessageData>\r\n\t\t        </eb:MessageHeader>\r\n\t\t        <wsse:Security xmlns:wsse=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" xmlns:wsu=\"http://schemas.xmlsoap.org/ws/2002/12/utility\">\r\n\t\t            <wsse:UsernameToken> \r\n\t\t                <wsse:Username>595258</wsse:Username>\r\n\t\t                <wsse:Password>WS500917</wsse:Password>\r\n\t\t                <Organization>R7OI</Organization>\r\n\t\t                <Domain>DEFAULT</Domain> \r\n\t\t            </wsse:UsernameToken>\r\n\t\t        </wsse:Security>\r\n\t\t    </SOAP-ENV:Header>\r\n\t\t    <SOAP-ENV:Body>\r\n\t\t        <eb:Manifest SOAP-ENV:mustUnderstand=\"1\" eb:version=\"1.0\">\r\n\t\t            <eb:Reference xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"cid:rootelement\" xlink:type=\"simple\"/>\r\n\t\t        </eb:Manifest>\r\n\t\t    </SOAP-ENV:Body>\r\n\t\t</SOAP-ENV:Envelope>"
}

$.ajax(auth).done(function(response){
  securityToken = response.getElementsByTagName("BinarySecurityToken")[0].childNodes[0].nodeValue;
  console.log(securityToken);
  })
});
//Hotel controller starts

app.controller('HotelDetailsController', function($scope, $ionicSideMenuDelegate, $state, $ionicLoading) {
  $scope.hotelData = resultDataHotels[0];
  $scope.resultLength = resultDataHotels[0].length;
  $scope.toConfirm = function($index){
    selectedHotel = [];
    $ionicLoading.show({
      template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>'
    }).then(function(){
      selectedHotel = $scope.hotelData[$index];
      //Hotel Full Details
      var hotelFullDetails = {
        "async": true,
        "crossDomain": true,
        "url": "https://webservices-as.havail.sabre.com/",
        "method": "POST",
        "headers": {
          "content-type": "text/xml",
          "cache-control": "no-cache",
          "postman-token": "f54305ca-bc20-e4e4-1ea9-b61a0c30856e"
        },
        "data": "\t<SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\">\r\n        <SOAP-ENV:Header>\r\n            <eb:MessageHeader xmlns:eb=\"http://www.ebxml.org/namespaces/messageHeader\" SOAP-ENV:mustUnderstand=\"0\">\r\n                <eb:From>\r\n                    <eb:PartyId eb:type=\"urn:x12.org:IO5:01\">999999</eb:PartyId>\r\n                </eb:From>\r\n                <eb:To>\r\n                    <eb:PartyId eb:type=\"urn:x12.org:IO5:01\">123123</eb:PartyId>\r\n                </eb:To>\r\n                <eb:CPAId>R7OI</eb:CPAId>\r\n                 <eb:ConversationId>99999</eb:ConversationId>\r\n                <eb:Service eb:type=\"sabreXML\"></eb:Service>\r\n                <eb:Action>HotelPropertyDescriptionLLSRQ</eb:Action>\r\n            </eb:MessageHeader> <ns6:Security xmlns:ns6=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" SOAP-ENV:mustUnderstand=\"0\">\r\n                <ns6:BinarySecurityToken>"+securityToken+"</ns6:BinarySecurityToken>\r\n            </ns6:Security>\r\n        </SOAP-ENV:Header>\r\n        <SOAP-ENV:Body>\r\n<HotelPropertyDescriptionRQ xmlns=\"http://webservices.sabre.com/sabreXML/2011/10\" xmlns:xs=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" Version=\"2.3.0\">\r\n    <AvailRequestSegment>\r\n        <GuestCounts Count=\"2\" />\r\n        <HotelSearchCriteria>\r\n            <Criterion>\r\n                <HotelRef HotelCode=\""+selectedHotel.hotelCode+"\" />\r\n            </Criterion>\r\n        </HotelSearchCriteria>\r\n        <TimeSpan End=\""+selectedHotel.toStay[0]+"-"+selectedHotel.toStay[1]+"\" Start=\""+selectedHotel.fromStay[0]+"-"+selectedHotel.fromStay[1]+"\" />\r\n    </AvailRequestSegment>\r\n</HotelPropertyDescriptionRQ>\r\n  \r\n      </SOAP-ENV:Body>\r\n    </SOAP-ENV:Envelope>\r\n "
      }

      $.ajax(hotelFullDetails).done(function (response) {
        console.log(response);
        var hotelImageDetail;
        var hotelDescription = [];
        roomDetails = [];
        var roomList = response.getElementsByTagName("RoomRates")[0].children;
        
        var descriptionLength = response.getElementsByTagName("Description")[0].childNodes.length;
        for (var i = 0; i < descriptionLength; i++) {
          hotelDescription.push(response.getElementsByTagName("Description")[0].childNodes[i].textContent);
        }
        hotelDescription = hotelDescription.join("");
        //Getting Image
    var getImage = {
      "crossDomain": true,
      "url": "https://webservices-as.havail.sabre.com/",
      "method": "POST",
      async: false,
      "headers": {
        "content-type": "text/xml",
        "cache-control": "no-cache",
        "postman-token": "44c7d3d1-3811-57ec-85aa-4896648583d7"
      },
      "data": "<SOAP-ENV:Envelope xmlns:SOAP-ENV=\"http://schemas.xmlsoap.org/soap/envelope/\">\r\n        <SOAP-ENV:Header>\r\n            <eb:MessageHeader xmlns:eb=\"http://www.ebxml.org/namespaces/messageHeader\" SOAP-ENV:mustUnderstand=\"0\">\r\n                <eb:From>\r\n                    <eb:PartyId eb:type=\"urn:x12.org:IO5:01\">999999</eb:PartyId>\r\n                </eb:From>\r\n                <eb:To>\r\n                    <eb:PartyId eb:type=\"urn:x12.org:IO5:01\">123123</eb:PartyId>\r\n                </eb:To>\r\n                <eb:CPAId>R7OI</eb:CPAId>\r\n                 <eb:ConversationId>99999</eb:ConversationId>\r\n                <eb:Service eb:type=\"sabreXML\"></eb:Service>\r\n                <eb:Action>GetHotelMediaRQ</eb:Action>\r\n            </eb:MessageHeader> <ns6:Security xmlns:ns6=\"http://schemas.xmlsoap.org/ws/2002/12/secext\" SOAP-ENV:mustUnderstand=\"0\">\r\n                <ns6:BinarySecurityToken>"+securityToken+"</ns6:BinarySecurityToken>\r\n            </ns6:Security>\r\n        </SOAP-ENV:Header>\r\n        <SOAP-ENV:Body>\r\n<GetHotelMediaRQ xmlns=\"http://services.sabre.com/hotel/media/v1\" version=\"1.0.0\">\r\n    <HotelRefs>\r\n        <HotelRef HotelCode=\""+selectedHotel.hotelCode+"\" CodeContext=\"Sabre\">\r\n            <ImageRef MaxImages=\"5\">\r\n                <Images>\r\n                    <Image Type=\"THUMBNAIL\" />\r\n                </Images>\r\n                <Categories>\r\n                    <Category Code=\"1\" />\r\n                </Categories>\r\n                <AdditionalInfo>\r\n                    <Info Type=\"CAPTION\">true</Info>\r\n                </AdditionalInfo>\r\n                <Languages>\r\n                    <Language Code=\"EN\" />\r\n                </Languages>\r\n            </ImageRef>\r\n        </HotelRef>\r\n    </HotelRefs>\r\n</GetHotelMediaRQ>\r\n\t\r\n\t    </SOAP-ENV:Body>\r\n    </SOAP-ENV:Envelope>\r\n "
    }

    $.ajax(getImage).done(function (result) {
          var hotelMediaDetail = result.getElementsByTagName("HotelMediaInfo").length;
      if(hotelMediaDetail != 0){
        var image = result.getElementsByTagName("ImageItem").length;
        if(image != 0){
          hotelImageDetail = result.getElementsByTagName("Image")[0].getAttribute("Url");
        }
        else {
          hotelImageDetail = "images/nophoto.png";
        }
      }
      else {
               hotelImageDetail = "images/nophoto.png";
             }       
    });
    //Getting Image End
    for (var i = 0; i < roomList.length; i++) {
         var additionalInfo = roomList[i].getElementsByTagName("AdditionalInfo");
         var roomDetail ="";
         for (var j = 0; j < additionalInfo[0].children.length; j++) {
           if (additionalInfo[0].children[j].nodeName == "Text") {         
            console.log(additionalInfo[0].children[j].textContent);
            roomDetail += additionalInfo[0].children[j].textContent;
           }
         }
          var roomPrice = roomList[i].getElementsByTagName("HotelTotalPricing")[0].getAttribute("Amount");
          console.log(roomDetail);
          var tempArray = [];
          tempArray.push({roomPrice, roomDetail});
          roomDetails.push(tempArray);
        }
        selectedHotelDetails.push({hotelImageDetail, hotelDescription, roomDetails});
      
      $state.go('menu.hotelconfirmation');
      $ionicLoading.hide();
      });
      //Hotel Full Details End
    }) 
  }

    });

app.controller('HotelConfirmationController', function($scope, $ionicSideMenuDelegate, $state) {
    $scope.hotelDetails = selectedHotel;
    $scope.hotelFullDetails = selectedHotelDetails[0];
    $scope.toUserDetails = function(){
      $state.go('menu.userdetails');
    }
    });