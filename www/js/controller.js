var resultData = [];//result of flights coming from Sabre api
// var destinationName = []; //destination name coming from solude.amxti server
// var destinationIATA = []; //IATA name coming from solude.amxti server
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


app.controller('TabOneController', function($scope, $ionicSideMenuDelegate) {
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
          $ionicLoading.show({
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
            duration: 3000
          }).then(function(){});

      resultData = [];
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
        $state.go('menu.flightdetails');
  }
  else {
    alert("No flights found");
  }
      
    })


       
      }

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
    $scope.flightDetails = function(){
      resultData = [];
      $ionicLoading.show({
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
            duration: 3000
          }).then(function(){});
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
  console.log(response);
      if(response.getElementsByTagName("PricedItineraries").length != 0){
      var pricedItineraries = response.getElementsByTagName("PricedItineraries")[0].childNodes;
        console.log(pricedItineraries.length);
        for (var i = 0; i < pricedItineraries.length; i++) {
          
          var totalFare = pricedItineraries[i].getElementsByTagName("ItinTotalFare")[0].getElementsByTagName("TotalFare")[0].getAttribute("Amount");
          
          var originDestinationOptions = pricedItineraries[i].getElementsByTagName("AirItinerary")[0].getElementsByTagName("OriginDestinationOptions")[0];
          
          var tempArray = [];
          console.log(originDestinationOptions.childNodes.length);
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
        $state.go('menu.flightdetails');
        console.log(resultData);
      }
      else {
        alert("No flights found");
      }
    })


      }
       
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
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
            duration: 3000
          }).then(function(){
            
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
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
            duration: 3000
          }).then(function(){});
          if(resultDataMulti1.length != 0){
            $state.go('menu.flightdetailsmulti1');
          }
          else {
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
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
            duration: 3000
          }).then(function(){});
          if(resultDataMulti2.length != 0){
            $state.go('menu.flightdetailsmulti2')
          }
          else {
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
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
            duration: 3000
          }).then(function(){});
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
app.controller('FlightConfirmationController', function($scope, $ionicSideMenuDelegate, $state) {
      $scope.selectedFlight = selectedFlight;
      $scope.toUserDetails = function(){
        $state.go('menu.userdetails');
      }
    })
//Flight Confirmation Controller End
//Flight COnfrimation Multi Controller
app.controller('FlightConfirmationMultiController', function($scope, $ionicSideMenuDelegate, $state) {
      $scope.selectedFlight = selectedFlightMulti;
      $scope.totalFareMulti = totalFareMulti;
      $scope.toUserDetails = function(){
        $state.go('menu.userdetails');
      }
    })
//Flight Confirmation Multi Controller End

//User Details Controller
app.controller('UserDetailsController', function($scope, $ionicSideMenuDelegate, $state, $http) {
      passengerDetail = [];
      $http({
        method: "GET",
        url: "js/countrycodes.json",
        headers: {
        "Content-Type" : "application/x-www-form-urlencoded"
      }
      }).then(function(response){
        
        $scope.countryCodes = response.data;
        
      });
      $scope.toPayment = function(){
         
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
                $state.go('menu.paymentmethod');
              })
          })
        
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
      $ionicLoading.show({
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
            duration: 3000
          }).then(function(){});
      resultDataMulti0 = [];
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
      }
      else {
        alert('No flights found for the first trip');
      }
    })
      }
      

    }//Flight data ends

    $scope.getSecondValue = function(){
      $ionicLoading.show({
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
            duration: 3000
          }).then(function(){});
      resultDataMulti1 = [];
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
       }
       else {
          alert("No flights found for second trip");
        } 
    })
        }
      }
      

    }//Flight data ends

    $scope.getThirdValue = function(){
      $ionicLoading.show({
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
            duration: 3000
          }).then(function(){});
      resultDataMulti2 = [];
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
      }
      else {
        alert("No flights found for third trip");
      }
    })

        }
      }
      
    }//Flight data ends
    $scope.flightDetailsMulti = function(){
       $ionicLoading.show({
            template: '  <ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
            duration: 3000
          }).then(function(){});
     if(resultDataMulti0.length == 0){
      alert("Enter atleast one location to proceed");
     }
     else {
       $state.go('menu.flightdetailsmulti0');
     }
      

}//function on the button ends here


});